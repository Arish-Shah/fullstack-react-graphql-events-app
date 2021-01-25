import React, { useContext, useEffect, useRef, useState } from "react";
import Modal from "../components/Modal";
import EventList from "../components/EventList";
import Spinner from "../components/Spinner";

import AuthContext from "../context/AuthContext";
import http from "../util/http";

function EventsPage() {
  const authContext = useContext(AuthContext);

  const [creating, setCreating] = useState(false);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const titleRef = useRef();
  const priceRef = useRef();
  const dateRef = useRef();
  const descriptionRef = useRef();

  const isActive = useRef();
  isActive.current = true;

  useEffect(() => {
    fetchEvents();
    return () => (isActive.current = false);
  }, []);

  const handleShareEvent = () => setCreating(true);

  const handleModalConfirm = async () => {
    setCreating(false);
    const title = titleRef.current.value.trim();
    const price = +priceRef.current.value;
    const date = dateRef.current.value.trim();
    const description = descriptionRef.current.value.trim();

    if (
      title.length === 0 ||
      price <= 0 ||
      date.length === 0 ||
      description.length === 0
    )
      return;

    const QUERY = `
      mutation CreateEvent($title: String!, $description: String!, $price: Float!, $date: String!) {
        createEvent(eventInput: { title: $title, description: $description, price: $price, date: $date }) {
          _id
          title
          description
          date
          price
        }
      }
    `;
    const VARIABLES = { title, description, price, date };

    const response = await http(
      QUERY,
      {
        Authorization: `Bearer ${authContext.token}`
      },
      VARIABLES
    );

    setEvents(events => {
      const {
        _id,
        title,
        description,
        date,
        price
      } = response.data.createEvent;
      const updatedEvents = [...events];
      updatedEvents.push({
        _id,
        title,
        description,
        date,
        price,
        creator: {
          _id: authContext.userId
        }
      });
      return updatedEvents;
    });
  };

  const fetchEvents = async () => {
    setIsLoading(true);

    const QUERY = `
      query {
        events {
          _id
          title
          description
          date
          price
          creator {
            _id
            email
          }
        }
      }
    `;

    try {
      const response = await http(QUERY);
      if (isActive.current) {
        setEvents(response.data.events);
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (isActive.current) {
        setIsLoading(false);
      }
    }
  };

  const handleModalCancel = () => {
    setCreating(false);
    setSelectedEvent(null);
  };

  const handleViewDetail = eventId => {
    const event = events.find(e => e._id === eventId);
    setSelectedEvent(event);
  };

  const handleBookEvent = async () => {
    if (!authContext.token) {
      setSelectedEvent(null);
      return;
    }
    const QUERY = `
      mutation BookEvent($id: ID!) {
        bookEvent(id: $id) {
          _id
          createdAt
        }
      }
    `;

    const VARIABLES = { id: selectedEvent._id };

    try {
      await http(
        QUERY,
        {
          Authorization: "Bearer " + authContext.token
        },
        VARIABLES
      );
    } catch (error) {
      console.log(error);
    } finally {
      setSelectedEvent(null);
    }
  };

  return (
    <React.Fragment>
      {authContext.token && (
        <div className="border text-center p-4">
          <div>Share your own events!</div>
          <button className="mt-3" onClick={handleShareEvent}>
            Create Event
          </button>
        </div>
      )}
      {creating && (
        <Modal
          title="Create Event"
          onCancel={handleModalCancel}
          onConfirm={handleModalConfirm}
          confirmText="Confirm"
        >
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" ref={titleRef} />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input type="number" id="price" ref={priceRef} />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input type="datetime-local" id="date" ref={dateRef} />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                type="text"
                id="description"
                ref={descriptionRef}
                rows="3"
              />
            </div>
          </form>
        </Modal>
      )}
      {selectedEvent && (
        <Modal
          title={selectedEvent.title}
          onCancel={handleModalCancel}
          onConfirm={handleBookEvent}
          confirmText={authContext.token ? `Book` : `Confirm`}
        >
          <h3 className="m-0 mb-2">{selectedEvent.title}</h3>
          <h4 className="m-0 text-muted">
            ${selectedEvent.price} -{" "}
            {new Date(selectedEvent.date).toLocaleDateString()}
          </h4>
          <p>{selectedEvent.description}</p>
        </Modal>
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <EventList
          events={events}
          authUserId={authContext.userId}
          onViewDetail={handleViewDetail}
        />
      )}
    </React.Fragment>
  );
}

export default EventsPage;

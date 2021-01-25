import React, { useContext, useEffect, useState } from "react";
import BookingList from "../components/BookingList";
import BookingsChart from "../components/BookingsChart";
import BookingsControls from "../components/BookingsControls";
import Spinner from "../components/Spinner";
import AuthContext from "../context/AuthContext";
import http from "../util/http";

function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState("LIST");

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line
  }, []);

  const fetchBookings = async () => {
    setIsLoading(true);

    const QUERY = `
      query {
        bookings {
          _id
          createdAt
          event {
            _id
            title
            date
            price
          }
        }
      }
    `;

    try {
      const response = await http(QUERY, {
        Authorization: "Bearer " + authContext.token
      });
      setBookings(response.data.bookings);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookingDelete = async id => {
    const QUERY = `
      mutation cancelBooking($id: ID!) {
        cancelBooking(id: $id) {
          _id
          title
        }
      }
    `;

    const VARIABLES = { id };

    try {
      await http(
        QUERY,
        {
          Authorization: "Bearer " + authContext.token
        },
        VARIABLES
      );
      setBookings(bookings => bookings.filter(b => b._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCurrentView = type => {
    setView(type);
  };

  let content = <Spinner />;
  if (!isLoading) {
    content = (
      <React.Fragment>
        <BookingsControls onChange={handleCurrentView} currentView={view} />
        <div>
          {view === "LIST" ? (
            <BookingList bookings={bookings} onDelete={handleBookingDelete} />
          ) : (
            <BookingsChart bookings={bookings} />
          )}
        </div>
      </React.Fragment>
    );
  }

  return content;
}

export default BookingsPage;

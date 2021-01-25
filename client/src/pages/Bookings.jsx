import React, { useContext, useEffect, useState } from "react";
import BookingList from "../components/BookingList";
import Spinner from "../components/Spinner";
import AuthContext from "../context/AuthContext";
import http from "../util/http";

function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchBookings();
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
      mutation {
        cancelBooking(id: "${id}") {
          _id
          title
        }
      }
    `;

    try {
      await http(QUERY, {
        Authorization: "Bearer " + authContext.token
      });
      setBookings(bookings => bookings.filter(b => b._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <BookingList bookings={bookings} onDelete={handleBookingDelete} />
      )}
    </React.Fragment>
  );
}

export default BookingsPage;

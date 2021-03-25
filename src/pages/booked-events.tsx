import { useBookingsQuery } from "~/types/frontend";
import Layout from "../components/Layout";

const BookedEvents = () => {
  const { data, loading } = useBookingsQuery();

  return (
    <Layout>
      <h1>Bookings</h1>
    </Layout>
  );
};

export default BookedEvents;

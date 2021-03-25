function BookingList({ bookings, onDelete }) {
  return (
    <ul className="list-style-none p-0">
      {bookings.map(({ _id, event, createdAt }) => (
        <li
          key={_id}
          className="border rounded mb-3 p-4 d-flex justify-space-between align-items-center"
        >
          <div>
            {event.title} - {new Date(createdAt).toLocaleDateString()}
          </div>
          <div>
            <button onClick={() => onDelete(_id)}>Cancel</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default BookingList;

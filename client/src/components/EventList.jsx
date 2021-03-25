function EventList({ events, authUserId, onViewDetail }) {
  return (
    <ul className="list-style-none p-0 mt-3">
      {events.map(event => (
        <EventItem
          key={event._id}
          {...event}
          creatorId={event.creator._id}
          userId={authUserId}
          onDetail={onViewDetail}
        />
      ))}
    </ul>
  );
}

function EventItem({ _id, title, price, date, userId, creatorId, onDetail }) {
  return (
    <li className="border rounded p-4 mb-3 d-flex align-items-center justify-space-between">
      <div>
        <h3 className="m-0 mb-2">{title}</h3>
        <h4 className="m-0 text-muted">
          ${price} - {new Date(date).toLocaleDateString()}
        </h4>
      </div>
      <div className="align-right">
        {userId === creatorId ? (
          <p className="m-0">You are the owner of this event.</p>
        ) : (
          <button onClick={() => onDetail(_id)}>View Details</button>
        )}
      </div>
    </li>
  );
}

export default EventList;

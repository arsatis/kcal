function EventList({ events, onDeleteEvent }) {
  return (
    <div className="event-list">
      <h2>Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <span className="event-date">{event.date}</span>
            <span>{event.title}</span>
            <button onClick={() => onDeleteEvent(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;

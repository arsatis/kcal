function EventList({ events, onDeleteEvent }) {
  return (
    <div className="event-list">
      <h2>Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <div className="event-date">{event.date}</div>
            <span className="event-title">{event.title}</span>
            <button onClick={() => onDeleteEvent(event.id)}>{'\u2573'}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;

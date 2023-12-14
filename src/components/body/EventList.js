function EventList({ events, onEventDelete }) {
  return (
    <div className='event-list'>
      <h2>Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <div className='event-date'>{parseTimeToDateString(event.time)}</div>
            <span className='event-title'>{event.name}</span>
            <button onClick={() => onEventDelete(event.id)}>{'\u2573'}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function parseTimeToDateString(timestamp) {
  const dateString = new Date(timestamp).toISOString();
  return dateString.substring(0, 10);
}

export default EventList;

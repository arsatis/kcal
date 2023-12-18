function EventList({ events, onEventDelete }) {
  return (
    <div className='event-list'>
      <h2>Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <div className='event-date'>
              <button onClick={() => onEventDelete(event.id)}>{'\u2716'}</button>
              {parseTimeToDateString(event.time)}
            </div>
            <span className='event-title' title={event.name}>{event.name}</span>
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

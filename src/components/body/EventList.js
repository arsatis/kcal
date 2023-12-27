import Event from './Event';

function EventList({ events, onEventDelete, onEventUpdate }) {
  return (
    <div className='event-list'>
      <h2>Events</h2>
      <ul>
        {events.map((event) => (
          <Event
            event={event}
            onEventDelete={onEventDelete}
            onEventUpdate={onEventUpdate}
          />
        ))}
      </ul>
    </div>
  );
}

export default EventList;

import Event from './Event';

function EventList({ events, onEventDelete, onEventUpdate }) {
  return (
    <div className='event-list'>
      <div className='event-list-header'>
        <text>Events</text>
        <button onClick={null}>Undo change</button>
      </div>
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

import Event from './Event';

function EventList({ events, eventHistory, onEventDelete, onEventUpdate, onUndoUpdate }) {
  return (
    <div className='event-list'>
      <div className='event-list-header'>
        <span>Events</span>
        {eventHistory.length > 1 && <button onClick={() => onUndoUpdate()}>Undo change</button>}
      </div>
      <ul>
        {events.map((event) => (
          <Event
            key={event.id}
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

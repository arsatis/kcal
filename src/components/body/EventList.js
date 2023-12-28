import Event from './Event';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo, faUndo } from '@fortawesome/free-solid-svg-icons'

function EventList({ events, onEventDelete, onEventUpdate, canUndo, onUndo, canRedo, onRedo }) {
  return (
    <div className='event-list'>
      <div className='event-list-header'>
        <span>Events</span>
        {canUndo() && <button onClick={() => onUndo()}>
          <FontAwesomeIcon icon={faUndo} />
        </button>}
        {canRedo() && <button onClick={() => onRedo()}>
          <FontAwesomeIcon icon={faRedo} />
        </button>}
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

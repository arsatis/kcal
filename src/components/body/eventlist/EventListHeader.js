import { useContext } from 'react';
import { faRedo, faUndo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EventsContext } from '../../providers/EventsProvider';

function EventListHeader() {
  const { canUndo, handleUndo, canRedo, handleRedo } = useContext(EventsContext);

  return (
    <div className='event-list-header'>
      <span>Events</span>
      {canUndo() && <button onClick={() => handleUndo()}><FontAwesomeIcon icon={faUndo} /></button>}
      {canRedo() && <button onClick={() => handleRedo()}><FontAwesomeIcon icon={faRedo} /></button>}
    </div>
  );
}

export default EventListHeader;

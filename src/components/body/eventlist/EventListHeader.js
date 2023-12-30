import { useContext } from 'react';
import { faRedo, faUndo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EventsContext } from '../../providers/EventsProvider';

function EventListHeader() {
  const { canUndo, canRedo, undoAction, redoAction } = useContext(EventsContext);

  return (
    <div className='event-list-header'>
      <span>Events</span>
      {canUndo() && <button onClick={() => undoAction()}><FontAwesomeIcon icon={faUndo} /></button>}
      {canRedo() && <button onClick={() => redoAction()}><FontAwesomeIcon icon={faRedo} /></button>}
    </div>
  );
}

export default EventListHeader;

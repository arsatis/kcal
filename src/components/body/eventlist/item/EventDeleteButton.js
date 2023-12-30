import { useContext } from 'react';
import { faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EventListContext } from '../../../providers/EventListProvider';
import { EventsContext } from '../../../providers/EventsProvider';

function EventDeleteButton() {
  const { handleEventDelete } = useContext(EventsContext);
  const { event, isEditMode, resetItemDetails, setEditMode } = useContext(EventListContext);

  const onCancelEdit = () => {
    if (isEditMode) {
      resetItemDetails();
      setEditMode(false);
    }
  }

  const handleEventDeleteWithConfirmation = async (eventId) => {
    if (window.confirm('Are you sure you wish to delete this event?')) {
      await handleEventDelete(eventId);
    }
  }

  return (
    <button className='del-button' onClick={
      () => isEditMode
        ? onCancelEdit()
        : handleEventDeleteWithConfirmation(event.id)
    }>
      {isEditMode
        ? <FontAwesomeIcon icon={faXmark} />
        : <FontAwesomeIcon icon={faTrashCan} />
      }
    </button>
  );
}

export default EventDeleteButton;

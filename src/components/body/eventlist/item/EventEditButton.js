import { useContext } from 'react';
import { faCheck, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EventListContext } from '../../../providers/EventListProvider';
import { EventsContext } from '../../../providers/EventsProvider';

function EventEditButton() {
  const { updateEventInState } = useContext(EventsContext);
  const { date, event, isEditMode, name, setEditMode } = useContext(EventListContext);

  const editEvent = async () => {
    if (!isEditMode) {
      setEditMode(true);
      return;
    }
    if (name.trim() === '') {
      alert('Event name should not be empty.');
      return;
    }

    const updatedEvent = {
      id: event.id,
      name,
      time: date === '' ? null : Date.parse(date),
    };
    await updateEventInState(event, updatedEvent);
    setEditMode(false);
  };

  return (
    <button className='edit-button' onClick={editEvent}>
      {isEditMode
        ? <FontAwesomeIcon icon={faCheck} />
        : <FontAwesomeIcon icon={faPenToSquare} />
      }
    </button>
  );
}

export default EventEditButton;

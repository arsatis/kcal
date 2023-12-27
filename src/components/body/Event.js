import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPenToSquare, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons'

function Event({ event, onEventDelete, onEventUpdate }) {
  const [isEditMode, setEditMode] = useState(false);
  const [name, setName] = useState(event.name);
  const [date, setDate] = useState(
    event.time === null ? '' : new Date(event.time).toISOString().substring(0, 19)
  );

  const onEventEdit = async () => {
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
    await onEventUpdate(event, updatedEvent);
    setEditMode(false);
  };

  const onCancelEdit = () => {
    if (isEditMode) {
      setName(event.name);
      setDate(event.time === null ? '' : new Date(event.time).toISOString().substring(0, 19));
      setEditMode(false);
    }
  }

  const onEventDeleteWithConfirmation = (eventId) => {
    if (window.confirm('Are you sure you wish to delete this event?')) {
      onEventDelete(eventId);
    }
  }

  return (
    <li key={event.id}>
      <div className='event-date'>
        <button className='edit-button' onClick={() => onEventEdit()}>
          {isEditMode
            ? <FontAwesomeIcon icon={faCheck} />
            : <FontAwesomeIcon icon={faPenToSquare} />
          }
        </button>
        <button className='del-button' onClick={
          () => isEditMode
            ? onCancelEdit()
            : onEventDeleteWithConfirmation(event.id)
        }>
          {isEditMode
            ? <FontAwesomeIcon icon={faXmark} />
            : <FontAwesomeIcon icon={faTrashCan} />
          }
        </button>
        {isEditMode
          ? <input
            type='datetime-local'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          : (date === '' ? '(no date)' : date.substring(0, 10))
        }
      </div>
      <div className='event-title' title={event.name}>
        {isEditMode
          ? <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          : name
        }
      </div>
    </li>
  );
}

export default Event;

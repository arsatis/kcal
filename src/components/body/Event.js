import { useContext, useEffect, useState } from 'react';
import { faCheck, faPenToSquare, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EventsContext } from '../providers/EventsProvider';

function Event({ event }) {
  const { handleEventDelete, handleEventUpdate } = useContext(EventsContext);
  const [isEditMode, setEditMode] = useState(false);
  const [name, setName] = useState(event.name);
  const [date, setDate] = useState(convertTimestampToDateTime(event.time));

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
    await handleEventUpdate(event, updatedEvent);
    setEditMode(false);
  };

  const onCancelEdit = () => {
    if (isEditMode) {
      setName(event.name);
      setDate(convertTimestampToDateTime(event.time));
      setEditMode(false);
    }
  }

  const handleEventDeleteWithConfirmation = async (eventId) => {
    if (window.confirm('Are you sure you wish to delete this event?')) {
      await handleEventDelete(eventId);
    }
  }

  const onEventDateClear = () => {
    setDate('');
  }

  useEffect(() => {
    const syncEventDetails = () => {
      if (isEditMode) {
        return;
      }
      
      if (name !== event.name) {
        setName(event.name);
      }
      const currDateTime = convertTimestampToDateTime(event.time);
      if (date !== currDateTime) {
        setDate(currDateTime);
      }
    }
    syncEventDetails();
  }, [isEditMode, name, date, event.name, event.time]);

  return (
    <li>
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
            : handleEventDeleteWithConfirmation(event.id)
        }>
          {isEditMode
            ? <FontAwesomeIcon icon={faXmark} />
            : <FontAwesomeIcon icon={faTrashCan} />
          }
        </button>
        {isEditMode
          ? <div className={date === '' ? 'event-date-empty' : 'event-date-input'}>
              <input
                type='datetime-local'
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          : (date === '' ? '(no date)' : date.substring(0, 10))
        }
        {isEditMode && <button className='clear-date-button' onClick={() => onEventDateClear()}>
          <div className='clear-date-text'>clear</div>
        </button>}
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

function convertTimestampToDateTime(eventTime) {
  return eventTime === null ? '' : new Date(eventTime).toISOString().substring(0, 19);
}

export default Event;

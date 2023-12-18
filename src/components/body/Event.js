import { useState } from 'react';

function Event({ event, onEventDelete, onEventUpdate }) {
  const [isEditMode, setEditMode] = useState(false);
  const [name, setName] = useState(event.name);
  const [date, setDate] = useState(new Date(event.time).toISOString().substring(0, 19));

  const onEventEdit = async () => {
    if (!isEditMode) {
      setEditMode(true);
      return;
    }

    const updatedEvent = {
      id: event.id,
      name,
      time: Date.parse(date),
    };
    await onEventUpdate(event, updatedEvent);
    setEditMode(false);
  };

  return (
    <li key={event.id}>
      <div className='event-date'>
        <button className='edit-button' onClick={() => onEventEdit()}>
        {isEditMode
          ? '\u2713'
          : '\u270e'
        }
        </button>
        <button className='del-button' onClick={() => onEventDelete(event.id)}>{'\u2716'}</button>
        {isEditMode
          ? <input
            type='datetime-local'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          : date.substring(0, 10)
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

import { useState } from 'react';

function EventForm({ onEventAdd }) {
  const [title, setTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const handleAddEvent = () => {
    if (title.trim() !== '' && selectedDate !== '') {
      const newEvent = {
        id: new Date().getTime(),
        title,
        date: selectedDate,
      };
      onEventAdd(newEvent);
      setTitle('');
      setSelectedDate('');
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleAddEvent();
    }
  };

  return (
    <div className='event-form'>
      <input
        type='text'
        placeholder='Event name'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      <input
        type='date'
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      <button onClick={handleAddEvent}>Add Event</button>
    </div>
  );
}

export default EventForm;

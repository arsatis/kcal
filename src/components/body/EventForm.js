import { useContext, useState } from 'react';
import { EventsContext } from '../providers/EventsProvider';

function EventForm() {
  const { handleEventAdd } = useContext(EventsContext);
  const [name, setName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const handleAddEvent = () => {
    if (name.trim() === '') {
      alert('Event name should not be empty.');
      return;
    }
    
    const newEvent = {
      id: new Date().getTime(),
      name,
      time: selectedDate === '' ? null : Date.parse(selectedDate),
    };
    handleEventAdd(newEvent);
    setName('');
    setSelectedDate('');
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
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      <input
        type='datetime-local'
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      <button onClick={handleAddEvent}>Add Event</button>
    </div>
  );
}

export default EventForm;

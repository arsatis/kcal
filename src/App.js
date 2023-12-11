import { useState } from 'react';
import Calendar from './components/Calendar';
import EventForm from './components/EventForm';
import EventList from './components/EventList';

import './App.css'

function App() {
  const [isEventListVisible, setEventListVisible] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleEventAdd = (event) => {
    setEvents([...events, event]);
  };
  
  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
  };

  const toggleEventListVisibility = () => {
    setEventListVisible(!isEventListVisible);
  };

  return (
    <div className="app-container">
      <div className={isEventListVisible ? "calendar-container" : "full-width"}>
        <div className="calendar-header">
          <h1>kcal</h1><p>(note: the data is not yet persistent)</p>
          <button onClick={toggleEventListVisibility}>
            {isEventListVisible ? 'Hide Event List' : 'Show Event List'}
          </button>
        </div>
        <div>
          <Calendar
            selectedDate={selectedDate}
            onDateClick={handleDateClick}
            events={events}
          />
          <EventForm onEventAdd={handleEventAdd} />
        </div>
      </div>
      {isEventListVisible && (
        <div className="event-list-container">
          <EventList events={events} onDeleteEvent={handleDeleteEvent} />
        </div>
      )}
    </div>
  );
}

export default App;

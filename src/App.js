import { useState } from 'react';
import Calendar from './components/Calendar';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import Header from './components/Header';
import './App.css'

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isEventListVisible, setEventListVisible] = useState(true);

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

  return (
    <div className="app-container">
      <div className={isEventListVisible ? "calendar-container" : "full-width"}>
        <Header
          isEventListVisible={isEventListVisible}
          setEventListVisible={setEventListVisible}
        />
        <Calendar
          selectedDate={selectedDate}
          onDateClick={handleDateClick}
          events={events}
        />
        <EventForm onEventAdd={handleEventAdd} />
      </div>
      {isEventListVisible && (
        <div className="event-list-container">
          <EventList
            events={events}
            onDeleteEvent={handleDeleteEvent}
          />
        </div>
      )}
    </div>
  );
}

export default App;

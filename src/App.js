import { useState } from 'react';
import Calendar from './components/Calendar';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import Header from './components/Header';
import './App.css'

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isEventListVisible, setEventListVisibility] = useState(true);
  
  const handleEventDelete = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
  };

  return (
    <div className="app-container">
      <div className={isEventListVisible ? "calendar-container" : "full-width-container"}>
        <Header
          isEventListVisible={isEventListVisible}
          setEventListVisibility={setEventListVisibility}
        />
        <Calendar
          selectedDate={selectedDate}
          onDateClick={(date) => setSelectedDate(date)}
          events={events}
        />
        <EventForm
          onEventAdd={(event) => setEvents([...events, event])}
        />
      </div>
      {isEventListVisible && (
        <div className="event-list-container">
          <EventList
            events={events}
            onEventDelete={handleEventDelete}
          />
        </div>
      )}
    </div>
  );
}

export default App;

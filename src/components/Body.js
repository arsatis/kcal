import { useState } from 'react';
import Calendar from './body/Calendar';
import EventForm from './body/EventForm';
import EventList from './body/EventList';

function Body({ isEventListVisible }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  
  const handleEventDelete = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
  };

  return (
    <div className="app-container">
      <div className={isEventListVisible ? "calendar-container" : "full-width-container"}>
        <Calendar
          selectedDate={selectedDate}
          onDateClick={(date) => setSelectedDate(date)}
          events={events}
        />
        <EventForm
          onEventAdd={(event) => setEvents([...events, event])}
        />
      </div>
      <div className={isEventListVisible ? "event-list-container" : "zero-width-container"}>
        {isEventListVisible && <EventList
          events={events}
          onEventDelete={handleEventDelete}
        />}
      </div>
    </div>
  );
}

export default Body;

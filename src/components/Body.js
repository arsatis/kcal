import { useContext, useEffect, useState } from 'react';
import Calendar from './body/Calendar';
import EventForm from './body/EventForm';
import EventList from './body/EventList';
import { UserContext } from '../providers/UserProvider';
import { addEvent, deleteEvent, getEvents } from '../utils/eventUtils';

function Body({ isEventListVisible }) {
  const { db, user } = useContext(UserContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function updateEvents() {
      const events = await getEvents(db, user);
      setEvents(events);
    }
    updateEvents();
  }, [db, user]);

  const handleEventAdd = (event) => {
    setEvents([...events, event])
    addEvent(db, user, event);
  };
  
  const handleEventDelete = (eventId) => {
    const event = events.filter((event) => event.id === eventId)[0];
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
    deleteEvent(db, user, event);
  };

  return (
    <div className='app-container'>
      <div className={isEventListVisible ? 'calendar-container' : 'full-width-container'}>
        <Calendar
          selectedDate={selectedDate}
          onDateClick={(date) => setSelectedDate(date)}
          events={events}
        />
        <EventForm
          onEventAdd={handleEventAdd}
        />
      </div>
      <div className={isEventListVisible ? 'event-list-container' : 'zero-width-container'}>
        {isEventListVisible && <EventList
          events={events}
          onEventDelete={handleEventDelete}
        />}
      </div>
    </div>
  );
}

export default Body;

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

  const handleEventAdd = async (event) => {
    setEvents([...events, event])
    await addEvent(db, user, event);
  };
  
  const handleEventDelete = async (eventId) => {
    const matchedEvents = events.filter((e) => e.id === eventId);
    if (matchedEvents.length === 0) {
      console.error('Event to be deleted does not exist.');
      return;
    }
    const event = matchedEvents[0];

    const updatedEvents = events.filter((e) => e.id !== eventId);
    setEvents(updatedEvents);
    await deleteEvent(db, user, event);
  };

  const handleEventUpdate = async (oldEvent, newEvent) => {
    const eventIdx = events.findIndex((e) => e.id === oldEvent.id);
    const newEvents = [
      ...events.slice(0, eventIdx),
      newEvent,
      ...events.slice(eventIdx + 1)
    ];
    setEvents(newEvents);

    await deleteEvent(db, user, oldEvent);
    await addEvent(db, user, newEvent);
  };

  useEffect(() => {
    async function updateEvents() {
      const events = await getEvents(db, user);
      setEvents(events);
    }
    updateEvents();
  }, [db, user]);

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
          onEventUpdate={handleEventUpdate}
        />}
      </div>
    </div>
  );
}

export default Body;

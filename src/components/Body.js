import { useCallback, useContext, useEffect, useState } from 'react';
import Calendar from './body/Calendar';
import EventForm from './body/EventForm';
import EventList from './body/EventList';
import { UserContext } from '../providers/UserProvider';
import { addEvent, deleteEvent, getEvents, updateEventList } from '../utils/eventUtils';

function Body({ isEventListVisible }) {
  const { db, user } = useContext(UserContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [eventHistory, setEventHistory] = useState([]);

  const handleEventAdd = async (event) => {
    const newEvents = [...events, event];
    setEvents(newEvents)
    setEventHistory([...eventHistory, newEvents]);
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
    setEventHistory([...eventHistory, updatedEvents]);
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
    setEventHistory([...eventHistory, newEvents]);

    await deleteEvent(db, user, oldEvent);
    await addEvent(db, user, newEvent);
  };

  const handleUndoUpdate = useCallback(async () => {
    if (eventHistory.length === 1) {
      return;
    }

    const oldEvents = eventHistory[eventHistory.length - 2];
    setEvents(oldEvents);
    setEventHistory(eventHistory.slice(0, eventHistory.length - 1));
    await updateEventList(db, user, oldEvents);
  }, [db, user, eventHistory]);

  useEffect(() => {
    const updateEvents = async () => {
      const events = await getEvents(db, user);
      setEvents(events);
      setEventHistory(e => e.length === 0 ? [...e, events] : e);
    }
    updateEvents();
  }, [db, user]);

  useEffect(() => {
    const handleKeyDown = async (event) => {
      const code = event.which || event.keyCode;
      const charCode = String.fromCharCode(code).toLowerCase();
      if ((event.ctrlKey || event.metaKey) && charCode === 'z') {
        await handleUndoUpdate();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndoUpdate]);

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
          eventHistory={eventHistory}
          onEventDelete={handleEventDelete}
          onEventUpdate={handleEventUpdate}
          onUndoUpdate={handleUndoUpdate}
        />}
      </div>
    </div>
  );
}

export default Body;

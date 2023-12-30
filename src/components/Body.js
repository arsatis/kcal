import { useCallback, useContext, useEffect, useState } from 'react';
import { addEvent, deleteEvent, getEvents, updateEventList } from '../utils/eventUtils';
import Calendar from './body/Calendar';
import EventForm from './body/EventForm';
import EventList from './body/EventList';
import EventsProvider from './providers/EventsProvider';
import { UserContext } from './providers/UserProvider';

function Body({ isEventListVisible }) {
  const { db, user } = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [eventHistory, setEventHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(0);

  const handleEventAdd = async (event) => {
    const newEvents = [...events, event];
    const newHistoryIdx = historyIdx + 1;

    setEvents(newEvents)
    setEventHistory([...eventHistory.slice(0, newHistoryIdx), newEvents]);
    setHistoryIdx(newHistoryIdx);
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
    const newHistoryIdx = historyIdx + 1;

    setEvents(updatedEvents);
    setEventHistory([...eventHistory.slice(0, newHistoryIdx), updatedEvents]);
    setHistoryIdx(newHistoryIdx);
    await deleteEvent(db, user, event);
  };

  const handleEventUpdate = async (oldEvent, newEvent) => {
    const eventIdx = events.findIndex((e) => e.id === oldEvent.id);
    const newEvents = [
      ...events.slice(0, eventIdx),
      newEvent,
      ...events.slice(eventIdx + 1),
    ];
    const newHistoryIdx = historyIdx + 1;

    setEvents(newEvents);
    setEventHistory([...eventHistory.slice(0, newHistoryIdx), newEvents]);
    setHistoryIdx(newHistoryIdx);
    await deleteEvent(db, user, oldEvent);
    await addEvent(db, user, newEvent);
  };

  const canUndo = useCallback(() => {
    return historyIdx > 0;
  }, [historyIdx]);

  const handleUndo = useCallback(async () => {
    if (!canUndo()) {
      return;
    }
    const newHistoryIdx = historyIdx - 1;
    const oldEvents = eventHistory[newHistoryIdx];

    setEvents(oldEvents);
    setHistoryIdx(newHistoryIdx);
    await updateEventList(db, user, oldEvents);
  }, [db, user, eventHistory, historyIdx, canUndo]);

  const canRedo = useCallback(() => {
    return historyIdx < eventHistory.length - 1;
  }, [eventHistory, historyIdx]);

  const handleRedo = useCallback(async () => {
    if (!canRedo()) {
      return;
    }
    const newHistoryIdx = historyIdx + 1;
    const newEvents = eventHistory[newHistoryIdx];

    setEvents(newEvents);
    setHistoryIdx(newHistoryIdx);
    await updateEventList(db, user, newEvents);
  }, [db, user, eventHistory, historyIdx, canRedo]);

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
      
      if (event.ctrlKey || event.metaKey) {
        if (charCode === 'y' || (charCode === 'z' && event.shiftKey)) {
          await handleRedo();
        } else if (charCode === 'z') {
          await handleUndo();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo]);

  return (
    <EventsProvider>
      <div className='app-container'>
        <div className={isEventListVisible ? 'calendar-container' : 'full-width-container'}>
          <Calendar />
          <EventForm onEventAdd={handleEventAdd} />
        </div>
        <div className={isEventListVisible ? 'event-list-container' : 'zero-width-container'}>
          {isEventListVisible && <EventList
            events={events}
            onEventDelete={handleEventDelete}
            onEventUpdate={handleEventUpdate}
            canUndo={canUndo}
            onUndo={handleUndo}
            canRedo={canRedo}
            onRedo={handleRedo}
          />}
        </div>
      </div>
    </EventsProvider>
  );
}

export default Body;

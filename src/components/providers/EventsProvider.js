import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { addEventToDb, deleteEventFromDb, getEventsFromDb, updateEventsInDb } from '../utils/eventUtils';
import { UserContext } from './UserProvider';

function EventsProvider({ children }) {
  const { db, user } = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [eventHistory, setEventHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(0);

  const addEventToState = async (event) => {
    const newEvents = [...events, event];
    const newHistoryIdx = historyIdx + 1;

    setEvents(newEvents)
    setEventHistory([...eventHistory.slice(0, newHistoryIdx), newEvents]);
    setHistoryIdx(newHistoryIdx);
    await addEventToDb(db, user, event);
  };
  
  const deleteEventFromState = async (eventId) => {
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
    await deleteEventFromDb(db, user, event);
  };

  const updateEventInState = async (oldEvent, newEvent) => {
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
    await deleteEventFromDb(db, user, oldEvent);
    await addEventToDb(db, user, newEvent);
  };

  const canUndo = useCallback(() => {
    return historyIdx > 0;
  }, [historyIdx]);

  const canRedo = useCallback(() => {
    return historyIdx < eventHistory.length - 1;
  }, [eventHistory, historyIdx]);

  const undoAction = useCallback(async () => {
    if (!canUndo()) {
      return;
    }
    const newHistoryIdx = historyIdx - 1;
    const oldEvents = eventHistory[newHistoryIdx];

    setEvents(oldEvents);
    setHistoryIdx(newHistoryIdx);
    await updateEventsInDb(db, user, oldEvents);
  }, [db, user, eventHistory, historyIdx, canUndo]);

  const redoAction = useCallback(async () => {
    if (!canRedo()) {
      return;
    }
    const newHistoryIdx = historyIdx + 1;
    const newEvents = eventHistory[newHistoryIdx];

    setEvents(newEvents);
    setHistoryIdx(newHistoryIdx);
    await updateEventsInDb(db, user, newEvents);
  }, [db, user, eventHistory, historyIdx, canRedo]);

  useEffect(() => {
    const updateEvents = async () => {
      const events = await getEventsFromDb(db, user);
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
          await redoAction();
        } else if (charCode === 'z') {
          await undoAction();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undoAction, redoAction]);
  
  return (
    <EventsContext.Provider value={{
      events,
      setEvents,
      addEventToState,
      deleteEventFromState,
      updateEventInState,
      canUndo,
      canRedo,
      undoAction,
      redoAction,
    }}>
      {children}
    </EventsContext.Provider>
  );
}

export const EventsContext = createContext();
export default EventsProvider;

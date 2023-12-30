import { createContext, useState } from 'react';

function EventsProvider({ children }) {
  const [events, setEvents] = useState([]); // TODO: shift events from Body.js here
  
  return (
    <EventsContext.Provider value={{ events, setEvents }}>
      {children}
    </EventsContext.Provider>
  );
}

export const EventsContext = createContext();
export default EventsProvider;

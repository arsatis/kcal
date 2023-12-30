import { createContext, useCallback, useEffect, useState } from 'react';

function EventListProvider({ children, event }) {
  const [isEditMode, setEditMode] = useState(false);
  const [date, setDate] = useState(convertTimestampToDateTime(event.time));
  const [name, setName] = useState(event.name);

  const resetItemDetails = useCallback(() => {
    setDate(convertTimestampToDateTime(event.time));
    setName(event.name);
  }, [event.time, event.name]);

  useEffect(() => {
    const syncEventDetails = () => {
      if (isEditMode) {
        return;
      }
      
      const currDateTime = convertTimestampToDateTime(event.time);
      if (name !== event.name || date !== currDateTime) { // TODO: check against event version
        resetItemDetails();
      }
    }
    syncEventDetails();
  }, [isEditMode, name, date, event.name, event.time, resetItemDetails]);
  
  return (
    <EventListContext.Provider value={{
      event,
      isEditMode,
      setEditMode,
      date,
      setDate,
      name,
      setName,
      resetItemDetails,
    }}>
      {children}
    </EventListContext.Provider>
  );
}

function convertTimestampToDateTime(eventTime) {
  return eventTime === null ? '' : new Date(eventTime).toISOString().substring(0, 19);
}

export const EventListContext = createContext();
export default EventListProvider;

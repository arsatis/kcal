import { createContext, useCallback, useEffect, useState } from 'react';

function EventListProvider({ children, event }) {
  const [isEditMode, setEditMode] = useState(false);
  const [version, setVersion] = useState(getEventVersion(event.version));
  const [date, setDate] = useState(convertTimestampToDateTime(event.time));
  const [name, setName] = useState(event.name);

  const resetItemDetails = useCallback(() => {
    setVersion(getEventVersion(event.version));
    setDate(convertTimestampToDateTime(event.time));
    setName(event.name);
  }, [event.version, event.time, event.name]);

  useEffect(() => {
    const syncEventDetails = () => {
      if (isEditMode) {
        return;
      }
      
      if (version !== getEventVersion(event.version)) {
        resetItemDetails();
      }
    }
    syncEventDetails();
  }, [isEditMode, version, event.version, resetItemDetails]);
  
  return (
    <EventListContext.Provider value={{
      event,
      isEditMode,
      setEditMode,
      version,
      setVersion,
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

// provides a backward-compatible way of getting event versions
function getEventVersion(version) {
  if (version === undefined || version === null || version.isNaN) {
    return 0;
  }
  return version;
}

export const EventListContext = createContext();
export default EventListProvider;

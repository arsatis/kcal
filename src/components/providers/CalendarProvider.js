import { createContext, useState } from 'react';

function CalendarProvider({ children }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  return (
    <CalendarContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </CalendarContext.Provider>
  );
}

export const CalendarContext = createContext();
export default CalendarProvider;

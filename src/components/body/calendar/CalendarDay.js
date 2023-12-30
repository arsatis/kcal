import { useContext } from 'react';
import { CalendarContext } from '../../providers/CalendarProvider';
import { EventsContext } from '../../providers/EventsProvider';
import CalendarEvent from './CalendarEvent';

function CalendarDay({ date, daysInMonth }) {
  const { selectedDate, setSelectedDate } = useContext(CalendarContext);
  const { events } = useContext(EventsContext);
  const currentDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), date, 8);

  return (date <= 0 || date > daysInMonth)
    ? <div onClick={() => setSelectedDate(currentDate)} className={'day inactive'}></div>
    : <div onClick={() => setSelectedDate(currentDate)} className={'day active'}>
        {date}
        {events.map((event) => <CalendarEvent
          key={event.id}
          currentDate={currentDate}
          event={event}
        />)}
      </div>;
}

export default CalendarDay;
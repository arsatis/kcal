import CalendarProvider from '../providers/CalendarProvider';
import CalendarDays from './calendar/CalendarDays';
import CalendarHeader from './calendar/CalendarHeader';

function Calendar() {
  return (
    <CalendarProvider>
      <div className='calendar'>
        <CalendarHeader />
        <CalendarDays />
      </div>
    </CalendarProvider>
  );
}

export default Calendar;

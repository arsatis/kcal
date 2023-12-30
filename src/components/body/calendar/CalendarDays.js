import { useContext } from 'react';
import { CalendarContext } from '../../providers/CalendarProvider';
import CalendarDay from './CalendarDay';
import CalendarDayOfWeek from './CalendarDayOfWeek';

function CalendarDays() {
  const { selectedDate } = useContext(CalendarContext);
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  const startDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();

  const getNumCells = (numDays) => {
    return numDays % 7 === 0 ? numDays : (Math.floor(numDays / 7) + 1) * 7;
  };

  const renderDays = () => {
    const days = [];
    for (let i = 1; i <= 7; i++) {
      days.push(<CalendarDayOfWeek key={-i} idx={i} />);
    }

    const numCellsOnCalendar = getNumCells(daysInMonth + startDay);
    for (let i = 1; i <= numCellsOnCalendar; i++) {
      const date = i - startDay;
      days.push(<CalendarDay key={i} date={date} daysInMonth={daysInMonth} />);
    }
    return days;
  };

  return (
    <div className='days'>{renderDays()}</div>
  );
}

export default CalendarDays;

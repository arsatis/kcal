import { useContext } from 'react';
import { faCircleLeft, faCircleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CalendarContext } from '../../providers/CalendarProvider';
import { monthNames } from './calendarUtils';

function CalendarHeader() {
  const { selectedDate, setSelectedDate } = useContext(CalendarContext);
  const month = monthNames[selectedDate.getMonth()];
  const year = selectedDate.getFullYear();

  const navigateMonth = (step) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + step);
    setSelectedDate(newDate);
  };

  return (
    <div className='calendar-header'>
      <button className='calendar-nav-button' onClick={() => navigateMonth(-1)}>
        <FontAwesomeIcon icon={faCircleLeft} />
      </button>
      <span>{`${month} ${year}`}</span>
      <button className='calendar-nav-button' onClick={() => navigateMonth(1)}>
        <FontAwesomeIcon icon={faCircleRight} />
      </button>
    </div>
  );
}

export default CalendarHeader;

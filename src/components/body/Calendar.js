function Calendar({ selectedDate, onDateClick, events }) {
  return (
    <div className='calendar'>
      <CalendarHeader selectedDate={selectedDate} onDateClick={onDateClick} />
      <DaysOfWeek />
      <CalendarDays selectedDate={selectedDate} onDateClick={onDateClick} events={events} />
    </div>
  );
}

function CalendarHeader({ selectedDate, onDateClick }) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const month = monthNames[selectedDate.getMonth()];
  const year = selectedDate.getFullYear();

  const navigateMonth = (step) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + step);
    onDateClick(newDate);
  };

  return (
    <div className='calendar-header'>
      <button className='calendar-nav-button' onClick={() => navigateMonth(-1)}>&lt;</button>
      <span>{`${month} ${year}`}</span>
      <button className='calendar-nav-button' onClick={() => navigateMonth(1)}>&gt;</button>
    </div>
  );
}

function DaysOfWeek() {
  return (
    <div className='days-of-week'>
      <div>Sun</div>
      <div>Mon</div>
      <div>Tue</div>
      <div>Wed</div>
      <div>Thu</div>
      <div>Fri</div>
      <div>Sat</div>
    </div>
  );
}

function CalendarDays({ selectedDate, onDateClick, events }) {
  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();

  const startDay = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  ).getDay();

  const renderDays = () => {
    const days = [];

    for (let i = 1; i <= daysInMonth + startDay; i++) {
      const date = i - startDay;
      const currentDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        date
      );

      days.push(
        <div
          key={i}
          onClick={() => onDateClick(currentDate)}
          className={`day ${date > 0 ? 'active' : 'inactive'}`}
        >
          {date > 0 ? date : ''}
          {events.map((event) => {
            const eventDate = new Date(event.date);
            if (eventDate.toDateString() === currentDate.toDateString() && date > 0) {
              return <div key={event.id} className='event'>{event.title}</div>;
            }
            return null;
          })}
        </div>
      );
    }

    return days;
  };

  return (
    <div className='days'>{renderDays()}</div>
  );
}

export default Calendar;

function Calendar({ selectedDate, onDateClick, events }) {
  return (
    <div className='calendar'>
      <CalendarHeader selectedDate={selectedDate} onDateClick={onDateClick} />
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
    const days = [
      <div className='day of-week'>Sun</div>,
      <div className='day of-week'>Mon</div>,
      <div className='day of-week'>Tue</div>,
      <div className='day of-week'>Wed</div>,
      <div className='day of-week'>Thu</div>,
      <div className='day of-week'>Fri</div>,
      <div className='day of-week'>Sat</div>
    ];

    for (let i = 1; i <= daysInMonth + startDay; i++) {
      const date = i - startDay;
      const currentDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        date,
        8
      );

      days.push(
        <div
          key={i}
          onClick={() => onDateClick(currentDate)}
          className={`day ${date > 0 ? 'active' : 'inactive'}`}
        >
          {date > 0 ? date : ''}
          {events.map((event) => {
            const eventDate = new Date(event.time).toISOString().substring(0, 10);
            if (eventDate === currentDate.toISOString().substring(0, 10) && date > 0) {
              return <div key={event.id} className='event' title={event.name}>{event.name}</div>;
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

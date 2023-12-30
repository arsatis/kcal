function CalendarEvent({ currentDate, event }) {
  const currDate = currentDate.toISOString().substring(0, 10);
  const eventDate = new Date(event.time).toISOString().substring(0, 10);

  return (currDate === eventDate) && (
    <div className='event' title={event.name}>{event.name}</div>
  );
}

export default CalendarEvent;

import { idxToDayOfWeekName } from "./calendarUtils";

function CalendarDayOfWeek({ idx }) {
  return (
    <div className='day of-week'>
      {idxToDayOfWeekName[idx]}
    </div>
  );
}

export default CalendarDayOfWeek;

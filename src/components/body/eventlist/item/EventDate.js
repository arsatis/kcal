import { useContext } from 'react';
import { EventListContext } from '../../../providers/EventListProvider';
import EventDateClearButton from './EventDateClearButton';
import EventDeleteButton from './EventDeleteButton';
import EventEditButton from './EventEditButton';

function EventDate() {
  return (
    <div className='event-date'>
      <EventEditButton />
      <EventDeleteButton />
      <Content />
      <EventDateClearButton />
    </div>
  );
}

function Content() {
  const { date, isEditMode, setDate } = useContext(EventListContext);

  return !isEditMode
    ? (date === '' ? '(no date)' : date.substring(0, 10))
    : <div className={date === '' ? 'event-date-empty' : 'event-date-input'}>
        <input
          type='datetime-local'
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>;
}

export default EventDate;

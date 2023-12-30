import { useContext } from 'react';
import { EventsContext } from '../providers/EventsProvider';
import EventListItem from './eventlist/EventListItem';
import EventListHeader from './eventlist/EventListHeader';

function EventList() {
  const { events } = useContext(EventsContext);

  return (
    <div className='event-list'>
      <EventListHeader />
      <ul>
        {events.map((e) => <EventListItem key={e.id} event={e} />)}
      </ul>
    </div>
  );
}

export default EventList;

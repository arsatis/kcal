import EventListProvider from '../../providers/EventListProvider';
import EventDate from './item/EventDate';
import EventDetails from './item/EventDetails';

function EventListItem({ event }) {
  return (
    <EventListProvider event={event}>
      <li>
        <EventDate />
        <EventDetails />
      </li>
    </EventListProvider>
  );
}

export default EventListItem;

import Calendar from './body/Calendar';
import EventForm from './body/EventForm';
import EventList from './body/EventList';
import EventsProvider from './providers/EventsProvider';

function Body({ isEventListVisible }) {
  return (
    <EventsProvider>
      <div className='app-container'>
        <div className={isEventListVisible ? 'calendar-container' : 'full-width-container'}>
          <Calendar />
          <EventForm />
        </div>
        {isEventListVisible
          ? <div className='event-list-container'><EventList /></div>
          : <div className='zero-width-container'></div>
        }
      </div>
    </EventsProvider>
  );
}

export default Body;

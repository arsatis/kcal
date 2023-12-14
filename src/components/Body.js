import { useContext, useEffect, useState } from 'react';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import Calendar from './body/Calendar';
import EventForm from './body/EventForm';
import EventList from './body/EventList';
import { UserContext } from '../providers/UserProvider';

function Body({ isEventListVisible }) {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { db, user } = useContext(UserContext);

  useEffect(() => {
    async function updateEvents() {
      const events = await getEvents(db, user);
      setEvents(events);
    }
    updateEvents();
  }, []);
  console.log(events);
  
  const handleEventDelete = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
  };

  return (
    <div className='app-container'>
      <div className={isEventListVisible ? 'calendar-container' : 'full-width-container'}>
        <Calendar
          selectedDate={selectedDate}
          onDateClick={(date) => setSelectedDate(date)}
          events={events}
        />
        <EventForm
          onEventAdd={(event) => setEvents([...events, event])}
        />
      </div>
      <div className={isEventListVisible ? 'event-list-container' : 'zero-width-container'}>
        {isEventListVisible && <EventList
          events={events}
          onEventDelete={handleEventDelete}
        />}
      </div>
    </div>
  );
}

async function getEvents(db, user) {
  const eventsRef = collection(db, 'events');
  const q = query(eventsRef, where('user', '==', user));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.size !== 0) {
    return querySnapshot.docs[0].data().events;
  }
  try {
    await addDoc(collection(db, 'events'), {
      user: user,
      events: []
    });
  } catch (e) {
    alert('There was an error with during user creation. Please log in again.');
    console.error('Error creating events for user: ', e);
  }
  return [];
}

export default Body;

import { useContext } from 'react';
import { EventListContext } from '../../../providers/EventListProvider';

function EventDetails() {
  const { isEditMode, name, setName } = useContext(EventListContext);

  return (
    <div className='event-title' title={name}>
      {!isEditMode
        ? name
        : <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
      }
    </div>
  );
}

export default EventDetails;

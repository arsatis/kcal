import { useContext } from 'react';
import { EventListContext } from '../../../providers/EventListProvider';

function EventDateClearButton() {
  const { isEditMode, setDate } = useContext(EventListContext);

  const onEventDateClear = () => {
    setDate('');
  }

  return (
    isEditMode && <button className='clear-date-button' onClick={() => onEventDateClear()}>
      <div className='clear-date-text'>clear</div>
    </button>
  );
}

export default EventDateClearButton;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Body from './Body';
import Header from './Header';

function Homepage({ isAuth }) {
  const navigate = useNavigate();
  const [isEventListVisible, setEventListVisibility] = useState(true);

  useEffect(() => {
    if (!isAuth) {
      navigate('/kcal/login');
    }
  }, [isAuth, navigate]);

  return (
    isAuth && <div className='page'>
      <Header
        isEventListVisible={isEventListVisible}
        setEventListVisibility={setEventListVisibility}
      />
      <Body
        isEventListVisible={isEventListVisible}
      />
    </div>
  );
}

export default Homepage;

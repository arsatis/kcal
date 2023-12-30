import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Body from './components/Body';
import Header from './components/Header';
import Login from './components/Login';
import UserProvider from './components/providers/UserProvider';
import './App.css'

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  
  return (
    <UserProvider>
      <Routes>
        <Route path='/kcal' element={<Homepage isAuthenticated={isAuthenticated} />} />
        <Route path='/kcal/login' element={<Login setAuthenticated={setAuthenticated} />} />
      </Routes>
    </UserProvider>
  );
}

function Homepage({ isAuthenticated }) {
  const navigate = useNavigate();
  const [isEventListVisible, setEventListVisibility] = useState(true);

  useEffect(() => {
    const goToLogin = async () => {
      if (!isAuthenticated) {
        navigate('/kcal/login');
      }
    }
    goToLogin();
  }, [isAuthenticated, navigate]);

  return (
    isAuthenticated && <div className='page'>
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

export default App;

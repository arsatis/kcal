import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import LoadUserDetails from './components/LoadUserDetails';
import Login from './components/Login';
import UserProvider from './components/providers/UserProvider';
import './App.css'

function App() {
  const [isAuth, setAuth] = useState(false);
  const [userInCache, setUserInCache] = useState(localStorage.getItem('user'));
  const [passwordInCache, setPasswordInCache] = useState(localStorage.getItem('password'));
  
  return (
    <UserProvider>
      <Routes>
        <Route path='/kcal' element={<Homepage isAuth={isAuth} />} />
        <Route path='/kcal/login' element={userInCache && passwordInCache
          ? <LoadUserDetails userInCache={userInCache} passwordInCache={passwordInCache} setAuth={setAuth} />
          : <Login setAuth={setAuth} />
        } />
      </Routes>
    </UserProvider>
  );
}

export default App;

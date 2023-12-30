import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import LoadUserDetails from './components/LoadUserDetails';
import Login from './components/Login';
import { UserContext } from './components/providers/UserProvider';
import './App.css'

function App() {
  const { userInCache, passwordInCache } = useContext(UserContext);
  
  return (
    <Routes>
      <Route path='/kcal' element={<Homepage />} />
      <Route path='/kcal/login' element={userInCache && passwordInCache
        ? <LoadUserDetails />
        : <Login />
      } />
    </Routes>
  );
}

export default App;

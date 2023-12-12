import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Body from './components/Body';
import Header from './components/Header';
import Login from './components/Login';
import UserProvider from './providers/UserProvider';
import './App.css'

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  
  return (
    <UserProvider>
      <Routes>
        <Route path='/kcal' element={
          isAuthenticated ? <Homepage /> : <Login setAuthenticated={setAuthenticated} />
        } />
        <Route path='/kcal/login' element={<Login setAuthenticated={setAuthenticated} />} />
      </Routes>
    </UserProvider>
  );
}

function Homepage() {
  const [isEventListVisible, setEventListVisibility] = useState(true);

  return (
    <div className='page'>
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

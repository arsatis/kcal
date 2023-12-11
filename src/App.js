import { useState } from 'react';
import Body from './components/Body';
import Header from './components/Header';
import './App.css'

function App() {
  const [isEventListVisible, setEventListVisibility] = useState(true);

  return (
    <div className="page">
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

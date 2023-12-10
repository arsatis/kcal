import './App.css';

import Header from './components/Header';
import Main from './components/Main';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App">
      <Header className="App-header" />
      <Main />
      <Sidebar />
    </div>
  );
}

export default App;

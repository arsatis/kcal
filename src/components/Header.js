function Header({ isEventListVisible, setEventListVisibility }) {
  return (
    <div className='header'>
      <h1>kcal</h1>
      <button onClick={() => setEventListVisibility(!isEventListVisible)}>
        {isEventListVisible ? 'Hide Event List' : 'Show Event List'}
      </button>
    </div>
  );
}

export default Header;

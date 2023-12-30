import LogoutButton from "./header/LogoutButton";

function Header({ isEventListVisible, setEventListVisibility }) {
  return (
    <div className='header'>
      <h1>kcal</h1>
      <div>
        <LogoutButton />
        <button onClick={() => setEventListVisibility(!isEventListVisible)}>
          {isEventListVisible ? 'Hide Event List' : 'Show Event List'}
        </button>
      </div>
    </div>
  );
}

export default Header;

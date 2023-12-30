import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { UserContext } from '../providers/UserProvider';

function LogoutButton() {
  const { auth, setAuth, setUser, setUserInCache, setPasswordInCache } = useContext(UserContext);
  const navigate = useNavigate();

  const logOut = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      signOut(auth)
        .then(() => {
          setUserInCache('');
          setPasswordInCache('');
          setUser('');
          setAuth(false);
          localStorage.clear();
          navigate('/kcal/login');
        })
        .catch((error) => {
          alert('An error was encountered when signing out. Please try again.');
          console.error(error);
        });
    }
  };

  return <button onClick={logOut}>Log Out</button>;
}

export default LogoutButton;

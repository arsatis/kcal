import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { UserContext } from './providers/UserProvider';

function LoadUserDetails() {
  const { auth, setAuth, setUser, userInCache, passwordInCache } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    signInWithEmailAndPassword(auth, userInCache, passwordInCache)
      .then(() => {
        setUser(userInCache);
        setAuth(true);
        navigate('/kcal');
      })
      .catch((error) => {
        localStorage.clear();
        alert('An error was encountered when loading user details. Please sign in again.');
        console.error(error);
      });
  });
  return null;
}

export default LoadUserDetails;

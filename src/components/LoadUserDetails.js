import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './providers/UserProvider';
import { getPayloadFromJwt, signIn } from './utils/loginUtils';

function LoadUserDetails() {
  const { auth, db, jwt, setAuth, setJwt, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const tmp = async () => {
      try {
        const payload = await getPayloadFromJwt(auth, db, jwt);
        await signIn(auth, payload.user, payload.password, setAuth, setUser, navigate);
      } catch (e) {
        setJwt('');
        localStorage.clear();
        alert('An error was encountered when loading user details. Please sign in again.');
        console.error('Error signing in using jwt:', e);
      }
    };
    tmp();
  }, [auth, db, jwt, navigate, setAuth, setJwt, setUser]);
  return null; // TODO: add a page asking users to wait while their data is being loaded
}

export default LoadUserDetails;

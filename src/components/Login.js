import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sha256 from 'crypto-js/sha256';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as randomStr } from 'uuid';
import { kcalConfig, UserContext } from './providers/UserProvider';
import { encryptJwt, initializeJwtSystem, isLoginValid, isSignUpValid, padUsername } from './utils/loginUtils';

function Login() {
  const { auth, db, setAuth, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const jwtAuth = await initializeJwtSystem(auth, db);
    console.log(jwtAuth);

    let canLogin = false;
    await signInWithEmailAndPassword(auth, kcalConfig.email, kcalConfig.pw)
      .then(async () => canLogin = await isLoginValid(db, name, password))
      .catch((error) => {
        alert('An error was encountered during sign in. Please try again.');
        console.error(error);
      });
    if (!canLogin) {
      return;
    }
    console.log('User', name, 'has logged in.');

    const _name = padUsername(name);
    await signInWithEmailAndPassword(auth, _name, password)
      .then(async () => {
        const jwt = await encryptJwt(
          { 'user': _name, 'password': password },
          jwtAuth.secret, jwtAuth.issuer, jwtAuth.audience
        );
        localStorage.setItem(jwtAuth.storageKey, jwt);
        setUser(_name);
        setAuth(true);
        navigate('/kcal');
      })
      .catch((error) => {
        alert('An error was encountered during sign in. Please try again.');
        console.error(error);
      });
  };

  const handleSignup = async () => {
    const jwtAuth = await initializeJwtSystem(auth, db);

    let canSignUp = false;
    await signInWithEmailAndPassword(auth, kcalConfig.email, kcalConfig.pw)
      .then(async () => canSignUp = await isSignUpValid(db, name, password))
      .catch((error) => {
        alert('An error was encountered during sign up. Please try again.');
        console.error(error);
      });
    if (!canSignUp) {
      return;
    }

    try {
      const salt = randomStr().substring(0, 8);
      await setDoc(doc(db, 'users', name), {
        name: name,
        password: sha256(password + salt).words,
        salt: salt
      });
      console.log('User', name, 'has logged in.');

      const _name = padUsername(name);
      createUserWithEmailAndPassword(auth, _name, password)
        .then(async () => {
          const jwt = await encryptJwt(
            { 'user': _name, 'password': password },
            jwtAuth.secret, jwtAuth.issuer, jwtAuth.audience
          );
          localStorage.setItem(jwtAuth.storageKey, jwt);
          setUser(_name);
          setAuth(true);
          navigate('/kcal');
        })
        .catch((error) => {
          alert('An error was encountered during user creation. Please try again.');
          console.error(error);
        });
    } catch (e) {
      alert('There was an error during sign up. Please try again.');
      console.error('Error adding document:', e);
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className='login-page'>
      <div className='login-form'>
        <h2>kcal</h2>
        <form>
          <div className='login-items'>
            <label className='login-label'>Username:</label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyUp={handleKeyUp}
            />
          </div>
          <div className='login-items'>
            <label className='login-label'>Password:</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyUp={handleKeyUp}
            />
          </div>
          <div className='login-buttons'>
            <button className='login-button' type='button' onClick={handleLogin}>Log In</button>
            <button className='login-button' type='button' onClick={handleSignup}>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

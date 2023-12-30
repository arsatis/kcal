import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { UserContext } from './providers/UserProvider';
import { isLoginValid, isSignUpValid, padUsername } from './utils/loginUtils';
import sha256 from 'crypto-js/sha256';
import { v4 as randomStr } from 'uuid';

function Login({ setAuthenticated }) {
  const { auth, db, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!await isLoginValid(db, name, password)) {
      return;
    }
    console.log('User', name, 'has logged in.');

    const _name = padUsername(name);
    signInWithEmailAndPassword(auth, _name, password)
      .then(() => {
        setUser(_name);
        setAuthenticated(true);
        navigate('/kcal');
      })
      .catch((error) => {
        alert('An error was encountered during sign in. Please try again.')
        console.error(error);
      });
  };

  const handleSignup = async () => {
    if (!await isSignUpValid(db, name, password)) {
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
        .then(() => {
          setUser(_name);
          setAuthenticated(true);
          navigate('/kcal');
        })
        .catch((error) => {
          alert('An error was encountered during user creation. Please try again.')
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

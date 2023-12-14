import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { UserContext } from '../providers/UserProvider';
import sha256 from 'crypto-js/sha256';
import { v4 as randomStr } from 'uuid';

function Login({ setAuthenticated }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { db, setUser } = useContext(UserContext);

  const handleLogin = async () => {
    if (name === '' || password === '') {
      alert('Username or password field is empty');
      return;
    }

    const docRef = doc(db, 'users', name);
    const docSnapshot = await getDoc(docRef);
    if (!docSnapshot.exists()) {
      alert('User does not exist.');
      return;
    }
    
    const userDetails = docSnapshot.data();
    const passwordHash = sha256(password + userDetails.salt).words;
    if (userDetails.password.some((v, i) => v !== passwordHash[i])) {
      alert('Incorrect password.');
      return;
    }
    console.log('User', name, 'has logged in.');

    setUser(name);
    setAuthenticated(true);
    navigate('/kcal');
  };

  const handleSignup = async () => {
    if (name === '' || password === '') {
      alert('Username or password field is empty');
      return;
    }

    // ensure that user does not already exist
    const docRef = doc(db, 'users', name);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      alert('User with the given name already exists.');
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

      setUser(name);
      setAuthenticated(true);
      navigate('/kcal');
    } catch (e) {
      alert('There was an error during sign up. Please try again.');
      console.error('Error adding document: ', e);
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

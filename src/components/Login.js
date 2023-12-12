import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, getDocs, getFirestore, query, where } from 'firebase/firestore';

function Login({ setAuthenticated }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // TODO: shift this logic for initializing Firestore into a React Context
  const firebaseConfig = {
    apiKey: 'AIzaSyDC_OOByj0zCcJEgYraBNTo_ItEq_tYOlY',
    authDomain: 'kcal-arsatis.firebaseapp.com',
    projectId: 'kcal-arsatis',
    storageBucket: 'kcal-arsatis.appspot.com',
    messagingSenderId: '69806283894',
    appId: '1:69806283894:web:c2443945966740e3e31357',
    measurementId: 'G-0J39BNLT7C'
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const handleLogin = async () => {
    if (user === '' || password === '') {
      alert('Username or password field is empty');
      return;
    }

    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('name', '==', user), where('password', '==', password)) // TODO: compare hashed passwords
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size === 0) {
      alert('User does not exist or password is incorrect.');
      return;
    }

    setAuthenticated(true);
    navigate('/kcal');
  };

  const handleSignup = async () => {
    if (user === '' || password === '') {
      alert('Username or password field is empty');
      return;
    }

    // ensure that user does not already exist
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('name', '==', user));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.size !== 0) {
      alert('User with the given username already exists.');
      return;
    }

    try {
      await addDoc(collection(db, 'users'), {
        name: user,
        password: password, // TODO: write password after hashing
        salt: '' // TODO: add random salt
      });
      console.log('User', user, 'has logged in.');
      setAuthenticated(true);
      navigate('/kcal');
    } catch (e) {
      alert('Error adding document: ', e);
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
        <h2>Login</h2>
        <form>
          <div className='login-items'>
            <label className='login-label'>User:</label>
            <input
              type='text'
              value={user}
              onChange={(e) => setUser(e.target.value)}
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

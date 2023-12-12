import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { UserContext } from '../providers/UserProvider';

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

    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('name', '==', name), where('password', '==', password)) // TODO: compare hashed passwords
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size === 0) {
      alert('User does not exist or password is incorrect.');
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
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('name', '==', name));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size !== 0) {
      alert('User with the given name already exists.');
      return;
    }

    try {
      await addDoc(collection(db, 'users'), {
        name: name,
        password: password, // TODO: write password after hashing
        salt: '' // TODO: add random salt
      });
      console.log('User', name, 'has logged in.');

      setUser(name);
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

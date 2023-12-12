import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === '' && password === '') { // Simplified login logic, TODO: replace with actual authentication logic after integrating backend
      setAuthenticated(true);
      navigate('/kcal');
    } else {
      alert('Email or password is incorrect');
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
            <label className='login-label'>Email:</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <button className='login-button' type='button' onClick={handleLogin}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

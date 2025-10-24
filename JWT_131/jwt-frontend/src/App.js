import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      setToken(res.data.token);
      setMessage('Login successful!');
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      setMessage('Invalid credentials');
    }
  };

  const getProfile = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/auth/profile', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setMessage(`Welcome ${res.data.user.username}`);
    } catch (err) {
      setMessage('Unauthorized');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>JWT Auth Demo</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>

      <button onClick={getProfile} style={{ marginTop: 10 }}>
        Get Profile
      </button>

      <p>{message}</p>
      {token && <p>Token: {token}</p>}
    </div>
  );
}

export default App;

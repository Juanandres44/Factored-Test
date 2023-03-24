import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

function Login() {
    
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

function handleClick (){

        navigate("/profile")
    
    }

    return (
        <div>
          <h1>Login Page</h1>
          <form>
            <div>
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </div>
            <button onClick={handleClick} type="submit">Login</button>
          </form>
        </div>
      );

} 

export default Login

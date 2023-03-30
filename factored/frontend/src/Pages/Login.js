import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    textAlign: 'center',
  },
  button: {
    margin: 'auto',
    display: 'block',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
}));

function Login() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = () => {
    navigate('/home');
  };

  return (
    <div className={classes.container}>
      <form className={classes.root}>
        <h1>Login Page</h1>
        <div>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleClick}
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;

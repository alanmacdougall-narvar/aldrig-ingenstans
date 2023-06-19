import React from 'react';
import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import DogList from './components/DogList';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const API_ROOT = import.meta.env.VITE_API_ROOT;

function App() {
  const [apiKey, setApiKey] = React.useState(localStorage.getItem('api_key'));
  const [dogs, setDogs] = React.useState([]);
  const [authErrorShown, setAuthErrorShown] = React.useState(false);
  const [unknownErrorShown, setUnknownErrorShown] = React.useState(false);

  useEffect(() => {
    refreshDogs();
  }, []);

  const refreshDogs = () => {
    fetch(`${API_ROOT}/dogs`)
      .then(response => response.json())
      .then(data => setDogs(data));
  };

  const addDog = (dogData) => {
    // POST /api/dogs
    fetch(`${API_ROOT}/dogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('api_key')}`,
      },
      body: JSON.stringify(dogData),
    }).then(response => {
      if (response.ok) {
        refreshDogs();
      } else {
        return Promise.reject(response);
      }
    }).catch(response => {
      console.log("error occurred!");
      if (response.status === 401) {
        setAuthErrorShown(true);
      } else {
        setUnknownErrorShown(true);
      }
    });
  };

  const deleteDog = (dogId) => {
    // DELETE /api/dogs/:id
    fetch(`${API_ROOT}/dogs/${dogId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('api_key')}`,
      }
    }).then(response => {
      if (response.ok) {
        refreshDogs();
      } else {
        return Promise.reject(response);
      }
    }).catch(response => {
      console.log("error occurred!");
      if (response.status === 401) {
        setAuthErrorShown(true);
      } else {
        setUnknownErrorShown(true);
      }
    });
  };

  const handleAuthErrorSnackbarClose = () => {
    setAuthErrorShown(false);
  };

  return (
    <Container>
      <Typography variant='h1'>All the Dogs</Typography>
      <Typography variant='body'>
        Here are all the dogs in my neighborhood.
      </Typography>

      <Stack direction='row' spacing={2} alignItems='center'
        sx={{ marginTop: '1rem', marginBottom: '1rem' }}
      >
        <Typography variant='body2'>API Key:</Typography>
        <TextField
          variant='outlined'
          size='small'
          value={apiKey}
          onChange={(event) => setApiKey(event.target.value)}
        />
        <Button onClick={() => localStorage.setItem('api_key', apiKey)}>
          Save
        </Button>
      </Stack>

      <Typography variant='body2'>
        No image upload, no authentication. Just a simple demo. Ask me for the
        API key if you want.
      </Typography>
      <DogList dogs={dogs} deleteDog={deleteDog} addDog={addDog} />
      <Snackbar open={authErrorShown} autoHideDuration={6000} >
        <Alert severity='error'>
          You are not authorized to perform that action. Enter a valid API key.
        </Alert>
      </Snackbar>
      <Snackbar open={unknownErrorShown} autoHideDuration={6000} >
        <Alert severity='error'>
          An unknown error occurred. Please try again.
        </Alert>
      </Snackbar>

    </Container>
  )
}

export default App;

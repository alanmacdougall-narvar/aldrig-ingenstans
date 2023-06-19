import { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

/* MUI Card with a form to add a dog by name and description.
 * The addDog method accepts a dogData object with name and description.
 */
function DogAdd({ dog, addDog }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  return (
    <Card>
      <CardContent>
        <Typography variant='h3'>New Dog</Typography>
        <FormControl fullWidth>
          <Stack spacing={2} sx={{ marginTop: '1rem' }}>
            <TextField
              label='Name'
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              label='Description'
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </Stack>
        </FormControl>
        <CardActions>
          <Button onClick={() => addDog({ name, description })}>Add</Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}

export default DogAdd;

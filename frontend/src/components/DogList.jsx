import Grid from '@mui/material/Unstable_Grid2';
import DogView from './DogView';
import DogAdd from './DogAdd';

function DogList({ dogs, deleteDog, addDog }) {
  return (
    dogs && dogs.length === 0 ? <p>Loading...</p> :
    <Grid container spacing={2}
      sx={{
        marginTop: '1rem',
        marginBottom: '1rem',
      }}>
      {dogs.map((dog) => (
        <Grid key={dog.id} xs={6}>
          <DogView dog={dog} onDelete={() => deleteDog(dog.id)} />
        </Grid>
      ))}
      <Grid key="add" xs={6}>
        <DogAdd addDog={addDog} />
      </Grid>
    </Grid>
  );
}

export default DogList;

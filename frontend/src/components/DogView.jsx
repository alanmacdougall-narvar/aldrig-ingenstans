import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function DogView({ dog, onDelete }) {
  return (
    <Card>
      <CardContent>
        <Typography variant='h3'>{dog.name}</Typography>
        <Typography variant='body'>{dog.description}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={onDelete}>Delete</Button>
      </CardActions>
    </Card>
  );
}

export default DogView;

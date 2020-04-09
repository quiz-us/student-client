import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    margin: '20px',
    height: '90%',
    backgroundColor: (props) => (props.done ? 'white' : grey[200]),
  },
  content: {
    overflowY: 'auto',
    maxHeight: '150px',
  },
  actions: {
    position: 'absolute',
    bottom: 5,
  },
});

const DeckDisplay = ({ assignment }) => {
  const {
    instructions,
    deck,
    due,
    numQuestions,
    numCorrectResponses,
  } = assignment;
  const done = numCorrectResponses >= numQuestions;
  const classes = useStyles({ done });
  const { name, description } = deck;
  return (
    <React.Fragment>
      <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {`${name} (${done ? 'finished' : 'incomplete'})`}
          </Typography>
          <div className={classes.content}>
            <p>
              <strong>Deck Description: </strong>
              {description ? description : 'No Description'}
            </p>
            <p>
              <strong>Instructions: </strong>
              {instructions ? instructions : 'No Instructions'}
            </p>
            <p>
              <strong>Due: </strong>
              {due ? new Date(due).toLocaleDateString('en-US') : 'No Due Date'}
            </p>
            <p>
              <strong>Progress: </strong>
              {`${numCorrectResponses} finished out of ${numQuestions} total questions`}
            </p>
          </div>
        </CardContent>

        <CardActions className={classes.actions}>
          <Link to={`/study/${assignment.id}`}>
            <Button size="small" color="primary">
              {done ? 'Review' : 'Study'}
            </Button>
          </Link>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

export default DeckDisplay;

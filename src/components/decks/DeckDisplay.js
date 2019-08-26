import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    margin: '20px',
    height: '90%'
  },
  content: {
    overflow: 'scroll',
    maxHeight: '120px'
  },
  actions: {
    position: 'absolute',
    bottom: 5
  }
});

const DeckDisplay = ({ assignment }) => {
  const classes = useStyles();
  const { instructions, deck } = assignment;
  const { name, description } = deck;
  return (
    <React.Fragment>
      <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
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
          </div>
        </CardContent>

        <CardActions className={classes.actions}>
          <Link to={`/study/${assignment.id}`}>
            <Button size="small" color="primary">
              Study
            </Button>
          </Link>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

export default DeckDisplay;

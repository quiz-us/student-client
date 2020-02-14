import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ReadOnly from '../decks/ReadOnly';
import { AssignmentContext } from './AssignmentContext';
import ResponseForm from './ResponseForm';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    width: '85%',
    position: 'relative',
    marginTop: '25px',
  },
  ratings: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  rating: {
    width: '15%',
    [theme.breakpoints.down('sm')]: {
      width: '30%',
    },
    marginBottom: '20px',
  },
  mcBottom: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const QuestionContent = () => {
  const classes = useStyles();
  const {
    assignment: { currentQuestion },
  } = useContext(AssignmentContext);
  const { richText, id } = currentQuestion;

  return (
    <div className={classes.root} key={`questionkey-${id}`}>
      <Card className={classes.card}>
        <CardContent>
          <ReadOnly value={JSON.parse(richText)} />
          <ResponseForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionContent;

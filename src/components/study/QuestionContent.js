import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Slide from '@material-ui/core/Slide';
import CardContent from '@material-ui/core/CardContent';
import ReadOnly from '../decks/ReadOnly';
import { AssignmentContext } from './AssignmentContext';
import ResponseForm from './ResponseForm';

const useStyles = makeStyles((theme) => ({
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
  standardsContainer: {
    padding: '5px 10px',
  },
}));

const QuestionContent = ({ getNextQuestion }) => {
  const classes = useStyles();
  const {
    assignment: { currentQuestion },
  } = useContext(AssignmentContext);

  if (!currentQuestion) {
    return <div>All done for now!</div>;
  }

  const { richText, id, standards } = currentQuestion;
  const [standard] = standards || [{}];
  return (
    <div className={classes.root} key={`questionkey-${id}`}>
      <Slide direction="right" in mountOnEnter unmountOnExit>
        <Card className={classes.card}>
          <CardContent>
            <div className={classes.standardsContainer}>
              <strong>{`${standard.title}: `}</strong>
              <span>{standard.description}</span>
            </div>
            <br />
            <Divider />
            <br />
            <ReadOnly value={JSON.parse(richText)} />
            <ResponseForm getNextQuestion={getNextQuestion} />
          </CardContent>
        </Card>
      </Slide>
    </div>
  );
};

QuestionContent.propTypes = {
  getNextQuestion: PropTypes.func.isRequired,
};

export default QuestionContent;

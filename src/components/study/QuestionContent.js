import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import ReadOnly from '../decks/ReadOnly';

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

const QuestionContent = ({ currentQuestion, assignmentId }) => {
  const classes = useStyles();
  const {
    richText,
    questionOptions,
    questionType,
    id: questionId,
  } = currentQuestion;

  console.log(currentQuestion, 'hhu');
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <ReadOnly value={JSON.parse(richText)} />
        </CardContent>
        <CardHeader title="Correct Answer" />
        <CardContent>
          {questionOptions.map(answer => {
            if (answer.correct) {
              return (
                <ReadOnly
                  key={`answer-${answer.id}`}
                  value={JSON.parse(answer.richText)}
                />
              );
            }
            return null;
          })}
        </CardContent>
      </Card>
    </div>
  );
};

QuestionContent.propTypes = {
  currentQuestion: PropTypes.shape({
    richText: PropTypes.string,
    questionOptions: PropTypes.array,
    questionType: PropTypes.string,
    id: PropTypes.string,
  }),
};
export default QuestionContent;

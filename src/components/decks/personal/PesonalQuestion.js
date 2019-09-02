import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import ReadOnly from '../ReadOnly';
import Collapse from '@material-ui/core/Collapse';
import { PersonalAssignmentContext } from './PersonalAssignmentContext';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center'
  },
  card: {
    width: '85%',
    marginTop: '25px'
  },
  ratings: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  rating: {
    width: '15%',
    [theme.breakpoints.down('sm')]: {
      width: '30%'
    },
    marginBottom: '20px'
  },
  mcBottom: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

export default () => {
  const { personalAssignment, dispatch } = useContext(
    PersonalAssignmentContext
  );

  const { assignment, responses } = personalAssignment;
  const {
    deck: { questions }
  } = assignment;

  const currentQuestion = questions.find(({ id }) => !responses[id]) || {};

  const questionNum = responses.length + 1;
  const {
    richText = '{}',
    questionOptions,
    questionType,
    id: questionId
  } = currentQuestion;
  const classes = useStyles();
  console.log('rich', richText);
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader title={`Question # ${questionNum}`} />
        <CardContent>
          <ReadOnly value={JSON.parse(richText)} />
        </CardContent>
      </Card>
    </div>
  );
};

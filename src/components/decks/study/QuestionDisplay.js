import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import ReadOnly from './ReadOnly';
import ResponseForm from './ResponseForm';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center'
  },
  card: {
    width: '85%',
    marginTop: '25px'
  }
}));

const QuestionDisplay = ({ currentQuestion }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const { questionNode, questionOptions } = currentQuestion;
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader title="Question" />
        <CardContent>
          <ReadOnly value={JSON.parse(questionNode)} />
          <ResponseForm />
        </CardContent>
        <Collapse in={expanded} unmountOnExit>
          <CardContent>
            {questionOptions.map(answer => {
              if (answer.correct) {
                return <ReadOnly value={JSON.parse(answer.optionNode)} />;
              }
            })}
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default QuestionDisplay;

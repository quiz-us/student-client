import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import ReadOnly from './ReadOnly';
import ResponseForm from './ResponseForm';
import { CREATE_RESPONSE } from '../../queries/Response';
import { GET_ASSIGNMENT } from '../../queries/Assignment';
import { useMutation } from '@apollo/react-hooks';
import { Map } from 'immutable';
import MultipleChoiceResponse from './MultipleChoiceResponse';

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
  }
}));

const QuestionDisplay = ({
  currentQuestion,
  currentStudent,
  assignmentId,
  numResponses
}) => {
  const localKey = `QU_PERSISTED_ASSIGNMENT_${assignmentId}_STUDENT_${currentStudent.id}_QUESTION${currentQuestion.id}`;
  const persistedAnswer = localStorage.getItem(localKey) || '';
  const classes = useStyles();
  const [savedAnswer, setSavedAnswer] = useState(persistedAnswer);
  const [expanded, setExpanded] = useState(!!savedAnswer);
  const [createResponse] = useMutation(CREATE_RESPONSE, {
    onCompleted: data => {
      localStorage.removeItem(localKey);
      console.log(data);
    },
    update(
      cache,
      {
        data: { createResponse }
      }
    ) {
      const { assignment } = cache.readQuery({
        query: GET_ASSIGNMENT,
        variables: {
          assignmentId,
          studentId: currentStudent.id
        }
      });

      const updatedResponses = assignment.responses.concat([createResponse]);
      const immutableAssignment = Map(assignment);
      // needs to be a deep clone in order to trigger parent UI update:
      const updatedAssignment = immutableAssignment.toObject();
      updatedAssignment.responses = updatedResponses;
      cache.writeQuery({
        query: GET_ASSIGNMENT,
        variables: {
          assignmentId,
          studentId: currentStudent.id
        },
        data: { assignment: updatedAssignment }
      });
    },
    onError: err => console.error(err)
  });

  const handleSubmit = answer => {
    localStorage.setItem(localKey, answer);
    setSavedAnswer(answer);
    setExpanded(true);
  };

  const { questionNode, questionOptions, questionType } = currentQuestion;
  const submitFreeResponse = selfGrade => {
    return () => {
      const { id: questionId } = currentQuestion;

      createResponse({
        variables: {
          questionId,
          assignmentId,
          responseText: savedAnswer,
          questionOptionId: questionOptions[0].id,
          selfGrade: parseInt(selfGrade, 10),
          questionType
        }
      });
    };
    // clear localStorage of persisted answer here
  };

  const renderResponseArea = () => {
    switch (questionType) {
      case 'Free Response':
        return (
          <ResponseForm handleSubmit={handleSubmit} savedAnswer={savedAnswer} />
        );
      case 'Multiple Choice':
        return (
          <MultipleChoiceResponse
            questionOptions={currentQuestion.questionOptions}
          />
        );
      default:
        return <div>That Question Type is not supported!</div>;
    }
  };

  const currentQuestionNumber = numResponses + 1;
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardHeader title={`Question #${currentQuestionNumber}`} />
        <CardContent>
          <ReadOnly value={JSON.parse(questionNode)} />
          {renderResponseArea()}
        </CardContent>
        <Collapse in={expanded} unmountOnExit>
          <CardHeader title="Correct Answer" />
          <CardContent>
            {questionOptions.map(answer => {
              if (answer.correct) {
                return (
                  <ReadOnly
                    key={`answer-${answer.id}`}
                    value={JSON.parse(answer.optionNode)}
                  />
                );
              }
              return null;
            })}
          </CardContent>
          <CardContent>
            <h4>How well did you do? (0 = didn't know it; 5 = perfect!)</h4>
            <div className={classes.ratings}>
              {[0, 1, 2, 3, 4, 5].map(rating => {
                return (
                  <Button
                    className={classes.rating}
                    onClick={submitFreeResponse(rating)}
                    key={`rating-${rating}`}
                    variant="contained"
                    color="secondary"
                  >
                    {rating}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default QuestionDisplay;

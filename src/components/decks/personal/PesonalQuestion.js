import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import ReadOnly from '../ReadOnly';
import Collapse from '@material-ui/core/Collapse';
import ResponseForm from '../study/ResponseForm';
import { CREATE_RESPONSE } from '../../queries/Response';
import MultipleChoiceResponse from '../study/MultipleChoiceResponse';
import { useMutation } from '@apollo/react-hooks';
import { PersonalAssignmentContext } from './PersonalAssignmentContext';
import GlobalLoader from '../../app/GlobalLoader';
import { CurrentStudentContext } from '../../home/Home';
import TranslateModal from '../../translate/TranslateModal';

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

const PersonalQuestion = () => {
  const currentStudent = useContext(CurrentStudentContext);
  const { personalAssignment, dispatch } = useContext(
    PersonalAssignmentContext
  );

  const { responses, currentQuestion } = personalAssignment;

  const questionNum = Object.keys(responses).length + 1;
  const {
    richText,
    questionOptions,
    questionType,
    id: questionId,
  } = currentQuestion;
  const localKey = `QU_PERSISTED_PERSONAL_STUDENT_${currentStudent.id}_QUESTION${currentQuestion.id}`;
  const persistedAnswer = localStorage.getItem(localKey) || '';
  const [savedAnswer, setSavedAnswer] = useState(persistedAnswer);
  const [expanded, setExpanded] = useState(!!savedAnswer);
  const classes = useStyles();
  const [createResponse, { data: mcResponse, loading }] = useMutation(
    CREATE_RESPONSE,
    {
      onCompleted: ({ createResponse: response }) => {
        localStorage.removeItem(localKey);
        if (questionType === 'Free Response') {
          dispatch({ type: 'addResponse', response });
          setExpanded(false);
          setSavedAnswer('');
        }
      },
      onError: err => console.error(err),
    }
  );

  const delayedUpdate = () => {
    setExpanded(false);
    setSavedAnswer('');
    dispatch({ type: 'addResponse', response: mcResponse.createResponse });
  };

  const submitFreeResponse = selfGrade => {
    return () => {
      createResponse({
        variables: {
          questionId,
          responseText: savedAnswer,
          questionOptionId: questionOptions[0].id,
          selfGrade: parseInt(selfGrade, 10),
          questionType,
        },
      });
    };
    // clear localStorage of persisted answer here
  };

  const handleFRSubmit = answer => {
    localStorage.setItem(localKey, answer);
    setSavedAnswer(answer);
    setExpanded(true);
  };

  const handleMCSubmit = questionOptionId => {
    setExpanded(true);
    setSavedAnswer(questionOptionId);
    createResponse({
      variables: {
        questionId,
        responseText: null,
        questionOptionId,
        selfGrade: null,
        questionType,
      },
    });
  };

  const renderResponseArea = () => {
    switch (questionType) {
      case 'Free Response':
        return (
          <ResponseForm
            key={`personalAnswer${questionId}-${savedAnswer}`}
            handleSubmit={handleFRSubmit}
            savedAnswer={savedAnswer}
          />
        );
      case 'Multiple Choice':
        return (
          <MultipleChoiceResponse
            key={`mcQuestion-${currentQuestion.id}`}
            loading={loading}
            handleSubmit={handleMCSubmit}
            questionOptions={currentQuestion.questionOptions}
          />
        );
      default:
        return <div>That Question Type is not supported!</div>;
    }
  };

  const renderCollapsibleBottom = () => {
    switch (questionType) {
      case 'Free Response':
        return (
          <React.Fragment>
            <h4>How well did you do? (0 = didn't know it; 5 = perfect!)</h4>
            <div className={classes.ratings}>
              {[0, 1, 2, 3, 4, 5].map(rating => {
                return (
                  <Button
                    disabled={loading}
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
          </React.Fragment>
        );
      case 'Multiple Choice':
        return (
          <div className={classes.mcBottom}>
            <Button color="primary" variant="contained" onClick={delayedUpdate}>
              Next Question
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={classes.root}>
      <Card
        className={classes.card}
        key={`personalQ-${questionId}-${questionNum}`}
      >
        <TranslateModal questionId={questionId} />
        <CardHeader title={`Question #${questionNum}`} />
        <CardContent className={classes.question}>
          <ReadOnly value={JSON.parse(richText)} />
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
                    value={JSON.parse(answer.richText)}
                  />
                );
              }
              return null;
            })}
          </CardContent>
          <CardContent>{renderCollapsibleBottom()}</CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default ({ currentStudent }) => {
  const { personalAssignment } = useContext(PersonalAssignmentContext);

  const { assignment, loading, currentQuestion } = personalAssignment;
  const {
    deck: { questions },
  } = assignment;

  // const currentQuestion = questions.find(({ id }) => !responses[id]) || {};

  if (loading) {
    return <GlobalLoader />;
  }

  if (!questions.length || !currentQuestion) {
    return <div>All done for now!</div>;
  }
  if (currentQuestion.id) {
    return <PersonalQuestion currentStudent={currentStudent} />;
  }

  return null;
};

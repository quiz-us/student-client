import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useLazyQuery } from '@apollo/react-hooks';
import GlobalLoader from '../app/GlobalLoader';
import Modal from '../app/Modal';
import { TRANSLATED_QUESTION } from '../queries/Question';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  translateButton: {
    position: 'absolute',
    top: '10px',
    right: '20px',
  },
  translationContainer: {
    margin: '20px 0',
    padding: '15px',
  },
  textarea: {
    padding: '10px',
    minHeight: '80px',
    width: '100%',
    resize: 'vertical',
  },
});

const TranslatedAnswers = ({ answers }) => {
  const classes = useStyles();
  if (!answers) {
    return null;
  }

  return (
    <div>
      <h3>Answer Choices</h3>
      {answers.map(({ optionText, translatedOptionText }) => {
        return (
          <React.Fragment key={optionText}>
            <div className={classes.translationContainer}>
              <div>
                <textarea
                  className={classes.textarea}
                  value={optionText}
                  readOnly
                />
              </div>
              <div>
                <textarea
                  className={classes.textarea}
                  value={translatedOptionText}
                  readOnly
                />
              </div>
            </div>
            <hr />
          </React.Fragment>
        );
      })}
    </div>
  );
};

const Translation = ({ question }) => {
  const classes = useStyles();
  const { questionText, translatedQuestionText, questionOptions } = question;
  return (
    <div>
      <h3>Question</h3>
      <div className={classes.translationContainer}>
        <div>
          <textarea
            className={classes.textarea}
            value={questionText}
            readOnly
          />
        </div>
        <div>
          <textarea
            className={classes.textarea}
            value={translatedQuestionText}
            readOnly
          />
        </div>
      </div>
      <TranslatedAnswers answers={questionOptions} />
    </div>
  );
};

const TranslateModal = ({ questionId }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [translateQuestion, { called, data, loading }] = useLazyQuery(
    TRANSLATED_QUESTION
  );

  if (loading) {
    return <GlobalLoader />;
  }

  const handleClick = () => {
    if (!called) {
      translateQuestion({
        variables: { questionId },
      });
    }
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      {!open || !data ? (
        <Button
          variant="contained"
          onClick={handleClick}
          className={classes.translateButton}
        >
          Spanish Translation
        </Button>
      ) : (
        <Modal
          open={open}
          maxWidth="xl"
          fullWidth
          handleClose={() => setOpen(false)}
          title="Translation"
        >
          <Translation question={data.translatedQuestion} />
        </Modal>
      )}
    </div>
  );
};

export default TranslateModal;

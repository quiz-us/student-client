import React, { useState, useEffect } from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/styles';
import ReadOnly from '../ReadOnly';
import blueGrey from '@material-ui/core/colors/blueGrey';
import shuffle from '../../../util/shuffle';
import { List } from 'immutable';

const useStyles = makeStyles(theme => ({
  multipleChoice: {
    marginBottom: theme.spacing(2),
    fontSize: '16px',
  },
  mcEditor: {
    background: blueGrey[100],
    borderRadius: '4px',
  },
}));

const MultipleChoiceResponse = ({ questionOptions, handleSubmit, loading }) => {
  const classes = useStyles();
  const [choices, setChoices] = useState(questionOptions);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  useEffect(() => {
    const immutableChoices = List(choices);
    const updatedChoices = immutableChoices.toArray();
    shuffle(updatedChoices);
    setChoices(updatedChoices);
    // need this disable so shuffle only runs once:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onClick = answerId => {
    return () => {
      setSelectedAnswer(answerId);
      handleSubmit(answerId);
    };
  };
  return (
    <div>
      {selectedAnswer ? (
        <h3>You Chose:</h3>
      ) : (
        <h3>Choose the correct answer:</h3>
      )}
      {choices.map(answerChoice => {
        const { id, richText } = answerChoice;
        const disabled = loading || !!selectedAnswer;
        const visible = !disabled || id === selectedAnswer;
        const visibility = visible ? 'visible' : 'hidden';
        return (
          <CardActionArea
            // visible={visible}
            style={{ visibility }}
            onClick={onClick(id)}
            disabled={disabled}
            key={`answerchoice-${id}`}
            className={classes.multipleChoice}
          >
            <ReadOnly
              value={JSON.parse(richText)}
              editorClass={classes.mcEditor}
            />
          </CardActionArea>
        );
      })}
    </div>
  );
};

export default MultipleChoiceResponse;

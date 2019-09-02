import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '20px'
  },
  field: {
    marginBottom: '25px'
  },
  submit: {
    margin: '0 auto',
    width: '100px',
    display: 'block'
  }
}));
const ResponseForm = ({ handleSubmit, savedAnswer }) => {
  const [answer, setAnswer] = useState(savedAnswer);
  const classes = useStyles();

  const onSubmit = e => {
    e.preventDefault();
    handleSubmit(answer);
  };
  const disabled = !!savedAnswer;
  return (
    <div className={classes.root}>
      <form onSubmit={onSubmit} disabled={disabled}>
        <TextField
          className={classes.field}
          required
          disabled={disabled}
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          variant="outlined"
          multiline
          label="Your Answer"
          fullWidth
        />
        <Button
          className={classes.submit}
          disabled={disabled}
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ResponseForm;

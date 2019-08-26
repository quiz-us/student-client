import React from 'react';
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
const ResponseForm = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <form>
        <TextField
          className={classes.field}
          variant="outlined"
          multiline
          label="Your Answer"
          fullWidth
        />
        <Button
          className={classes.submit}
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

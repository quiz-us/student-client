import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/styles';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '50px'
  },
  formContainer: {
    width: '30%',
    height: '30%',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  submitButton: {
    marginTop: '30px'
  }
});

const CREATE_LOGIN_LINK = gql`
  mutation createLoginLink($email: String!) {
    createLoginLink(email: $email)
  }
`;

export default () => {
  const classes = useStyles();
  const [createLoginLink, { loading, error }] = useMutation(CREATE_LOGIN_LINK);
  return (
    <div className={classes.root}>
      <Card className={classes.formContainer}>
        <form className={classes.form}>
          <h3>Enter email:</h3>
          <TextField required label="Email" type="email" name="email" />
          <Button
            color="primary"
            variant="contained"
            type="submit"
            className={classes.submitButton}
          >
            Send Log In Link to My Email
          </Button>
        </form>
      </Card>
    </div>
  );
};

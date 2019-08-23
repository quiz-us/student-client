import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/styles';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '50px'
  },
  formContainer: {
    width: '30%',
    [theme.breakpoints.down('md')]: {
      width: '50%'
    },
    [theme.breakpoints.down('sm')]: {
      width: '85%'
    },
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

const Login = ({ classes }) => {
  const [email, setEmail] = useState('');
  const [createLoginLink, { loading, error }] = useMutation(CREATE_LOGIN_LINK, {
    onCompleted: data => console.log('done', data),
    onError: err => console.error('error occured:', error)
  });

  const handleSubmit = e => {
    e.preventDefault();
    createLoginLink({ variables: { email } });
  };

  return (
    <div className={classes.root}>
      <Card className={classes.formContainer}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <h3>Enter email:</h3>
          <TextField
            required
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
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

export default withStyles(styles)(Login);

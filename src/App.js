import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import Nav from './components/nav/Nav';
import { createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/home/Home';
import LogIn from './components/auth/LogIn';
import teal from '@material-ui/core/colors/teal';
import amber from '@material-ui/core/colors/amber';
import { useQuery } from '@apollo/react-hooks';
import Auth from './components/auth/Auth';
import gql from 'graphql-tag';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: amber
  }
});

const GET_CURRENT_STUDENT = gql`
  {
    currentStudent {
      firstName
      lastName
      email
      id
    }
  }
`;

const App = ({ match }) => {
  const { data, loading } = useQuery(GET_CURRENT_STUDENT);
  const currentStudent = data && data.currentStudent;
  if (loading || match.pathname === '/auth') {
    return null;
  }

  return (
    <React.Fragment>
      <Nav currentStudent={currentStudent} />
      {currentStudent ? <Home /> : <LogIn />}
    </React.Fragment>
  );
};

export default () => (
  <Router>
    <ThemeProvider theme={theme}>
      <Route path="/" component={App} />
      <Route path="/auth" component={Auth} />
    </ThemeProvider>
  </Router>
);

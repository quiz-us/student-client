import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import Nav from './components/nav/Nav';
import { createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home/Home';
import LogIn from './components/auth/LogIn';
import teal from '@material-ui/core/colors/teal';
import amber from '@material-ui/core/colors/amber';
import { useQuery } from '@apollo/react-hooks';
import Auth from './components/auth/Auth';
import gql from 'graphql-tag';
import GlobalLoader from './components/app/GlobalLoader';
import CssBaseline from '@material-ui/core/CssBaseline';

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

const App = () => {
  const { data, loading } = useQuery(GET_CURRENT_STUDENT);
  const currentStudent = data && data.currentStudent;
  if (loading) {
    return <GlobalLoader />;
  }

  return (
    <React.Fragment>
      <Nav currentStudent={currentStudent} />
      {currentStudent ? <Home currentStudent={currentStudent} /> : <LogIn />}
    </React.Fragment>
  );
};

export default () => (
  <Router>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" component={App} />
      </Switch>
    </ThemeProvider>
  </Router>
);

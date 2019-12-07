import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import Nav from './components/nav/Nav';
import { createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home/Home';
import LogIn from './components/auth/LogIn';
import teal from '@material-ui/core/colors/teal';
import amber from '@material-ui/core/colors/amber';
import Auth from './components/auth/Auth';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: amber,
  },
});

const App = ({ history }) => {
  return (
    <React.Fragment>
      <Nav history={history} />
      <Switch>
        <Route exact path="/login" component={LogIn} />
        <Route path="/" component={Home} />
      </Switch>
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

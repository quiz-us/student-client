import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import Nav from './components/nav/Nav';
import { createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Auth from './components/auth/Auth';
import teal from '@material-ui/core/colors/teal';
import amber from '@material-ui/core/colors/amber';

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: amber
  }
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Nav />
        <Route exact path="/" component={Home} />
        <Route exact path="/auth" component={Auth} />
      </ThemeProvider>
    </Router>
  );
}

export default App;

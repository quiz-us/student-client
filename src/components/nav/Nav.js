import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import Button from '@material-ui/core/Button';
import { useMutation } from '@apollo/react-hooks';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { GET_CURRENT_LOCAL_STUDENT } from '../queries/Student';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { ReactComponent as Logo } from '../../assets/quizus.svg';
import { LOG_OUT } from '../queries/Student';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  menuIcon: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  white: {
    color: 'white'
  },
  toolbar: theme.mixins.toolbar,
  logo: {
    width: 120,
    top: '5px',
    position: 'relative'
  }
}));

export default function Nav({ history }) {
  const { data = {} } = useQuery(GET_CURRENT_LOCAL_STUDENT);
  const { firstName, lastName } = data.currentStudent || {};
  const [anchorEl, setAnchorEl] = useState(null);
  const [logOutStudent] = useMutation(LOG_OUT, {
    onCompleted: ({ logOutStudent }) => {
      if (logOutStudent) {
        history.push('/login');
      }
    },
    onError: err => {
      console.log(err);
    }
  });

  const classes = useStyles();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    handleClose();
    logOutStudent();
  };
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.white} to="/">
              <Logo className={classes.logo} />
            </Link>
          </Typography>
          {firstName && (
            <React.Fragment>
              <Button
                color="secondary"
                variant="contained"
                onClick={handleClick}
              >{`${firstName} ${lastName}`}</Button>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                getContentAnchorEl={null}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Link to="/personal-deck">
                  <MenuItem onClick={handleClose}>
                    <BookmarksIcon className={classes.menuIcon} />
                    Personal Deck
                  </MenuItem>
                </Link>
                <MenuItem onClick={handleLogOut}>
                  <ExitToAppIcon className={classes.menuIcon} />
                  Logout
                </MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.toolbar} />
    </div>
  );
}

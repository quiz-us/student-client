import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import AssessmentIcon from '@material-ui/icons/Assessment';
import Button from '@material-ui/core/Button';
import { useMutation } from '@apollo/react-hooks';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { GET_CURRENT_LOCAL_STUDENT } from '../gql/queries/Student';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { ReactComponent as Logo } from '../../assets/quizus.svg';
import { LOG_OUT } from '../gql/queries/Student';
import { GET_NUM_PERSONAL_QUESTIONS } from '../gql/queries/Assignment';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuIcon: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  white: {
    color: 'white',
  },
  toolbar: theme.mixins.toolbar,
  logo: {
    width: 120,
    top: '5px',
    position: 'relative',
  },
}));

const Notification = ({ variant = 'standard', children }) => {
  const {
    data = { personalAssignment: { numQuestions: 0 } },
    loading,
  } = useQuery(GET_NUM_PERSONAL_QUESTIONS, {
    onError: (error) => {
      console.error(error);
    },
  });
  const {
    personalAssignment: { numQuestions },
  } = data;
  if (loading || !numQuestions) {
    return children;
  }
  return (
    <Badge variant={variant} badgeContent={numQuestions} color="error">
      {children}
    </Badge>
  );
};

export default function Nav({ history }) {
  const { data = {} } = useQuery(GET_CURRENT_LOCAL_STUDENT);
  const { currentStudent } = data;
  const { firstName, lastName } = currentStudent || {};
  const [anchorEl, setAnchorEl] = useState(null);
  const [logOutStudent] = useMutation(LOG_OUT, {
    onCompleted: ({ logOutStudent }) => {
      if (logOutStudent) {
        history.push('/login');
      }
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const classes = useStyles();

  const handleClick = (event) => {
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
              >
                <Notification>{`${firstName} ${lastName}`}</Notification>
              </Button>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                getContentAnchorEl={null}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Link to="/personal-deck">
                  <MenuItem onClick={handleClose}>
                    <Notification variant="dot">
                      <BookmarksIcon className={classes.menuIcon} />
                      Personal Deck
                    </Notification>
                  </MenuItem>
                </Link>
                <Link to="/standards-mastery">
                  <MenuItem onClick={handleClose}>
                    <AssessmentIcon className={classes.menuIcon} />
                    Standards Mastery
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

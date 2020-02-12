import React, { useContext } from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos';
import CircularProgress from '@material-ui/core/CircularProgress';
import { TeacherAssignmentContext } from './AssignmentContext';
import { makeStyles } from '@material-ui/core/styles';

export const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
  drawer: {
    flexShrink: 0,
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: '70%',
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
    },
  },
  drawerOpen: {
    position: 'absolute',
    top: '50%',
    left: '-5px',
    background: theme.palette.secondary.main,
  },
  topContainer: {},
  bottomContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  details: {
    margin: '40px 0',
  },
  detailsContent: {
    lineHeight: 1.5,
  },
  progress: {
    margin: '40px auto 20px auto',
  },
  progressHeader: {
    textAlign: 'center',
  },
}));

const StudySessionDetails = () => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { teacherAssignment } = useContext(TeacherAssignmentContext);
  const {
    instructions,
    due,
    numCorrectResponses,
    numQuestions,
    deck: { name, description },
  } = teacherAssignment;

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <Container className={classes.topContainer}>
        <div className={classes.details}>
          <h3>{name}</h3>
          <div className={classes.detailsContent}>
            <div>
              <strong>Description: </strong>
              {description ? `${description}` : 'No Description'}
            </div>
            <div>
              <strong>Instructions: </strong>{' '}
              {instructions ? `${instructions}` : 'No Instructions'}
            </div>
            <div>
              <strong>Due: </strong>
              {due
                ? `${new Date(due).toLocaleDateString('en-US')}`
                : 'No Due Date'}
            </div>
          </div>
        </div>
      </Container>

      <Divider />

      <Container className={classes.bottomContainer}>
        <CircularProgress
          className={classes.progress}
          variant="static"
          color="secondary"
          thickness={7}
          size={150}
          value={(numCorrectResponses / numQuestions) * 100 || 5}
        />
        <h3 className={classes.progressHeader}>
          Progress: {`${numCorrectResponses}/${numQuestions} completed`}
        </h3>
      </Container>
    </div>
  );

  return (
    <nav className={classes.drawer}>
      <Hidden smUp>
        <IconButton
          className={classes.drawerOpen}
          size="small"
          onClick={() => setMobileOpen(true)}
        >
          <ArrowForwardIcon fontSize="small" />
        </IconButton>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown>
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default StudySessionDetails;

import React from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: '30%'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: '70%',
    [theme.breakpoints.up('sm')]: {
      width: '30%'
    }
  },
  drawerOpen: {
    position: 'absolute',
    top: '50%',
    left: '-5px',
    background: theme.palette.secondary.main
  },
  topContainer: {},
  bottomContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  details: {
    margin: '40px 0'
  },
  detailsContent: {
    lineHeight: 1.5
  },
  progress: {
    margin: '40px auto 20px auto'
  },
  progressHeader: {
    textAlign: 'center'
  }
}));

const StudySessionDetails = ({ assignment, numQuestions, numResponses }) => {
  const { deck } = assignment;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <Container className={classes.topContainer}>
        <div className={classes.details}>
          <h3>{deck.name}</h3>
          <div className={classes.detailsContent}>
            <div>
              <strong>Description: </strong>
              {deck.description ? `${deck.description}` : 'No Description'}
            </div>
            <div>
              <strong>Instructions: </strong>{' '}
              {assignment.instructions
                ? `${assignment.instructions}`
                : 'No Instructions'}
            </div>
            <div>
              <strong>Due: </strong>
              {assignment.due
                ? `${new Date(assignment.due).toLocaleDateString('en-US')}`
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
          value={(numResponses / numQuestions) * 100 || 5}
        />
        <h3 className={classes.progressHeader}>
          Progress: {`${numResponses}/${numQuestions} completed`}
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
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown>
        <Drawer
          classes={{
            paper: classes.drawerPaper
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

import React from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  drawerOpen: {
    position: 'absolute',
    top: '50%',
    left: '-5px',
    background: theme.palette.secondary.main
  }
}));

const StudySessionDetails = () => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <div>
        <div>Name: Deck Name</div>
        <div>Description: Deck Description</div>
        <div>Instructions: Instructions</div>
        <div>Due Date: Due Date</div>
      </div>
      <Divider />
      <div>
        <CircularProgress
          variant="determinate"
          color="secondary"
          thickness={7}
          size={150}
          value={70}
        />
        Progress 7/10
      </div>
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
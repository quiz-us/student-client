import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  root: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 1000,
    background: 'rgba(0, 0, 0, 0.3)',
  },
  progress: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
  },
});

export default () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress className={classes.progress} />
    </div>
  );
};

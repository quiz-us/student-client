import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useLazyQuery } from '@apollo/react-hooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import Modal from '../app/Modal';
import { TRANSLATED_QUESTION } from '../queries/Question';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  translateButton: {
    position: 'absolute',
    top: '10px',
    right: '20px',
  },
});

const TranslateModal = ({ questionId }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [translateQuestion, { called, data, loading }] = useLazyQuery(
    TRANSLATED_QUESTION
  );

  if (loading) {
    return null;
  }

  const handleClick = () => {
    if (!called) {
      translateQuestion({
        variables: { questionId },
      });
    }
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <button onClick={handleClick} className={classes.translateButton}>
        Translate
      </button>
      <Modal open={open} handleClose={() => setOpen(false)} title="Translation">
        {loading ? <CircularProgress /> : <div>{JSON.stringify(data)}</div>}
      </Modal>
    </div>
  );
};

export default TranslateModal;

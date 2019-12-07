import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_STANDARDS_MASTERY } from '../queries/Standard';
import GlobalLoader from '../app/GlobalLoader';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  tableContainer: {
    margin: 40,
  },
});

const MasteryTable = ({ rows }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Standard</TableCell>
            <TableCell align="left">
              Performance&nbsp;(Number Correct / Number Attempted)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.standard.title}>
              <TableCell align="left">
                <strong>{row.standard.title}</strong>
                {`- ${row.standard.description}`}
              </TableCell>
              <TableCell align="right">{`${row.numCorrect} / ${row.numAttempted}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default () => {
  const classes = useStyles();
  const { loading, data } = useQuery(GET_STANDARDS_MASTERY, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <GlobalLoader />;
  }

  return (
    <div className={classes.tableContainer}>
      <h2>Standards Mastery</h2>
      <MasteryTable rows={data.standardsMastery} />
    </div>
  );
};

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Container from '@material-ui/core/Container';
import withWidth from '@material-ui/core/withWidth';
import { useQuery } from '@apollo/react-hooks';
import { GET_ASSIGNMENTS } from '../queries/Assignment';
import DeckDisplay from './DeckDisplay';
import GlobalLoader from '../app/GlobalLoader';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  }
}));
const DeckIndex = ({ width }) => {
  const { loading, data } = useQuery(GET_ASSIGNMENTS, {
    fetchPolicy: 'network-only'
  });
  const classes = useStyles();

  if (loading) {
    return <GlobalLoader />;
  }
  const { studentAssignments = [] } = data;
  const numColumns = ['xs', 'sm'].includes(width) ? 1 : 2;
  return (
    <div className={classes.root}>
      <Container>
        <h3>Your Assigned Decks</h3>
        <GridList
          cellHeight={250}
          cols={numColumns}
          className={classes.gridList}
        >
          {studentAssignments.map(assignment => (
            <GridListTile key={`assignment${assignment.id}`}>
              <DeckDisplay assignment={assignment} />
            </GridListTile>
          ))}
        </GridList>
      </Container>
    </div>
  );
};

export default withWidth()(DeckIndex);

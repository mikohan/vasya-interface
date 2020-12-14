import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { IRow } from '../interfaces';
import { Grid } from '@material-ui/core';
import { Theme, createStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import TableComponent from './Table';
import { fetchRowsFromServerReadyThunk } from '../store/actions';
import { IState } from '../store/reducers';
import { groupBy, chain } from 'lodash';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
    },
    topRowNumber: {
      padding: theme.spacing(2),
    },
  })
);

export default function ReadyPage() {
  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRowsFromServerReadyThunk());
  }, [dispatch]);

  const rowsReady: IRow[] = useSelector((state: IState) => {
    return state.mainState.rowsReady;
  });

  const groupedRows = groupBy(rowsReady, (row: IRow) => row.dateCreated);
  // .map((value: any, key: any) => ({ date: key, row: value }));
  console.log(groupedRows);

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h6">
            Ready Rows Will Refactor to group by date or some filtering
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">Total: {rowsReady.length}</Typography>
        </Grid>
        <Grid item xs={12}>
          <TableComponent rowsInWork={rowsReady} ready={true} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

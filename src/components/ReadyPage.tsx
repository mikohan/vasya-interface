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
import { groupBy } from 'lodash';

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

  const groupedRows = groupBy(rowsReady, (row: IRow) => row.dateChanged);

  const day = (dayGroup: any, keyName: string) => (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h6">Date: {keyName}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">Total: {dayGroup.length}</Typography>
        </Grid>
        <Grid item xs={12}>
          <TableComponent rowsInWork={dayGroup} ready={true} />
        </Grid>
      </Grid>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body1">
            Total on Page: {rowsReady.length}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {Object.keys(groupedRows).map((keyName: string) =>
            day(groupedRows[keyName], keyName)
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

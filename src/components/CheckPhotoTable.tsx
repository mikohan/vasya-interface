import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import LinkIcon from '@material-ui/icons/Link';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

interface ICheckRow {
  id: number;
  one_c_id: number;
  name: string;
  brand: string;
  cat_number: string;
  have_photo: boolean;
}
interface IProps {
  rows: ICheckRow[];
}

export default function BasicTable({ rows }: IProps) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">One_c_id</TableCell>
            <TableCell align="right">Brand</TableCell>
            <TableCell align="right">Cat Number</TableCell>
            <TableCell align="right">Link to Site</TableCell>
            <TableCell align="right">Link to Product</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.one_c_id}</TableCell>
              <TableCell align="right">{row.brand}</TableCell>
              <TableCell align="right">{row.cat_number}</TableCell>
              <TableCell align="right">
                <a
                  href={`https://angara77.com/porter-5718143000-${row.one_c_id}/`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkIcon color="primary" />
                </a>
              </TableCell>
              <TableCell align="right">
                <a
                  href={`https://partshub.tk/product/list/${row.id}/`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkIcon color="primary" />
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableRowComponent from './TableRow';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { IRow } from '../interfaces';

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

interface IProps {
  rowsInWork: IRow[];
  ready?: boolean;
}

export default function TableComponent({ rowsInWork, ready }: IProps) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Done</TableCell>
            <TableCell>OneCId</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Brand</TableCell>
            <TableCell align="right">Cat</TableCell>
            <TableCell align="right">Photo Fold</TableCell>
            <TableCell align="right">Photo Site</TableCell>
            <TableCell align="right">Video</TableCell>
            <TableCell align="right">Attr</TableCell>
            <TableCell align="right">Notes</TableCell>
            <TableCell align="right">To Site</TableCell>
            <TableCell align="right">Del</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsInWork.map((row: IRow) => (
            <TableRowComponent key={row.uuid} myRow={row} ready={ready} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

import React from 'react';
import ReactDataGrid from 'react-data-grid';

const columns = [
  { key: 'id', name: 'ID', editable: true },
  { key: 'title', name: 'Title', editable: true },
  { key: 'complete', name: 'Complete', editable: true },
];

const rows: IRow[] = [
  { id: 0, title: 'Task 1', complete: 20 },
  { id: 1, title: 'Task 2', complete: 40 },
  { id: 2, title: 'Task 3', complete: 60 },
];
interface IRow {
  id: number;
  title: string;
  complete: number;
}
interface IState {
  rows: IRow[];
}

interface IProps {}
class Example extends React.Component<IProps, IState> {
  state: { rows: IRow[] } = { rows: rows };

  onGridRowsUpdated = ({ fromRow, toRow, updated }: any) => {
    this.setState((state) => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  };
  render() {
    return (
      <ReactDataGrid
        columns={columns}
        rowGetter={(i: number) => this.state.rows[i]}
        rowsCount={3}
        onGridRowsUpdated={this.onGridRowsUpdated}
        enableCellSelect={true}
      />
    );
  }
}

export default Example;

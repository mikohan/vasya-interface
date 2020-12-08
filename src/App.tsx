import React from 'react';
import './App.scss';
import AppBar from './components/AppBar';
import MainTable from './components/MainTable';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TestPage from './components/TestPage';
import Box from '@material-ui/core/Box';

function App() {
  return (
    <BrowserRouter>
      <div>
        <AppBar />
        <Box className="containerBox">
          <Switch>
            <Route path="/testpage" component={TestPage} />
            <Route path="/" component={MainTable} />
          </Switch>
        </Box>
      </div>
    </BrowserRouter>
  );
}

export default App;

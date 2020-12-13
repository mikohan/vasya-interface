import React from 'react';
import './App.scss';
import AppBar from './components/AppBar';
import MainTable from './components/MainTable';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReadyPage from './components/ReadyPage';
import Box from '@material-ui/core/Box';
import CheckPhotos from './components/CheckPhotos';

function App() {
  return (
    <BrowserRouter basename={'/react/'}>
      <div>
        <AppBar />
        <Box className="containerBox">
          <Switch>
            <Route exact path="/testpage/" component={ReadyPage} />
            <Route exact path="/checkphotos/" component={CheckPhotos} />
            <Route path="/" component={MainTable} />
          </Switch>
        </Box>
      </div>
    </BrowserRouter>
  );
}

export default App;

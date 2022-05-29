import React from 'react';
import {BrowserRouter , Route, Switch} from 'react-router-dom';



import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createTheme from '@material-ui/core/styles/createTheme';

import themeObject from './util/theme';

//Compoents
import NavBar from './components/NavBar';
//Pages
import Dashboard from './pages/Dashboard';

const theme = createTheme(themeObject);


const DefaultContainer = () => (
  <div className="container">
    <NavBar/>
    <Route exact path="/" component={Dashboard}/>
    <Route exact path="/dashboard" component={Dashboard} />
  </div>
)

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
            <Switch>
              <Route component={DefaultContainer}/>
            </Switch>
        </BrowserRouter>
      </div>
    </MuiThemeProvider>
  );
}

export default App;

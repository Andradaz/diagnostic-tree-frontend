import React from 'react'
import './App.css'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'
import SwipeableTemporaryDrawer from '././components/swipeableTemporaryDrawer/swipeableTemporaryDrawer'
import Menu from './components/menu/menu'
import Container from '@material-ui/core/Container'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import Admin from './components/admin/admin'
import About from './components/about/about'
import Diagnostic from './components/diagnostic/diagnostic'

function NavBar(){
  const theme = useTheme();
  if(useMediaQuery(theme.breakpoints.up('md'))){
    return(
      <Menu/>
    );
  }else{
    return(
      <SwipeableTemporaryDrawer/>
    )
  }
}

function Content(){
  const theme = useTheme();
  if(useMediaQuery(theme.breakpoints.up('md'))){
    return(
      <Switch>
        <Route path="/admin">
            <Admin />
        </Route>
        <Route path="/diagnostic">
            <Diagnostic />
        </Route>
        <Route path="/">
            <About />
        </Route>
    </Switch>
      
      
    );
  }else{
    return(
      <Grid container>
        aici va fi continutul
      </Grid>
    );
  }
}

function App() {
  return (
    <Router>

      <Grid container spacing = {1}>
        <Grid item xs={12}>
          <NavBar/>
        </Grid>
        <Container>
          <Content/>
        </Container>
      </Grid>
    </Router>
  );
}

export default App

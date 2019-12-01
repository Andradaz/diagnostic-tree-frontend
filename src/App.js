import React from 'react'
import './App.css'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'
import SwipeableTemporaryDrawer from '././components/swipeableTemporaryDrawer/swipeableTemporaryDrawer'
import Menu from './components/menu/menu'
import Container from '@material-ui/core/Container'

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
          <Grid container>
            <Grid item md = {3}>
                  aici este meniul de arbori
            </Grid>
            <Grid item md = {9}>
                  aici va fi continutul
            </Grid>
        </Grid>
      
      
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
      <Grid container spacing = {1}>
        <Grid item xs={12}>
          <NavBar/>
        </Grid>
        <Container>
          <Content/>
        </Container>
      </Grid>
  );
}

export default App

import React from 'react'
import './App.css'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'

function NavBar(){
  const theme = useTheme();
  if(useMediaQuery(theme.breakpoints.up('md'))){
    return(
      <div> Aici va fi meniul pentru ecrane mari.</div>
    );
  }else{
    return(
      <div>Aici va fi meniul pentru ecrane mici</div>
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
      <Content/>
    </Grid>
  );
}

export default App;

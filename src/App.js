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
  Route
} from "react-router-dom"
import Admin from './components/admin/admin'
import About from './components/about/about'
import Diagnostic from './components/diagnostic/diagnostic'
import GetList from '../src/services/get_list'

function NavBar(props){
    const theme = useTheme();
    if(useMediaQuery(theme.breakpoints.up('md'))){
      return(
        <Menu/>
      );
    }else{
      return(
        <SwipeableTemporaryDrawer list = {typeof props.list.data == 'undefined' ? [] : props.list.data}/>
      )
    }
  }

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {list: []}
  }

  async fetchData() {
    const result = await GetList
    this.list = this.setState({list: result});
  }

  componentDidMount(){
    this.fetchData();
  }
  render() {
    return (
      <Router>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <NavBar list = {this.state.list} />
          </Grid>
          <Container>
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
          </Container>
        </Grid>
      </Router>
    );
  }
}
export default App

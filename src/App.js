import React from 'react'
import './App.css'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Grid from '@material-ui/core/Grid'
import SwipeableTemporaryDrawer from '././components/swipeableTemporaryDrawer/swipeableTemporaryDrawer'
import Menu from './components/menu/menu'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import Admin from './components/admin/admin'
import About from './components/about/about'
import Diagnostic from './components/diagnostic/diagnostic'
import GetList from './services/diagnostic/getList'
import Create from '../src/components/create/create'
import EditPanel from '../src/components/admin/editpanel'
import SignIn from './components/login/signin'
import SignUp from './components/login/signup'
import { AuthProvider } from './Auth'
import PrivateRoute from './privateRoute'
import Import from './components/import/import'
import Box from '@material-ui/core/Box'


function NavBar(props) {
  const theme = useTheme();
  if (useMediaQuery(theme.breakpoints.up('md'))) {
    return (
      <Menu />
    );
  } else {
    return (
      <SwipeableTemporaryDrawer list={typeof props.list.data == 'undefined' ? [] : props.list.data} />
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { list: [] }
  }

  fetchData = async () => {
    const result = await GetList
    this.list = this.setState({ list: result })
  }

  componentDidMount() {
    this.fetchData();
  }
  
  render() {
    return (
      <AuthProvider>
        <Router>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <NavBar list={this.state.list} />
            </Grid>
            <Grid item xs={12}>
              <Box pt={6}>
                <Switch>
                  <Route path="/signin">
                    <SignIn />
                  </Route>
                  <Route path="/signup">
                    <SignUp />
                  </Route>
                  <Route path="/admin/create/:id" children={<Create import="no" />} />
                  <Route path="/admin/import/:id" children={<Import />} />
                  <Route path="/admin/edit/:id" children={<Create import="no" edit="yes" />} />
                  <Route path="/admin/edit">
                    <EditPanel />
                  </Route>
                  <PrivateRoute path="/admin" component={Admin} />
                  <Route path="/diagnostic">
                    <Diagnostic list={this.state.list} />
                  </Route>
                  <Route path="/about">
                    <About />
                  </Route>
                  <Route path="/">
                    <About />
                  </Route>
                </Switch>
              </Box>
            </Grid>
          </Grid>
        </Router>
      </AuthProvider>
    );
  }
}
export default App

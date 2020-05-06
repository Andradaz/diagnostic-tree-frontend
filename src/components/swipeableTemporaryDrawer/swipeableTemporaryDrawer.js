import React from 'react'
import './swipeableTemporaryDrawer.css'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListIcon from '@material-ui/icons/List'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Paper from '@material-ui/core/Paper'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { Link as RouterLink } from 'react-router-dom'

const Link1 = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  root: {
    backgroundColor: "#282b2b"
  }
});

function SwipeableTemporaryDrawer(props) {
  
  const classes = useStyles();

  const [state, setState] = React.useState({
    left: false,
    right: false
  });

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {props.list.map((obj, index) => (
          <ListItem button component={Link1} to={obj.idgen} key={obj._id}>
            <ListItemIcon><ArrowForwardIosIcon /></ListItemIcon>
            <ListItemText primary={obj.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Admin Only', 'Admin Only1', 'Admin Only3'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon><ArrowForwardIosIcon /></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Paper square elevation={1} classes={{
      root: classes.root}}>
      <Grid container spacing={0} >
        <Grid item container xs={4} justify='center'>
          <IconButton onClick={toggleDrawer('left', true)}>
            <ListIcon color='primary' />
          </IconButton>
        </Grid>
        <Grid item container xs={4} justify='center'>
          <IconButton href='/'>
            <HomeIcon color='primary' />
          </IconButton>
        </Grid>
        <Grid item container xs={4} justify='center'>
          <IconButton href='/admin'>
            <AccountCircleIcon color='primary' />
          </IconButton>
        </Grid>
        <SwipeableDrawer
          open={state.left}
          onClose={toggleDrawer('left', false)}
          onOpen={toggleDrawer('left', true)}
        >
          {sideList('left')}
        </SwipeableDrawer>
      </Grid>
    </Paper>
  );
}

export default SwipeableTemporaryDrawer
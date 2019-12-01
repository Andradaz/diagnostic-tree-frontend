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
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from  '@material-ui/icons/Mail'
import ListIcon from '@material-ui/icons/List'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles({
    list: {
      width: 250,
    }
  });

function SwipeableTemporaryDrawer(){
    const classes = useStyles();

    const [state, setState] = React.useState({
        left: false,
        right: false,
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
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      );
    
    return(
      <Paper square elevation={1}>
        <Grid container spacing={0} >
          <Grid item container xs = {4} justify='center'>
              <IconButton  onClick={toggleDrawer('left', true)}>
                <ListIcon color = 'primary'/>
              </IconButton>
          </Grid>
          <Grid item container xs = {4} justify='center'>
              <IconButton>
                <HomeIcon color = 'primary'/>
              </IconButton>
          </Grid>
          <Grid item container xs = {4} justify='center'>
              <IconButton>
                <AccountCircleIcon color = 'primary'/>
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
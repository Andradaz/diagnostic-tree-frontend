import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Link as RouterLink } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const Link1 = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    buttonRipple: {
        color: '#ffffff'
    },
    drawer: {
      width: 210,
      flexShrink: 0,
    },
    drawerPaper: {
      width: 210,
      height: "100%",
      backgroundColor: "#edfbff"
    },
    drawerContainer: {
      overflow: 'auto',
    },
  }));


function Sidemenu(props) {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(0);
  
    const handleListItemClick = (event, index, link) => {
      setSelectedIndex(index)
      props.diagramTrackingSetter(link)
    };
  
    return (
      <div className={classes.root}>
        <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
        <List component="nav">
            {props.list.map((obj, index) => {
              if(obj.published === true){
                return (
                  <ListItem button  
                  key={obj._id} 
                  selected = {selectedIndex === index} 
                  onClick={event => handleListItemClick(event, index, obj.idgen)}
                  component={Link1} to={'/diagnostic/'+ obj.idgen}
                  >
                  <ListItemText primary={<Typography type="body2" style={{ color: '#00536b' }}>{obj.name}</Typography>} />
                  </ListItem>
                )
              }
              return(null)
            }
            )}
        </List>
        </div>
        </Drawer>
      </div>
    );
  }

export default Sidemenu
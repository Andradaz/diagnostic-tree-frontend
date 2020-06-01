import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { Link as RouterLink } from 'react-router-dom'
const Link1 = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
    },
    buttonRipple: {
        color: '#ffffff'
    }
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
        <List component="nav">
            {props.list.map((obj, index) => {
              if(obj.published === true){
                return (
                  <ListItem button  
                  key={obj._id} 
                  selected = {selectedIndex === index} 
                  onClick={event => handleListItemClick(event, index, obj.idgen)}
                  component={Link1} to={'/diagnostic/'+ obj.idgen}
                  //TouchRippleProps={{classes: {root: classes.buttonRipple}}}
                  >
                  <ListItemText primary={obj.name} />
                  </ListItem>
                )
              }
              return(null)
            }
            )}
        </List>
      </div>
    );
  }

export default Sidemenu
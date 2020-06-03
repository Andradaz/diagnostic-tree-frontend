import React, { useEffect } from 'react'
// import Paper from '@material-ui/core/Paper'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
//import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
// import Tabs from '@material-ui/core/Tabs'
// import Tab from '@material-ui/core/Tab'
//import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import GetVariableList from '../../services/diagnostic/getVariableList'
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import GetName from '../../services/diagnostic/getName'
import GetDescription from '../../services/diagnostic/getDescription'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#282b2b"
  },
  button: {
    textTransform: "none"
  },
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 300,
    }
  },
  Card: {
    minWidth: 275,
  },
  title: {
    fontSize: 14
  },
}));

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <Typography
//       component="div"
//       role="tabpanel"
//       hidden={value !== index}
//       id={`wrapped-tabpanel-${index}`}
//       aria-labelledby={`wrapped-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box p={3}>{children}</Box>}
//     </Typography>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `wrapped-tab-${index}`,
//     'aria-controls': `wrapped-tabpanel-${index}`,
//   };
// }

function View(props) {
  const classes = useStyles();

  const [variableList, setVariableList] = React.useState([])
  const [description, setDescription] = React.useState("")
  const [name, setName] = React.useState("")

  useEffect(() => {
    async function fetchData() {
      let data = {
        "idgen": props.diagramId
      }

      setVariableList([])
      let list = await GetVariableList(data)
      setVariableList(list.data)
      
      setName("")
      let currentName = await GetName(data)
      setName(currentName.data.name)
      
      setDescription("")
      let currentDescription = await GetDescription(data)
      setDescription(currentDescription.data.description)
    }
    fetchData();

    // eslint-disable-next-line
  }, [props.diagramId])

  return (
    <Grid container>
      <Grid item xs={12}>
      <Box p={1}>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Diagrama de diagnostic
        </Typography>
            <Typography variant="h5" component="h2">
              {name}
        </Typography>
            <Typography variant="body2" component="p" style={{whiteSpace: 'pre-line'}}>
              {description}
            </Typography>
          </CardContent>
        </Card>
        </Box>
      </Grid>
      <Grid item container xs={12}>
        <Grid item xs={12}>
          <Box p={1}>
            <form className={classes.form} noValidate autoComplete="off">
              {variableList.map((obj, index) => (
                <TextField
                  required={obj.req}
                  label={obj.name}
                  id={index.toString()}
                  defaultValue={obj.text}
                  variant="outlined"
                  margin="dense"
                  color="secondary"
                  key={index}
                  name={obj.text}
                  type="number"
                  onClick={(e) => { props.inputsTrackingSetter(e) }}
                  onBlur={(e) => { props.inputsTrackingSetter(e) }}
                  size="small"
                />
              ))}

            </form>
          </Box>
        </Grid>
      </Grid>


    </Grid>
  );
}

export default View
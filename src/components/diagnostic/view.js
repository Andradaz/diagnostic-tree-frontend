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

function AdminPanel(props) {
  const classes = useStyles();
  //const [value, setValue] = React.useState('traseu');
  const [variableList, setVariableList] = React.useState([])
  const [inputs, setInputs] = React.useState({})
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  useEffect(() => {
    async function fetchData() {
      let data = {
        "idgen": props.diagramId
      }
      let list = await GetVariableList(data)
      setVariableList(list.data)
      console.log(variableList)
    }
    fetchData();
    // eslint-disable-next-line
  }, [props.diagramId])

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.id]: e.target.value });
    console.log(inputs)
  }

  return (
    <Grid container>
      <Grid item container xs={12}>
        <Grid item xs={12}>
          <Box pt={1}>
            <form className={classes.form} noValidate autoComplete="off">
              {variableList.map((obj, index) => (
                <TextField
                  label={obj}
                  id={index.toString()}
                  defaultValue={obj.text}
                  variant="outlined"
                  margin="dense"
                  color="secondary"
                  key={index}
                  name={obj.text}
                  type="number"
                  onClick={(e) => {handleChange(e)}}
                />
              ))}

            </form>
          </Box>
        </Grid>
        {/* <Grid item xs={6}>
          <Paper square>
            <Tabs
              value={value}
              indicatorColor="secondary"
              textColor="secondary"
              onChange={handleChange}
              aria-label="disabled tabs example"
              centered
            >
              <Tab value='traseu' label="Traseu principal" {...a11yProps('vizualizeaza')} />
              <Tab value='complet' label="Diagrama" {...a11yProps('editeaza')} />
            </Tabs>
          </Paper>
        </Grid> */}
      </Grid>
      {/* <Grid item xs={12}>
        <TabPanel value={value} index='traseu'>
          Diagrama sub forma de traseu
        </TabPanel>
        <TabPanel value={value} index='complet'>
          Diagrama completa
        </TabPanel>
      </Grid> */}
      <Grid item xs={12}>
        Diagrama
      </Grid>

    </Grid>
  );
}

export default AdminPanel
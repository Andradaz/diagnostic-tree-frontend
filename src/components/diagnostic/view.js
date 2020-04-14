import React from 'react'
import Paper from '@material-ui/core/Paper'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'

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
      width: 200,
    }
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

function AdminPanel() {
  const classes = useStyles();
  const [value, setValue] = React.useState('traseu');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container>
      <Grid item container xs={12}>
        <Grid item xs={12}>
          <Box pt={1}>
            <form className={classes.form} noValidate autoComplete="off">
              {[{ text: 'HbA1C', id: '1' }, { text: 'HbA1C', id: '2' }, { text: 'HbA1C', id: '3' }, { text: 'HbA1C', id: '4' },
              { text: 'HbA1C', id: '5' }, { text: 'HbA1C', id: '6' }].map((obj, index) => (
                <TextField
                  label={obj.text}
                  id={obj.id}
                  defaultValue={obj.text}
                  variant="outlined"
                  margin="dense"
                  color="secondary"
                  key={obj.id}
                />
              ))}

            </form>
          </Box>
        </Grid>
        <Grid item xs={6}>
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
        </Grid>

      </Grid>
      <Grid item xs={12}>
        <TabPanel value={value} index='traseu'>
          Diagrama sub forma de traseu
        </TabPanel>
        <TabPanel value={value} index='complet'>
          Diagrama completa
        </TabPanel>
      </Grid>

    </Grid>
  );
}

export default AdminPanel
import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import GetVariableList from '../../services/diagnostic/getVariableList'
import Typography from "@material-ui/core/Typography"
import GetName from '../../services/diagnostic/getName'
import GetDescription from '../../services/diagnostic/getDescription'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

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
          {/* <Card className={classes.card}>
          <CardContent> */}
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Grid container>
                <Grid item xs={12}>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    Diagrama de diagnostic
              </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5" component="h2">
                    {name}
                  </Typography>
                </Grid>

              </Grid>

            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography variant="body2" component="p" style={{ whiteSpace: 'pre-line' }}>
                {description}
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          {/* </CardContent>
        </Card> */}
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


    </Grid >
  );
}

export default View
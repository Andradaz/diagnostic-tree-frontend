import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import { makeStyles } from '@material-ui/core/styles'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    root: {
        '& > *': {
          width: 100,
        }
    }
}));

function Rules() {
    const classes = useStyles()
    const [age, setAge] = React.useState('')
    const handleChange = event => {
        setAge(event.target.value);
    };
    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant='subtitle1'>
                    <Box pl={3} pt={3}>
                        Reguli
                    </Box>
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Box pl={3}>
                    <Typography variant='body2'>
                        Prima regulă*
                    </Typography>
                </Box>    
            </Grid>
            <Grid item xs={12}>
                <Box pl={3}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="variabila" color='secondary'>Variabila</InputLabel>
                        <Select
                            color='secondary'
                            labelId="variabila"
                            id="variabila1"
                            value={age}
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Glicemie</MenuItem>
                            <MenuItem value={20}>Hb</MenuItem>
                            <MenuItem value={30}>Factor de riscaaaaaa</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box pl={3}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="operator" color='secondary'>Operator</InputLabel>
                        <Select
                            color='secondary'
                            labelId="operator"
                            id="operator1"
                            value={age}
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>mai mare</MenuItem>
                            <MenuItem value={20}>mai mic</MenuItem>
                            <MenuItem value={30}>egal</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box pl={4} pb={2}>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField id="parametru" label="Parametru" color='secondary'/>
                    </form>
                </Box>
            </Grid>
        </Grid>
    );
}

export default Rules
import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Alert from '@material-ui/lab/Alert'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'

function DisplayAlert(props) {
    if (props.error) {
        return (
            <Alert severity="error">Variabilele trebuie să fie diferite!</Alert>
        );
    }
    return null;
}

function AddVariable(props) {
    const [open, setOpen] = React.useState(false)
    const [newVar, setNewVar] = React.useState(' ')
    const [error, setError] = React.useState(0)
    const [required, setRequired] = React.useState(false)
    const handleClickOpen = () => {
        setRequired(false)
        setOpen(true)
    };

    const handleClose = () => {
        setRequired(false)
        setOpen(false)
    };

    const handleSave = () => {
        if (props.currentList.includes(newVar)) {
            setError(1)
        } else {
            setError(0)
            let variable = {
                name: newVar,
                req: required
            }
            props.addVariable(variable)
            setNewVar(' ')
            setOpen(false)
        }

    }

    const validateVariable = () => {
        if (props.currentList.includes(newVar)) {
            setError(1)
        } else {
            setError(0)
        }
    }

    const handleRequired = (event) => {
        setRequired(event.target.checked)
    }

    const handleChange = (event) => {
        setNewVar(event.target.value)
        if (props.currentList.includes(newVar)) {
            setError(1)
        } else {
            setError(0)
        }
    }

    return (
        <Box pt={3}>
            <Button
                variant='outlined'
                size="small"
                color='secondary'
                onClick={handleClickOpen}>
                +
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" disabletypography='true'>
                    <Typography component='div'>
                        <Box fontWeight="fontWeightRegular" fontSize={20}>
                            Adaugă o variabilă
                        </Box>
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Creează variabile pentru a putea forma reguli cu ajutorul lor.
                    </DialogContentText>
                    <form autoComplete='off'>
                        <Grid container>
                            <Grid item xs={4}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="variabila"
                                    label="Nume variabilă"
                                    color='secondary'
                                    onChange={handleChange}
                                    onBlur={validateVariable}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox checked={required} onChange={handleRequired} name="required" />}
                                    label="Necesară pentru calcularea diagnosticului"
                                    size="small"
                                />
                            </Grid>
                            
                        </Grid>

                    </form>
                    <DisplayAlert error={error} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="secondary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default AddVariable
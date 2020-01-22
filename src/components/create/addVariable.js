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
function DisplayAlert(props){
    if(props.error){
        return(
            <Alert severity="error">Variabilele trebuie să fie diferite!</Alert>
        );
    }
    return null;
}

function AddVariable(props) {
    const [open, setOpen] = React.useState(false)
    const [newVar, setNewVar] = React.useState(' ')
    const [error, setError] = React.useState(0)
    const handleClickOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
    };

    const handleSave = () => {
        if(props.currentList.includes(newVar)){
            setError(1)
        }else{
            setError(0)
            props.addVariable(newVar)
            setNewVar(' ')
            setOpen(false)
        }
        
    }

    const validateVariable = () => {
        if(props.currentList.includes(newVar)){
            setError(1)
        }else{
            setError(0)
        }
    }

    const handleChange = (event) => {
        setNewVar(event.target.value)
        if(props.currentList.includes(newVar)){
            setError(1)
        }else{
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
                        <TextField
                            autoFocus
                            margin="dense"
                            id="variabila"
                            label="Nume variabilă"
                            color='secondary'
                            onChange={handleChange}
                            onBlur={validateVariable}
                        />
                    </form>
                    <DisplayAlert error={error}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" disabletypography='true'>
                        <Typography>
                            Renunță
                        </Typography>
                    </Button>
                    <Button variant="contained" onClick={handleSave} color="primary" disabletypography='true'>
                        <Typography>
                            Adaugă
                        </Typography>
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default AddVariable
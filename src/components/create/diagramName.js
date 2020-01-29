import React from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    textField: {
        width: 550,
        margin: 10,
    },
    resize: {
        fontSize: 25,
        color: '#41d0b3'
    },
    labelRoot: {
        fontSize: 25,
    },
    labelFocused: {},
}));

const saveName = ()=>{
    //apeleaza ruta din backend care cauta o diagrama
    //cu id-ul respectiv si ii modifica proprietatea "name"
}
function DiagramName(props) {
    const classes = useStyles()
    console.log(props.diagramId)
    return (
        <form autoComplete='off'>
            <TextField
                id='standard-secondary'
                variant='outlined'
                InputProps={{
                    classes: {
                        input: classes.resize,
                    },
                }} className={classes.textField}
                InputLabelProps={{
                    classes: {
                        root: classes.labelRoot,
                        focused: classes.labelFocused
                    }
                }}
                label='Numele diagramei'
                color='secondary'
                onBlur={saveName}/>
        </form>
    )
}

export default DiagramName
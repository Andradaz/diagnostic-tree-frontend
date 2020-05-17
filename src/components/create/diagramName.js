import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import SetName from '../../services/diagnostic/setName'

const useStyles = makeStyles(theme => ({
    textField: {
        width: 550,
        margin: 10,
    },
    resize: {
        fontSize: 20,
        color: '#78e1ff'
    },
    labelRoot: {
        fontSize: 17,
    },
    labelFocused: {
        fontSize: 17
    },
}));

const saveName = async (name,idgen) => {
        let data = {
            "name": name,
            "idgen": idgen
        }
        await SetName(data)
    }

function DiagramName(props) {
    const classes = useStyles()
    const [name, setName] = useState()
    
    const handleChange = (event) => {
        setName(event.target.value)
    }

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
                label='Denumire'
                color='secondary'
                onChange={handleChange}
                onBlur={function(){ return saveName(name,props.diagramId)}} />
        </form>
    )
}

export default DiagramName
import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import SetName from '../../services/setName'
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

const saveName = async (name,idgen) => {
        let data = {
            "name": name,
            "idgen": idgen
        }
        var response = await SetName(data)
        console.log(response)
    }

function DiagramName(props) {
    const classes = useStyles()
    const [name, setName] = useState()
    console.log(props.diagramId)
    
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
                label='Numele diagramei'
                color='secondary'
                onChange={handleChange}
                onBlur={function(){ return saveName(name,props.diagramId)}} />
        </form>
    )
}

export default DiagramName
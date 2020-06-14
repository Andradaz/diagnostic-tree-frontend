import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import SetName from '../../services/diagnostic/setName'
import GetName from '../../services/diagnostic/getName'

const useStyles = makeStyles(theme => ({
    textField: {
        width: 550,
        margin: 10,
    },
    resize: {
        fontSize: 20,
        // color: '#78e1ff'
    },
    labelRoot: {
        fontSize: 17,
    },
    labelFocused: {
        fontSize: 17
    },
}));



function DiagramName(props) {
    const classes = useStyles()
    const [name, setName] = useState()

    useEffect(() => {
        async function fetchData() {
            if (props.edit === "yes") {
                let data = {
                    "idgen": props.diagramId,
                }
                let result = await GetName(data)
                setName(result.data.name)
                console.log(result.data.name)
            }
        }
        fetchData()
    }, [props])

    const handleChange = (event) => {
        setName(event.target.value)
    }

    const saveName = async (name, idgen) => {
        let data = {
            "name": name,
            "idgen": idgen
        }
        await SetName(data)
    }

    return (
        <form autoComplete='off'>
            <TextField
                value={name || ''}
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
                onBlur={function () { return saveName(name, props.diagramId) }} />
        </form>
    )
}

export default DiagramName
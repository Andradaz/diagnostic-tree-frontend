import React, { useState,useEffect} from 'react'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import SetDescription from '../../services/diagnostic/setDescription'
import Tooltip from '@material-ui/core/Tooltip'
import GetDescription from '../../services/diagnostic/getDescription'

const useStyles = makeStyles(theme => ({
    textField: {
        width: 360,
        margin: 20,
    },
    customWidth: {
        maxWidth: 500,
    },
}));

function DiagramDescription(props) {
    const classes = useStyles()
    const [description, setDescription] = useState("")

    useEffect(() => {
        async function fetchData(){
            if(props.edit === "yes"){
                let data = {
                    "idgen": props.diagramId,
                }
                let des = await GetDescription(data)
                setDescription(des.data.description)
            }
        }
        fetchData()
    },[props])

    const handleChange = (event) => {
        setDescription(event.target.value)
    }

    const saveDescription = async (name, idgen) => {
        let data = {
            "description": description,
            "idgen": idgen
        }
        await SetDescription(data)
    }
    
    const tooltipText = `Adaugă o descriere relevantă diagramei de diagnostic pe care o creezi.`
    return (
        <form autoComplete='off'>
            <Tooltip title={tooltipText} classes={{ tooltip: classes.customWidth }}>
            <TextField
                value={description || ''}
                id="outlined-textarea"
                label="Descriere"
                multiline
                rowsMax={4}
                size="small"
                variant="outlined"
                color="secondary"
                className={classes.textField}
                onChange={handleChange}
                onBlur={function () { return saveDescription(description, props.diagramId) }}
            />
            </Tooltip>
        </form>
    )
}

export default DiagramDescription
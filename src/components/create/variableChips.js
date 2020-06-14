import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles'
import getVariableList from '../../services/diagnostic/getVariableList'

const useStyles = makeStyles(theme => ({
    spacing: {
        '& > *': {
            margin: theme.spacing(0.5),
        }
    }
}));



function VariableChips(props) {
    const classes = useStyles()
    const [prevVal, setPrevVal] = useState()
    const [dummy, setDummy] = useState(0)
    const [chips, setChips] = useState([])

    useEffect(() => {
        async function fetchData() {
            if((props.import === "yes" && props.imported > 0) || props.edit === "yes"){
                let data = {
                    "idgen": props.idgen
                }

                let result = await getVariableList(data)
                console.log("Result din variable list")
                console.log(result)
                let importedChips = []
                result.data.forEach((obj)=>{
                    importedChips.push(obj.name)
                })
                console.log("imported chips")
                console.log(importedChips)
                setChips(importedChips)
            }
        }
        fetchData();
    }, [props])

    if (prevVal !== props.val) {
        setPrevVal(props.val)
        var list
        list = chips
        list.push(props.val)
        setChips(list)
    }

    const handleDelete = (index) => {
        var list
        list = chips
        list.splice(index, 1)
        setChips(list)
        props.delete(index)
        if (dummy === 1) setDummy(0)
        else setDummy(1)

    }

    return (
        <Box className={classes.spacing} p={3}>
            {chips.map((obj, index) => (
                <Chip label={obj}
                    color='primary'
                    key={index}
                    onDelete={function () { return handleDelete(index) }} />
            ))}
        </Box>
    )
}

export default VariableChips
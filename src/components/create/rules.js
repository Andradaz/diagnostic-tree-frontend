import React, { useState } from 'react'
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

function Rules(props) {
    const classes = useStyles()
    const [selectItem, setSelectItem] = React.useState('')
    const [prevVal, setPrevVal] = useState()
    const [selectItems, setSelectItems] = useState([])
    const [toDelete, setToDelete] = React.useState(-1)
    const [operator, setOperator] = React.useState(10)

    if (prevVal !== props.val) {
        setPrevVal(props.val)
        let list
        list = selectItems
        list.push(props.val)
        setSelectItems(list)
    }
    console.log("selectItems:" + selectItems)
        if ((props.delete !== toDelete) && (props.delete !== -2)) {
            setToDelete(props.delete)
            let list
            list = selectItems
            list.splice(props.delete, 1)
            setSelectItems(list)
        }else{
            if (props.delete === -2 && toDelete !== -2) {
                let list
                list = selectItems
                list.splice(toDelete, 1)
                setSelectItems(list)
                setToDelete(-2)
            }
        }
    

    const handleChangeOp = event => {
        setOperator(event.target.value)
    }
    
    const handleChange = event => {
        setSelectItem(event.target.value)
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
                            value={selectItem}
                            onChange={handleChange}
                        >
                            {selectItems.map((obj, index) =>
                                <MenuItem value={index} key={index}>{obj}</MenuItem>
                            )}
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
                            value={operator}
                            onChange={handleChangeOp}
                        >
                            <MenuItem value={10}>Mai mare</MenuItem>
                            <MenuItem value={20}>Mai mic</MenuItem>
                            <MenuItem value={30}>Egal</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box pl={4} pb={2}>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField id="parametru" label="Parametru" color='secondary' />
                    </form>
                </Box>
            </Grid>
        </Grid>
    );
}

export default Rules
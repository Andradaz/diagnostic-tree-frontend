import React, { useState, useEffect} from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import { makeStyles } from '@material-ui/core/styles'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import SetRuleVariable from '../../services/setRuleVariable'
import SetRuleOperator from '../../services/setRuleOperator'
import SetRuleParameter from '../../services/setRuleParameter'
import GetRuleVariableForNode from '../../services/getRuleVariableForNode'
import GetRuleOperatorForNode from '../../services/getRuleOperatorForNode'
import GetRuleParameterForNode from '../../services/getRuleParameterForNode'

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
    const [prevCurrentNode, setPrevCurrentNode] = useState()
    const [selectItems, setSelectItems] = useState([])
    const [toDelete, setToDelete] = React.useState(-1)
    const [operator, setOperator] = React.useState(10)
    const [param, setParam] = React.useState()

    useEffect(() => {
        //facem fetchData doar daca avem selectat un nod
        //get param for props.currentNode
        //get selectedItem for porps.currentNode
        //get variable for props.currentNode
        async function fetchData() {
            if (props.currentNode !== 0) {
                let data = {
                    "idgen": props.diagramId,
                    "idnode": props.currentNode
                }
                let variable = await GetRuleVariableForNode(data)
                let parameter = await GetRuleParameterForNode(data)
                let operator = await GetRuleOperatorForNode(data)
                if(JSON.stringify(parameter.data) !== "not defined"){
                     setParam(JSON.stringify(parameter.data))
                }
               
                setSelectItem(JSON.stringify(variable.data))
                setOperator(JSON.stringify(operator.data))
                console.log("Variable:" + JSON.stringify(variable))
                console.log("Parameter:" + JSON.stringify(parameter))
                console.log("Operator:" + JSON.stringify(operator))
            }
            console.log("Sunt in fetchdata")
        }
        fetchData();
    }, [props.currentNode])

    

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
    } else {
        if (props.delete === -2 && toDelete !== -2) {
            let list
            list = selectItems
            list.splice(toDelete, 1)
            setSelectItems(list)
            setToDelete(-2)
        }
    }


    const handleChangeOp = async (event) => {
        let data = {
            "operator": event.target.value,
            "idgen": props.diagramId,
            "idnode": props.currentNode
        }
        let response = await SetRuleOperator(data)
        console.log(response)
        setOperator(event.target.value)
    }

    const handleChange = async (event) => {
        let data = {
            "variable": event.target.value,
            "idgen": props.diagramId,
            "idnode": props.currentNode
        }
        let response = await SetRuleVariable(data)
        console.log(response)
        setSelectItem(event.target.value)
    };

    const handleChangeParam = event => {
        setParam(event.target.value)
    }

    const paramOnBlur = async (event) => {
        let data = {
            "parameter": event.target.value,
            "idgen": props.diagramId,
            "idnode": props.currentNode
        }
        let response = await SetRuleParameter(data)
        console.log(response)
    }

    if (prevCurrentNode !== props.currentNode) {
        setPrevCurrentNode(props.currentNode)
        console.log("props.currentNode in Rules: " + props.currentNode)
    }

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
                        <TextField
                            id="parametru"
                            value={param || ''}
                            label="Parametru"
                            color='secondary'
                            onChange={handleChangeParam}
                            onBlur={paramOnBlur} />
                    </form>
                </Box>
            </Grid>
        </Grid>
    );
}

export default Rules
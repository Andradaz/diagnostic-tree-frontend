import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import { makeStyles } from '@material-ui/core/styles'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import SetRuleVariable from '../../services/diagnostic/setRuleVariable'
import SetRuleOperator from '../../services/diagnostic/setRuleOperator'
import SetRuleParameter from '../../services/diagnostic/setRuleParameter'
import SetRuleError from '../../services/diagnostic/setRuleError'
import SetRuleSolution from '../../services/diagnostic/setRuleSolution'
import GetRuleVariableForNode from '../../services/diagnostic/getRuleVariableForNode'
import GetRuleOperatorForNode from '../../services/diagnostic/getRuleOperatorForNode'
import GetRuleParameterForNode from '../../services/diagnostic/getRuleParameterForNode'
import GetRuleErrorForNode from '../../services/diagnostic/getRuleErrorForNode'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import GetRuleSolutionForNode from '../../services/diagnostic/getRuleSolutionForNode'

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
    const [error, setError] = React.useState(false)
    const [disableError, setDisableError] = React.useState(false)
    const [solution, setSolution] = React.useState(false)
    const [disableSolution, setDisableSolution] = React.useState(false)
    const [disableRules, setDisableRules] = React.useState(false)

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
                let err = await GetRuleErrorForNode(data)
                let sol = await GetRuleSolutionForNode(data)

                setDisableRules(false)
                setDisableSolution(false)
                setDisableError(false)
                if (JSON.stringify(parameter.data) !== "not defined") {
                    setParam(JSON.stringify(parameter.data))
                }
                if (JSON.stringify(err.data) !== "not defined" && err.data != null) {
                    //True sau False in functie de ce gaseste in bd
                    setError(err.data)
                } else {
                    //Fals pentru ca a gasit not defined sau null
                    setError(false)
                }
                if (JSON.stringify(sol.data) !== "not defined" && sol.data != null) {
                    setSolution(sol.data)
                } else {
                    setSolution(false)
                }

                if(sol.data === true){
                    setDisableError(true)
                    setDisableRules(true)
                }
                if(err.data === true){
                    setDisableRules(true)
                    setDisableSolution(true)
                }
                setSelectItem(JSON.stringify(variable.data))
                setOperator(JSON.stringify(operator.data))

            }
        }
        fetchData();
        // eslint-disable-next-line
    }, [props.currentNode])



    if (prevVal !== props.val) {
        setPrevVal(props.val)
        let list
        list = selectItems
        list.push(props.val)
        setSelectItems(list)
    }

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
        await SetRuleOperator(data)
        setOperator(event.target.value)
    }

    const handleChange = async (event) => {
        let data = {
            "variable": event.target.value,
            "idgen": props.diagramId,
            "idnode": props.currentNode
        }
        await SetRuleVariable(data)
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
        await SetRuleParameter(data)
    }

    const handleChangeError = async (event) => {
            let eventError = event.target.checked
            let data = {
                "error": eventError,
                "idgen": props.diagramId,
                "idnode": props.currentNode
            }
            await SetRuleError(data)
            setError(eventError);
            if(eventError === true){
                setDisableSolution(true) 
                setDisableRules(true)
            }else{
                setDisableSolution(false)
                setDisableRules(false)  
            }
    };

    const handleChangeSolution = async (event) => {
        let eventSolution = event.target.checked
            let data = {
                "solution": eventSolution,
                "idgen": props.diagramId,
                "idnode": props.currentNode
            }
            await SetRuleSolution(data)
            setSolution(eventSolution);
            if(eventSolution === true){
                setDisableError(true)
                setDisableRules(true) 
            }else{
                setDisableError(false)
                setDisableRules(false) 
            }
    };

    if (prevCurrentNode !== props.currentNode) {
        setPrevCurrentNode(props.currentNode)
    }

    if (props.currentNode !== 0) {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant='subtitle1'>
                        <Box pl={3} pt={3}>
                            Proprietățile nodului selectat
                        </Box>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box pl={3}>
                        <Typography variant='body2'>
                            Regula*
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
                                disabled ={disableRules}
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
                                disabled ={disableRules}
                            >
                                <MenuItem value={10}>Mai mare</MenuItem>
                                <MenuItem value={20}>Mai mic sau egal</MenuItem>
                                <MenuItem value={30}>Egal</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box pl={4} pb={2}>
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField
                                disabled ={disableRules}
                                id="parametru"
                                value={param || ''}
                                label="Parametru"
                                color='secondary'
                                onChange={handleChangeParam}
                                onBlur={paramOnBlur} />
                        </form>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box pl={3}>
                        <Typography variant='body2'>
                            Dacă nodul este unul terminal, selectează tipul său <br></br>(Eroare sau Soluție)
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box pl={3}>
                        <FormControlLabel
                            control={<Checkbox disabled={disableError} checked={error} onChange={handleChangeError} />}
                            label="Nod eroare"
                        />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box pl={3}>
                        <FormControlLabel
                            control={<Checkbox disabled={disableSolution} checked={solution} onChange={handleChangeSolution} />}
                            label="Nod solutie"
                        />
                    </Box>
                </Grid>

            </Grid>
        );
    } else {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Box p={9}>
                        Selectează un nod pentru a seta o regulă.
                    </Box>

                </Grid>
            </Grid>
        )
    }

}

export default Rules
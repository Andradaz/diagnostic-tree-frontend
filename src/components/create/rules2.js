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
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import SetRule from '../../services/diagnostic/setRule'
import GetRulesForNode from '../../services/diagnostic/getStringNodeRules'
import DeleteRule from '../../services/diagnostic/deleteRule'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormLabel from '@material-ui/core/FormLabel'
import GetNodeType from '../../services/diagnostic/getNodeType'
import SetNodeType from '../../services/diagnostic/setNodeType'

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    root: {
        '& > *': {
            width: 200,
        }
    },
    list: {
        backgroundColor: theme.palette.background.paper,
    },
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
    const [solution, setSolution] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [description, setDescription] = React.useState()
    const [rulesList, setRulesList] = React.useState([])
    const [type, setType] = React.useState('mid')
    const [disable, setDisable] = React.useState(false)
    useEffect(() => {
        //facem fetchData doar daca avem selectat un nod
        //getRulesList
        async function fetchData() {
            if (props.currentNode !== 0) {
                let data = {
                    "idgen": props.diagramId,
                    "idnode": props.currentNode
                }
                console.log("IDNODE")
                console.log(props.currentNode)
                setRulesList([])

                let rulesList = await GetRulesForNode(data)
                setRulesList(rulesList.data)

                let nodeType = await GetNodeType(data)
                setType(nodeType.data.nodeType)
                console.log("NODE TYPE")
                console.log(nodeType.data)
                console.log(nodeType)

                setDisable(false)
                if(nodeType === "solution" || nodeType === "error"){
                    setDisable = true
                }
            }
        }
        fetchData();
        // eslint-disable-next-line
    }, [props.currentNode])


    const handleRadioButtons = async (event) => {
        let type = event.target.value
        setType(type);
        let data = {
            "idgen": props.diagramId,
            "idnode": props.currentNode,
            "type": type
        }
        await SetNodeType(data)
        if(type === "solution" || type === "error"){
            setDisable(true)
        }
        
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteRule = async (index) => {
        console.log("EVENT")
        console.log(index)
        let data = {
            "idgen": props.diagramId,
            "idnode": props.currentNode,
            "index": index
        }

        let result = await DeleteRule(data)
        let data2 = {
            "idgen": props.diagramId,
            "idnode": props.currentNode,
        }
        let newList = await GetRulesForNode(data2)
        console.log(newList)
        setRulesList(newList.data)
    }

    const handleCloseAndSave = async () => {
        console.log("param")
        console.log(param)
        console.log("operator")
        console.log(operator)
        console.log("variable")
        console.log(selectItem)
        let data = {
            "idgen": props.diagramId,
            "idnode": props.currentNode,
            "rule": {
                "variable": selectItem,
                "operator": operator,
                "parameter": param,
                "description": description
            }
        }
        let result = await SetRule(data)
        setDescription(" ")
        setOperator(10)
        setParam(" ")
        setSelectItem(" ")
        let data2 = {
            "idgen": props.diagramId,
            "idnode": props.currentNode,
        }
        let newList = await GetRulesForNode(data2)
        console.log(newList)
        setRulesList(newList.data)
        setOpen(false);


    };

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

    const handleChangeDescription = (event) => {
        setDescription(event.target.value)
    }

    const handleChangeOp = async (event) => {
        let data = {
            "operator": event.target.value,
            "idgen": props.diagramId,
            "idnode": props.currentNode
        }
        //await SetRuleOperator(data)
        setOperator(event.target.value)
    }

    const handleChange = async (event) => {
        let data = {
            "variable": event.target.value,
            "idgen": props.diagramId,
            "idnode": props.currentNode
        }
        //await SetRuleVariable(data)
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
        //await SetRuleParameter(data)
    }

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
                <Grid item xs={8}>
                    <Box pl={3}>
                        <Typography variant='body2'>
                            Click pe adaugă pentru a crea o nouă regulă*
                        </Typography>
                    </Box>
                </Grid>
                <Grid item container xs={4} justify="center">
                    <Grid item>
                        <Button variant="outlined" color="primary" onClick={handleClickOpen} disabled={disable}>
                            Adaugă
                            </Button>
                    </Grid>
                </Grid>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Creeaza o regula</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Pentru a crea o regulă, selectează variabila, operatorul și parametrul.
                        </DialogContentText>
                        <Grid container>
                            <Grid item xs={6}>
                                {/* <Box pl={3}> */}
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
                                {/* </Box> */}
                            </Grid>
                            <Grid item xs={6}>
                                <Box pl={1} pb={2}>
                                    <form className={classes.root} noValidate autoComplete="off">
                                        <TextField
                                            id="description"
                                            value={description || ''}
                                            label="Denumire"
                                            color='secondary'
                                            onChange={handleChangeDescription}
                                        />
                                    </form>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                {/* <Box pl={3}> */}
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
                                        <MenuItem value={20}>Mai mic sau egal</MenuItem>
                                        <MenuItem value={30}>Egal</MenuItem>
                                    </Select>
                                </FormControl>
                                {/* </Box> */}
                            </Grid>
                            <Grid item xs={12}>
                                <Box pl={1} pb={2}>
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
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleCloseAndSave} color="primary">
                            Adaugă
                        </Button>
                    </DialogActions>
                </Dialog>
                <Grid item xs={12}>
                    <Box pl={3}>
                        <div className={classes.list}>
                            <List dense={true}>
                                {rulesList.map((obj, index) =>
                                    <ListItem key={index}>
                                        <ListItemText
                                            primary={obj}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete" onClick={() => deleteRule(index)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                )
                                }
                            </List>
                        </div>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box pl={3} pt={3}>
                        <Typography variant='body2'>
                            Dacă nodul este unul terminal, selectează tipul său <br></br>(Eroare sau Soluție)
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box pl={3} pt={3}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Tipul nodului</FormLabel>
                            <RadioGroup aria-label="type" name="type" value={type} onChange={handleRadioButtons}>
                                <FormControlLabel value="mid" size = "small" control={<Radio size = "small"/>} label="Intermediar" />
                                <FormControlLabel value="error" size = "small" control={<Radio size = "small"/>} label="Eroare" />
                                <FormControlLabel value="solution" size = "small" control={<Radio size = "small"/>} label="Solutie" />
                            </RadioGroup>
                        </FormControl>
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
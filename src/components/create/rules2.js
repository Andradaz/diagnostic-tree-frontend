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
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import SetRule from '../../services/diagnostic/setRule'
import GetRulesForNode from '../../services/diagnostic/getStringNodeRules'
import DeleteRule from '../../services/diagnostic/deleteRule'
import getVariableList from '../../services/diagnostic/getVariableList'



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
    const [open, setOpen] = React.useState(false)
    const [description, setDescription] = React.useState()
    const [rulesList, setRulesList] = React.useState([])
    useEffect(() => {
        //facem fetchData doar daca avem selectat un nod
        //getRulesList
        async function fetchData() {
            if (props.currentNode !== 0) {
                let data = {
                    "idgen": props.diagramId,
                    "idnode": props.currentNode
                }
                setRulesList([])

                let rulesList = await GetRulesForNode(data)
                setRulesList(rulesList.data)
            }
            if(props.imported > 0 && props.import === "yes"){
                let data = {
                    "idgen": props.diagramId
                }

                let result = await getVariableList(data)
                console.log("Result din rules")
                console.log(result)
                let  variables = []
                result.data.forEach((obj)=>{
                    variables.push(obj.name)
                })
                setSelectItems(variables)
            }
        }
        fetchData();
        // eslint-disable-next-line
    }, [props.currentNode])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteRule = async (index) => {
        let data = {
            "idgen": props.diagramId,
            "idnode": props.currentNode,
            "index": index
        }

        await DeleteRule(data)
        let data2 = {
            "idgen": props.diagramId,
            "idnode": props.currentNode,
        }
        let newList = await GetRulesForNode(data2)
        setRulesList(newList.data)
    }

    const handleCloseAndSave = async () => {
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
        await SetRule(data)
        setDescription(" ")
        setOperator(10)
        setParam(" ")
        setSelectItem(" ")
        let data2 = {
            "idgen": props.diagramId,
            "idnode": props.currentNode,
        }
        let newList = await GetRulesForNode(data2)
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
        setOperator(event.target.value)
    }

    const handleChange = async (event) => {
        setSelectItem(event.target.value)
    };

    const handleChangeParam = event => {
        setParam(event.target.value)
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
                        <Button variant="outlined" size="small" color="secondary" onClick={handleClickOpen}>
                            +
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
                                            type="number"/>
                                    </form>
                                </Box>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={handleCloseAndSave} color="secondary">
                            Add
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
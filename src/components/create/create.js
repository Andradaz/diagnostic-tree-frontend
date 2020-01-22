import React,{ useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import AddVariable from './addVariable'
import DiagramText from './diagramText'
import DiagramName from './diagramName'
import VariableText from './variableText'
import VariableChips from './variableChips'
import Paper from '@material-ui/core/Paper'
import Rules from './rules'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core'

function Create() {
    const [variables,setVariables] = useState([])
    const [val, setVal] = useState()
    const wrapperAddVariable = val => {
        var list = variables
        list.push(val)
        setVariables(list)
        setVal(val)
        console.log("Create.js - variables: " + variables)
    }

    const wrapperDeleteVariable = index => {
        var list = variables
        list.splice(index,1)
        setVariables(list)
        console.log("Create.js - variables - after delete " + variables)
    }
    return (
        <Grid container>
            <Grid item xs={4}>
                <DiagramText />
            </Grid>
            <Grid item container justify='center' xs={8}>
                <DiagramName />
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>

            <Grid item container xs={4}>
                <Paper elevation={3}>
                    <Grid item container xs={12} alignItems='flex-start'>
                        <Grid item xs={5}>
                            <VariableText />
                        </Grid>
                        <Grid item xs={7}>
                            <AddVariable currentList = {variables} addVariable = {wrapperAddVariable}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <VariableChips val={val} delete={wrapperDeleteVariable}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        Aici vine inspectorul de nod
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item container xs={12}>
                        <Rules />
                    </Grid>
                </Paper>
            </Grid>
            <Grid item>
                Aici vine diagrama
            </Grid>
            <Grid container justify='flex-end' spacing={1}>
                <Grid item>
                    <Button variant="contained" disapletypography='true'>
                        <Typography>
                        Salvează
                        </Typography>
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color='primary' disapletypography='true'>
                        <Typography>
                        Publică
                        </Typography>
                    </Button>
                </Grid>

            </Grid>
            
        </Grid>
    );
}

export default Create
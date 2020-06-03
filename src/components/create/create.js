import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import AddVariable from './addVariable'
import DiagramText from './diagramText'
import DiagramName from './diagramName'
import VariableText from './variableText'
import VariableChips from './variableChips'
import Paper from '@material-ui/core/Paper'
import Rules2 from './rules2'
import Diagram from '../diagram/createDiagram'
import { useParams } from 'react-router-dom'
import SetVariable from '../../services/diagnostic/setVariable'
import DeleteVariable from '../../services/diagnostic/deleteVariable'
import DiagramDescription from './diagramDescription'


function Create(props) {
    var { id } = useParams();
    const [variables, setVariables] = useState([])
    const [val, setVal] = useState()
    const [toDelete, setToDelete] = useState(-1)
    const [currentNode, setCurrentNode] = useState(0)

    const wrapperAddVariable = async (val) => {
        var list = variables
        list.push(val.name)
        let data = {
            "variable": val,
            "idgen": id
        }
        await SetVariable(data)
        setVariables(list)
        setVal(val.name)
    }

    const wrapperDeleteVariable = async (index) => {
        var list = variables
        let data = {
            "idgen": id,
            "index": index
        }
        await DeleteVariable(data)
        list.splice(index, 1)
        setVariables(list)
        if (toDelete === index) {
            setToDelete(-2)
        } else {
            setToDelete(index)
        }
    }

    const wrapperSetCurrentNode = val => {
        setCurrentNode(val)
    }

    return (

        <Grid container>
            <Grid item xs={4}>
                <DiagramText />
            </Grid>
            <Grid item container justify='center' xs={8}>
                <DiagramName diagramId={id} />
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>

            <Grid item container xs={4}>
                <Paper elevation={3}>
                    <Grid item container xs={12} alignItems='flex-start'>
                        <Grid item xs={12}>
                            <DiagramDescription diagramId={id} />
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} alignItems='flex-start'>
                        <Grid item xs={5}>
                            <VariableText />
                        </Grid>
                        <Grid item xs={7}>
                            <AddVariable currentList={variables} addVariable={wrapperAddVariable} />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <VariableChips val={val} delete={wrapperDeleteVariable} />
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item container xs={12}>
                        <Rules2 val={val} delete={toDelete} currentNode={currentNode} diagramId={id} />
                    </Grid>
                </Paper>
            </Grid>
            <Grid item>
                <Diagram setCurrentNode={wrapperSetCurrentNode} id={id} />
            </Grid>
        </Grid>
    );
}

export default Create
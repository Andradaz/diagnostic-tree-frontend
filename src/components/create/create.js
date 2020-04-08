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
import Diagram from '../diagram/createDiagram'
//import Diagram from '../diagram/copy'
import {useParams} from 'react-router-dom'
import SetVariable from '../../services/setVariable'
import DeleteVariable from '../../services/deleteVariable'


function Create(props) {
    var {id} = useParams();
    console.log("param unique id: " + id)
    const [variables,setVariables] = useState([])
    const [val, setVal] = useState()
    const [toDelete, setToDelete] = useState(-1)
    const [currentNode, setCurrentNode] = useState(0)
    const wrapperAddVariable = async (val) => {
        var list = variables
        list.push(val)
        let data = {
            "variable": val,
            "idgen": id
        }
        const result =  await SetVariable(data)
        console.log(result)
        setVariables(list)
        setVal(val)
        console.log("Create.js - variables: " + variables)
    }

    const wrapperDeleteVariable = async (index) => {
        var list = variables
        let data = {
            "idgen": id,
            "index": index
        }
        let response = await DeleteVariable(data)
        console.log(response)
        list.splice(index,1)
        setVariables(list)
        if(toDelete === index){
            setToDelete(-2)
        }else{
           setToDelete(index) 
        }
        
        console.log("Create.js - variables - after delete " + variables)
    }

    const wrapperSetCurrentNode = val => {
        setCurrentNode(val)
    }
    console.log("M-a apelat din diagram.js: " + currentNode)
    return (
        
        <Grid container>
            <Grid item xs={4}>
                <DiagramText />
            </Grid>
            <Grid item container justify='center' xs={8}>
                <DiagramName diagramId={id}/>
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
                        <Divider />
                    </Grid>
                    <Grid item container xs={12}>
                        <Rules val={val} delete={toDelete} currentNode={currentNode} diagramId={id}/>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item>
                <Diagram setCurrentNode={wrapperSetCurrentNode} id={id}/>
            </Grid>
        </Grid>
    );
}

export default Create
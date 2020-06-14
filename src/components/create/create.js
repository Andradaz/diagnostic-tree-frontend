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
import { DropzoneDialog } from 'material-ui-dropzone'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import computeWekaOutput from '../../services/diagnostic/computeWekaOutput'


function ImportButton(props) {
    const [open, setOpen] = React.useState(false);

    if (props.import === "no") {
        return (
            <div></div>
        )
    } else {
        return (
            <div>
                <Box pl={3}>
                    <Button disapletypography='true' variant="outlined" color="secondary" onClick={() => setOpen(true)}>
                        <Typography>
                            Importă diagrama
                    </Typography>
                    </Button>
                </Box>
                <DropzoneDialog
                    acceptedFiles={['text/plain']}
                    cancelButtonText={"cancel"}
                    submitButtonText={"submit"}
                    maxFileSize={5000000}
                    open={open}
                    onClose={() => setOpen(false)}
                    onSave={(files) => {
                        const reader = new FileReader()
                        reader.readAsText(files[0])
                        reader.onload = async () => {
                        const str = reader.result
                        console.log(str)
                        let data = {
                            wekaOutput: str,
                            idgen: props.idgen
                        }
                        let result = await computeWekaOutput(data)
                        console.log(result.data)
                        if(result.data.response==="Succesfully imported diagram in diagnostic."){
                            props.setImported("true")
                        }
                        }
                        setOpen(false);
                    }}
                    showPreviews={false}
                    showPreviewsInDropzone={true}
                    showFileNames={true}
                    filesLimit={1}
                />
            </div>
        )
    }
}

function Create(props) {
    var { id } = useParams();
    const [variables, setVariables] = useState([])
    const [val, setVal] = useState()
    const [toDelete, setToDelete] = useState(-1)
    const [currentNode, setCurrentNode] = useState(0)
    const [imported, setImported] = useState(0)

    const wrapperSetImportedVariables = async (list) => {
        console.log("M-am apelat " + list)
        setVariables(list)
    }

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

    const wrapperSetImported = val => {
        console.log("val")
        console.log(val)
        if(val === "true"){
            console.log("am setat imported")
            setImported(imported + 1)
        }
    }

    const wrapperSetCurrentNode = val => {
        setCurrentNode(val)
    }

    return (

        <Grid container>
            <Grid item xs={4}>
                <DiagramText import={props.import} edit={props.edit} />
            </Grid>
            <Grid item container justify='center' xs={8}>
                <DiagramName diagramId={id} edit={props.edit} />
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>

            <Grid item container xs={4}>
                <Paper elevation={3}>
                    <Grid item container xs={12} alignItems='flex-start'>
                        <Grid item xs={12}>
                            <DiagramDescription diagramId={id} edit={props.edit}/>
                        </Grid>
                    </Grid>
                    <ImportButton import={props.import} idgen = {id} setImported={wrapperSetImported}/>
                    <Grid item container xs={12} alignItems='flex-start'>
                        <Grid item xs={5}>
                            <VariableText />
                        </Grid>
                        <Grid item xs={7}>
                            <AddVariable currentList={variables} addVariable={wrapperAddVariable} />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <VariableChips setVariableList={wrapperSetImportedVariables}
                                       val={val}
                                       delete={wrapperDeleteVariable}
                                       import={props.import}
                                       imported={imported}
                                       idgen={id}
                                       edit={props.edit}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item container xs={12}>
                        <Rules2 val={val}
                                delete={toDelete}
                                currentNode={currentNode}
                                diagramId={id}
                                imported={imported}
                                import={props.import}
                                edit={props.edit}/>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item>
                <Diagram setCurrentNode={wrapperSetCurrentNode}
                         id={id}
                         imported={imported} 
                         import={props.import}
                         edit={props.edit}/>
            </Grid>
        </Grid>
    );
}

export default Create
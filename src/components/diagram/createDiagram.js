import React from 'react'
import * as go from 'gojs'
import { ReactDiagram } from 'gojs-react'
import '../diagram/diagram.css'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import setDiagram from '../../services/setDiagram'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

class Diagram extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nodeDataArray: [{ key: "Alpha", color: '#c0cacf',name: "Nod1" }],
            linkDataArray: [],
            save: {},
            open: false
        }
        this.initDiagram = this.initDiagram.bind(this)
        this.addNodeAndLink = this.addNodeAndLink.bind(this)
        this.onNodeClick = this.onNodeClick.bind(this)
        this.save = this.save.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.textEdited = this.textEdited.bind(this)
    }

    onNodeClick(e) {
        let part = e.subject.part;
        if (part instanceof go.Node) {
            this.props.setCurrentNode(part.data.key);
            console.log("Am trimis: " + part.data.key)
        }
    }


    addNodeAndLink(e, b) {
        // take a button panel in an Adornment, get its Adornment, and then get its adorned Node
        let node = b.part.adornedPart;
        // we are modifying the model, so conduct a transaction
        let diagram = node.diagram;
        let linkIt = node.findLinksOutOf()
        let nr = 0;

        let BrotherDecision = true
        let myDecision = true
        while (linkIt.next()) {
            nr++
            BrotherDecision = linkIt.value.data.text
            console.log("Brother Decision în while " + BrotherDecision)
        }

        if (BrotherDecision === myDecision) {
            console.log("Aceeasi decizie")
            myDecision = !BrotherDecision
            console.log("Decizia mea: " + myDecision)
        }


        console.log("Din copil pleaca " + nr + "legaturi.")

        let parentsIt = node.findNodesInto()
        let parent = ''
        while (parentsIt.next()) {
            parent = parentsIt.value
        }

        let nr2 = 0
        if (parent) {
            let parentIt = parent.findLinksOutOf()
            while (parentIt.next()) {
                nr2++
            }

        }
        console.log("Din parinte pleaca" + nr2 + "legaturi.")


        if ((nr < 2 && nr2 === 2) || (!parent && nr < 2)) {
            diagram.startTransaction("add node and link");
            // have the Model add the node data
            let newnode = { key: "N", color: '#c0cacf' };
            console.log(JSON.stringify(newnode))
            diagram.model.addNodeData(newnode);
            // locate the node initially where the parent node is
            diagram.findNodeForData(newnode).location = node.location;
            // and then add a link data connecting the original node with the new one
            let newlink = { from: node.data.key, to: newnode.key };
            diagram.model.addLinkData(newlink);
            let newlinkObject = diagram.findLinkForData(newlink)

            diagram.model.setDataProperty(newlinkObject.data, "text", myDecision)
            // finish the transaction -- will automatically perform a layout
            diagram.commitTransaction("add node and link");
            let model = JSON.parse(diagram.model.toJson())
            this.setState({
                nodeDataArray: model.nodeDataArray,
            })

            console.log("state: " + JSON.stringify(this.state))
            console.log("diagram.JSON: " + JSON.stringify(model))
        } else {
            alert("Arborele trebuie să fie binar!")
        }

        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        console.log("Diagram model" + diagram.model.toJson())
        this.setState({ save: diagram.model.toJson() })
        

    }

    textEdited(e){
        //e.subject is the Text Block
        //e.parameter is the original string
        //e.diagram gets the diagram
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!TEXT EDITED!!!!!!!!!!!!")
        console.log(e.subject.text)
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!Diagram model!!!!!!!!!!!!")
        console.log(e.diagram.model.toJson())
        this.setState({save: e.diagram.model.toJson()})
    }

    initDiagram() {
        const $ = go.GraphObject.make
        const diagram =
            $(go.Diagram,
                {
                    layout: $(go.TreeLayout,
                        { angle: 90, layerSpacing: 35 })
                });


        function deleteNodeAndLink(e, b) {
            // take a button panel in an Adornment, get its Adornment, and then get its adorned Node
            var node = b.part.adornedPart;
            // we are modifying the model, so conduct a transaction
            var diagram = node.diagram;
            diagram.startTransaction("remove node and link");
            diagram.remove(node)
            diagram.commitTransaction("remove node and link");
            let afterdelete = JSON.parse(diagram.model.toJson())
            console.log("Dupa stergere: " + JSON.stringify(afterdelete))

        } 

        diagram.nodeTemplate =
            $(go.Node, "Auto",
                $(go.Shape, { figure: "RoundedRectangle", stroke: null },
                    new go.Binding("fill", "color")),
                $(go.TextBlock,
                    "Click to edit",
                    { margin: 12, stroke: "#66696b", font: "12px sans-serif", editable: true },
                    new go.Binding("text", "name").makeTwoWay()),
                {
                    selectionAdornmentTemplate:
                        $(go.Adornment, "Spot",
                            $(go.Panel, "Auto",
                                // this Adornment has a rectangular blue Shape around the selected node
                                $(go.Shape, { fill: null, stroke: "dodgerblue", strokeWidth: 3 }),
                                $(go.Placeholder)
                            ),
                            // and this Adornment has a Button to the right of the selected node
                            $("Button",
                                {
                                    alignment: go.Spot.Right, alignmentFocus: go.Spot.Left,
                                    click: deleteNodeAndLink
                                },  // define click behavior for Button in Adornment
                                $(go.TextBlock, "DEL",  // the Button content
                                    { font: "bold 6pt sans-serif" })
                            ),
                            $(go.Panel, "Horizontal",
                                { alignment: go.Spot.Bottom, alignmentFocus: go.Spot.Top },
                                $("Button",
                                    { click: this.addNodeAndLink },  // defined below, to support editing the text of the node
                                    $(go.TextBlock, "ADD",
                                        { font: "bold 6pt sans-serif" })
                                ),
                            )

                        )  // end Adornment
                }
            );

        diagram.linkTemplate =
            $(go.Link,
                { routing: go.Link.Orthogonal, corner: 5 },
                $(go.Shape, { strokeWidth: 3, stroke: "#c0cacf" },
                    new go.Binding("stroke", "linkColor")),
                $(go.Panel, "Auto",  // this whole Panel is a link label
                    $(go.Shape, "RoundedRectangle", { fill: "white", stroke: "gray" }),
                    $(go.TextBlock, { margin: 3, font: "bold 6pt sans-serif" },
                        new go.Binding("text", "text"))
                )
            );

        diagram.addDiagramListener("ObjectSingleClicked", this.onNodeClick);
        diagram.addDiagramListener("TextEdited", this.textEdited)

        let model = $(go.GraphLinksModel)
        diagram.model = model
        return diagram
    }

    async save() {
        console.log("Id in save:" + this.props.id)
        let data = {
            idgen: this.props.id,
            diagram: this.state.save
        }
        console.log("Data inainte de save:" + JSON.stringify(data))
        let result = await setDiagram(data)
        //Validare date
        console.log(result)
        this.setState({ open: true })


    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ open: false })
    };

    render() {
        return (
            <Grid>
                <ReactDiagram
                    initDiagram={this.initDiagram}
                    divClassName='diagram-component'
                    nodeDataArray={this.state.nodeDataArray}
                    linkDataArray={this.state.linkDataArray}
                />
                <Grid container justify='flex-end' spacing={1}>
                    <Grid item>
                        <Button variant="contained" disapletypography='true' onClick={this.save}>
                            <Typography>
                                Salvează
                        </Typography>
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color='primary' disapletypography='true'>
                            <Typography>
                                {/* pun intr-un json in backend numele diagramei si id-ul, apoi cand randez
                        meniul il randez folosesc jsonul respectiv  */}
                        Publică
                        </Typography>
                        </Button>
                    </Grid>
                </Grid>
                <Snackbar open={this.state.open} autoHideDuration={3000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="success">
                        Diagrama a fost salvată!
                    </Alert>
                </Snackbar>
            </Grid>
        );
    }
}

export default Diagram;

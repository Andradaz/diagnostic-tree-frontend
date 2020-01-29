import React from 'react'
import * as go from 'gojs'
import { ReactDiagram } from 'gojs-react'
import '../diagram/diagram.css'

class Diagram extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nodeDataArray: [{ key: "Alpha", color: '#c0cacf' }],
            linkDataArray: []
        }
        this.initDiagram = this.initDiagram.bind(this);
        this.addNodeAndLink = this.addNodeAndLink.bind(this)

    }

    addNodeAndLink(e, b) {
        // take a button panel in an Adornment, get its Adornment, and then get its adorned Node
        var node = b.part.adornedPart;
        // we are modifying the model, so conduct a transaction
        var diagram = node.diagram;
        var linkIt = node.findLinksOutOf()
        var nr = 0;
        while (linkIt.next()) {
            nr++
        }
        console.log("Din copil pleaca " + nr + "legaturi.")

        var parentsIt = node.findNodesInto()
        var parent = ''
        while (parentsIt.next()) {
            parent = parentsIt.value
        }

        var nr2 = 0
        if (parent) {
            var parentIt = parent.findLinksOutOf()
            while (parentIt.next()) {
                nr2++
            }
        }
        console.log("Din parinte pleaca" + nr2 + "legaturi.")


        if ((nr < 2 && nr2 === 2) || (!parent && nr < 2)) {
            diagram.startTransaction("add node and link");
            // have the Model add the node data
            var newnode = { key: "N" };
            console.log(JSON.stringify(newnode))
            diagram.model.addNodeData(newnode);
            // locate the node initially where the parent node is
            diagram.findNodeForData(newnode).location = node.location;
            // and then add a link data connecting the original node with the new one
            var newlink = { from: node.data.key, to: newnode.key };
            diagram.model.addLinkData(newlink);
            // finish the transaction -- will automatically perform a layout
            diagram.commitTransaction("add node and link");
            var model = JSON.parse(diagram.model.toJson())
            this.setState({
                nodeDataArray: model.nodeDataArray,
            })
            
            console.log("state: " + JSON.stringify(this.state))
            console.log("diagram.JSON: " + JSON.stringify(model))
        } else {
            alert("Arborele trebuie să fie binar!")
        }
        
       
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
            diagram.remove(node)

        }

        diagram.nodeTemplate =
            $(go.Node, "Auto",
                $(go.Shape, { figure: "RoundedRectangle", stroke: null },
                    new go.Binding("fill", "color")),
                $(go.TextBlock,
                    "Default Text",
                    { margin: 12, stroke: "#66696b", font: "12px sans-serif" },
                    new go.Binding("text", "name")),
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
                    new go.Binding("stroke", "linkColor"))
            );

        let model = $(go.GraphLinksModel)
        diagram.model = model
        return diagram
    }

    render() {
        return (
            <div>
                <ReactDiagram
                    initDiagram={this.initDiagram}
                    divClassName='diagram-component'
                    nodeDataArray={this.state.nodeDataArray}
                    linkDataArray={this.state.linkDataArray}
                />
            </div>
        );
    }
}

export default Diagram;

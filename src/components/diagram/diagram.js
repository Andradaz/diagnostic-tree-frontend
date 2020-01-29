import React, { useState } from 'react'
import * as go from 'gojs'
import { ReactDiagram } from 'gojs-react'
import { Button } from '@material-ui/core';
import '../diagram/diagram.css'
import Fab from '@material-ui/core/Fab'
import PlayArrow from '@material-ui/icons/PlayArrow'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  }
}));

function initDiagram() {
  const $ = go.GraphObject.make
  const diagram =
    $(go.Diagram,
      {
        layout: $(go.TreeLayout,
          { angle: 90, layerSpacing: 35 })
      });

  function addNodeAndLink(e, b) {
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
    while(parentsIt.next()){
      parent = parentsIt.value
    }

    var nr2 = 0
    if(parent){
      var parentIt = parent.findLinksOutOf()
      while(parentIt.next()){
        nr2++
      }
    }
    console.log("Din parinte pleaca" + nr2 + "legaturi.")


    if (nr < 2 && nr2 == 2 || !parent && nr <2) {
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
    } else {
      alert("Arborele trebuie să fie binar!")
    }

    console.log("diagram.JSON: " + diagram.model.toJson())
  }

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
              { alignment: go.Spot.Bottom, alignmentFocus: go.Spot.Top},
              $("Button",
                { click: addNodeAndLink },  // defined below, to support editing the text of the node
                $(go.TextBlock, "ADD",
                  { font: "bold 6pt sans-serif"})
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

function handleModelChange(changes) {
  alert('GoJS model changed!');
}

function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 1000);
  });
}



function Diagram(props) {
  console.log("Trebuie sa randez: " + props.content + " si sa nu uit sa pun un if de verificare daca e undefined")
  const nodesColors = [{ id: 0, color: "#c0cacf", linkColor: "#c0cacf" },
  { id: 1, color: "#c0cacf", linkColor: "#c0cacf" },
  { id: 2, color: "#c0cacf", linkColor: "#c0cacf" },
  { id: 3, color: "#c0cacf", linkColor: "#c0cacf" },
  { id: 4, color: "#c0cacf", linkColor: "#c0cacf" },
  { id: 5, color: "#c0cacf", linkColor: "#c0cacf" },
  { id: 6, color: "#c0cacf", linkColor: "#c0cacf" }
  ]

  const [colors, setColors] = useState(nodesColors)
  async function handleClick() {

    setColors([
      { id: 0, color: "#001c4a", linkColor: "#c0cacf" },
      { id: 1, color: "#c0cacf", linkColor: "#c0cacf" },
      { id: 2, color: "#c0cacf", linkColor: "#c0cacf" },
      { id: 3, color: "#c0cacf", linkColor: "#c0cacf" },
      { id: 4, color: "#c0cacf", linkColor: "#c0cacf" },
      { id: 5, color: "#c0cacf", linkColor: "#c0cacf" },
      { id: 6, color: "#c0cacf", linkColor: "#c0cacf" }
    ])
    var result = await resolveAfter2Seconds();
    setColors([
      { id: 0, color: "#001c4a", linkColor: "#001c4a" },
      { id: 1, color: "#c0cacf", linkColor: "#c0cacf" },
      { id: 2, color: "#c0cacf", linkColor: "#001c4a" },
      { id: 3, color: "#c0cacf", linkColor: "#c0cacf" },
      { id: 4, color: "#c0cacf", linkColor: "#c0cacf" },
      { id: 5, color: "#c0cacf", linkColor: "#c0cacf" },
      { id: 6, color: "#c0cacf", linkColor: "#c0cacf" }
    ])
    var result = await resolveAfter2Seconds();
    setColors([
      { id: 0, color: "#001c4a", linkColor: "#001c4a" },
      { id: 1, color: "#c0cacf", linkColor: "#c0cacf" },
      { id: 2, color: "#001c4a", linkColor: "#001c4a" },
      { id: 3, color: "#c0cacf", linkColor: "#c0cacf" },
      { id: 4, color: "#c0cacf", linkColor: "#c0cacf" },
      { id: 5, color: "#c0cacf", linkColor: "#c0cacf" },
      { id: 6, color: "#c0cacf", linkColor: "#c0cacf" }
    ])
    var result = await resolveAfter2Seconds();
    setColors([
      { id: 0, color: "#001c4a", linkColor: "#001c4a" },
      { id: 1, color: "#c0cacf", linkColor: "#c0cacf" },
      { id: 2, color: "#001c4a", linkColor: "#001c4a" },
      { id: 3, color: "#c0cacf", linkColor: "#c0cacf" },
      { id: 4, color: "#c0cacf", linkColor: "#c0cacf" },
      { id: 5, color: "#c0cacf", linkColor: "#c0cacf" },
      { id: 6, color: "#c0cacf", linkColor: "#001c4a" }
    ])
    var result = await resolveAfter2Seconds();
    setColors([
      { id: 0, color: "#001c4a", linkColor: "#001c4a" },
      { id: 1, color: "#c0cacf", linkColor: "#c0cacf" },
      { id: 2, color: "#001c4a", linkColor: "#001c4a" },
      { id: 3, color: "#c0cacf", linkColor: "#c0cacf" },
      { id: 4, color: "#c0cacf", linkColor: "#c0cacf" },
      { id: 5, color: "#c0cacf", linkColor: "#c0cacf" },
      { id: 6, color: "#001c4a", linkColor: "#001c4a" }
    ])

  }
  const classes = useStyles();
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClick}>
        Start
        </Button>
      <ReactDiagram
        initDiagram={initDiagram}
        divClassName='diagram-component'
        nodeDataArray={
          [
            { key: "Alpha", color: '#c0cacf' },
          ]
        }
        linkDataArray={[]}
      />
      <Fab color="primary" aria-label="play" className={classes.fab}>
        <PlayArrow />
      </Fab>
    </div>
  );
}

export default Diagram;
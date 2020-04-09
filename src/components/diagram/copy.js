import React from 'react'
import * as go from 'gojs'
import { ReactDiagram } from 'gojs-react'
import { Button } from '@material-ui/core';
import '../diagram/diagram.css'
import GetByName from '../../services/get_by_name'
class Diagram extends React.Component {
  constructor(props) {
    super(props)
    const nodesColors = [{ id: 0, color: "#c0cacf", linkColor: "#c0cacf" },
    { id: 1, color: "#c0cacf", linkColor: "#c0cacf" },
    { id: 2, color: "#c0cacf", linkColor: "#c0cacf" },
    { id: 3, color: "#c0cacf", linkColor: "#c0cacf" },
    { id: 4, color: "#c0cacf", linkColor: "#c0cacf" },
    { id: 5, color: "#c0cacf", linkColor: "#c0cacf" },
    { id: 6, color: "#c0cacf", linkColor: "#c0cacf" }
    ]

    this.state = { backendData: [] }
  }

  fetchData = async () => {
    const result = await GetByName({ name: "Diabet de tip II" })
    const resLength = result.data.key.length
    const resultParsed = []

    resultParsed.push({
      key: result.data.key[0],
      name: result.data.name[0],
      color: "#c0cacf",
      linkColor: "#c0cacf"
    })

    for (var i = 1; i < resLength; i++) {
      resultParsed.push({
        key: result.data.key[i],
        parent: result.data.parent[i],
        name: result.data.name[i],
        color: "#c0cacf",
        linkColor: "#c0cacf"
      })
    }
    this.setState({ backendData: resultParsed })
  }

  componentDidMount() {
    this.fetchData();
  }

  initDiagram() {

    function addNodeAndLink(e, b) {
      // take a button panel in an Adornment, get its Adornment, and then get its adorned Node
      var node = b.part.adornedPart;
      // we are modifying the model, so conduct a transaction
      var diagram = node.diagram;
      diagram.startTransaction("add node and link");
      // have the Model add the node data
      var newnode = { key: "N" };
      diagram.model.addNodeData(newnode);
      // locate the node initially where the parent node is
      diagram.findNodeForData(newnode).location = node.location;
      // and then add a link data connecting the original node with the new one
      var newlink = { from: node.data.key, to: newnode.key };
      diagram.model.addLinkData(newlink);
      // finish the transaction -- will automatically perform a layout
      diagram.commitTransaction("add node and link");
    }

    const $ = go.GraphObject.make
    const diagram =
      $(go.Diagram,
        {
          layout: $(go.TreeLayout,
            { angle: 90, layerSpacing: 35 })
        });

    diagram.nodeTemplate =
      $(go.Node, "Auto",
        $(go.Shape, { figure: "RoundedRectangle", stroke: null },
          new go.Binding("fill", "color")),
        $(go.TextBlock,
          "Default Text",
          { margin: 12, stroke: "#66696b", font: "12px sans-serif" },
          new go.Binding("text", "name")),
      );

    diagram.linkTemplate =
      $(go.Link,
        { routing: go.Link.Orthogonal, corner: 5 },
        $(go.Shape, { strokeWidth: 3, stroke: "#c0cacf" },
          new go.Binding("stroke", "linkColor"))
      );

    diagram.addDiagramListener("BackgroundDoubleClicked",
      function (e) { alert("Double-clicked at " + e.diagram.lastInput.documentPoint); });

    diagram.addDiagramListener("ObjectSingleClicked",
      function (e) {
        var part = e.subject.part;
        if (!(part instanceof go.Link)) alert("Clicked on " + part.data.key);
      });

    let model = $(go.TreeModel)
    diagram.model = model
    return diagram
  }

  resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 1000);
    });
  }

  handleClick = async () => {
    this.setState({
      colors: [
        { id: 0, color: "#001c4a", linkColor: "#c0cacf" },
        { id: 1, color: "#c0cacf", linkColor: "#c0cacf" },
        { id: 2, color: "#c0cacf", linkColor: "#c0cacf" },
        { id: 3, color: "#c0cacf", linkColor: "#c0cacf" },
        { id: 4, color: "#c0cacf", linkColor: "#c0cacf" },
        { id: 5, color: "#c0cacf", linkColor: "#c0cacf" },
        { id: 6, color: "#c0cacf", linkColor: "#c0cacf" }
      ]
    })
    var result = await this.resolveAfter2Seconds();
    this.setState({
      colors: [
        { id: 0, color: "#001c4a", linkColor: "#001c4a" },
        { id: 1, color: "#c0cacf", linkColor: "#c0cacf" },
        { id: 2, color: "#c0cacf", linkColor: "#001c4a" },
        { id: 3, color: "#c0cacf", linkColor: "#c0cacf" },
        { id: 4, color: "#c0cacf", linkColor: "#c0cacf" },
        { id: 5, color: "#c0cacf", linkColor: "#c0cacf" },
        { id: 6, color: "#c0cacf", linkColor: "#c0cacf" }
      ]
    })
    var result = await this.resolveAfter2Seconds();
    this.setState({
      colors: [
        { id: 0, color: "#001c4a", linkColor: "#001c4a" },
        { id: 1, color: "#c0cacf", linkColor: "#c0cacf" },
        { id: 2, color: "#001c4a", linkColor: "#001c4a" },
        { id: 3, color: "#c0cacf", linkColor: "#c0cacf" },
        { id: 4, color: "#c0cacf", linkColor: "#c0cacf" },
        { id: 5, color: "#c0cacf", linkColor: "#c0cacf" },
        { id: 6, color: "#c0cacf", linkColor: "#c0cacf" }
      ]
    })
    var result = await this.resolveAfter2Seconds();
    this.setState({
      colors: [
        { id: 0, color: "#001c4a", linkColor: "#001c4a" },
        { id: 1, color: "#c0cacf", linkColor: "#c0cacf" },
        { id: 2, color: "#001c4a", linkColor: "#001c4a" },
        { id: 3, color: "#c0cacf", linkColor: "#c0cacf" },
        { id: 4, color: "#c0cacf", linkColor: "#c0cacf" },
        { id: 5, color: "#c0cacf", linkColor: "#c0cacf" },
        { id: 6, color: "#c0cacf", linkColor: "#001c4a" }
      ]
    })
    var result = await this.resolveAfter2Seconds();
    this.setState({
      colors: [
        { id: 0, color: "#001c4a", linkColor: "#001c4a" },
        { id: 1, color: "#c0cacf", linkColor: "#c0cacf" },
        { id: 2, color: "#001c4a", linkColor: "#001c4a" },
        { id: 3, color: "#c0cacf", linkColor: "#c0cacf" },
        { id: 4, color: "#c0cacf", linkColor: "#c0cacf" },
        { id: 5, color: "#c0cacf", linkColor: "#c0cacf" },
        { id: 6, color: "#001c4a", linkColor: "#001c4a" }
      ]
    })

  }
  render() {
    console.log("Trebuie sa randez: " + this.props.content + " si sa nu uit sa pun un if de verificare daca e undefined")
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClick}>
          Start
        </Button>
        <ReactDiagram
          initDiagram={this.initDiagram}
          divClassName='diagram-component'
          nodeDataArray={this.state.backendData}
        />
      </div>
    );
  }
}

export default Diagram;

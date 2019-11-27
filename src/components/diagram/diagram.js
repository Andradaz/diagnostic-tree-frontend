import React, { useState } from 'react'
import * as go from 'gojs'
import { ReactDiagram } from 'gojs-react'
import { Button } from '@material-ui/core';
import '../diagram/diagram.css'
function initDiagram() {
    const $ = go.GraphObject.make
    const diagram =
    $(go.Diagram,
      {layout: $(go.TreeLayout,
                  {angle: 90, layerSpacing: 35})
      });

    diagram.nodeTemplate = 
      $( go.Node, "Auto",
        $(go.Shape, {figure: "RoundedRectangle", stroke: null},
          new go.Binding("fill","color")),
        $(go.TextBlock,
          "Default Text",
          {margin: 12, stroke: "#66696b", font:"12px sans-serif" },
          new go.Binding("text", "name"))
      );

    diagram.linkTemplate =
        $(go.Link,
          {routing: go.Link.Orthogonal, corner: 5},
          $(go.Shape, {strokeWidth: 3, stroke: "#c0cacf"},
            new go.Binding("stroke", "linkColor"))
          );

    let model = $(go.TreeModel)
    // model.nodeDataArray = 
    // [
    //   { key: 0,              name: "Glicemia a Jeune \n și/sau \n Hb A1c", color: colors[0].color },
    //   { key: 1, parent: "0", name: "Glicemia <= 101 mg/dl \n și/sau \n Hb A1c < 5.5 %", color: colors[1].color },
    //   { key: 2, parent: "0", name: "Glicemia între 102-108 mg/dl \n și/sau \n Hb A1c între 5.6 - 5.9%", color: colors[1].color},
    //   { key: 3, parent: "0", name: "Glicemia între 109-125 mg/dl \n și/sau \n Hb A1c între 6.0 - 6.4%", color: colors[1].color},
    //   { key: 4, parent: "0", name: "Glicemia > 106 mg/dl \n și/sau Hb \n A1c >6.5%", color: colors[1].color}
    // ]
    diagram.model=model
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

function Diagram(){
   const nodesColors = [{id: 0 , color: "#c0cacf", linkColor: "#c0cacf"},
                         {id: 1 , color: "#c0cacf", linkColor: "#c0cacf"},
                         {id: 2 , color: "#c0cacf", linkColor: "#c0cacf"},
                         {id: 3 , color: "#c0cacf", linkColor: "#c0cacf"},
                         {id: 4 , color: "#c0cacf", linkColor: "#c0cacf"},
                         {id: 5 , color: "#c0cacf", linkColor: "#c0cacf"},
                         {id: 6 , color: "#c0cacf", linkColor: "#c0cacf"}
                        ]
    
    const [colors, setColors] = useState(nodesColors)
    async function handleClick () {
      
      setColors([
      {id: 0 , color: "#001c4a", linkColor: "#c0cacf"},
      {id: 1 , color: "#c0cacf", linkColor: "#c0cacf"},
      {id: 2 , color: "#c0cacf", linkColor: "#c0cacf"},
      {id: 3 , color: "#c0cacf", linkColor: "#c0cacf"},
      {id: 4 , color: "#c0cacf", linkColor: "#c0cacf"},
      {id: 5 , color: "#c0cacf", linkColor: "#c0cacf"},
      {id: 6 , color: "#c0cacf", linkColor: "#c0cacf"}
     ])
      var result = await resolveAfter2Seconds();
       setColors([
        {id: 0 , color: "#001c4a", linkColor: "#001c4a"},
        {id: 1 , color: "#c0cacf", linkColor: "#c0cacf"},
        {id: 2 , color: "#c0cacf", linkColor: "#001c4a"},
        {id: 3 , color: "#c0cacf", linkColor: "#c0cacf"},
        {id: 4 , color: "#c0cacf", linkColor: "#c0cacf"},
        {id: 5 , color: "#c0cacf", linkColor: "#c0cacf"},
        {id: 6 , color: "#c0cacf", linkColor: "#c0cacf"}
       ])
       var result = await resolveAfter2Seconds();
       setColors([
        {id: 0 , color: "#001c4a", linkColor: "#001c4a"},
        {id: 1 , color: "#c0cacf", linkColor: "#c0cacf"},
        {id: 2 , color: "#001c4a", linkColor: "#001c4a"},
        {id: 3 , color: "#c0cacf", linkColor: "#c0cacf"},
        {id: 4 , color: "#c0cacf", linkColor: "#c0cacf"},
        {id: 5 , color: "#c0cacf", linkColor: "#c0cacf"},
        {id: 6 , color: "#c0cacf", linkColor: "#c0cacf"}
       ])
       var result = await resolveAfter2Seconds();
       setColors([
        {id: 0 , color: "#001c4a", linkColor: "#001c4a"},
        {id: 1 , color: "#c0cacf", linkColor: "#c0cacf"},
        {id: 2 , color: "#001c4a", linkColor: "#001c4a"},
        {id: 3 , color: "#c0cacf", linkColor: "#c0cacf"},
        {id: 4 , color: "#c0cacf", linkColor: "#c0cacf"},
        {id: 5 , color: "#c0cacf", linkColor: "#c0cacf"},
        {id: 6 , color: "#c0cacf", linkColor: "#001c4a"}
       ])
       var result = await resolveAfter2Seconds();
       setColors([
        {id: 0 , color: "#001c4a", linkColor: "#001c4a"},
        {id: 1 , color: "#c0cacf", linkColor: "#c0cacf"},
        {id: 2 , color: "#001c4a", linkColor: "#001c4a"},
        {id: 3 , color: "#c0cacf", linkColor: "#c0cacf"},
        {id: 4 , color: "#c0cacf", linkColor: "#c0cacf"},
        {id: 5 , color: "#c0cacf", linkColor: "#c0cacf"},
        {id: 6 , color: "#001c4a", linkColor: "#001c4a"}
       ])
      
    }
    return(
        <div>
        <Button variant="outlined" color="primary" onClick={handleClick}>
            Start
        </Button>
        <ReactDiagram
          initDiagram={initDiagram}
          divClassName='diagram-component'
          nodeDataArray={
              [
                { key: 0,              name: "Glicemia a Jeune \n și/sau \n Hb A1c", color: colors[0].color, linkColor: colors[0].linkColor },
                { key: 1, parent: "0", name: "Glicemia <= 101 mg/dl \n și/sau \n Hb A1c < 5.5 %", color: colors[1].color, linkColor: colors[1].linkColor },
                { key: 2, parent: "0", name: "Glicemia între 102-108 mg/dl \n și/sau \n Hb A1c între 5.6 - 5.9%", color: colors[2].color, linkColor: colors[2].linkColor},
                { key: 3, parent: "0", name: "Glicemia între 109-125 mg/dl \n și/sau \n Hb A1c între 6.0 - 6.4%", color: colors[3].color, linkColor: colors[3].linkColor},
                { key: 4, parent: "0", name: "Glicemia > 106 mg/dl \n și/sau Hb \n A1c >6.5%", color: colors[4].color, linkColor: colors[4].linkColor},
                { key: 5, parent: "2", name: "Fără factori de risc", color: colors[5].color, linkColor: colors[5].linkColor},
                { key: 6, parent: "2", name: "Dacă există cel puțin un factor de risc", color: colors[6].color, linkColor: colors[6].linkColor}
               
              ]
          }
          // nodeDataArray={[
          //   { key: 0, text: 'Hellloou', color: 'lightblue', loc: '0 0' },
          //   { key: 1, text: 'Beta', color: 'orange', loc: '150 0' },
          //   { key: 2, text: 'Gamma', color: 'lightgreen', loc: '0 150' },
          //   { key: 3, text: 'Delta', color: 'pink', loc: '150 150' }
          // ]}
          // linkDataArray={[
          //   { key: -1, from: 0, to: 1 },
          //   { key: -2, from: 0, to: 2 },
          //   { key: -3, from: 1, to: 1 },
          //   { key: -4, from: 2, to: 3 },
          //   { key: -5, from: 3, to: 0 }
          // ]}
          //onModelChange={handleModelChange}
        />
        </div>
    );
}

export default Diagram;

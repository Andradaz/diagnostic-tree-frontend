import React from 'react'
import * as go from 'gojs'
import { ReactDiagram } from 'gojs-react'
import '../diagnostic/diagram.css'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import getDiagramModel from '../../services/diagnostic/getDiagramModel'
import Compute from '../../services/diagnostic/compute'

class Diagram extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nodeDataArray: [],
            linkDataArray: []
        }
        this.initDiagram = this.initDiagram.bind(this)
        this.fetchData = this.fetchData.bind(this)
        this.compute = this.compute.bind(this)
    }

    fetchData = async () => {
        let data = {
            "idgen": this.props.idgen
        }
        let diagramModel = await getDiagramModel(data)
        console.log(diagramModel.data[0])

        this.setState({
            nodeDataArray: diagramModel.data[0].nodeDataArray,
            linkDataArray: diagramModel.data[0].linkDataArray
        })
    }



    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.idgen !== prevProps.idgen) {
            this.fetchData();
        }
    }

    resolveAfter2Seconds() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('resolved');
            }, 2000);
        });
    }


    
    compute = async () => {
        let data = {
            "idgen": this.props.idgen,
            "inputs": Object.values(this.props.inputs)
        }
        console.log("DATAAAAAAAA")
        console.log(data)
        let result = await Compute(data)
        

        let animationMatrix = result.data
        console.log(animationMatrix)
        for(let i=0;i<animationMatrix.length; i++){
            let line = animationMatrix[i]
            this.setState({...this.state,nodeDataArray: line})
            let time = await this.resolveAfter2Seconds();

        }
    }

    initDiagram() {
        const $ = go.GraphObject.make
        const diagram =
            $(go.Diagram,
                {
                    layout: $(go.TreeLayout,
                        { angle: 90, layerSpacing: 35 }),
                    'undoManager.isEnabled': true,
                    'undoManager.maxHistoryLength': 0
                },
            );

        diagram.nodeTemplate =
            $(go.Node, "Auto",
                $(go.Shape, { figure: "RoundedRectangle", stroke: null },
                    new go.Binding("fill", "color")),
                $(go.TextBlock,
                    { margin: 12, stroke: "#66696b", font: "12px sans-serif" },
                    new go.Binding("text", "name").makeTwoWay()),
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

        let model = $(go.GraphLinksModel, {
            linkKeyProperty: 'key'  // this should always be set when using a GraphLinksModel
        })
        diagram.model = model
        return diagram
    }

    render() {
        return (
            <Grid>
                <ReactDiagram
                    initDiagram={this.initDiagram}
                    divClassName='diagram-componentt'
                    nodeDataArray={this.state.nodeDataArray}
                    linkDataArray={this.state.linkDataArray}
                />
                <Grid container justify='flex-end' spacing={1}>
                    <Grid item>
                        <Button variant="contained" disapletypography='true' onClick={this.compute}>
                            <Typography>
                                Calculeazá
                        </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default Diagram;

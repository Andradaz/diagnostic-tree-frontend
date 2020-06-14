import React from 'react'
import * as go from 'gojs'
import { ReactDiagram } from 'gojs-react'
import '../diagnostic/diagram.css'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import getDiagramModel from '../../services/diagnostic/getDiagramModel'
import Compute from '../../services/diagnostic/compute'
import Box from '@material-ui/core/Box'

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
        this.setState({
            nodeDataArray: [],
            linkDataArray: []
        })

        let diagramModel = await getDiagramModel(data)

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
            }, 1500);
        });
    }



    compute = async () => {
        let data = {
            "idgen": this.props.idgen,
            "inputs": this.props.inputs
        }

        let result = await Compute(data)

        console.log(result)
        let animationMatrix = result.data.matrix
        let linkMatrix = result.data.linkMatrix

        this.setState({ ...this.state, linkDataArray: linkMatrix[0] })
        this.setState({ ...this.state, nodeDataArray: animationMatrix[0] })

        for (let i = 1; i < animationMatrix.length; i++) {
            let line = animationMatrix[i]
            this.setState({ ...this.state, nodeDataArray: line })
            await this.resolveAfter2Seconds();

            if (i < animationMatrix.length - 1){
                let linkLine = linkMatrix[i]
                this.setState({ ...this.state, linkDataArray: linkLine })
                await this.resolveAfter2Seconds();
            }

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
            <Grid item container xs={12}>
                <Grid item container justify='flex-end' spacing={1}>
                    <Grid item>
                        <Box p={1}>
                            <Button size="small" variant="contained" color="primary" disabletypography='true' onClick={this.compute}>
                                <Typography variant="body2">
                                    Calculează
                                </Typography>
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item>
                    <ReactDiagram
                        initDiagram={this.initDiagram}
                        divClassName='diagram-componentt'
                        nodeDataArray={this.state.nodeDataArray}
                        linkDataArray={this.state.linkDataArray}
                    />
                </Grid>
            </Grid>
        );
    }
}

export default Diagram;

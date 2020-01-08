import React, {useState} from 'react'
import Grid from '@material-ui/core/Grid'
import Sidemenu from '../sidemenu/sidemenu'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Diagram from '../diagram/diagram'

function Content(props){

  const [diagramTracking, setDiagramTracking] = useState('d1')
  const wrapperSetDiagramTraking = val => {
    setDiagramTracking(val)
  }

  const theme = useTheme();
  if(useMediaQuery(theme.breakpoints.up('md'))){
    return(
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Sidemenu list = {props.list} diagramTrackingSetter = {wrapperSetDiagramTraking}/>
        </Grid>
        <Grid item xs={9}>
          <div>
          Hello esti pe diagnostic  desktop
          Diagram Traking: {diagramTracking}
          <Diagram content={diagramTracking === 'undefined' ? 'd1' : diagramTracking}/>
          </div>
        </Grid>
      </Grid>
    )
  }else{
    return(
      <Grid container spacing = {1}>
        <Grid item xs = {12}>
          <div>
          Hello esti pe diagnostic page mobile
          <Diagram/>
          </div>
        </Grid>
      </Grid>
    )
  }
}

function Diagnostic(props) {
  return (
    <Content list = {typeof props.list.data == 'undefined' ? [] : props.list.data} />
  );
}

export default Diagnostic
import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Sidemenu from '../sidemenu/sidemenu'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import View from './view'
import Diagram from '../diagnostic/diagram'


function Content(props) {

  const [diagramTracking, setDiagramTracking] = useState('KAV38WPSM8E')
  const [inputs,setInputs] = useState([])
  const wrapperSetDiagramTraking = val => {
    setDiagramTracking(val)
  }

  useEffect(()=>{

  },[inputs])

  const wrapperSetInputs = (e) => {
    let id = e.target.id
    let value = e.target.value
    setInputs({...inputs,[id]:value})
  }

  const theme = useTheme();

  if (useMediaQuery(theme.breakpoints.up('md'))) {
    return (
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Sidemenu list={props.list} diagramTrackingSetter={wrapperSetDiagramTraking} />
        </Grid>
        <Grid item xs={10}>
          <div>
            <View diagramId = {diagramTracking} inputsTrackingSetter={wrapperSetInputs}/>
            <Diagram idgen={diagramTracking} inputs ={inputs}/>
          </div>
        </Grid>
      </Grid>
    )
  } else {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <div>
            mobile
          </div>
        </Grid>
      </Grid>
    )
  }
}

function Diagnostic(props) {
  return (
     <Content list={typeof props.list.data == 'undefined' ? [] : props.list.data} />    
  );
}

export default Diagnostic
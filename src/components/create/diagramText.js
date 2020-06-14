import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'


function DiagramText(props) {
    if(props.import === "yes"){
        return (
            <Typography component='div'>
                <Box fontWeight="fontWeightRegular" fontSize={25} pt={3} pl={3} pb={3}>
                    Importă o diagramă din Weka
            </Box>
            </Typography>
        )
    }else if(props.edit === "yes"){
        return (
            <Typography component='div'>
                <Box fontWeight="fontWeightRegular" fontSize={25} pt={3} pl={3} pb={3}>
                    Editează o diagramă
            </Box>
            </Typography>
        )
    }else{
        return (
            <Typography component='div'>
                <Box fontWeight="fontWeightRegular" fontSize={25} pt={3} pl={3} pb={3}>
                    Creează o nouă diagramă
            </Box>
            </Typography>
        )
    }

}

export default DiagramText
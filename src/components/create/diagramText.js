import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

function DiagramText() {
    return (
            <Typography component='div'>
                <Box fontWeight="fontWeightRegular" fontSize={25} pt={3} pl={3} pb={3}>
                    Creează o nouă diagramă
            </Box>
            </Typography>
    )
}

export default DiagramText
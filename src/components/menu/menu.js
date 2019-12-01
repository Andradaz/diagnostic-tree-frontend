import React from 'react'
import Paper from '@material-ui/core/Paper'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import {
    Link
  } from "react-router-dom"

const useStyles = makeStyles(theme => ({
    paper: {
      height: 55,
      width: '100%'
    }
  }));



function Menu(){
    const classes = useStyles();
    return(
            <Paper square className={classes.paper}>
                <Grid container>
                        <Grid item container xs = {2} justify='center' alignItems='center'>
                            <Button href = '/diagnostic' color="primary">
                                    <Typography component={'span'}>
                                        <Box fontWeight="fontWeightRegular" m={1}>
                                            Diagnostic
                                        </Box>
                                    </Typography>
                            </Button>
                        </Grid>
                        <Grid item container xs = {2} justify='center'>
                            <Button href = '/' color="primary">
                                <Typography component={'span'}>
                                        <Box fontWeight="fontWeightRegular" m={1}>
                                            Despre
                                        </Box>
                                    </Typography>
                            </Button>
                        </Grid>
                        <Grid item container xs = {8} justify='flex-end'>
                            <Grid item container xs = {2} justify='center'>
                                <Button href = '/admin' color="primary">
                                    <Typography component={'span'}>
                                        <Box fontWeight="fontWeightRegular" m={1}>
                                            Admin
                                        </Box>
                                    </Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid> 
                </Paper>
    );
}

export default Menu
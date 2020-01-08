import React from 'react'
import Paper from '@material-ui/core/Paper'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: "#282b2b"
    },
    paper: {
      height: 55,
      width: '100%',
    },
    button: {
        textTransform: "none"
      }
  }));



function Menu(){
    const classes = useStyles();
    return(
            <Paper square classes={{
                root: classes.root
              }} elevation={0}>
                <Grid container>
                        <Grid item container xs = {2} justify='center' alignItems='center'>
                            <Button href = '/diagnostic' color="primary" className={classes.button}>
                                    <Typography component={'span'}>
                                        <Box fontWeight="fontWeightRegular" m={1}>
                                            Diagnostic
                                        </Box>
                                    </Typography>
                            </Button>
                        </Grid>
                        <Grid item container xs = {2} justify='center'>
                            <Button href = '/' color="primary" className={classes.button}>
                                <Typography component={'span'}>
                                        <Box fontWeight="fontWeightRegular" m={1}>
                                            Despre
                                        </Box>
                                </Typography>
                            </Button>
                        </Grid>
                        <Grid item container xs = {8} justify='flex-end'>
                            <Grid item container xs = {3} justify='center'>
                                <Button href = '/admin' color="primary" className={classes.button}>
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
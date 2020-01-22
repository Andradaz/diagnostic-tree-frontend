import React from 'react'
import Paper from '@material-ui/core/Paper'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import Toolbar from '@material-ui/core/Toolbar'

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: "#282b2b"
    },
    paper: {
        height: 20,
        width: '100%',
    },
    button: {
        textTransform: "none"
    },
    toolbarSecondary: {
        justifyContent: 'space-around',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
    },
}));



function Menu() {
    const classes = useStyles();
    return (
        <Paper square classes={{
            root: classes.root
        }} elevation={0}>
            <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
                <Grid container>
                    <Grid item container xs={10}>
                        <Link
                            color="primary"
                            noWrap
                            variant="body2"
                            href='/diagnostic'
                            className={classes.toolbarLink}
                        >
                            Diagnostic
                        </Link>
                        <Link
                            color="primary"
                            noWrap
                            variant="body2"
                            href='/about'
                            className={classes.toolbarLink}
                        >
                            Despre Aplicație
                        </Link>
                    </Grid>
                    <Grid item container xs={2} justify='flex-end'>
                        <Link
                            color="primary"
                            noWrap
                            variant="body2"
                            href='/admin'
                            className={classes.toolbarLink}
                        >
                            Admin
                        </Link>
                    </Grid>
                </Grid>
            </Toolbar>
        </Paper>
    );
}

export default Menu
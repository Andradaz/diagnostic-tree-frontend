import React, { useState } from 'react'
import { useEffect } from 'react'
import Paper from '@material-ui/core/Paper'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

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

function SignInText(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseA = () => {
        setAnchorEl(null);
        window.location.href = 'http://localhost:3001/admin'
    };

    const handleCloseD = () => {
        setAnchorEl(null);
        sessionStorage.removeItem('currentUser')
        sessionStorage.removeItem('username')
        window.location.href = 'http://localhost:3001/diagnostic'
    };

    if (sessionStorage.getItem('currentUser') === null) {
        return (
            <Button color="primary" href='/signin'>
                Autentificare
            </Button>
        )
    } else if (sessionStorage.getItem('currentUser') !== null &&
        sessionStorage.getItem('admin') === "true") {
        return (
            <div>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} color="primary">
                    {props.signInStatus}
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleCloseA}>Administrează diagramele</MenuItem>
                    <MenuItem onClick={handleCloseD}>Deconectare</MenuItem>
                </Menu>
            </div>
        )
    } else {
        return(
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} color="primary">
                {props.signInStatus}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleCloseD}>Deconectare</MenuItem>
            </Menu>
        </div>
        )
    }
}

function MyMenu() {
    const classes = useStyles();
    const [signInStatus, setSignInStatus] = useState(' ')

    useEffect(() => {
        if (sessionStorage.getItem('currentUser') === null) {
            setSignInStatus("Autentificare")
        } else {
            let username = sessionStorage.getItem('username')
            setSignInStatus(username)
        }
    }, [])

    return (
        <Paper square classes={{
            root: classes.root
        }} elevation={0}>
            <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
                <Grid container>
                    <Grid item container xs={10}>
                        {/* <Link
                            color="primary"
                            noWrap
                            variant="body2"
                            href='/diagnostic'
                            className={classes.toolbarLink}
                        >
                            Diagnostic
                        </Link> */}
                        <Button color="primary" href='/diagnostic'>
                            Diagnostic
                        </Button>
                        {/* <Link
                            color="primary"
                            noWrap
                            variant="body2"
                            href='/about'
                            className={classes.toolbarLink}
                        >
                            Despre Aplicație
                        </Link> */}
                        <Button color="primary" href='/about'>
                            Despre Aplicație
                        </Button>
                    </Grid>
                    <Grid item container xs={2} justify='flex-end'>
                        <SignInText signInStatus={signInStatus} />
                        {/* <Link
                            color="primary"
                            noWrap
                            variant="body2"
                            href={sessionStorage.getItem('currentUser') === null ? '/admin' : '/signout'}
                            className={classes.toolbarLink}
                        >
                            {signInStatus}
                        </Link> */}
                    </Grid>
                </Grid>
            </Toolbar>
        </Paper>
    );
}

export default MyMenu
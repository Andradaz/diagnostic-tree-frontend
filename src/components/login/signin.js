import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import signInData from '../../services/users/signIn'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/">
                Software application for diagnostic trees
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export default function SignIn() {
    const classes = useStyles()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [openSuccess, setOpenSucces] = useState(false)
    const [openFail, setOpenFail] = useState(false)
    const [error, setError] = useState(" ")

    const handleChangeEmail = (event) => {
        let value = event.target.value
        setEmail(value);
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const redirect = () => {
        window.location.href = 'http://localhost:3001/admin'
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        let data = {
            "logemail": email,
            "logpassword": password
        }
        let result = await signInData(data)
        if (result.data.error) {
            setError(result.data.error)
            setOpenFail(true)
        } else {
            sessionStorage.setItem('currentUser', result.data.userid)
            sessionStorage.setItem('username', result.data.username)
            sessionStorage.setItem('admin', result.data.admin)
            setOpenSucces(true)
            setTimeout(redirect, 3000)

        }

    }

    const handleCloseSuccess = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSucces(false)
    };

    const handleCloseFail = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenFail(false)
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form}>
                    <TextField
                        color="secondary"
                        type="email"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="off"
                        value={email}
                        onChange={handleChangeEmail}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        color="secondary"
                        value={password}
                        onChange={handleChangePassword}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2" color="secondary">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2" color="secondary">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
            <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleCloseSuccess}>
                <Alert onClose={handleCloseSuccess} severity="success">
                    Autentificare realizată cu succes!
                    </Alert>
            </Snackbar>
            <Snackbar open={openFail} autoHideDuration={3000} onClose={handleCloseFail}>
                <Alert onClose={handleCloseFail} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        </Container>
    );
}
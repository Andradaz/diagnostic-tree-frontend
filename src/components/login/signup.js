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
import signUpData from '../../services/users/signUp'
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

}));

export default function SignUp() {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [openSuccess, setOpenSucces] = useState(false)
  const [openFail, setOpenFail] = useState(false)
  const [error, setError] = useState(" ")
  const [helperTextEmail, setHelperTextEmail] = useState("")
  const [errorEmail, setErrorEmail] = useState(false)
  const [helperTextPassword, setHelperTextPassword] = useState("")
  const [errorPassword, setErrorPassword] = useState(false)

  const handleChangeFN = (event) => {
    let value = event.target.value
    setFirstName(value)
  }

  const handleChangeLN = (event) => {
    let value = event.target.value
    setLastName(value)
  }

  const handleChangeE = (event) => {
    let value = event.target.value
    setEmail(value)
    let re = /^[a-zA-Z0-9.\-_]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/
    if (re.test(value)) {
      setHelperTextEmail("")
      setErrorEmail(false)
    } else {
      setHelperTextEmail("Adresa de email nu este validă.")
      setErrorEmail(true)
    }
  }

  const handleChangeP = (event) => {
    let value = event.target.value
    setPassword(value)
    if (value.length >= 8) {
      setHelperTextPassword("")
      setErrorPassword(false)
    } else {
      setHelperTextPassword("Parola trebuie să conțină minim 8 caractere.")
      setErrorPassword(true)
    }

  }

  const handleChangeU = (event) => {
    let value = event.target.value
    setUsername(value)

  }

  const redirect = () => {
    window.location.href = 'http://localhost:3001/signin'
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    let data = {
      email: email,
      username: username,
      lastname: lastName,
      firstname: firstName,
      password: password
    }

    if (errorEmail) {
      setError("Adresa de email nu este validă!")
      setOpenFail(true)
    } else if (errorPassword) {
      setError("Parola nu este validă!")
      setOpenFail(true)
    } else {
      let response = await signUpData(data)
      if (response.data.error) {
        setError(response.data.error)
        setOpenFail(true)
      } else {
        setOpenSucces(true)
        setTimeout(redirect, 3000)
      }
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
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={firstName}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                color="secondary"
                onChange={handleChangeFN}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={lastName}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                color="secondary"
                onChange={handleChangeLN}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={email}
                variant="outlined"
                helperText={helperTextEmail}
                error={errorEmail}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete='off'
                color="secondary"
                onChange={handleChangeE}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={username}
                variant="outlined"
                required
                fullWidth
                autoComplete='off'
                id="username"
                label="Username"
                name="username"
                color="secondary"
                onChange={handleChangeU}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={password}
                variant="outlined"
                helperText={helperTextPassword}
                error={errorPassword}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                color="secondary"
                onChange={handleChangeP}
              />
            </Grid>
          </Grid>
          <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleCloseSuccess}>
            <Alert onClose={handleCloseSuccess} severity="success">
              Înregistrare realizată cu succes!
            </Alert>
          </Snackbar>
          <Snackbar open={openFail} autoHideDuration={3000} onClose={handleCloseFail}>
            <Alert onClose={handleCloseFail} severity="error">
              {error}
            </Alert>
          </Snackbar>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
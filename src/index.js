import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import 'typeface-roboto'

const theme = createMuiTheme({
    palette: {
        primary: { main: '#78e1ff' },
        secondary: { main: '#24ceff' },
        action: { selected: '#a8ecff',
                   hover: '#9ad9ed'},
      },
      typography: { useNextVariants: true }
  });

ReactDOM.render(<MuiThemeProvider theme = { theme }><App /></MuiThemeProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

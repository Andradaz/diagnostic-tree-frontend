import React from 'react'
import GetList from '../../services/diagnostic/getList'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import setStatus from '../../services/diagnostic/setStatus'
import Box from '@material-ui/core/Box'
import removeDiagnostic from '../../services/diagnostic/removeDiagnostic'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
});

class EditPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            open: false,
            toDelete: "",
            toDeleteName: ""
        }
        this.onClickSetStatus = this.onClickSetStatus.bind(this)

    }

    fetchData = async () => {
        const result = await GetList
        this.list = this.setState({ list: result.data });
    }

    componentDidMount() {
        this.fetchData();
    }

    onClickSetStatus = async (idgen, status) => {
        let booleanStatus = (status === 'true')
        let data = {
            id: idgen,
            status: booleanStatus
        }
        await setStatus(data)
        window.location.reload(false)
    };

    onClickRemoveDiagnostic = async () => {
        if (this.state.toDelete !== "") {
            let data = {
                "idgen": this.state.toDelete
            }
            await removeDiagnostic(data)
            this.setState({ toDelete: "" })
            this.setState({ open: false })
            window.location.reload(false)
        }

    };

    handleClickOpen = (idgen, name) => {
        this.setState({ open: true });
        this.setState({ toDelete: idgen });
        this.setState({ toDeleteName: name })
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        return (
            <Container>
                <Box pt={3}>
                    <Typography variant="h4" gutterBottom>
                        Lista de diagrame
                </Typography>
                </Box>
                <div className={classes.root}>
                    {
                        this.state.list.map((obj, index) => {
                            if (obj.published === true) {
                                return (
                                    <ExpansionPanel
                                        key={obj._id}>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Grid container
                                                alignItems="center">
                                                <Grid item container xs={5}>
                                                    <Typography className={classes.heading}>{obj.name}</Typography>
                                                </Grid>
                                                <Grid item container xs={7} justify="flex-end">
                                                    <Grid item container xs={2} justify="center">
                                                        <Button size="small" disabletypography='true' onClick={() => { this.handleClickOpen(obj.idgen, obj.name) }}>
                                                            <Typography variant="body2">
                                                                Șterge
                                                            </Typography>
                                                        </Button>
                                                    </Grid>
                                                    <Grid item container xs={2} justify="center">
                                                        <Link
                                                            to={'/admin/edit/' + obj.idgen} underline='none'
                                                            component={RouterLink}
                                                        >
                                                            <Button size="small" disabletypography='true'>
                                                                <Typography variant="body2">
                                                                    Editează
                                                            </Typography>
                                                            </Button>
                                                        </Link>
                                                    </Grid>
                                                    <Grid item container xs={4} justify="center">
                                                        <Button color="secondary" disabletypography='true'
                                                            onClick={() => this.onClickSetStatus(obj.idgen, 'false')}>
                                                            <Typography variant="body2">Anulează publicarea</Typography>
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <Typography>{obj.description}</Typography>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                )
                            } else {
                                return (
                                    <ExpansionPanel
                                        key={obj._id}>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Grid container
                                                alignItems="center">
                                                <Grid item container xs={5}>
                                                    <Typography className={classes.heading}>{obj.name}</Typography>
                                                </Grid>
                                                <Grid item container xs={7} justify="flex-end">
                                                    <Grid item container xs={2} justify="center">
                                                        <Button size="small" disabletypography='true' onClick={() => { this.handleClickOpen(obj.idgen, obj.name) }}>
                                                            <Typography variant="body2">
                                                                Șterge
                                                            </Typography>
                                                        </Button>
                                                    </Grid>
                                                    <Grid item container xs={2} justify="center">
                                                        <Link
                                                            to={'/admin/edit/' + obj.idgen} underline='none'
                                                            component={RouterLink}
                                                        >
                                                            <Button size="small" disabletypography='true'>
                                                                <Typography variant="body2">Editează</Typography>
                                                            </Button>
                                                        </Link>
                                                    </Grid>
                                                    <Grid item container xs={4} justify="center">
                                                        <Button size="small" disabletypography='true' variant='contained'
                                                            color="primary" onClick={() => this.onClickSetStatus(obj.idgen, 'true')}>
                                                            <Typography variant="body2">Publică</Typography>
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <Typography>{obj.description}</Typography>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                )
                            }
                        }
                        )}
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title"> <Typography variant="h5">Ștergi diagrama <i>{this.state.toDeleteName}</i> ?</Typography></DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Această diagramă nu poate fi recuperată ulterior.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose}>
                                Nu
                            </Button>
                            <Button onClick={this.onClickRemoveDiagnostic} color="secondary" autoFocus>
                                Da
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Container>
        );
    }
}

EditPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditPanel);
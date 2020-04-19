import React from 'react'
import GetList from '../../services/diagram/get_list'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import setStatus from '../../services/diagram/setStatus'

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
            list: []
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

    onClickSetStatus = async (name, status) => {
        let booleanStatus = (status === 'true')
        let data = {
            name: name,
            status: booleanStatus
        }
        await setStatus(data)
        window.location.reload(false)
    };

    render() {
        const { classes } = this.props;
        return (
            <Container>
                <Typography variant="h4" gutterBottom>
                    Lista de diagrame
            </Typography>
                <div className={classes.root}>
                    {
                        this.state.list.map((obj, index) => {
                            if (obj.published === true) {
                                return (
                                    <ExpansionPanel
                                        key={obj.index}>
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
                                                        <Button>Editeaza</Button>
                                                    </Grid>
                                                    <Grid item container xs={4} justify="center">
                                                        <Button color="secondary" onClick={() =>this.onClickSetStatus(obj.name, 'false')}>Anuleaza Publicarea</Button>
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
                                        key={obj.index}>
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
                                                        <Button>Editeaza</Button>
                                                    </Grid>
                                                    <Grid item container xs={4} justify="center">
                                                        <Button variant='contained' color="primary" onClick={() => this.onClickSetStatus(obj.name, 'true')}>Publica</Button>
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
                </div>
            </Container>
        );
    }
}

EditPanel.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(EditPanel);
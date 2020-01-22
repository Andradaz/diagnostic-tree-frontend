import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import edit from './edit-secondary.svg'
import add from './add-secondary.svg'

const useStyles = makeStyles(theme => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
}));

function Admin() {
  const classes = useStyles();
  return (
    <Container maxWidth="xl">
      <Paper className={classes.mainFeaturedPost} style={{ backgroundImage: 'url(https://images.fineartamerica.com/images-medium-large-5/soft-blue-gradient-white-light-background-kikkalek5050.jpg)' }}>
        <div className={classes.overlay} />
        <Grid container>
          <Grid item md={6}>
            <div className={classes.mainFeaturedPostContent}>
              <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                Gestionare diagrame
            </Typography>
              <Typography color="inherit" paragraph>
                Un instrument care oferă o modalitate simplă de a edita/crea diagrame de diagnostic. Pe baza regulilor pe care le stabilești respectiv pe baza parametrilor definiți, aplicația creează mediul interactiv de diagnostic pentru pacienți.
            </Typography>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <CardActionArea component="a" href="#">
            <Card className={classes.card}>
              <div className={classes.cardDetails}>
                <CardContent>
                  <Typography component="h2" variant="h5">
                    Editează
              </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Editează una dintre diagramele deja existente.
              </Typography>
                  <Typography variant="subtitle1" paragraph>
                    Modifică nodurile, parametrii, variabilele definite sau șterge o diagramă.
              </Typography>
                </CardContent>
              </div>
              <CardMedia className={classes.cardMedia} image={edit} title='titlu' />
            </Card>
          </CardActionArea>
        </Grid>
        <Grid item xs={12} md={6}>
          <CardActionArea component="a" href="admin/create">
            <Card className={classes.card}>
              <div className={classes.cardDetails}>
                <CardContent>
                  <Typography component="h2" variant="h5">
                    Creează
              </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Creează, definește și publică!
              </Typography>
                  <Typography variant="subtitle1" paragraph>
                    Creează o nouă diagramă pe care o poți publica pentru vizualizare.
              </Typography>
                </CardContent>
              </div>
              <CardMedia className={classes.cardMedia} image={add} title='titlu' />
            </Card>
          </CardActionArea>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Admin
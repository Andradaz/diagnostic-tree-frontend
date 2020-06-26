import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import decision from '../../images/decision.jpg'
import context from '../../images/context.jpg'
import 'fontsource-roboto'
import "./about.css"
import trace from '../../images/trace.png'
import admin from '../../images/admin.jpg'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    background: '#edfbff'
  },
  fontSizeLarge: {
    fontSize: 100,
  },

}));

function About() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.appBar}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          //variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          centered
        >
          <Tab label={<Typography>Context</Typography>} {...a11yProps(0)} />
          <Tab label={<Typography>Pentru pacienți</Typography>} {...a11yProps(1)} />
          <Tab label={<Typography>Pentru medici</Typography>} {...a11yProps(2)} />
          <Tab label={<Typography>Arborii de decizie</Typography>} {...a11yProps(3)} />
          {/* <Tab label="Item Five" {...a11yProps(4)} /> */}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Grid container>
          <Grid item xs={4}>
            <img src={context} className="context" alt="Doctor" />
          </Grid>
          <Grid item xs={8}>
            <div class="textcolor">
              DiagView este o aplicație de suport pentru stabilirea diagnosticului,
              care poate fi utilizată de pacienți, medici sau cercetători pentru vizualizarea
              traseului care se construiește în urma specificării parametrilor de intrare.
              Pe lângă acest aspect principal, soluția propusă pune la dispoziția utilizatorilor
              funcționalitatea de a crea și gestiona arbori de decizie, cu posibilitatea de a
              importa un arbore de decizie generat cu ajutorul platformei Weka, pornind de la date.
            </div>
            <div class="textcolor">
            Vizualizarea arborilor pe suport de hârtie în timpul unui consult este anevoioasă și
            consumă atât din timpul medicului cât și din timpul pacienților care așteaptă la rând
            în fața cabinetului. O astfel de problemă poate fi rezolvată prin automatizarea procesului
            de parcurgere a arborilor de decizie și vizualizarea adecvată într-o interfață intuitivă
            și ușor de înțeles de către toate tipurile de utilizatori. 
            </div>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container>
          <Grid item xs={2} justify="flex-end">
            <img src={trace} className="trace" alt="Trace" />
          </Grid>
          <Grid item xs={10}>
          <div class="textcolor">
            Pagina de diagnostic este alcătuită dintr-un meniu
            care conține lista de diagrame, în partea dreaptă
            fiind afișată diagrama corespunzătoare.
            Prin completarea casetelor de intrare și apăsarea
            butonului <b>Calculează</b>, utilizatorul
            poate să vadă traseul parcurs pentru
            diagnosticare.
          </div>
            <div class="textcolor">
            Pentru diagnosticul <b>Diabetului de tip II</b>,
            un pacient care a fost depistat cu o valoare
            anormală a glicemiei va efectua un test de
            toleranță orală la glucoză care presupune
            administrarea orală a unei cantități de
            glucoză (75 de grame) într-un pahar cu apă.
            Înainte de administrarea glucozei se măsoară
            glicemia și procentul hemoglobinei glicozilate
            iar glicemia se măsoară din nou la două ore de
            la administrarea glucozei. Valorile glicemiei
            înainte de administrarea glucozei și la două
            ore după, împreună cu prezența factorilor de risc
            diabetogen sunt folosite în diagnosticarea diabetului.
            </div>
            <div class="textcolor">
            Utilizând cinci criterii care definesc
            apariția <b>Sindromului
            Metabolic</b>, oamenii de știință informatică au
            dezvoltat metode de învățare automată care
            permit stabilirea diagnosticului.
            Astfel
            se poate afla riscul la care este
            expusă persoana respectivă și cât de prevalent
            este sindromul metabolic într-o populație care
            prezintă acești doi factori de risc.
            </div>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Grid container>
          <Grid item xs={4} justify="flex-end">
            <img src={admin} className="admin" alt="Trace" />
          </Grid>
          <Grid item xs={7}>
          <div class="textcolor">
          Administratorul, după autentificare, este
          redirecționat către pagina de gestionare
          a diagramelor. Din acel punct, poate 
          alege care este următoarea acțiune:
          <ul>
            <li>Editare</li>
            <li>Creare</li>
            <li>Importare</li>
          </ul>
          Pentru a importa o diagramă generată de Weka în aplicația
          DiagView, utilizatorul sesiunii curente trebuie să
          fie administrator. În bara de navigare se află un
          buton pe care scrie numele utilizatorului
          care este autentificat, în caz contrar,
          apare butonul de autentificare. 
          </div>
          </Grid>
            <div class="textcolor">
              Opțiunea 
              <b> Administrează diagramele</b> conduce utilizatorul la panoul
              de administrare, respectiv la panoul de importare.
              Acesta este alcătuit din secțiunea unde se
              va afișa arborele și secțiunea de editare:
              adăugare variabile
              și adăugare reguli.
              Componenta de adăugare reguli se schimbă
              în funcție de nodul selectat.
              Utilizând butonul <b>importă diagrama</b>, apare
              o căsuță de dialog pentru alegerea fișierului.
              După submisie, se afișează diagrama citită din fișier și
              regulile aferente fiecărui nod. Arborele poate
              fi modificat prin editare, ștergere și adăugare de
              noduri sau reguli. Dacă este publicat,
              apare pe pagina de diagnostic în lista de diagrame.
              Rezultatul este posibilitatea de a afișa într-un mod
              intuitiv parcurgerea arborelui generat de algoritmul
              J48 în funcție de parametrii specificați.
            </div>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <Grid container>
          <Grid item xs={4} justify="flex-end">
            <img src={decision} className="decision" alt="Trace" />
          </Grid>
          <Grid item xs={8}>
          <div class="textcolor">
          Arborii de decizie sunt modele de clasificare
          sau regresie, care sunt construite pornind de
          la date, folosind metode de învățare supervizată.
          Conceptul de arbore de decizie este ușor
          de reprezentat atât grafic cât și intern.
          <b> Nodurile</b> conțin condiții referitoare
          la valoarea unui atribut (specificate prin expresii
          relaționale de tip egalitate sau inegalitate).
          Fiecare ramură din arbore corespunde unei reguli
          de tip IF...THEN... unde condiția este 
          constituită prin conjuncția condițiilor din
          noduri iar decizia corespunde clasei
          specificate (sau valorii estimate, în cazul
          problemelor de regresie) de nodul terminal
          (frunza).
          </div>
          </Grid>
        </Grid>
      </TabPanel>
    </div>

  );
}

export default About
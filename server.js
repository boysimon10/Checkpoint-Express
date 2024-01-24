const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs'); // Configuration du moteur de modèle EJS

// Middleware personnalisé pour vérifier l'heure
const checkBusinessHours = (req, res, next) => {
  const currentHour = new Date().getHours();
  const isWeekday = new Date().getDay() >= 1 && new Date().getDay() <= 5; // Lundi à vendredi

  if (isWeekday && currentHour >= 9 && currentHour < 17) {
    next(); // Continuez si c'est pendant les heures ouvrables
  } else {
    res.send('L\'application est disponible uniquement pendant les heures ouvrables(de 9h à 17h)');
  }
};

app.use(checkBusinessHours);

// Itinéraires pour les trois pages
app.get('/', (req, res) => {
  res.render('index'); // Utilisation du moteur de modèle EJS
});

app.get('/services', (req, res) => {
  res.render('services'); // Utilisation du moteur de modèle EJS
});

app.get('/contact', (req, res) => {
  res.render('contact'); // Utilisation du moteur de modèle EJS
});

// Dossier statique pour les fichiers CSS
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});

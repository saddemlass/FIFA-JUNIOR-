/*const express = require('express');
const cors = require('cors');
const playerRoutes = require('./routes/playerRoutes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger/swagger.yaml');

const app = express();
app.use(cors()); // Pour autoriser les requêtes cross-origin
app.use(express.json()); // Pour parser les requêtes JSON

app.use('/api/players', playerRoutes); // Routes API des joueurs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Documentation Swagger

module.exports = app;*/
const express = require('express');
const cors = require('cors');
const path = require('path');
const playerRoutes = require('./routes/playerRoutes');
const matchRoutes = require('./routes/matchRoutes');
const commentRoutes = require('./routes/commentRoutes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger/swagger.yaml');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', playerRoutes);
app.use('/api', matchRoutes);
app.use('/api', commentRoutes);

app.get('/', (req, res) => {
  res.send('⚽ Football Scouting API is running');
});

module.exports = app;
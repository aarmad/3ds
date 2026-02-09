const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes/index');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// app.use('/admin', express.static(path.join(__dirname, 'admin')));
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Serveur backend sur le port ${PORT}`);
  });
}

module.exports = app;
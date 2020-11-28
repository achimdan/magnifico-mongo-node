const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

app.use(bodyParser.json());

// ROUTES
const categoriesRoute = require('./routes/api/categories');
const productsRoute = require('./routes/api/products');

//MIDDLEWARES Routes
app.use(cors());
app.use(express.json({ extended: false }));

app.use('/api/categories', categoriesRoute);
app.use('/api/products', productsRoute);

app.use('/uploads', express.static('uploads'));

//Handle production
if (process.env.NODE_ENV === 'production') {
    // Static folder
    app.use(express.static(__dirname + '/public/'));
  
    // Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

// ROUTES
app.get('/', (req, res) => {
    res.send('HOME');
})

//CONNECT TO DB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true },() => console.log('connected to DB!'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
// app.listen(3000);
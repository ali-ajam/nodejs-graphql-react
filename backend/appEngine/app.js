'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8080;
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

app.use(cors());
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.get('/', (req, res) => {
  res.status(200).send('Welcome to Ali Ajam Youtube Channel').end();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

app.get('/cars', async (req, res) => {
  let data = {};
  const cars = await db.collection('cars').get();
  cars.forEach((car) => {
    data[car.id] = car.data();
  });
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
});

app.get('/drivers', async (req, res) => {
  let data = {};
  const drivers = await db.collection('drivers').get();
  drivers.forEach((driver) => {
    data[driver.id] = driver.data();
  });
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
});

app.get('/analytics', async (req, res) => {
  let data = {};
  const analytics = await db.collection('analytics').get();
  analytics.forEach((analytic) => {
    data[analytic.id] = analytic.data();
  });
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
});

module.exports = app;

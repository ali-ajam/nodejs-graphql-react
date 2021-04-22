const graphql = require('graphql');
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
let db = admin.firestore();

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLList,
} = graphql;

const carType = new GraphQLObjectType({
  name: 'car',
  fields: () => ({
    id: { type: GraphQLID },
    brand: { type: GraphQLString },
    driverId: { type: GraphQLString },
    year: { type: GraphQLString },
    charge: { type: GraphQLInt },
    color: { type: GraphQLString },
    mileage: { type: GraphQLString },
    approved: { type: GraphQLBoolean },
    driver: {
      type: driverType,
      async resolve(parent, args) {
        const driver = await db.doc(`drivers/${parent.driver}`).get();
        return driver.data();
      },
    },
  }),
});

const driverType = new GraphQLObjectType({
  name: 'driver',
  fields: () => ({
    id: { type: GraphQLID },
    SSN: { type: GraphQLString },
    carId: { type: GraphQLString },
    car: {
      type: carType,
      async resolve(parent, args) {
        const car = await db.doc(`cars/${parent.car}`).get();
        return car.data();
      },
    },
  }),
});

const analyticsType = new GraphQLObjectType({
  name: 'analytics',
  fields: () => ({
    avgCharge: { type: GraphQLInt },
    newVehicles: { type: GraphQLInt },
    outOfNetwork: { type: GraphQLInt },
    totalVehicles: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    car: {
      type: carType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        const car = await db.doc(`cars/${args.id}`).get();
        return car.data();
      },
    },
    driver: {
      type: carType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        const driver = await db.doc(`drivers/${args.id}`).get();
        return driver.data();
      },
    },
    cars: {
      type: new GraphQLList(carType),
      async resolve(parent, args) {
        let data = [];
        const cars = await db.collection('cars').get();
        cars.forEach((car) => {
          data.push(car.data());
        });
        return data;
      },
    },
    drivers: {
      type: new GraphQLList(driverType),
      async resolve(parent, args) {
        let data = [];
        const cars = await db.collection('drivers').get();
        cars.forEach((car) => {
          data.push(car.data());
        });
        return data;
      },
    },
    analytics: {
      type: new GraphQLList(analyticsType),
      async resolve(parent, args) {
        let data = [];
        const analytics = await db.collection('analytics').get();
        analytics.forEach((analytic) => {
          data.push(analytic.data());
        });
        return data;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});

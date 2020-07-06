// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Wine = require("../models/Wine");

const bcryptSalt = 10;

const dbName = 'cellar-tracker';


mongoose
  .connect('mongodb://localhost/cellar-tracker', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

// let users = [
//   {
//     username: "alice",
//     password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
//   },
//   {
//     username: "bob",
//     password: bcrypt.hashSync("bob", bcrypt.genSaltSync(bcryptSalt)),
//   }
// ]

// User.deleteMany()
// .then(() => {
//   return User.create(users)
// })
// .then(usersCreated => {
//   console.log(`${usersCreated.length} users created with the following id:`);
//   console.log(usersCreated.map(u => u._id));
// })
// .then(() => {
//   // Close properly the connection to Mongoose
//   mongoose.disconnect()
// })
// .catch(err => {
//   mongoose.disconnect()
//   throw err
// })

const wines = [
  {
    winery: 'Wine & Soul',
    name: 'Douro',
    type: 'red',
    year: 2010,
    grape: ['Touriga Nacional', 'Tinta Roiz'],
    Country: 'Spain',
    Region: 'Catalunia'
  },
  {
    winery: 'Wine & Soul',
    name: 'Chardonay',
    type: 'white',
    year: 2015,
    grape: ['Touriga Nacional', 'Tinta Roiz'],
    Country: 'Australia',
    Region: 'Sydney'
  },
];



Wine.create(wines, (err) => {
  if (err) { throw(err) }
  console.log(`Created ${wines.length} wines`)
  mongoose.connection.close();
});
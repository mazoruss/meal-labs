const mongoose = require('mongoose');

const mongoUser = 'admin';
const mongoPassword = 'hackreactor';
const mongoURI = `mongodb://${mongoUser}:${mongoPassword}@ds037597.mlab.com:37597/meal-labs`;
mongoose.connect(mongoURI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Mongodb connection open'));

module.exports = db;

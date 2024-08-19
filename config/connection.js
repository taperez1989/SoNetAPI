const { connect, connection } = require('mongoose');
// const { MongoClient } = require('mongodb');
const connectionString = 'mongodb://127.0.0.1:27017/soNet_db';
connect(connectionString);
module.exports = connection;
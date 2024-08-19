const connection = require('../config/connection');
const { user, thought } = require('../models');
// probably going to need this, also need to understand this better
// const { getRandomFriend, getRandomReaction } = require(./data);

connection.on('error', (err) => err);


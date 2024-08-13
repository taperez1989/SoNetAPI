const { Schema, model } = require('mongoose');
// const { schema } = require('./user');


const thoughtSchema = new Schema({

    thoughtText: {
        type: String,
        required: true,
        max_length: 280,
        min_length: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now,

    },
    userName: {
        type: String,
        required: true,
    },

});

const thought = model('thought', thoughtSchema);

module.exports = thought;
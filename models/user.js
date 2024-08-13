const { Schema, model } = require('mongoose');
// const thoughtSchema = require('./thought');

const userSchema = new Schema({

    userName: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Please enter a valid email address'
        ]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thought',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
    ],
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

const user = model('user', userSchema);

module.exports = user;
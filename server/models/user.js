const { mongoose } = require('../db/mongoose');

const schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        trim: false
    },
    email: {
        type: String,
        required: true,
        minlength: '1',
        trim: true
    },
    age: {
        type: Number,
        required: false,
        minlength: 2,
    }
})

const User = mongoose.model('User', schema);

module.exports = { User };

const { mongoose } = require('../db/mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

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
        minlength: 6,
        trim: false
    },
    email: {
        type: String,
        required: true,
        minlength: '1',
        trim: true,
        unique: true, // Makes sure that the inserted email is not used before in any doc in this collection
        validate: { // Create custom validation, takes "validator" which is a function and "message" as string
            validator: (value) => {
                return validator.isEmail(value);
            },
            message: 'Not a valid email'
        }
    },
    age: {
        type: Number,
        required: false,
        minlength: 2,
    },
    tokens: [ // Used for user authentication and security
        {
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }
    ]
})

schema.methods.generateAuthToken = function () {
    let access = 'auth';
    let token = jwt.sign({ _id: this._id.toHexString(), access }, 'abc123').toString();

    this.tokens = this.tokens.concat([{ access, token }]);

    return this.save().then(doc => token);
};

const User = mongoose.model('User', schema);



module.exports = { User };

const { mongoose } = require('../db/mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

// Document-level methods
schema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(10, (error, salt) => {
            if (error) return console.log(error);

            bcrypt.hash(this.password, salt, (error, hash) => {
                if (error) return console.log(error);

                this.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

schema.methods.generateAuthToken = function () {
    let access = 'auth';
    let token = jwt.sign({ _id: this._id.toHexString(), access }, 'abc123').toString();

    this.tokens = this.tokens.concat([{ access, token }]);

    return this.save().then(doc => token);
};

schema.methods.removeAuthToken = function (token) {
    return this.update({
        $pull : {
            tokens: { token }
        }
    }).catch((error) => {
        return Promise.reject();
    });
};

// Model/Collection-level methods
schema.statics.findByToken = function (token) {
    let decoded;

    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        return Promise.reject();
    }

    return this.findById({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.auth': 'auth',
    })
};

schema.statics.findByCredentials = function (email, password) {
    return this.findOne({ email })
        .then((user) => {
            if (!user) return Promise.reject();
            
            return new Promise((resolve, reject) => {
                bcrypt.compare(password, user.password, (error, result) => {
                    if (error) return reject();
    
                    if (result) return resolve(user);
                });
            });
        })
        .catch((error) => {
            return Promise.reject();
        });
};

const User = mongoose.model('User', schema);



module.exports = { User };

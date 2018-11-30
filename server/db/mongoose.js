// This file should contain all the configurations related to 'mongoose'
// And then, the 'mongoose' constant gets exported after being properly configured

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApplication');


module.exports = { mongoose };
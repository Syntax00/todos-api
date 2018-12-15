const { mongoose } = require('../db/mongoose');

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    description: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
})

const Todo = mongoose.model('Todo', schema);

module.exports = { Todo };

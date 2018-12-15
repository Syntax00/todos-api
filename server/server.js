const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/auth');

let app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json()); // .use() is a function on express()'s object used for creating middlewares


// Create the POST endpoint for adding a todo i.e. POST /todos
app.post('/todos', authenticate, (request, response) => {
    let todoData = _.pick(request.body, ['title', 'description', 'completed']);
    todoData._creator = request.user._id;
    
    let todo = new Todo(todoData);
    
    todo.save().then(todo => {
        response.send(todo);
    }, error => {
        response.status(400).send(error);
    });
});

// Create the GET endpoint for fetching all theo todos i.e GET /todos
app.get('/todos', authenticate, (request, response) => {
    console.log(request.user._id)
    Todo.find({ _creator: request.user._id }).then(todos => {
        response.send({
            todos,
        });
    }, error => {
        response.status(400).send(error);
    })
});

// Create the GET /todos/:id endpoint for getting a single todo
app.get('/todos/:id', authenticate, (request, response) => {
    // To get the id, we need to use the "params" object on "request" i.e. request.params
    let todoId = request.params.id;

    if (!ObjectID.isValid(todoId)) return response.status(404).send();

    Todo.findOne({
        _id: todoId,
        _creator: request.user._id,
    }).then((todo) => {
        if (!todo) return response.status(404).send();
        response.send({ todo });
    }).catch((error) => {
        response.status(400).send(error);
    });
});

// Create the DELETE /todos/:id endpoint for removing a certain todo
app.delete('/todos/:id', authenticate, (request, response) => {
    let todoId = request.params.id;

    if (!ObjectID.isValid(todoId)) return response.status(404).send();

    Todo.findOneAndRemove({
        _id: todoId,
        _creator: request.user._id,
    }).then((removedTodo) => {
        if (!removedTodo) return response.status(404).send();
        
        response.send({
            removedTodo,
        })
    }).catch((error) => {
        response.status(400).send(error);
    });
});

// Create the PATCH /todos/:id endpoint for updating a certain todo
app.patch('/todos/:id', authenticate, (request, response) => {
    const todoId = request.params.id;
    if (!ObjectID.isValid(todoId)) return response.status(404).send();

    const updateObj = _.pick(request.body, ['title', 'description', 'completed']);

    Todo.findOneAndUpdate({
        _id: todoId,
        _creator: request.user._id,
    }, { $set: updateObj }, { new: true }).then((updatedTodo) => {
        if (!updatedTodo) return response.status(404).send();

        response.send({
            updatedTodo,
        })
    }).catch((error) => {
        response.send(400).send(error);
    })
});

// Create the POST endpoint for adding a user
app.post('/users', (request, response) => {
    let userData = _.pick(request.body, ['username', 'password', 'email', 'age']);
    let user = new User(userData);
    
    // The password's hash will be generating right here (before .save() gets called)

    user.save().then((user) => {
        return user.generateAuthToken();
    }).then((token) => {
        response.header('x-auth', token).send(user);
    }).catch((error) => {
        response.status(400).send();
    });
});

// Create the GET endpoint for getting all users
app.get('/users', (request, response) => {
    User.find().then((users) => {
        response.send({
            users,
        });
    }, (error) => {
        response.status(400).send(error);
    });
});


// Create the POST endpoint for loggin the user in
app.post('/users/login', (request, response) => {
    let loginInfo = _.pick(request.body, ['email', 'password']);

    User.findByCredentials(loginInfo.email, loginInfo.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            response.header('x-auth', token).send(user);
        });
    }).catch((error) => {
        response.status(400).send();
    });
});

// Create the DELETE endpoint for logging the user out (Delete the current token)
app.delete('/users/logout', authenticate, (request, response) => {
    request.user.removeAuthToken(request.token).then(() => {
        response.send(request.user);
    }).catch((error) => {
        response.status(400).send();
    });
});

// Create the GET endpoint for getting a user by token
app.get('/users/me', authenticate, (request, response) => {
    response.send(request.user);
});

app.listen(port, () => console.log(`Successfully connected to the server on port ${port} ..`));

module.exports = { app };
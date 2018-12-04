const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');


let app = express();

app.use(bodyParser.json()); // .use() is a function on express()'s object used for creating middlewares


// Create the POST endpoint for adding a todo i.e. POST /todos
app.post('/todos', (request, response) => {
    let todoData = {
        title: request.body.title,
        description: request.body.description,
        completed: request.body.completed
    };
    let todo = new Todo(todoData);
    
    todo.save().then(todo => {
        response.send(todo);
    }, error => {
        response.status(400).send(error);
    });
});

// Create the GET endpoint for fetching all theo todos i.e GET /todos
app.get('/todos', (request, response) => {
    Todo.find().then(todos => {
        response.send({
            todos,
        });
    }, error => {
        response.status(400).send(error);
    })
});

// Create the GET /todos/:id endpoint for getting a single todo
app.get('/todos/:id', (request, response) => {
    // To get the id, we need to use the "params" object on "request" i.e. request.params
    let todoId = request.params.id;

    if (!ObjectID.isValid(todoId)) return response.status(404).send();

    Todo.findById(todoId).then((todo) => {
        if (!todo) return response.status(400).send();
        response.send({ todo });
    }).catch((error) => {
        response.status(400).send(error);
    });
});

// Create the POST endpoint for adding a user
app.post('/users', (request, response) => {
    const { username, email, password } = request.body;
    let userData = {
        username,
        email,
        password,
    };

    let user = new User(userData);

    user.save().then((user) => {
        response.send(user);
    }, (error) => {
        response.status(400).send(error);
    })
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



app.listen(3000, () => console.log('Successfully connected to the server...'));

module.exports = { app };
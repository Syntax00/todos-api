const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

let _id = '5c03b3ebdb5b7666d6b52a39';

// The id can be validated by using mongodb's ObjectID.isValid() method
if (!ObjectID.isValid(_id)) {
    return console.log('The id is invalid');
}


// .find() method gets all the docs that have matched the filter/query
Todo.find({
    _id,
}).then((todos) => {
    if (todos.length === 0) return console.log('There are no todos that match this id.')
    console.log('Todos', todos);
}).catch(error => {
    console.log(error);
});

// .findOne() method gets only one doc (the first one) that have matched the filter/query
Todo.findOne({
    _id,
}).then((todo) => {
    if (!todo) return console.log('Could not find a todo that matches id.')
    console.log('Todo', todo);
}).catch(error => {
    console.log(error);
});

// .findById() method get only one doc by its id when it matches the filter/query
Todo.findById(_id).then((todo) => {
    if (!todo) return console.log('Could not find a todo that matches id.')
    console.log('Todo by id', todo);
}).catch(error => {
    console.log(error);
});


// VIDEO CHALLENGE: Query the 'Users' collection
User.find({
    _id: '5c0668edffcc0ca9f45d11a3'
}).then((users) => {
    if (users.length === 0) {
        return console.log('There\'s no user that matches the specified id');
    }
    console.log('User', users);
}).catch((error) => {
    console.log(error);
});

User.findOne({
    _id: '5c0668edffcc0ca9f45d11a3'
}).then((user) => {
    if (!user) {
        return console.log('Could not find a user with this id.');
    }
    console.log('User', user);
}).catch((error) => {
    console.log(error);
});

User.findById('5c0668edffcc0ca9f45d11a3').then((user) => {
    if (!user) {
        return console.log('Could not find a user with this id.');
    }
    console.log('User', user);
}).catch((error) => {
    console.log(error);
});

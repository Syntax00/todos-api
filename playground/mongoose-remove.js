const { mongoose } = require('../server/db/mongoose');
const { User } = require('../server/models/user');
const { Todo } = require('../server/models/todo');

// .remove({}) method removes all of the document inside a certain collection
// Todo.remove({}).then((result) => {
//     console.log('result', result);
// });

// .findByIdAndRemove() methods remove only one document (the first one) that matches the id
Todo.findByIdAndRemove('5c07bd91b1c6524602ebebf3').then((removedDoc) => {
    console.log('Removed Doc:', removedDoc);
});
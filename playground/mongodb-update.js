const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {
    if (error) return console.log('Could not connect to the database server.');

    console.log('Successfully connected to the database server.');

    const db = client.db('TodoApp');

    // .findOneAndUpdate() method updates the document that matches the filter/query
    // .findOneAndUpdate() takes filter, update (operator) and options arguement (asides from the callback ofc)

    // 1- .findOneAndUpdate using the callback
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5bfef629a7e1b29e531a6d79')
    }, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
    }, (error, result) => {
        if (error) return console.log('Could not update the specified documents.');

        console.log('result', result);
    });

    // 2- .findOneAndUpdate using the promise
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5bfef6558bca969e54ae5836')
    }, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
    }).then(result => {
        console.log('result', result);
    });


    client.close();
});
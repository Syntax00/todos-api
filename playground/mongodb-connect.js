const { MongoClient } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {
    if (error) return console.log('Could not connect to the database server.');
    const db = client.db('TodoApp');
    console.log('Successfully connected to the database server.');

    db.collection('Todos').insertOne({
        title: 'Create a mobile app design for fun',
        description: 'Its been a while since the last time I did one',
        date: Date.now(),
        completed: false
    }, (error, result) => {
        if (error) return console.error(error);
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    client.close();
});
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {
    if (error) return console.log('Could not connect to the database server.');

    console.log('Successfully connected to the database server.');

    const db = client.db('TodoApp');

    // .deleteMany() method deletes all the documents that match the filter/query it takes
    // 1- .deleteMany using the callback
    db.collection('Todos').deleteMany({ title: 'Eat breakfast' }, (error, result) => {
        if (error) return console.log('Could not delete the specified documents.');

        console.log('result', result.result);
    });

    // 1- .deleteMany using the promise
    db.collection('Todos').deleteMany({ title: 'Eat lunch' }).then(result => {
        console.log('result', result.result);
    });



    // .deleteOne() method deletes only one document that matches the filter/query (the first document that matches)
    // 1- .deleteOne using the callback
    db.collection('Todos').deleteOne({ title: 'Delete One (callback)' }, (error, result) => {
        if (error) return console.log('Could not delete the specified document.');

        console.log('result', result.result);
    });

    // 1- .deleteOne using the promise
    db.collection('Todos').deleteOne({ title: 'Delete One (promise)' }).then(result => {
        console.log('result', result.result);
    });



    // .findOneAndDelete() method deletes only one document that matches the filter/query (the first document that matches)
    // .findOneAndDelete() method returns the actual document after deleting it (that's why it's a super handy method)
    // 1- .findOneAndDelete using the callback
    db.collection('Todos').findOneAndDelete({ title: 'Find One and Delete (callback)' }, (error, result) => {
        if (error) return console.log('Could not delete the specified document.');

        console.log('result', result);
    });

    // 1- .findOneAndDelete using the promise
    db.collection('Todos').findOneAndDelete({ title: 'Find One and Delete (promise)' }).then(result => {
        console.log('result', result);
    });
    client.close();
});
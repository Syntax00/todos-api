const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {
    if (error) return console.log('Could not connect to the database server.');

    console.log('Successfully connected to the database server.');

    const db = client.db('TodoApp');
    
    // Mongodb's cursor is not the documents themselves but a pointer to them
    // Mongodb's cursor has methods that help us get the actual documents e.g. toArray()



    // The .toArray() method is a method on mongodb's cursor object
    // .toArray() -> instead of having the cursor, .toArray() gives us an array of docs

    // 1- Use the promise returned from the .toArray() method to get the docs
    db.collection('Todos').find({ completed: false }).toArray().then(docs => {
        console.log('Documents', docs);
    }, error => {
        console.log('Something went wrong: ', error);
    });

    // 2- Use .toArray()'s callback to get the docs
    db.collection('Todos').find({
        _id: new ObjectID('5bfef629a7e1b29e531a6d79')
    }).toArray((error, docs) => {
        if (error) return console.log('Couldn\'t fetch documents.');

        console.log('Documents', docs);
    });



    // The .count() method is a method on mongodb's cursor object
    // .count() -> returns the count of documents in certain collection as a number

    // 1- Use the promise returned from the .count() method to get the count
    db.collection('Todos').find().count().then(count => {
        console.log('Documents count: ', count);
    }, error => {
        console.log('Something went wrong while attempting to get count.');
    });

    // 2- Use .count()'s callback to get the count
    db.collection('Todos').find().count((error, count) => {
        if (error) return console.log('Something went wrong while attempting to get count.');
        
        console.log('Documents count: ', count);
    });



    // VIDEO CHALLENGE: Query the 'Users' collection with documents of name: 'Mohamed Ahmed'
    db.collection('Users').find({ name: 'Mohamed Ahmed' }).toArray((error, docs) => {
        if (error) return console.log('Something went wrong while fetching documents.');

        console.log('User Documents: ', docs);
    })
    client.close();
})
const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = 'password111';

bcrypt.genSalt(10, (error, salt) => {
    if (error) return console.log('Something went wrong while generating a Salt.');
    console.log('Salt: ', salt);
    bcrypt.hash(password, salt, (error, hash) => {
        if (error) return console.log('Something went wrong while hashing the given password.');

        console.log('Password: ', password);
        console.log('Hashed Password: ', hash);
    });
});

let hashedPassword = '$2a$10$eMRkEVx7IUBMft4K66Mkx.QPXs.9gMYZsa8sRP7Q5aRL7Hy/k528G';

bcrypt.compare('password', hashedPassword, (error, result) => {
    console.log('Compare: ', result);
});

// let data = {
//     id: 10,
//     name: 'Mohamed Ahmed',
//     age: 23
// };

// let token = jwt.sign(data, '123abc');

// let decoded = jwt.verify(token, '123abc');

// console.log('token', token);
// console.log('decoded', decoded);













// let message = 'Testing the SHA256 encryption';

// let encyptedMessage = SHA256(message).toString();

// console.log('message', message);
// console.log('encryptedMessage', encyptedMessage);


// // scenario server send token to client
// let data = {
//     id: 4,
// };

// let token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecretonserver').toString()
// };


// // client send token to server
// // token.data.id = 6;
// // token.data.hash =  SHA256(JSON.stringify(data) + 'somesecretonserver').toString();

// let resultHash = SHA256(JSON.stringify(token.data) + 'somesecretonserver').toString();

// if (token.hash === resultHash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was manipulated and changed.')
// }

const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');


let data = {
    id: 10,
    name: 'Mohamed Ahmed',
    age: 23
};

let token = jwt.sign(data, '123abc');

let decoded = jwt.verify(token, '123abc');

console.log('token', token);
console.log('decoded', decoded);













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

'use strict';
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const { saveEventData } = require('./controllers/saveEventDataController')

const app = express();

app.use(morgan('common'));
app.use(morgan('dev'));
app.use(bodyParser.text());


const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT;

app.get('/', function (req, res) {
    res.send('Home!');
});

//too lazy to change trigged pathName lmao
app.post("/dreams", function (request, response) {
  response.status(200).end();
  console.log('Someone called me!!');

  console.log('------------');
  console.log(request.body);
  console.log('------MESSAGE------');
  let obj = JSON.parse(request.body);
  let message = JSON.parse(obj['Message']);
  console.log(message);
  console.log(message.eventType);
  console.log(message.mail.tags);
  // console.log(Object.keys(obj));
  console.log('------MESSAGE------');


});

app.use('*', function (req, res) {
    res.status(404).json({ message: 'Not Found' });
});

// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, so we declare `server` here
// and then assign a value to it in run


let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl = DATABASE_URL, port = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(port, () => {
                console.log(`Your app is listening on port ${port}`);
                resolve();
            })
                .on('error', err => {
                    mongoose.disconnect();
                    reject(err);
                });
        });
    });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
    runServer().catch(err => console.error(err));
}

module.exports = { runServer, app, closeServer };

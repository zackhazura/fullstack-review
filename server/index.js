const githubHelper = require('../helpers/github.js');

const express = require('express');
let app = express();

// initialize and connect database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {useNewURLParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('connected to db!')
  // we're connected!
});

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.urlencoded());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  githubHelper.getReposByUsername(req.body.username, (err, data) => {
    if (err) {
      console.log('error');
      res.status(404).send(err);
    } else {
      console.log('success');
      res.status(201).send(data);
    }
  })

  // console.log(req.body.username);
  // res.status(201).send('Post successful');
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


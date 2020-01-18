const githubHelper = require('../helpers/github.js');
const database = require('../database/index.js');

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
app.use(express.json());
app.use(express.urlencoded());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  githubHelper.getReposByUsername(req.body.username, (err, data, body) => {
    if (err) {
      console.log('Error GET request from GitHub API');
      res.status(404).send(err);
    } else {
      console.log('Successful GET from GitHub API');
      var repos = JSON.parse(body);
      repos.forEach(repoData => {
        database.save(repoData);
      })
      res.status(201).send(data);
    }
  })

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


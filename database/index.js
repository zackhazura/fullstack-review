const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  git_id: { type: Number, unique: true },
  owner: String,
  git_name: String,
  url: String,
  desc: String,
  stargazers: Number,
  forks: Number
});


let Repo = mongoose.model('Repo', repoSchema);

let save = (gitData, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  Repo.findOne({git_id: gitData.id}, (err, data) => {
    if (err) {
      callback(err, null);
    } else if (data) {
      console.log('This repo has already been added!');
      callback(err, null);
    } else {
      var repoData = new Repo({
        git_id: gitData.id,
        owner: gitData.owner.login,
        git_name: gitData.name,
        url: gitData.html_url,
        desc: gitData.description,
        stargazers: gitData.stargazers_count,
        forks: gitData.forks_count
      });
      repoData.save((err, data) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, data);
        }
      });
    }
  });
}

module.exports.save = save;
module.exports.Repo = Repo;
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    $.ajax({
      url: '/repos',
      method: 'POST',
      data: {username: term},
      success: (repos) => {
        this.setState({
          repos: repos
        })
      },
      error: (err) => {
        console.log(error);
      }
    });
  }

  componentDidMount() {
    fetch('http://localhost:1128/repos')
      .then((repos) => repos.json())
      .then((repos) => {
        this.setState({
          repos: repos
        });
      })
      .catch((err) => console.log(err));
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
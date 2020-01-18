import React from 'react';

const Repo = (props) => (
  <div>
    <h4><a href={props.repo.url}>{props.repo.git_name}</a></h4>
    <h5> Created by: {props.repo.owner}</h5>
    <h5> url: {props.repo.url} </h5>
    <h5> {props.repo.desc} </h5>
    <h6> Stars: {props.repo.stargazers} / Forks: {props.repo.forks} </h6>
  </div>

)

export default Repo;
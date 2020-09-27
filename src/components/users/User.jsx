import React, { Component, Fragment } from "react";
import Spinner from "../layout/Spinner";
import { Repos } from "../repos/Repos";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export class User extends Component {
  componentDidMount() {
    // param of login is from url set in App.js following Route path.../user/:login
    this.props.getUser(this.props.match.params.login);
    this.props.getUserRepos(this.props.match.params.login);
  }
  static propTypes = {
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    repos: PropTypes.array.isRequired,
  };
  render() {
    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable,
      company,
    } = this.props.user;
    const { loading, repos } = this.props;
    const hireableIcon = hireable
      ? "fas fa-check text-success"
      : "fas fa-times-circle text-danger";
    if (!loading) {
      console.log(repos);
      return (
        <Fragment>
          <Link to="/" className="btn btn-light">
            Back To Search
          </Link>
          Hireable: <i className={hireableIcon}></i>
          <div className="card grid-2">
            <div className="all-center">
              <img
                src={avatar_url}
                alt=""
                className="round-img"
                style={{ width: "150px" }}
              />
              <h1>{name}</h1>
              <p>Location: {location}</p>
            </div>
            <div className="">
              {bio && (
                <Fragment>
                  <h3>Bio:</h3>
                  <p>{bio}</p>
                </Fragment>
              )}
              <a
                href={html_url}
                className="btn btn-dark my-1"
                style={{
                  maxWidth: "250px",
                  maxHeight: "45px",
                  textAlign: "center",
                  textTransform: "capitalize",
                }}
              >
                Visit github profile
              </a>
              <ul>
                <li>
                  {login && (
                    <Fragment>
                      <strong>Username:</strong> {login}
                    </Fragment>
                  )}
                </li>
                <li>
                  {company && (
                    <Fragment>
                      <strong>Company:</strong> {company}
                    </Fragment>
                  )}
                  {blog && (
                    <Fragment>
                      <strong>Website:</strong> {blog}
                    </Fragment>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div
            className="card text-center"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className="bagde badge-primary btn">
              Followers: {followers}
            </div>
            <div className="bagde badge-success btn">
              Following: {following}
            </div>
            <div className="bagde badge-danger btn">
              Public repos: {public_repos}
            </div>
            <div className="bagde badge-dark btn">
              Public gists: {public_gists}
            </div>
          </div>
          <Repos repos={repos} />
        </Fragment>
      );
    }
    return <Spinner />;
  }
}

export default User;

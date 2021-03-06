import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import axios from "axios"
import { About } from './components/pages/About'
import Search from "./components/users/Search";
import { Alert } from "./components/layout/Alert";
import User from "./components/users/User";

class App extends Component {

  state = {
    users: [],
    repos: [],
    loading: false,
    alert: null,
    user: {}
  }

  // async componentDidMount() {
  //   this.setState({loading: true})

  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
  //   this.setState({
  //     users: res.data,
  //     loading:false
  //   })
  // }


  // search github users
  searchUsers = async (text) => {
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/search/users?q=${text}`)
    this.setState({
      users: res.data.items,
      loading: false
    })
  }
  // get single user
  getUser = async (username) => {
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/users/${username}`)
    this.setState({ user: res.data })
    this.setState({ loading: false })
  }
  // get user repositories
getUserRepos = async (username) => {
  this.setState({ loading: true })
  const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`)
  this.setState({ repos: res.data })
  this.setState({ loading: false })
}
  clearUsers = () => {
    this.setState({ user: [], loading: false })
  }
  // Alert component
  setAlert = (msg, type) => {
    this.setState({
      alert: {
        msg,
        type
      }
    })
    setTimeout(() => { this.setState({ alert: null }) }, 3000)
  }
  createFaIcon = (icon) =>
    typeof icon === "string" ? (
      <i className={icon}></i>
    ) : (
        console.log("%c Wrong createFaIcon parameter", "color: red")
      );
  render() {
    const { loading, users, alert, user, repos } = this.state
    return (
      <Router>
        <div className="App">
          <Navbar
            title="Github Finder"
            icon={this.createFaIcon("fab fa-github")}
          />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route path='/' exact render={props => (
                <Fragment>
                  <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={users.length > 0 ? true : false} setAlert={this.setAlert} />
                  <Users loading={loading} users={users} />
                </Fragment>
              )}></Route>
              <Route path='/about' exact component={About} />
              <Route path='/user/:login' exact render={props => (
                // following spread operator inherits whatever props are passed as render parameter
                <User {...props} getUser={this.getUser} user={user} getUserRepos={this.getUserRepos} repos={repos} loading={loading} />
              )}></Route>
            </Switch>

          </div>
        </div>
      </Router>
    );
  }
}

export default App;

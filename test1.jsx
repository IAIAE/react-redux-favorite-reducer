import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

const ACTIVE = { color: 'red' }

class App extends Component {
  render() {
    return (
      <div>
        <h1>我的路由</h1>
        <ul>
          <li><Link to="/" activeStyle={ACTIVE}>首页</Link></li>
          <li><Link to="/users" activeStyle={ACTIVE}>用户页</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

class Index extends React.Component {
  render() {
    return (
      <div>
        <h2>Index!</h2>
      </div>
    )
  }
}

class Users extends React.Component {
  render() {
    return (
      <div>
        <h2>Users</h2>
      </div>
    )
  }
}

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index}/>
      <Route path="users" component={Users}></Route>
    </Route>
  </Router>
), document.getElementById('root'))
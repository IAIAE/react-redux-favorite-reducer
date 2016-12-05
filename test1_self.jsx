import React, { Component } from 'react'
import {render} from 'react-dom'
import {Router, Route, hashHistory, Redirect, IndexRedirect, Link, browserHistory} from 'react-router'


var Index = (props) => {
    console.info(props.location.query);
    return (

        <div>{props.children}
        <Link to="Info">Index</Link>
            <div>Index</div>
            <button onClick={()=>{console.info(hashHistory)}}>go to Info</button>
        </div>
    );
}
var User = () => {
    return (
        <div>User</div>    
    );
}
var Info = () => {
    return (
        <div>Info
            <Link to="User">fdsfs</Link>
        </div>    
    );
}

render(
    <Router history={hashHistory} >
        <Route path="/" component={Index} >
            <Route path="/User" component={User}></Route>
            <Route path="/Info" component={Info} onLeave={window.prompt.bind(null,'是否离开')}>
            </Route>
        </Route>
        
    </Router>
    ,document.getElementById('root')    
);




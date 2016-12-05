import React, {Component} from 'react';
import redux, {createStore, combineReducers, applyMiddleware, bindActionCreators} from 'redux';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import * as _ from 'underscore';
import * as $ from 'jquery';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';




let countReducer = (state = 0, action) => {
    switch(action.type){
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
};

let messageReducer = (state = [], action) => {
    switch(action.type){
        case 'ANGRY':
        case 'INCREMENT':
            cosnole.info('increment in message: ',state);
            return [...state, 'oh!shit!'];
        default:
            return state;
    }
}

let ajax = (state = {
    isFetching: false,
    json: null
}, action) => {
    switch(action.type){
        case 'fetching':
            return {...state, isFetching:true, json: null};
        case 'recieve':
            return {...state, isFetching: false, json: action.json}
        case 'ajaxError':
            return {...state, isFetching: false, json: action.msg};
        default:
            return state;
    }
}



let mainReducer = combineReducers({
    count: countReducer,
    message: messageReducer,
    ajax
});

let store = applyMiddleware(thunk, promiseMiddleware)(createStore)(mainReducer);


const creator = type => { 
    return { type: type };
};



// +++++++++++++++++++
// +++++++++++++++++++
// +++++++++++++++++++
// +++++++++++++++++++
// +++++++++++++++++++
// +++++++++++++++++++
// +++++++++++++++++++


var Button = ({count, _onClick}) => {
    return (
        <button onClick={_onClick}> click++ {count}</button>
    );
}


Button = connect(null,(dispatch) => bindActionCreators({
    _onClick: () => {return {type: 'INCREMENT'};}
}, dispatch))(Button);


class RootView extends Component{
    render(){
        var count = this.props.count,
            json = this.props.json,
            isFetching = this.props.isFetching;
        return (
            <div>
                <h1>{count}</h1>
                <Button count={count}></Button>
                <button onClick={this.props.getAjaxUrl.bind(null,'test')}>getUrl</button>
                <div>fetching? {isFetching===false?'false':'true'}</div>
                <div>{json&&json.url}</div>
            </div>
        );
    }
}
var ajaxGet = (jsonName) => (dispatch, getState) => {
    dispatch({type: 'fetching'});
    
    $.ajax({
        type:'get',
        url:`http://localhost:3008/test/${jsonName}.json`,
        success: data=>{
            dispatch({type:'recieve',json:data});
        },
        error: err => {
            dispatch({type:'ajaxError',msg:err});
        }
    });
}

var ajaxGet2 = (jsonName) => new Promise(function(resolve, reject){
    $.ajax({
        type:'get',
        url:`http://localhost:3008/test/${jsonName}.json`,
        success: data=>{
            console.info('resolve')
            resolve({type:'recieve',json:data});
        },
        error: err => {
            reject({type:'ajaxError',msg:err});
        }
    });
});

RootView = connect((state)=>{
    console.info('connect: ',state);
    return {
        count: state.count,
        json: state.ajax.json,
        isFetching: state.ajax.isFetching
    };
},(dispatch)=>{
    return bindActionCreators({
        getAjaxUrl: ajaxGet2
    } ,dispatch);
})(RootView);

ReactDOM.render(
    <Provider store={store}>
        <RootView />
    </Provider>,
    document.getElementById('root')
);


/**
 * 一下这一块只是用来测试手写的applyMiddleware的
 * 用于阐释applyMiddleware的机制
 * @return {} 
 */
var _applyMiddleware = function(){
    var middlewares = _.toArray(arguments);
    middlewares = middlewares.reverse()
    var next = function(action){console.info('orginal dispatch'+action);return action;};
    _.each(middlewares, (middle) => {
        next = middle(next);
    })
    return next;
}

var oneMiddle = (next) =>{
    return function(action){
        console.info('one');
        action+='one';
        return next(action);
    }
}
var twoMiddle = (next) =>{
    return function(action){
        console.info('two')
        action+='two'
        return next(action);
    }
}

var testfunc = _applyMiddleware(oneMiddle,twoMiddle);
console.info(testfunc('test'))







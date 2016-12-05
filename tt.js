var {createStore,combineReducers}  = require('redux')

var countReducer = (state=0,action)=>{
    if(action.type == 'test'){
        return state+1;
    }
    return state;
}

var messageReducer = (state = '', action)=>{
    if(action.type == 'test'){
        return state + 'hello ';
    }
    return state;
}


var store = createStore(combineReducers({
    count: countReducer,
    message: messageReducer
}));

store.dispatch({type:'test'});
console.info(store.getState());
store.dispatch({type:'test'});
console.info(store.getState());
store.dispatch({type:'test'});
console.info(store.getState());


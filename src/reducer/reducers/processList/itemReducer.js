import CONSTANT from 'util/constant.js';
import {combineReducers} from 'redux'


var actionCreator = (creator) => (type) => (state='',action)=>{
    if(action.type === type){
        return creator(state,action);
    }else{
        return state;
    }
}
var plainActionCreator = actionCreator((state, action)=>{
    return action.preload;
});
var name = plainActionCreator('processList/setName'),
    detail = plainActionCreator('processList/setDetail');
var age = actionCreator((state,action)=>(+state)+1)('processList/increaseAge')

var processListItemReducer = combineReducers({
    name,
    age,
    detail
});

export {
    processListItemReducer
}
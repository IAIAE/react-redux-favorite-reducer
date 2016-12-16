import CONSTANT from '../../util/constant.js';
import {actionTypeIn, actionTypeIs} from '../actionType.js';
import {processListItemReducer} from '../reducers/processList/itemReducer.js';

var originalFormulaCase = (state,action)=>{
    return actionTypeIs(action.type, CONSTANT.SET_ORIGINAL_FORMULA) && action.payload;
}
var methodCase = (state,action)=>{
    return actionTypeIs(action.type, CONSTANT.SET_METHOD) && action.payload;
}
var resultFormulaCase = (state, action)=>{
    return actionTypeIs(action.type, CONSTANT.SET_RESULT_FORMULA) && action.payload;
}
var allResultSetCase = (whichProperty) => (state, action)=>{
    return actionTypeIs(action.type, CONSTANT.SET_RESULT_ALL) && action.payload[whichProperty]
}
var processListSetAllCase = (state, action)=>{
    return actionTypeIs(action.type, CONSTANT.SET_PROCESS_LIST_ALL) && [...action.payload];
}
var processListSetCase  = (state, action)=>{
    if(actionTypeIn(action.type, 'processList')){
        var nextState = [...state];
        // console.info(action.payload)
        nextState[action.index] = processListItemReducer(state[action.index], action);
        // console.info('npm  is : ',nextState)
        return nextState;
    }else{
        return false;
    }
}

var processMsgCase = (state, action) => {
    return action.type === CONSTANT.SET_PROCESS_MESSAGE && action.payload;
}


export {
    originalFormulaCase,
    methodCase,
    resultFormulaCase,
    allResultSetCase,
    processListSetAllCase,
    processMsgCase,
    processListSetCase
}


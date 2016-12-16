import {combineReducers} from 'redux'
import {takeWhileTrue} from '../../util/sugar.js';

import {originalFormulaCase,
    methodCase,
    resultFormulaCase,
    allResultSetCase,
    processListSetAllCase,
    processMsgCase,
    processListSetCase} from '../cases/demoCases.js';
import {actionTypeIn, actionTypeIs} from '../actionType.js';


var originalFormulaReducer = (state='', action)=>{
    var nextState = takeWhileTrue(originalFormulaCase,allResultSetCase('originalFormula'))(state,action);
    return nextState === false ? state:nextState;
};
var methodReducer = (state='',action)=>{
    var nextState = takeWhileTrue(methodCase, allResultSetCase('method'))(state,action);
    return nextState === false ? state:nextState;
}
var resultFormulaReducer = (state='',action)=>{
    var nextState = takeWhileTrue(resultFormulaCase, allResultSetCase('resultFormula'))(state,action);
    return nextState === false ? state:nextState;
}
var processListReducer = (state = [], action) => {
    return takeWhileTrue(
        processListSetAllCase,
        processListSetCase
        )(state,action) || state;
};
var processMsgReducer = (state='', action)=>{
    var nextState = takeWhileTrue(processMsgCase)(state,action);
    return nextState === false ? state:nextState;
}
var processReducer = combineReducers({
    list: processListReducer,
    msg: processMsgReducer
});

export {
    originalFormulaReducer,
    methodReducer,
    resultFormulaReducer,
    processReducer
}
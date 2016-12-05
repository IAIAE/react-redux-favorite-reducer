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
    return takeWhileTrue(originalFormulaCase,allResultSetCase('originalFormula'))(state,action) || state;
};
var methodReducer = (state='',action)=>{
    return takeWhileTrue(methodCase,allResultSetCase('method'))(state,action) || state;
}
var resultFormulaReducer = (state='',action)=>{
    return takeWhileTrue(resultFormulaCase,allResultSetCase('resultFormula'))(state,action) || state;
}
var processListReducer = (state = [], action) => {
    return takeWhileTrue(
        processListSetAllCase,
        processListSetCase
        )(state,action) || state;
};
var processMsgReducer = (state='', action)=>{
    return takeWhileTrue(processMsgCase)(state, action) || state
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
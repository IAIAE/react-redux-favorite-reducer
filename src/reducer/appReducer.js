import {combineReducers} from 'redux';

import {resultFormulaReducer,
    methodReducer,
    originalFormulaReducer,
    processReducer
    } from './reducers/demoReducers.js';

import _ from 'underscore';

var appReducer = combineReducers({
    resultFormula: resultFormulaReducer,
    method: methodReducer,
    originalFormula: originalFormulaReducer,
    process: processReducer
});
export default appReducer;
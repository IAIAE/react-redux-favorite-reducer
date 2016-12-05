#Reducer structure in this boilerplate
just for learn. FYI

```javascript
// for a store structure below:
var store = {
    name:{
        firstName:'',
        lastName:''
    },
    age: 12,
    detail:{
        payList:[
            {
                time:'',
                money:'',
                whichBank:''
            }
        ]
    }
}
```
a reducer structure will be designed like below:
```javascript 
var appReducer = combineReducers({
    name: nameReducer,
    age: ageReducer,
    detail: detailReducer
});

/**
 * nameReducer
 */
var nameReducer = combineReducer({
    firstName: firstNameReducer,
    lastName: lastNameReducer
});

/**
 * firstNameReducer
 * takeWhileTrue return the first case that return is not false. if all the case not match, takeWhileTrue will return false also.
 */
var firstNameReducer = (state='', action) => {
    return takeWhileTrue(firstNameCase)(state, action) || state;
} 

/**
 * firstNameCase
 * the action is preciated a SFA but not nessary.
 * a Case determin whether a action is in it's case, if ture return nextState, otherwise return false
 */
var firstNameCase = (state, action) => {
    return (actionTypeIs(action.type, 'setFirstName')) && action.preload;
} 
```

how to deal with the list-like data? such as the `payList` in `store`. what if there a complex data in a array?
```javascript
var payListReducer = (state=[], action) => {
    return takeWhileTrue(wholeListCase, listItemCase)(state, action) || state;
}

var wholeListCase = (state, action) => {
    return (actionTypeIs(action.type, 'setPayList')) && action.preload;
}

var listItemCase = (state, action) => {
    if(actionTypeIn(action.type, 'payList')){
        var nextState = [...state];
        nextState[action.index] = payListItemReducer(state[action.index], action);
        return nextState;
    }else{
        return false;
    }
}

var payListItemReducer = combineReducers({
    time,
    money,
    whichBank
});
```


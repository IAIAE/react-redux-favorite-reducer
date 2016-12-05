import redux, {createStore} from 'redux'
import {Provider, connect} from 'react-redux'
import RootView from 'component/RootView.jsx'
import appReducer from 'reducer/appReducer.js'
import DevTool from 'component/devtool'

const enhancer = DevTool.instrument();
var store = createStore(appReducer, enhancer);
var app;
if(__DEV__){
    app = ReactDom.render(
        <Provider store={store}>
        <div>
          <RootView />
          <DevTool />
        </div>
        </Provider>,
        document.getElementById('root'));
}else{   
    app = ReactDom.render(
        <Provider store={store}>
          <RootView />
        </Provider>,
        document.getElementById('root'));
}
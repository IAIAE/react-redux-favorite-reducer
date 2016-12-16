import {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import CONSTANT from '../util/constant.js';


class RootView extends Component{
    componentWillMount(){
        console.info('rootview componentWillMount');
    }
    componentDidMount(){
        console.info('rootview componentDidMount');
        console.info(ReactDom.findDOMNode(this));
    }
    componentWillReceiveProps(nextProps){
        console.info('rootview componentWillReceiveProps');
        // console.info(nextProps);
        // console.info(this.props);
    }
    shouldComponentUpdate(nextProps,nextState){
        console.info('rootview shouldComponentUpdate');
        // console.info(nextProps);
        // console.info(props);
        return true;
    }
    componentWillUpdate(nextProps,nextState){
        console.info('rootview componentWillUpdate');
    }
    componentDidUpdate(prevProps, prevState){
        console.info('rootview componentDidUpdate');
    }
    setProcess(){
        var data = [{
            name:'caorunqi',
            age:28,
            detail:'hello world'
        },{
            name:'caichenyang',
            age:24,
            detail:'change the world'
        },{
            name:'zhangsong',
            age:26,
            detail:'change the world'
        }]
        this.props.setProcess(data);
    }
    render(){
        console.info('rootview render');
        return <div>
            <h1>计算 {this.props.originalFormula}</h1>
            <h1>方法 {this.props.method}</h1>
            <h1>结果 {this.props.resultFormula}</h1>
            <h1>过程:</h1>
            <ul>{this.props.process.list.map((item, index)=>
                <li key={index}
                    style={{cursor:'pointer'}}>
                    <p 
                        onClick={this.props.changeProcessItem.bind(null,index,'setName')}
                        >name: {item.name}</p>
                    <p onClick={this.props.increaseAge.bind(null,index)}
                        >age: {item.age}</p>
                    <p onClick={this.props.changeProcessItem.bind(null,index,'setDetail')}
                        >detail: {item.detail}</p>
                </li>)}
            </ul>
            <button 
                onClick={this.props.setMethod.bind(null,'高斯消元法')}>
                设置方法</button>
            <button 
                onClick={this.props.setResultAll.bind(null,'x+1=2','换元法','x=1')}>
                result一起设置了</button>
            <button 
                onClick={this.setProcess.bind(this)}>
                设置process</button>
        </div>
    }
}
var mapStateToProps = (state)=>{
    return {
        originalFormula: state.originalFormula,
        method: state.method,
        resultFormula: state.resultFormula,
        process: state.process
    };
};
var mapDispatchToProps = (dispatch) => bindActionCreators({
    setMethod(method){
        return {
            type: CONSTANT.SET_METHOD,
            payload: method
        };
    },
    setResultAll(originalFormula, method, resultFormula){
        return {
            type: CONSTANT.SET_RESULT_ALL,
            payload:{
                originalFormula,
                method,
                resultFormula
            }
        }
    },
    setProcess(mapObj){
        return {
            type:CONSTANT.SET_PROCESS_LIST_ALL,
            payload:mapObj
        };
    },
    changeProcessItem(index, whichone){
        return {
            type:'processList/'+whichone,
            index:index,
            payload: 'this is a '+whichone.substring(3)
        }
    },
    increaseAge(index){
        return {
            type:'processList/increaseAge',
            index:index
        }
    }
},dispatch);


export default connect(mapStateToProps,mapDispatchToProps)(RootView);
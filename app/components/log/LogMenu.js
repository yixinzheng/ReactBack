import React from 'react';
import MenuBox from '../common/MenuBox';
class LogMenu extends React.Component{
    constructor(props){
        super(props);
        this.menulist= [{
            links:"/logsetting",
            title:"操作日志"
        },{
            links:"/logsetting/LogMsg",
            title:"短信日志"
        }];

        this.state={
            current:this.props.current?this.props.current:"1"
        };
    }

    render(){
        return (
            <MenuBox menulist={this.menulist} current={this.state.current}/>
        )
    }
}


export default LogMenu;


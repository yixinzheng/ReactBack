import React from 'react';
import MenuBox from '../common/MenuBox';
class AppMenu extends React.Component{
    constructor(props){
        super(props);
        this.menulist= [{
            links:"/comsetting",
            title:"基本设置"
        },{
            links:"/comsetting/logo",
            title:"Logo设置"
        },{
            links:"/comsetting/banner",
            title:"Banner设置"
        },{
            links:"/comsetting/outtime",
            title:"超时设置"
        },{
            links:"/comsetting/hotsearch",
            title:"热门搜索"
        },{
            links:"/comsetting/ad",
            title:"广告位"
        },{
            links:"/comsetting/mail",
            title:"邮箱设置"
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


export default AppMenu;




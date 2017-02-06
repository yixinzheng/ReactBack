import React from 'react';
import Header from './header';
import '../public/myStyle.scss';


// 引入React-Router模块
import { Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from 'react-router';

// 引入Antd的导航组件
import { Menu, Icon,Breadcrumb } from 'antd';
const SubMenu = Menu.SubMenu;

// 引入Ant-Design样式 & Animate.CSS样式
import 'animate.css/animate.min.css'
import {UserModel} from '../Datas/dataModel';

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            current: '',
            username:UserModel.fetchUserName()
        }
    }
    handleClick(e){
        this.setState({
            current: e.key
        })
    }

    componentDidMount() {
        this.getUser()
    }

    getUser(){
        let token= UserModel.fetchToken();
        if(!token){
            location.hash='/';
            return ;
        }
    }
    render(){
        return (
            <div>
                <Header />
                <div>
                    <div id="leftMenu">
                        <span className="left-title">Welcome {this.state.username}</span>
                        <Menu theme="dark"
                              onClick={(e)=>this.handleClick(e)}
                              defaultOpenKeys={['sub1', 'sub2']}
                              defaultSelectedKeys={[this.state.current]}
                              mode="inline"
                            >
                            <SubMenu key="sub1" title={<span><Icon type="mail" /><span>网站管理</span></span>}>
                                <Menu.Item key="1"><Link to="/floors">楼层管理</Link></Menu.Item>
                                <Menu.Item key="2"><Link to="/order">订单管理</Link></Menu.Item>
                                <Menu.Item key="3"><Link to={{pathname:"/sale",query:{type:"1"}}}>售后管理</Link></Menu.Item>
                                <Menu.Item key="4"><Link to="/product">产品管理</Link></Menu.Item>
                                <Menu.Item key="5"><Link to="/funds">资金管理</Link></Menu.Item>
                                <Menu.Item key="6"><Link to="/vip">会员管理</Link></Menu.Item>
                                <Menu.Item key="7"><Link to="/article">文章管理</Link></Menu.Item>
                                <Menu.Item key="8"><Link to="/members">员工管理</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>控制面板</span></span>}>
                                <Menu.Item key="9"><Link to="/comsetting">基本设置</Link></Menu.Item>
                                <Menu.Item key="10"><Link to="/apps">APP设置</Link></Menu.Item>
                                <Menu.Item key="11"><Link to="/logsetting">日志管理</Link></Menu.Item>
                                <Menu.Item key="12"><Link to="/advice">意见反馈</Link></Menu.Item>
                            </SubMenu>
                        </Menu>
                    </div>
                    <div id="rightWrap">
                        <div className="right-box">
                            <Breadcrumb params={this.props.params} routes={this.props.routes}/>
                            <div className="main">
                                { this.props.children }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
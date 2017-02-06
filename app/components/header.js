import React from 'react';
import {Row,Col,Icon} from 'antd';
import {Link} from 'react-router';
import {UserModel} from '../Datas/dataModel';

export default class Header extends React.Component{
    constructor(props){
        super(props);
        this.handClearUser=this.handClearUser.bind(this);
    }
    handClearUser(){
       UserModel.clearToken();
        location.hash='/login';
    }
    render(){
        return (
            <div className="header">
                <Row>
                    <Col span={6} className="txt-center h-logo">
                        点击母婴商城后台管理系统
                    </Col>
                    <Col span={12}>
                    </Col>
                    <Col span={2}>
                        <a href="http://my.djmall.xmisp.cn/"  className="h-col">
                            <Icon type="home" /><br/>
                            商城首页
                        </a>
                    </Col>
                    <Col span={2} className="h-col">
                        <Icon type="unlock" /><br/>
                        修改密码
                    </Col>
                    <Col span={2} className="h-col" onClick={this.handClearUser}>
                        <Icon type="poweroff" /><br/>
                        退出系统
                    </Col>
                </Row>
            </div>
        )
    }
}
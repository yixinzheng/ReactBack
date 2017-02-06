import React from 'react';
// 引入React-Router模块
import { Router, Route, Link, hashHistory, IndexRoute, Redirect, IndexLink} from 'react-router';
import {Card,Rate,Col, Row} from 'antd';
var colors=['#6ccac9','#f8d347','#3bc4f7','#57c8f2','#ff6d60','#b3d465'];
//import Mechart from './Mechart';

class Tcard extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className="main-c1 clearfix">
                <div className="main-card" style={{'border':'1px solid','borderColor':colors[0]}}>
                    <div className="main-card-head"  style={{'backgroundColor':colors[0]}}>
                        发货待办
                    </div>
                    <div className="main-card-extra">
                        <a href="#">查看全部</a>
                    </div>
                    <table className="main-table" cellSpacing="0" cellPadding="0">
                        <thead>
                        <tr>
                            <td>下单时间</td>
                            <td>订单号</td>
                            <td>金 额</td>
                            <td>数 量</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>2016-12-07</td>
                            <td>1481097841</td>
                            <td>298.00元</td>
                            <td>1件</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="main-card" style={{'border':'1px solid','borderColor':colors[1]}}>
                    <div className="main-card-head"  style={{'backgroundColor':colors[1]}}>
                        发货待办
                    </div>
                    <div className="main-card-extra">
                        <a href="#">查看全部</a>
                    </div>
                    <table className="main-table"  cellSpacing="0" cellPadding="0">
                        <thead>
                        <tr>
                            <td>评论时间</td>
                            <td>内容</td>
                            <td>等级</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>2016-12-07</td>
                            <td>1481097841</td>
                            <td>
                                <Rate disabled defaultValue={2}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="main-card" style={{'border':'1px solid','borderColor':colors[2]}}>
                    <div className="main-card-head" style={{'backgroundColor':colors[2]}}>
                        售后待办
                    </div>
                    <div className="main-card-extra">
                        <a href="#">查看全部</a>
                    </div>
                    <table className="main-table" cellSpacing="0" cellPadding="0">
                        <thead>
                        <tr>
                            <td>时 间</td>
                            <td>售后编号</td>
                            <td>类 型</td>
                            <td>理 由</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>2016-12-07</td>
                            <td>1481097841</td>
                            <td>d</td>
                            <td>等级</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

class Scard extends React.Component{
    render(){
        return (
            <div className="main-c1 clearfix">
                <div className="main-card" style={{'border':'1px solid','borderColor':colors[3]}}>
                    <div className="main-card-head"  style={{'backgroundColor':colors[3]}}>
                        商品统计
                    </div>
                    <div className="main-cont">
                        <a href="#" className="main-cicle"  style={{'border':'3px solid',color:colors[3],'borderColor':colors[3]}}>
                            <p className="p1">38</p>
                            <p className="p2">上架商品</p>
                        </a>
                        <a href="#" className="main-cicle"  style={{'border':'3px solid',color:colors[3],'borderColor':colors[3]}}>
                            <p className="p1">38</p>
                            <p className="p2">下架商品</p>
                        </a>
                    </div>
                </div>
                <div className="main-card" style={{'border':'1px solid','borderColor':colors[4]}}>
                    <div className="main-card-head"  style={{'backgroundColor':colors[4]}}>
                        会员统计
                    </div>
                    <div className="main-cont">
                        <a href="#" className="main-cicle"  style={{'border':'3px solid',color:colors[4],'borderColor':colors[4]}}>
                            <p className="p1">38</p>
                            <p className="p2">昨日新增</p>
                        </a>
                        <a href="#" className="main-cicle"  style={{'border':'3px solid',color:colors[4],'borderColor':colors[4]}}>
                            <p className="p1">38</p>
                            <p className="p2">累计注册</p>
                        </a>
                    </div>
                </div>
                <div className="main-card" style={{'border':'1px solid','borderColor':colors[5]}}>
                    <div className="main-card-head"  style={{'backgroundColor':colors[5]}}>
                        订单统计
                    </div>
                    <div className="main-cont">
                        <a href="#" className="main-cicle"  style={{'border':'3px solid',color:colors[5],'borderColor':colors[5]}}>
                            <p className="p1">38</p>
                            <p className="p2">昨日订单</p>
                        </a>
                        <a href="#" className="main-cicle"  style={{'border':'3px solid',color:colors[5],'borderColor':colors[5]}}>
                            <p className="p1">38</p>
                            <p className="p2">累计订单</p>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}


export default class MainList extends React.Component {


    render() {
        var dataSet=[100,20,30,0,0,0,120,11,333,444,555,55];
        return (
            <div className="main clearfix">
                <Tcard />
                <Scard />
                {/*<Mechart name="world" data={dataSet} color={colors[2]}/>*/}
            </div>
        )
    }
}
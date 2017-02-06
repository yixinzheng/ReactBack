import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,IndexRoute,Link,hashHistory} from 'react-router';
import {UserModel} from './Datas/dataModel';
import App from './components/app';
import Login from './components/login/login';
import MainList from './components/main/mainlist';
import CommonBox from './components/common/CommonBox';

import SettingOne from './components/setting/SettingOne';
import SettingMail from './components/setting/SettingMail';
import SettingAd from './components/setting/SettingAd';
import SettingTime from './components/setting/SettingTime';
import SettingLogo from './components/setting/SettingLogo';
import SettingBanner from './components/setting/SettingBanner';
import SettingSearch from './components/setting/SettingSearch';

import SettingHome from './components/apps/SettingHome';
import SettingAndroid from './components/apps/SettingAndroid';
import SettingIos from './components/apps/SettingIos';
import SettingShare from './components/apps/SettingShare';
import AppModel from './components/apps/AppModel';
import AppProduct from './components/apps/AppProduct';


import LogAction from './components/log/LogAction';
import LogMsg from './components/log/LogMsg';

import Advice from './components/advice/Advice';
import AdviceDetail from './components/advice/AdviceDetail';

import Floors from './components/floors/Floors';

import OrderAll from './components/orders/OrderAll';
import OrderComment from './components/orders/OrderComment';
import OrderDetail from './components/orders/OrderDetail';

import SaleAll from './components/sales/SaleAll';
import SaleView from './components/sales/SaleView';
import SaleDialog from './components/sales/SaleDialog';

import ProductAll from './components/products/ProductAll';
import ProductType from './components/products/ProductType';
import ProductFreight from './components/products/ProductFreight';
import ProductShelves from './components/products/ProductShelves';
import ProductBrand from './components/products/ProductBrand';
import ProductStock from './components/products/ProductStock';
import ProductAdd from './components/products/ProductAdd';
import TypeAdd from './components/products/TypeAdd';
import AttrAdd from './components/products/AttrAdd';

import Funds from './components/fund/Funds';

import VipManage from './components/vip/VipManage';
import VipLevel from './components/vip/VipLevel';
import VipInfo from './components/vip/VipInfo';
import VipOrder from './components/vip/VipOrder';
import VipFund from './components/vip/VipFund';
import VipPoint from './components/vip/VipPoint';
import VipExp from './components/vip/VipExp';
import VipLevelDetail from './components/vip/VipLevelDetail';

import Members from './components/members/Members';
import MembersDetail from './components/members/MembersDetail';

import PageCommon from './components/article/PageCommon';
import Page from './components/article/Page';
import PageList from './components/article/PageList';
import PageListAdd from './components/article/PageListAdd';
import PageSort from './components/article/PageSort';
import HelpCommon from './components/article/HelpCommon';
import Help from './components/article/Help';
import HelpList from './components/article/HelpList';
import HelpListAdd from './components/article/HelpListAdd';
import HelpSort from './components/article/HelpSort';
import NewsCommon from './components/article/NewsCommon';
import News from './components/article/News';
import NewsList from './components/article/NewsList';
import NewsListAdd from './components/article/NewsListAdd';
import NewsSort from './components/article/NewsSort';
import HeadLinesCommon from './components/article/HeadLinesCommon';
import HeadLines from './components/article/HeadLines';
import HeadLinesList from './components/article/HeadLinesList';
import HeadLinesListAdd from './components/article/HeadLinesListAdd';
import HeadLinesSort from './components/article/HeadLinesSort';

class MyRoute extends React.Component {
    requireAuth(nextState, replace) {
        if (!UserModel.fetchToken()) {
            replace({
                pathname: '/login',
                state: {nextPathname: nextState.location.pathname}
            })
        }
    }

    loginAuth(nextState, replace) {
        if (UserModel.fetchToken()) {
            replace({
                pathname: '/',
                state: {nextPathname: nextState.location.pathname}
            })
        }
    }

    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/login" component={Login} onEnter={this.loginAuth}/>
                <Route path="/" breadcrumbName="网站首页" component={App} onEnter={this.requireAuth}>
                    <IndexRoute breadcrumbName="控制面板" component={MainList}/>
                    <Route path="/comsetting" component={CommonBox}>
                        <IndexRoute component={SettingOne} breadcrumbName="基本设置"></IndexRoute>
                        <Route path="logo" breadcrumbName="Logo设置" component={SettingLogo}></Route>
                        <Route path="banner" breadcrumbName="Banner设置" component={SettingBanner}></Route>
                        <Route path="outtime" breadcrumbName="超时设置" component={SettingTime}></Route>
                        <Route path="hotsearch" breadcrumbName="热门搜索" component={SettingSearch}></Route>
                        <Route path="ad" breadcrumbName="广告位" component={SettingAd}></Route>
                        <Route path="mail" breadcrumbName="邮箱设置" component={SettingMail}></Route>
                    </Route>
                    <Route path="/apps" component={CommonBox}>
                        <IndexRoute component={SettingHome} ></IndexRoute>
                        <Route path="home" breadcrumbName="APP首页" component={CommonBox}>
                            <IndexRoute component={SettingHome} ></IndexRoute>
                            <Route path="model(/:id)" breadcrumbName="模板类型" component={AppModel}></Route>
                            <Route path="product(/:id)" breadcrumbName="产品" component={AppProduct}></Route>
                        </Route>
                        <Route path="android" breadcrumbName="安卓APP版本" component={SettingAndroid}></Route>
                        <Route path="ios" breadcrumbName="IosAPP版本" component={SettingIos}></Route>
                        <Route path="share" breadcrumbName="分享设置" component={SettingShare}></Route>
                    </Route>
                    <Route path="/logsetting" component={CommonBox}>
                        <IndexRoute component={LogAction} breadcrumbName="操作日志"></IndexRoute>
                        <Route path="LogMsg" breadcrumbName="短信日志" component={LogMsg}></Route>
                    </Route>
                    <Route path="/advice" breadcrumbName="意见反馈" component={CommonBox}>
                        <IndexRoute component={Advice}></IndexRoute>
                        <Route path="AdviceDetail" breadcrumbName="意见详情" component={AdviceDetail}></Route>
                    </Route>
                    <Route path="/floors" component={CommonBox}>
                        <IndexRoute breadcrumbName="楼层管理" component={Floors}></IndexRoute>
                    </Route>
                    <Route path="/order" component={CommonBox}>
                        <Route breadcrumbName="订单管理" component={CommonBox}>
                            <IndexRoute component={OrderAll}></IndexRoute>
                            <Route path="detail" breadcrumbName="订单详情" component={OrderDetail}></Route>
                        </Route>
                        <Route path="comment" breadcrumbName="评论审核" component={OrderComment}></Route>
                    </Route>
                    <Route path="/sale" breadcrumbName="售后管理" component={CommonBox}>
                        <IndexRoute component={SaleAll}></IndexRoute>
                        <Route path="detail(/:id)" component={CommonBox}>
                            <IndexRoute component={SaleView} breadcrumbName="详情"></IndexRoute>
                            <Route path="/sale/detail/dialog(/:id)" component={SaleDialog} breadcrumbName="对话"></Route>
                        </Route>
                        <Route  path="refunds" component={SaleAll}></Route>
                    </Route>

                    <Route path="/product" component={CommonBox}>
                        <Route breadcrumbName="产品中心" component={CommonBox}>
                            <IndexRoute  component={ProductAll}></IndexRoute>
                            <Route path="detail" breadcrumbName="产品详情"component={ProductAdd}></Route>
                        </Route>
                        <Route path="types" breadcrumbName="产品分类" component={CommonBox}>
                            <IndexRoute  component={ProductType}></IndexRoute>
                            <Route path="category" breadcrumbName="分类管理"component={TypeAdd}></Route>
                            <Route path="attr" breadcrumbName="属性管理"component={AttrAdd}></Route>
                        </Route>
                        <Route path="freight" breadcrumbName="运费管理" component={ProductFreight}></Route>
                        <Route path="shelves" breadcrumbName="库存管理" component={ProductShelves}></Route>
                        <Route path="stock" breadcrumbName="下架管理" component={ProductStock}></Route>
                        <Route path="brand" breadcrumbName="品牌管理" component={ProductBrand}></Route>
                    </Route>
                    <Route path="/funds" breadcrumbName="资金管理" component={Funds}></Route>
                    <Route path="/vip" breadcrumbName="会员管理" component={CommonBox}>
                        <IndexRoute component={VipManage}></IndexRoute>
                        <Route path="/vip/detail(/:user_id)" component={CommonBox}>
                            <IndexRoute component={VipInfo} breadcrumbName="会员信息"></IndexRoute>
                            <Route path="/vip/detail/vipOrder(/:user_id)" breadcrumbName="订单信息"
                                   component={VipOrder}></Route>
                            <Route path="/vip/detail/vipFund(/:user_id)" breadcrumbName="资金信息"
                                   component={VipFund}></Route>
                            <Route path="/vip/detail/vipPoint(/:user_id)" breadcrumbName="积分信息"
                                   component={VipPoint}></Route>
                            <Route path="/vip/detail/vipExp(/:user_id)" breadcrumbName="经验信息"
                                   component={VipExp}></Route>
                        </Route>
                    </Route>
                    <Route path="/vip/level" breadcrumbName="会员等级" component={CommonBox}>
                        <IndexRoute component={VipLevel} ></IndexRoute>
                        <Route path="/vip/level/detail(/:user_id)" breadcrumbName="会员等级详情" component={VipLevelDetail}>
                        </Route>
                    </Route>
                    <Route path="/article" component={CommonBox}>
                        <Route component={PageCommon} breadcrumbName="文章管理">
                            <IndexRoute component={Page}></IndexRoute>
                            <Route path="page/pageList:cate_id" breadcrumbName="文章列表" component={PageList}></Route>
                            <Route path="page/article:action/(:id)" breadcrumbName="修改文章" component={PageListAdd}></Route>
                            <Route path="page/sort:type(/id=:id&name=:title)" breadcrumbName="添加文章分类"
                                   component={PageSort}></Route>
                        </Route>

                        <Route path="help" component={HelpCommon} breadcrumbName="帮助中心" >
                            <IndexRoute component={Help}></IndexRoute>
                            <Route path="helpList:id" breadcrumbName="帮助中心列表" component={HelpList}></Route>
                            <Route path="article:action/(:id)" breadcrumbName="修改帮助" component={HelpListAdd}></Route>
                            <Route path="sort:type(/id=:id&name=:title)" breadcrumbName="添加帮助分类"
                                   component={HelpSort}></Route>
                        </Route>
                        <Route path="news" component={NewsCommon} breadcrumbName="资讯管理">
                            <IndexRoute component={News}></IndexRoute>
                            <Route path="newsList:id" breadcrumbName="资讯管理中心" component={NewsList}></Route>
                            <Route path="article:action/(:id)" breadcrumbName="修改资讯" component={NewsListAdd}></Route>
                            <Route path="sort:type(/id=:id&name=:title)" breadcrumbName="添加资讯分类"
                                   component={NewsSort}></Route>
                        </Route>
                        <Route path="headLines" component={HeadLinesCommon} breadcrumbName="头条管理">
                            <IndexRoute component={HeadLines}></IndexRoute>
                            <Route path="headLinesList:id" breadcrumbName="头条管理中心" component={HeadLinesList}></Route>
                            <Route path="article:action/(:id)" breadcrumbName="修改头条"
                                   component={HeadLinesListAdd}></Route>
                            <Route path="sort:type(/id=:id&name=:title)" breadcrumbName="添加头条分类"
                                   component={HeadLinesSort}></Route>
                        </Route>
                    </Route>
                    <Route path="/members" breadcrumbName="员工管理" component={CommonBox}>
                        <IndexRoute component={Members}></IndexRoute>
                        <Route path="detail(/:id)" breadcrumbName="员工信息" component={MembersDetail}></Route>
                    </Route>
                </Route>
            </Router>
        )
    }
}

export default MyRoute;
import React from 'react';
import {Link} from 'react-router';
import {message,Row,Col,Modal,Button,Form,Input,Cascader } from 'antd';
import MenuBox from '../common/MenuBox';
import {SettingModel} from '../../Datas/dataModel';



const options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
        }],
    }],
}];
class OrderDetail extends React.Component{
    constructor(props){
        super(props);
        this.menulist= [{
            links:"/order/detail",
            title:"基本信息"
        }];
        this._isMounted = false;
        this.state={
            current:'1',
            addrVisible:false,
            order_id:this.props.location.query.id,
            orderInfo:[],
            goodsInfo:[],
            receiverInfo:[]
        };
    }
    componentWillReceiveProps(nextProps,prevProps){
        if(nextProps.location!=this.props.location){
            this.setState({
                order_id:nextProps.location.query.id
            },function(){
                this.fetchData();
            })
        }
    }
    fetchData(){
        let _p={"action":"getOrderDetail","order_id":this.state.order_id};
        SettingModel.fetchData(_p,_success=>{
            if(_success.status && this._isMounted){
                this.setState({
                    orderInfo:_success.result.orderInfo,
                    goodsInfo:_success.result.orderGoodsInfo,
                    receiverInfo:_success.result.receiverInfo,
                    loading:false
                })
            }else{
                message.warning(_success.result);
                history.back();
            }
        },_error=>{
            console.log(_error);
        });
    }
    componentWillMount(){
        this._isMounted = true;
        this.fetchData(this.state.page);
    }
    componentWillUnmount(){
        this._isMounted=false;
    }
    handleChangeAddr() {
        this.setState({
            addrVisible: false
        });
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const order=this.state.orderInfo,
            goods=this.state.goodsInfo,
            receiver=this.state.receiverInfo;
        let _list;
        if(goods!=""){
            _list=goods.orderGoodsRows.map((item,index)=>{
                return (
                    <tr key={index}>
                        <td>
                            <img src={item.image} className="tr-img" alt="" />
                        </td>
                        <td>
                            {item.title}
                        </td>
                        <td>{item.price}</td>
                        <td>{item.num}</td>
                        <td>{parseFloat(item.price)*parseFloat(item.num)}</td>
                    </tr>
                )
            });
        }
        return (
        <div>
            <MenuBox menulist={this.menulist} current={this.state.current}/>
            <div className="setting-ad">
                <table width="100%" className="setting-tb order-detail-tb" cellPadding="0" cellSpacing="0">
                    <tbody>
                    <tr>
                        <th colSpan="2" className="txt-left pdl30">订单信息</th>
                        <th className="txt-right pdr30">【打印订单】</th>
                    </tr>
                    <tr>
                        <td>订单状态：{order.status=="1"?"未付款":order.status=="2"?"待发货":order.status=="3"?"已发货":order.status=="4"?"待评价":order.status=="5"?"交易关闭":order.status=="6"?"交易成功":"全部"}</td>
                        <td>订单编号：{order.ordernum}</td>
                        <td>买家昵称：{order.username}</td>
                    </tr>
                    <tr>
                        <td>下单时间：{order.create_time}</td>
                        <td>订单金额：{order.money}</td>
                        <td>备注：{order.remark}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="setting-ad">
                <Modal title="改地址" visible={this.state.addrVisible}
                       onCancel={()=>this.setState({addrVisible:false})}
                       wrapClassName="vertical-center-modal"
                       footer={[
            <Button key="back" type="ghost" size="large" onClick={()=>this.setState({addrVisible:false})}>取消</Button>,
            <Button key="submit" type="primary" size="large"  onClick={()=>this.handleChangeAddr()}>
              保存修改
            </Button>
          ]}
                    >
                    <Row className="mgb30">
                        <Col span={4} className="txt-right">原地址：</Col>
                        <Col span={14}>

                        </Col>
                    </Row>
                    <Form>
                        <Row className="mgb30">
                            <Col span={4} className="txt-right">*地址：</Col>
                            <Col span={14}>
                                {getFieldDecorator('addr', {
                                    rules: [{ required: true, message: '请选择地址！' }]
                                })(
                                    <Cascader options={options} placeholder="请选择地址" />
                                )}
                            </Col>
                        </Row>
                        <Row className="mgb30">
                            <Col span={4} className="txt-right">*详细地址：：</Col>
                            <Col span={14}>
                                {getFieldDecorator('detail_addr', {
                                    rules: [{ required: true, message: '请选择详细地址：！' }]
                                })(
                                    <Input placeholder="请选择详细地址：" />
                                )}
                            </Col>
                        </Row>
                        <Row className="mgb30">
                            <Col span={4} className="txt-right">邮政编码：</Col>
                            <Col span={14}>
                                {getFieldDecorator('postcode')(
                                    <Input  placeholder="请输入邮政编码" />
                                )}
                            </Col>
                        </Row>
                        <Row className="mgb30">
                            <Col span={4} className="txt-right">*收货人姓名：</Col>
                            <Col span={14}>
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: '请填写收货人姓名！' }]
                                })(
                                    <Input placeholder="请填写收货人姓名" />
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={4} className="txt-right">手机号码：</Col>
                            <Col span={14}>
                                {getFieldDecorator('phone')(
                                    <Input placeholder="请填写手机号码" />
                                )}
                            </Col>
                        </Row>
                    </Form>
                </Modal>
                <table width="100%" className="setting-tb order-detail-tb" cellPadding="0" cellSpacing="0">
                    <tbody>
                    <tr>
                        <th colSpan="2" className="txt-left pdl30">收货信息</th>
                        <th className="txt-right pdr30"><span className="my-cursor" onClick={()=>this.setState({addrVisible:true})}>【编辑】</span></th>
                    </tr>
                    <tr>
                        <td>收货人：{receiver.receiver_name}</td>
                        <td>手机号码：{receiver.receiver_mobile}</td>
                        <td>收货地址：{receiver.receiver_address}</td>
                    </tr>
                    <tr>
                        <td>选择物流：{receiver.postname_select}</td>
                        <td>物流：{receiver.postname_send}</td>
                        <td>快递单号：{receiver.postnumber}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="setting-ad">
                <table width="100%" className="setting-tb" cellPadding="0" cellSpacing="0">
                    <tbody>
                    <tr>
                        <th colSpan="2">商品详情</th>
                        <th>下单价</th>
                        <th>数量</th>
                        <th>小计</th>
                    </tr>
                    {_list}
                    <tr className="border-none">
                        <td colSpan="3">
                        </td>
                        <td>{goods.count_num}</td>
                        <td>{goods.count_price}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        )
    }
}
OrderDetail = Form.create({})(OrderDetail);

export default OrderDetail;
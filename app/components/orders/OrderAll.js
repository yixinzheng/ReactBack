import React from 'react';
import {Link} from 'react-router';
import {Form,Input,Button,Row,Col,Icon,Select,Table,DatePicker,message} from 'antd';
import {SettingModel} from '../../Datas/dataModel';
import OrderMenu from './OrderMenu';
import MyDatePicker from '../common/MyDatePicker';
const FormItem = Form.Item;
const Option = Select.Option;

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state={
            startValue: '',
            endValue: '',
            status:this.props.fresh
        };
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    datePicker(fields){
        this.setState({
            startValue: fields.startValue?fields.startValue.valueOf():'',
            endValue: fields.endValue?fields.endValue.valueOf():''
        })
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let title=values.title?values.title:'';
                let uname=values.uname?values.uname:'';
                let addrname=values.addrname?values.addrname:'';
                let ordernum=values.ordernum?values.ordernum:'';
                let searchInfo={
                    title:title,
                    uname:uname,
                    addrname:addrname,
                    ordernum:ordernum,
                    startTime:this.state.startValue,
                    endTime:this.state.endValue
                };
                this.props.searchData(searchInfo);
            }
        });

    }
    componentWillReceiveProps(nextProps){
        if(nextProps.fresh!=this.state.status){

        }
    }
    componentWillMount(){
        this._isMounted = true;
    }
    componentUnmount(){
        this._isMounted = false;
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Form inline  className="setting-search-line" onSubmit={this.handleSubmit}>
                <Row>
                    <Col span={2} className="txt-right">
                        <span>商品名称：</span>
                    </Col>
                    <Col span={6}>
                        {getFieldDecorator('title')(
                            <Input  type="text" />
                        )}
                    </Col>
                    <Col span={2} className="txt-right">
                        <span>买家账号：</span>
                    </Col>
                    <Col span={6}>
                        {getFieldDecorator('uname')(
                            <Input  type="text"/>
                        )}
                    </Col>
                    <Col span={2} className="txt-right">
                        <span>收货人：</span>
                    </Col>
                    <Col span={6}>
                        {getFieldDecorator('addrname')(
                            <Input  type="text" />
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col span={2} className="txt-right">
                        <span>订单编号：</span>
                    </Col>
                    <Col span={6}>
                        {getFieldDecorator('ordernum')(
                            <Input  type="text" />
                        )}

                    </Col>
                    <Col span={16}>
                        <MyDatePicker dataPick={(field)=>this.datePicker(field)} title="成交时间"/>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>共有{this.props.total}件订单</Col>
                    <Col span={16} className="txt-right">
                        <Button className="setting-search-btn" htmlType="submit">
                            <Icon type="search" />
                        </Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}
SearchBar=Form.create()(SearchBar);


class OrderAll extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lists:[],
            page:1,
            total:1,
            pageSize:10,
            status:this.props.location.query.status?this.props.location.query.status:"",
            current:this.props.location.query.status?(parseInt(this.props.location.query.status)+1).toString():"1",
            title:'',
            username:'',
            addrname:'',
            ordernum:'',
            startValue:'',
            endValue:'',
            loading:false
        };

        this.pageClick=this.pageClick.bind(this);
    }
    searchFetch(info){
        this.setState({
            title:info.title,
            username:info.uname,
            addrname:info.addrname,
            ordernum:info.ordernum,
            startValue:info.startTime,
            endValue:info.endTime
        },()=>{
            this.fetchData(1);
        })
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.location!=this.props.location){
            this.setState({
                status:nextProps.location.query.status?nextProps.location.query.status:''
            },function(){
                this.fetchData(1);
            })
        }
    }
    fetchData(page){
        this.setState({
            loading:true
        });
        let userInfo={"action":"getOrderLists","page":page,"limit":this.state.pageSize,"status":this.state.status,"title":this.state.title,"username":this.state.username,"addressname":this.state.addrname,"ordernum":this.state.ordernum,"begin_time":this.state.startValue,"end_time":this.state.endValue};
        SettingModel.fetchData(userInfo,_success=>{
            if(_success.status){
                let _list=[];
                _success.result.orderRows.map((item,index)=>{
                    var it=item;
                    it.key=item.ordernum;
                    _list.push(it);
                });
                this.setState({
                    lists:_list,
                    page:_success.result.current,
                    total:_success.result.total,
                    loading:false
                });
            }
        },_error=>{
            console.log(_error);
        });
    }
    columnTb(){
        return [{
            title: '订单编号',
            dataIndex: 'ordernum'
        },{
            title: '下单时间',
            dataIndex: 'create_time'
        }, {
            title: '买家用户名',
            dataIndex: 'username'
        }, {
            title: '收货人信息',
            dataIndex: 'receiverInfo'
        },{
            title: '订单总额',
            dataIndex: 'money'
        },{
            title: '订单状态',
            dataIndex: 'status',
            render:(status)=>(
              <span>{status=="1"?"未付款":status=="2"?"待发货":status=="3"?"已发货":status=="4"?"待评价":status=="5"?"交易关闭":status=="6"?"交易成功":"全部"}</span>
            )
        },{
            title: '操作',
            dataIndex: 'action',
            render:(text,record)=>(
                <span>
                     <Link to={{ pathname: "/order/detail", query: {id: record.order_id} }}>查看</Link>
                    {
                        record.status=="2"?(
                            <span>
                            <span className="ant-divider"></span>
                    <Link>发货</Link>
                            </span>
                        ):""
                    }
                </span>
            )

        }];
    }
    componentDidMount(){
        this.fetchData(this.state.page);
    }
    pageClick(page){
        this.setState({
            page:page
        });
        this.fetchData(page);
    }
    render(){
        const pages={
            current:this.state.page,
            pageSize:this.state.pageSize,
            total:this.state.total,
            onChange:this.pageClick
        };
        const pageshow=this.state.total/this.state.pageSize>1?pages:false;
        return (
            <div>
                <OrderMenu current={this.state.current} />
                <div className="setting-ad">
                    <SearchBar searchData={(info)=>this.searchFetch(info)} total={this.state.total} fresh={this.state.status}/>
                    <Table pagination={pageshow} columns={this.columnTb()} dataSource={this.state.lists}  loading={this.state.loading}/>
                </div>
            </div>
        )
    }
}


export default OrderAll;
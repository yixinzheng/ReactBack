import React from 'react';
import {Table,Popconfirm, message,Input,Form,Select,Button,Icon,Row,Col} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import {Link} from 'react-router';
import SearchName from '../common/SearchName';
import {SettingModel} from '../../Datas/dataModel';
import SaleMenu from './SaleMenu';


class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    componentDidMount(){
        this.props.form.setFieldsValue({
            seleModel:'0'
        });
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let uname=values.username!=undefined?values.username:'';
                let modular=values.seleModel!=undefined?values.seleModel:'';
                let searchInfo={
                    username:uname,
                    modular:modular
                };
                this.props.searchData(searchInfo);
            }
        });

    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="setting-search-line">
                <Form inline onSubmit={this.handleSubmit}>
                    <Row>
                        <Col span={2} className="txt-right">买家姓名：</Col>
                        <Col span={6}>

                            {getFieldDecorator('username')(
                                <Input  style={{ width: "100%" }} type="text" />
                            )}
                        </Col>
                        <Col span={2} className="txt-right">状态：</Col>
                        <Col span={6}>
                            {getFieldDecorator('seleModel')(
                                <Select
                                    showSearch
                                    style={{ width: "100%" }}
                                    placeholder="选择状态"
                                    optionFilterProp="children"
                                    >
                                    <Option value="0">全部</Option>
                                    <Option value="1">处理中</Option>
                                    <Option value="2">成功</Option>
                                    <Option value="3">拒绝</Option>
                                    <Option value="4">撤销</Option>
                                </Select>
                            )}
                        </Col>
                        <Col span={2} className="txt-right">
                            <Button className="setting-search-btn" htmlType="submit">
                                <Icon type="search" />
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}
SearchBar=Form.create()(SearchBar);


class SaleAll extends React.Component{
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state={
            current:this.props.location.query.type=="3"?"2":"1",
            type:this.props.location.query.type?this.props.location.query.type:"1",
            lists:[],
            page:1,
            total:1,
            pageSize:10,
            sname:'',
            status:''
        };
        this.pageClick=this.pageClick.bind(this);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.location.pathname!==this.props.location.pathname && nextProps.location.query.type!=this.props.location.query.type){
            this.setState({
                type:nextProps.location.query.type
            },function(){
                this.fetchData(1);
            })
        }
    }
    searchFetch(info){
        this.setState({
            sname:info.username,
            status:info.modular
        },()=>{
            this.fetchData(1);
        })
    }
    fetchData(page){
        let _p={"action":"getCustomerLists","page":page,"limit":this.state.pageSize,"type":this.state.type,"user_name":this.state.sname,"status":this.state.status};
        SettingModel.fetchData(_p,_success=>{
            if(_success.status && this._isMounted){
                let _list=[];
                _success.result.applyreturnRows.map((item,index)=>{
                    var it=item;
                    it.key=index+1;
                    _list.push(it);
                });
                this.setState({
                    lists:_list,
                    page:_success.result.current,
                    total:_success.result.total
                });
            }else{
                message.warning(_success.result);
                //location.hash="/sale";
                history.back();
            }
        },_error=>{
            console.log(_error);
        });
    }
    columnTb(){
        return [{
            title: '售后编号',
            dataIndex: 'number'
        },{
            title: '订单编号',
            dataIndex: 'order_number',
            render:(text)=>(
                <Link to="/order">{text}</Link>
            )
        }, {
            title: '申请人',
            dataIndex: 'user_name'
        }, {
            title: '类型',
            dataIndex: 'type',
            render:(text)=>(
                <span>
                    {text==1?"退款":text==3?"退货退款":""}
                </span>
            )
        },{
            title: '申请时间',
            dataIndex: 'create_time'
        },{
            title: '状态',
            dataIndex: 'status',
            render:(status)=>(
                <span>
                    {status==1?"处理中":status==2?"成功":status==3?"拒绝":status==4?"撤销":"全部"}
                </span>
            )
        },{
            title: '操作',
            dataIndex: 'action',
            render:(text, record) => (
                <div>
                    <Link to={`/sale/detail/${record.apply_id}`}>查看</Link>
                </div>
            )
        }];
    }
    pageClick(page){
        this.setState({
            page:page
        });
        this.fetchData(page);
    }
    componentWillMount(){
        this._isMounted = true;
        this.fetchData(this.state.page);
    }
    componentWillUnmount(){
        this._isMounted = false;
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
                <SaleMenu current={this.state.current}/>
                <div className="setting-ad">
                    <SearchBar defaultVal={this.state.defaultV} searchData={(info)=>this.searchFetch(info)} />
                    <Table pagination={pageshow} columns={this.columnTb()} dataSource={this.state.lists} />
                </div>
            </div>
        )
    }
}


export default SaleAll;
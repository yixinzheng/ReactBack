import React from 'react';
import {Link} from 'react-router';
import {Form,Input,Button,Row,Col,Icon,Select,Table,message,Popconfirm,Pagination} from 'antd';
import {SettingModel} from '../../Datas/dataModel';
import VipDetailMenu from './VipDetailMenu';
import MyDatePicker from '../common/MyDatePicker';


const FormItem = Form.Item;
const Option = Select.Option;
message.config({
    top:'50%'
});

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            startValue: '',
            endValue: ''
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
                let number=values.number!=undefined?values.number:'';
                let money=values.money!=undefined?values.money:'';
                let searchInfo={
                    number:number,
                    money:money,
                    startTime:this.state.startValue,
                    endTime:this.state.endValue
                };
                this.props.searchData(searchInfo);
            }
        });

    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Form inline className="setting-search-line" onSubmit={this.handleSubmit}>
                <Row>
                    <Col span={2} className="txt-right">
                        <span>流水编号：</span>
                    </Col>
                    <Col span={6}>
                        {getFieldDecorator('number')(
                            <Input  type="text"/>
                        )}
                    </Col>
                    <Col span={16}>
                        <MyDatePicker dataPick={(field)=>this.datePicker(field)} title="交易时间"/>
                    </Col>
                    <Col span={2} className="txt-right">
                        <span>金额：</span>
                    </Col>
                    <Col span={6}>
                        {getFieldDecorator('money')(
                            <Input type="text" />
                        )}
                    </Col>
                    <Col span={2} offset={14} className="txt-right">
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

class VipFund extends React.Component{
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state = {
            startValue: '',
            endValue: '',
            lists:[],
            page:1,
            total:1,
            pageSize:5,
            money:'',
            number:'',
            selArr:[],
            rowSelection:{
                onChange: this.handleRowSelectionChange.bind(this)
            },
            current:'3',
            id:this.props.params.user_id
        };
        this.pageClick=this.pageClick.bind(this);
    }
    confirm(ind) {
        if(ind!=''){
            let actionInfo=  {"action":"exportUserFlowLists","user_id":this.state.id,"type":"1","flow_id_arr":`[${this.state.selArr}]`};
            SettingModel.fetchData(actionInfo,_success=>{
                if(_success.status){
                    message.success('成功导出');
                    window.open(_success.result.url);
                }else{
                    message.warning(_success.result);
                }
            },_error=>{
                console.log(_error);
            });
        }else{
            message.warning('请选择要导出的数据');
        }
    }
    cancel() {
        message.error('取消导出');
    }
    handleRowSelectionChange (selectedRowKeys) {
        //console.log(`selectedRowKeys: ${selectedRowKeys}`);
        //this.props.deleAll(selectedRowKeys);
        this.setState({
            selArr:`${selectedRowKeys}`
        })
    }

    columnTb() {
        return [{
            title: '序号',
            dataIndex: 'flow_id'
        },{
            title: '流水编号',
            dataIndex: 'number'
        },{
            title: '类型',
            dataIndex: 'type'
        },{
            title: '金额',
            dataIndex: 'money'
        },{
            title: '交易时间',
            dataIndex: 'create_time'
        },{
            title: '用户名',
            dataIndex: 'user_name'
        },{
            title: '操作',
            dataIndex: 'action',
            render:(text, record) => (
                <div>
                    <Link to={`/vip/detail/vipFundDetail/${record.flow_id}`}>详情</Link>
                </div>
            )
        }];
    }
    searchFetch(info){
        this.setState({
            number:info.number,
            money:info.money,
            startValue:info.startTime,
            endValue:info.endTime
        },()=>{
            this.fetchData(1);
        })
    }
    fetchData(page){
        let fundInfo=  {"action":"getUserFlowLists","page":page,"limit":this.state.pageSize,"user_id":this.state.id,"money":this.state.money,"number":this.state.number,"begin_time":this.state.startValue,"end_time":this.state.endValue};
        SettingModel.fetchData(fundInfo,_success=>{
            if(_success.status && this._isMounted){
                let _list=[];
                _success.result.flowRows.map((item)=>{
                    var it=item;
                    it.key=item.flow_id;
                    _list.push(it);
                });
                this.setState({
                    lists:_list,
                    page:_success.result.current,
                    total:_success.result.total
                });
            }else{
                message.warning(_success.result);
                history.go(-1);
            }
        },_error=>{
            console.log(_error);
        });
    }
    componentWillMount(){
        this._isMounted = true;
        this.fetchData(this.state.page);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.params.user_id && nextProps.params.user_id!=this.props.params.user_id){
            location.reload();
        }
    }
    componentWillUnmount(){
        this._isMounted = false;
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
        const arr=this.state.selArr;
        const pageshow=this.state.total/this.state.pageSize>1?true:false;
        return (
            <div>
                <VipDetailMenu current={this.state.current} user_id={this.props.params.user_id}/>
                <div className="setting-ad">
                    <SearchBar searchData={(info)=>this.searchFetch(info)}/>
                    <Table pagination={false} rowSelection={this.state.rowSelection} columns={this.columnTb()} dataSource={this.state.lists} />
                    <Row  className="pagination-line">
                        <Col span={12}>
                            <Popconfirm title="确定要导出数据吗?" onConfirm={()=>this.confirm(arr)} onCancel={this.cancel} okText="确认" cancelText="取消">
                                <a href="#">批量导出</a>
                            </Popconfirm>
                        </Col>
                        <Col span={12}>
                            {
                                pageshow?<Pagination {...pages} className="ant-table-pagination"/>:""
                            }
                        </Col>

                    </Row>
                </div></div>
        )
    }
}

export default VipFund;
import React from 'react';
import {Link} from 'react-router';
import {Form,Input,Button,Row,Col,Icon,Select,Table,DatePicker,message} from 'antd';
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
                let ordernum=values.ordernum!=undefined?values.ordernum:'';
                let searchInfo={
                    ordernum:ordernum,
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
                        <span>订单编号：</span>
                    </Col>
                    <Col span={6}>
                        {getFieldDecorator('ordernum')(
                            <Input  type="text"/>
                        )}
                    </Col>
                    <Col span={16} className="txt-right">
                        <MyDatePicker dataPick={(field)=>this.datePicker(field)} title="交易时间"/>
                    </Col>
                    <Col span={24} className="txt-right">
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

class VipExp extends React.Component{
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
            ordernum:'',
            statusList:["", "收入", "支出"],
            current:'5'
        };
        this.pageClick=this.pageClick.bind(this);
    }
    columnTb() {
        return [{
            title: '序号',
            dataIndex: 'key'
        },{
            title: '订单编号',
            dataIndex: 'order_num'
        }, {
            title: '经验',
            dataIndex: 'experience'
        },{
            title: '类型',
            dataIndex: 'type',
            render:(text, record) => (
                <div>
                    {this.state.statusList[record.type]}
                </div>
            )
        },{
            title: '下单时间',
            dataIndex: 'create_time'
        },{
            title: '买家用户名',
            dataIndex: 'user_name'
        }];
    }
    searchFetch(info){
        this.setState({
            ordernum:info.ordernum,
            startValue:info.startTime,
            endValue:info.endTime
        },()=>{
            this.fetchData(1);
        })
    }
    fetchData(page){
        let actionInfo=  {"action":"getUserExperienceLists","page":page,"limit":this.state.pageSize,"user_id":this.props.params.user_id,"order_number":this.state.ordernum,"begin_time":this.state.startValue,"end_time":this.state.endValue};
        SettingModel.fetchData(actionInfo,_success=>{
            if(_success.status && this._isMounted){
                let _list=[];
                _success.result.experienceRows.map((item,index)=>{
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
                history.go(-1);
            }
        },_error=>{
            console.log(_error);
        });
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.params.user_id && nextProps.params.user_id!=this.props.params.user_id){
            location.reload();
        }
    }
    componentWillMount(){
        this._isMounted = true;
        this.fetchData(this.state.page);
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
        const pageshow=this.state.total/this.state.pageSize>1?pages:false;
        return (
            <div>
                <VipDetailMenu current={this.state.current} user_id={this.props.params.user_id}/>
                <div className="setting-ad">
                    <SearchBar searchData={(info)=>this.searchFetch(info)}/>
                    <Table pagination={pageshow} columns={this.columnTb()} dataSource={this.state.lists} />
                </div>
            </div>
        )
    }
}


export default VipExp;
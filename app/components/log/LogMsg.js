import React from 'react';
import {Form,Input,Button,Row,Col,Icon,Select,Table,DatePicker,message} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import zhCN from 'antd/lib/date-picker/locale/zh_CN';
import {SettingModel} from '../../Datas/dataModel';
import LogMenu from './LogMenu';
import MyDatePicker from '../common/MyDatePicker';

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state={
            startValue: '',
            endValue: '',
            modularList:{}
        };
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    getModular(){
        let _p=  {"action":"getConfig"};
        SettingModel.fetchData(_p,_succ=>{
            if(_succ.status && this._isMounted){
                var obj=_succ.result.smsStatus;
                this.setState({
                    modularList:obj
                })
            }else{
                message.warning(_succ.result);
            }
        },_err=>{
            console.log(_err);
        });
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
                let uname=values.uname!=undefined?values.uname:'';
                let status=values.status!=undefined?values.status:'';
                let mobile=values.telephone!=undefined?values.telephone:'';
                let content=values.content!=undefined?values.content:'';
                let searchInfo={
                    mobile:mobile,
                    username:uname,
                    content:content,
                    startTime:this.state.startValue,
                    endTime:this.state.endValue,
                    status:status
                };
                this.props.searchData(searchInfo);
            }
        });

    }
    componentWillMount(){
        this._isMounted = true;
        this.getModular();
    }
    componentUnmount(){
        this._isMounted = false;
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const modular=this.state.modularList;
        const _list=Object.keys(modular).map((value,index)=>{
            return (<Option value={value} key={value}>{modular[value]}</Option>);
        });
        return (
            <Form inline  className="setting-search-line" onSubmit={this.handleSubmit}>
                <Row>
                    <Col span={2} className="txt-right">
                        <span>手机号：</span>
                    </Col>
                    <Col span={6}>
                        {getFieldDecorator('telephone')(
                            <Input  type="text" />
                        )}
                    </Col>
                    <Col span={2} className="txt-right">
                        <span>用户名：</span>
                    </Col>
                    <Col span={6}>
                        {getFieldDecorator('uname')(
                            <Input  type="text"/>
                        )}
                    </Col>
                    <Col span={2} className="txt-right">
                        <span>短信内容：</span>
                    </Col>
                    <Col span={6}>
                        {getFieldDecorator('content')(
                            <Input  type="text" />
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col span={2} className="txt-right">
                        <span>状态：</span>
                    </Col>
                    <Col span={6}>
                        {getFieldDecorator('status')(
                            <Select
                                showSearch
                                placeholder="选择状态"
                                optionFilterProp="children"
                                >
                                {_list}
                            </Select>
                        )}

                    </Col>
                    <Col span={16}>
                        <MyDatePicker dataPick={(field)=>this.datePicker(field)} title="操作时间"/>
                    </Col>
                </Row>
                <Row>
                    <Col span={2} className="txt-right">发送成功:</Col>
                    <Col span={2}>{this.props.total_t}</Col>
                    <Col span={2} className="txt-right">发送失败:</Col>
                    <Col span={2}>{this.props.total_f}</Col>
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


class LogMsg extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lists:[],
            page:1,
            total:1,
            pageSize:10,
            mobile:'',
            content:'',
            username:'',
            status:'',
            startValue: '',
            endValue: '',
            current:'2',
            loading:false
        };

        this.pageClick=this.pageClick.bind(this);
    }
    searchFetch(info){
        this.setState({
            username:info.username,
            mobile:info.mobile,
            content:info.content,
            status:info.status,
            startValue:info.startTime,
            endValue:info.endTime
        },()=>{
            this.fetchData(1);
        })
    }
    fetchData(page){
        this.setState({
            loading:true
        });
        let _p={"action":"getSmsLogs","page":page,"limit":this.state.pageSize,"mobile":this.state.mobile,"user_name":this.state.username,"content":this.state.content,"begin_time":this.state.startValue,"end_time":this.state.endValue, "status":this.state.status};
        SettingModel.fetchData(_p,_success=>{
            if(_success.status){
                let _list=[];
                _success.result.smsLogRows.map((item,index)=>{
                    var it=item;
                    it.key=index+1;
                    _list.push(it);
                });
                this.setState({
                    loading:false,
                    lists:_list,
                    page:_success.result.current,
                    total:_success.result.total,
                    total_f:_success.result.total_f,
                    total_t:_success.result.total_t
                });
            }
        },_error=>{
            console.log(_error);
        });
    }
    columnTb(){
        return [{
            title: '序号',
            dataIndex: 'sms_id'
        },{
            title: '手机号',
            dataIndex: 'mobile'
        }, {
            title: '用户名',
            dataIndex: 'user_name'
        }, {
            title: '状态',
            dataIndex: 'status'
        },{
            title: '时间',
            dataIndex: 'date'
        },{
            title: '短信内容',
            dataIndex: 'content'
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
                <LogMenu current={this.state.current} />
                <div className="setting-ad">
                    <SearchBar searchData={(info)=>this.searchFetch(info)} total_f={this.state.total_f} total_t={this.state.total_t}/>
                    <Table pagination={pageshow} columns={this.columnTb()} dataSource={this.state.lists} loading={this.state.loading} />
                </div>
            </div>
        )
    }
}


export default LogMsg;
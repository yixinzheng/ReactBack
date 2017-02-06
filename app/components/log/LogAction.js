import React from 'react';
import {Form,Input,Button,Icon,Select,Table,Pagination,message,Row,Col} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
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
                var obj=_succ.result.getOperationLogsModularList;
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
                let uname=values.username!=undefined?values.username:'';
                let modular=values.seleModel!=undefined?values.seleModel:'';
                let searchInfo={
                    username:uname,
                    modular:modular,
                    startTime:this.state.startValue,
                    endTime:this.state.endValue
                };
                this.props.searchData(searchInfo);
            }
        });

    }
    componentWillMount(){
        this._isMounted = true;
        this.getModular();
    }
    componentWillUnmount(){
        this._isMounted = false;
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const modular=this.state.modularList;
        const _list=Object.keys(modular).map((value,index)=>{
            return (<Option value={value} key={value}>{modular[value]}</Option>);
        });
        return (
                <div className="setting-search-line">
                    <Form inline onSubmit={this.handleSubmit}>
                        <Row>
                            <Col span={2} className="txt-right">用户：</Col>
                            <Col span={6}>
                                {getFieldDecorator('username')(
                                    <Input  style={{ width: '100%' }} type="text" />
                                )}
                            </Col>
                            <Col span={16}>
                                <MyDatePicker dataPick={(field)=>this.datePicker(field)} title="操作时间"/>
                            </Col>
                            <Col span={2} className="txt-right">功能模块：</Col>
                            <Col span={6}>
                                {getFieldDecorator('seleModel')(
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        placeholder="选择一个功能模块"
                                        optionFilterProp="children"
                                        >
                                        {_list}
                                    </Select>
                                )}
                            </Col>
                            <Col span={16} className="txt-right">
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

class LogAction extends React.Component{
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state = {
            startValue: '',
            endValue: '',
            lists:[],
            page:1,
            total:1,
            pageSize:10,
            searchFlag:false,
            username:'',
            modular:'',
            current:'1',
            loading:false
        };
        this.pageClick=this.pageClick.bind(this);
    }
    searchFetch(info){
        this.setState({
            username:info.username,
            startValue:info.startTime,
            endValue:info.endTime,
            modular:info.modular
        },()=>{
            this.fetchData(1);
        })
    }
    fetchData(page){
        this.setState({
            loading:true
        });
        let actionInfo={"action":"getOperationLogs","page":page,"limit":this.state.pageSize,"user_name":this.state.username,"begin_time":this.state.startValue,"end_time":this.state.endValue, "modular":this.state.modular};
        SettingModel.fetchData(actionInfo,_success=>{
            if(_success.status && this._isMounted){
                let _list=[];
                _success.result.operationLogRows.map((item,index)=>{
                    var it=item;
                    it.key=index+1;
                    _list.push(it);
                });
                this.setState({
                    lists:_list,
                    page:_success.result.current,
                    total:_success.result.total,
                    loading:false
                });
            }else{
                message.warning(_success.result);
            }
        },_error=>{
            console.log(_error);
        });
    }
    columnTb(){
        return [{
            title: '序号',
            dataIndex: 'adminlog_id'
        },{
            title: '会员名',
            dataIndex: 'name'
        }, {
            title: '功能模块',
            dataIndex: 'modular_name'
        }, {
            title: '日志内容',
            dataIndex: 'content'
        },{
            title: 'IP地址',
            dataIndex: 'ip'
        },{
            title: '时间',
            dataIndex: 'date'
        }];
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
                <LogMenu current={this.state.current} />
                <div className="setting-ad">
                    <SearchBar  searchData={(info)=>this.searchFetch(info)}/>
                    <Table pagination={pageshow} columns={this.columnTb()} dataSource={this.state.lists} loading={this.state.loading} />
                </div>
            </div>
        )
    }
}

export default LogAction;
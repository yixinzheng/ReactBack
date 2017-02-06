import React from 'react';
import {Link} from 'react-router';
import {Form,Input,Button,Row,Col,Icon,Select,Table,DatePicker,message} from 'antd';
import {SettingModel} from '../../Datas/dataModel';
import VipActionMenu from './VipActionMenu';
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
            endValue: '',
            statusList: {
                "1":"登录",
                "2":"限制登录"
            }
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
                let username=values.username!=undefined?values.username:'';
                let realname=values.realname!=undefined?values.realname:'';
                let nickname=values.nickname!=undefined?values.nickname:'';
                let status=values.status!=undefined?values.status:'';
                let searchInfo={
                    username:username,
                    realname:realname,
                    nickname:nickname,
                    status:status,
                    startTime:this.state.startValue,
                    endTime:this.state.endValue
                };
                this.props.searchData(searchInfo);
            }
        });

    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const status=this.state.statusList;
        const _list=Object.keys(status).map((value,index)=>{
            return (<Option value={value} key={value}>{status[value]}</Option>);
        });

        return (
            <Form inline className="setting-search-line" onSubmit={this.handleSubmit}>
                <Row>
                    <Col span={2} className="txt-right">
                        <span>会员名：</span>
                    </Col>
                    <Col span={6}>
                        {getFieldDecorator('username')(
                            <Input  type="text" />
                        )}
                    </Col>
                    <Col span={2} className="txt-right">
                        <span>姓名：</span>
                    </Col>
                    <Col span={6}>
                        {getFieldDecorator('realname')(
                            <Input  type="text"/>
                        )}
                    </Col>
                    <Col span={2} className="txt-right">
                        <span>昵称：</span>
                    </Col>
                    <Col span={6}>
                        {getFieldDecorator('nickname')(
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
                        <MyDatePicker dataPick={(field)=>this.datePicker(field)} title="出生日期"/>
                    </Col>
                </Row>
                <Row>
                    <Col span={4} offset={20} className="txt-right">
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

class VipManage extends React.Component{
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
            username:'',
            nickname:'',
            realname:'',
            status:'',
            current:'1'
        };
        this.pageClick=this.pageClick.bind(this);
        this.limitLogin=this.limitLogin.bind(this);
    }

    columnTb() {
        return [{
            title: '序号',
            dataIndex: 'key'
        },{
            title: '会员名',
            dataIndex: 'user_name'
        },{
            title: '昵称',
            dataIndex: 'nickname'
        }, {
            title: '姓名',
            dataIndex: 'real_name'
        },{
            title: '性别',
            dataIndex: 'sex',
            render:(text, record) => (
                <span>{record.sex == "1" ? '未设置' : record.sex == "2" ? "男" : "女"}</span>
            )
        },{
            title: '出生日期',
            dataIndex: 'date'
        },{
            title: '操作',
            dataIndex: 'action',
            render:(text, record) => (
                <div>
                    <Link to={`/vip/detail/${record.user_id}`}>详情</Link>
                    <span className="ant-divider" />
                    <Link onClick={(e)=>this.limitLogin(record.user_id,record.status,e)}>{record.status == 1 ? "限制登录" : "登录"}</Link>
                </div>
            )
        }];
    }
    limitLogin(id,status,e) {
        e.preventDefault();
        let flag = 2;
        if(status == 2){
            flag = 1;
        }
        let limitInfo=  {"action":"editUser","user_id":id,"status":flag};
        SettingModel.fetchData(limitInfo,_success=>{
            if(_success.status){
                this.fetchData(this.state.page);
                message.success("操作成功");
            }else{
                message.warning(_success.result);
            }
        },_error=>{
            console.log(_error);
        });
    }
    searchFetch(info){
        this.setState({
            username:info.username,
            realname:info.realname,
            nickname:info.nickname,
            startValue:info.startTime,
            endValue:info.endTime,
            status:info.status
        },()=>{
            this.fetchData(1);
        })
    }
    fetchData(page){
        let actionInfo=  {"action":"getUserLists","page":page,"limit":this.state.pageSize,"user_name":this.state.username,"nickname":this.state.nickname,"real_name":this.state.realname,"begin_time":this.state.startValue,"end_time":this.state.endValue, "status":this.state.status};
        SettingModel.fetchData(actionInfo,_success=>{
            if(_success.status && this._isMounted){
                let _list=[];
                _success.result.userRows.map((item,index)=>{
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
        return (
            <div>
                <VipActionMenu current={this.state.current} />
                <div className="setting-ad">
                    <SearchBar searchData={(info)=>this.searchFetch(info)}/>
                    <Table pagination={pages} columns={this.columnTb()} dataSource={this.state.lists} />
                </div>
            </div>
        )
    }
}

export default VipManage;
import React from 'react';
import {Link} from 'react-router';
import {Form,Input,Button,Row,Col,Icon,Select,Table,DatePicker,Tabs,Popconfirm, message} from 'antd';
import {SettingModel} from '../../Datas/dataModel';
import AppMenu from './AppMenu';


class SettingIos extends React.Component{
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state = {
            current:'3',
            lists:[],
            page:1,
            total:1,
            pageSize:10,
            username:'',
            realname:'',
            mobile:''
        };
        this.pageClick=this.pageClick.bind(this);
    }
    fetchData(page){
        let _p={"action":"getAdminList","page":page,"limit":this.state.pageSize,"mobile":this.state.mobile,"admin_name":this.state.username,"real_name":this.state.realname};
        SettingModel.fetchData(_p,_success=>{
            if(_success.status && this._isMounted){
                let _list=[];
                _success.result.adminRows.map((item,index)=>{
                    var it=item;
                    it.key=item.admin_id;
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
    columnTb(){
        return [{
            title: '系统版本号',
            dataIndex: 'admin_name'
        }, {
            title: '软件版本号',
            dataIndex: 'real_name'
        }, {
            title: '软件路径',
            dataIndex: 'mobile'
        }, {
            title: '发布时间',
            dataIndex: 'create_time'
        }, {
            title: '状态',
            dataIndex: 'status'
        }, {
            title: '备注',
            dataIndex: 'remark'
        },{
            title: '操作',
            dataIndex: 'action',
            render:(text, record) => (
                <div>
                    <span><Link to={`/members/MembersDetail/${record.key}`}>修改</Link></span>
                    <span className="ant-divider" />
                    <span><Link>过期</Link></span>
                </div>
            )
        }];
    }
    componentWillMount(){
        this._isMounted = true;
        this.fetchData(this.state.page);
    }
    componentWillUnmount () {
        this._isMounted = false
    }
    handleDele(id){
        let _p={"action":"editAdmin","admin_id":id,"status":"2"};
        SettingModel.fetchData(_p,_success=>{
            if(_success.status){
                message.success('删除成功');
                let count=this.state.page;
                if((this.state.total-1) % this.state.pageSize == 0){
                    count--;
                }
                count=count<=0?1:count;
                this.fetchData(count);
            }else{
                message.error('删除不成功');
            }
        },_error=>{
            console.log(_error);
        });
    }
    handleFreeze(id,status){
        let _p={"action":"editAdmin","admin_id":id,"status":status == "1" ? "3" :"1"};
        SettingModel.fetchData(_p,_success=>{
            if(_success.status){
                message.success('操作成功');
                this.fetchData(this.state.page);
            }else{
                message.error('操作不成功');
            }
        },_error=>{
            console.log(_error);
        });
    }
    cancel() {
        message.error('取消操作');
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
                <AppMenu  current={this.state.current}/>
                <div className="setting-ad">
                    <Row className="mgb30">
                        <Col span={2} offset={22}>
                            <Button type="primary"><Link to="/members/MembersDetail">新增员工</Link></Button>
                        </Col>
                    </Row>
                    <Table pagination={pageshow}  columns={this.columnTb()} dataSource={this.state.lists} />
                </div>
            </div>

        )
    }
}

export default SettingIos;
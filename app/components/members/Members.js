import React from 'react';
import {Link} from 'react-router';
import {Form,Input,Button,Row,Col,Icon,Select,Table,DatePicker,Tabs,Popconfirm, message} from 'antd';
import {SettingModel} from '../../Datas/dataModel';
message.config({
    top:'50%'
});
import MenuBox from '../common/MenuBox';
const FormItem = Form.Item;

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let adminname=values.adminname!=undefined?values.adminname:'';
                let realname=values.realname!=undefined?values.realname:'';
                let mobile=values.mobile!=undefined?values.mobile:'';
                let searchInfo={
                    adminname:adminname,
                    realname:realname,
                    mobile:mobile
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
                        <Col span={2} className="txt-right">用户名：</Col>
                        <Col span={6}>
                            {getFieldDecorator('adminname')(
                                <Input  style={{ width: '100%' }} type="text"/>
                            )}
                        </Col>
                        <Col span={2} className="txt-right">姓名：</Col>
                        <Col span={6}>
                            {getFieldDecorator('realname')(
                                <Input  style={{ width: '100%' }} type="text" />
                            )}
                        </Col>
                        <Col span={2} className="txt-right">手机号：</Col>
                        <Col span={6}>
                            {getFieldDecorator('mobile')(
                                <Input  style={{ width: '100%' }} type="text"/>
                            )}
                        </Col>
                        <Col span={24} className="txt-right">
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
class Members extends React.Component{
    constructor(props){
        super(props);
        this.menulist= [{
            links:"/members",
            title:"员工管理"
        }];
        this._isMounted = false;
        this.state = {
            current:'1',
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
    searchFetch(info){
        this.setState({
            username:info.adminname,
            realname:info.realname,
            mobile:info.mobile
        },()=>{
            this.fetchData(1);
        })
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
            title: '用户名',
            dataIndex: 'admin_name'
        }, {
            title: '姓名',
            dataIndex: 'real_name'
        }, {
            title: '手机',
            dataIndex: 'mobile'
        },{
            title: '操作',
            dataIndex: 'action',
            render:(text, record) => (
                <div>
                    <span><Link to={`/members/detail/${record.admin_id}`}>修改</Link></span>
                    <span className="ant-divider" />
                    <Popconfirm title="确定要删除该数据吗?" onConfirm={()=>this.handleDele(record.key)} onCancel={this.cancel} okText="确认" cancelText="取消">
                        <a href="#">删除</a>
                    </Popconfirm>
                    <span className="ant-divider" />
                    <Popconfirm title="确定要执行该操作吗?" onConfirm={()=>this.handleFreeze(record.key,record.status)} onCancel={this.cancel} okText="确认" cancelText="取消">
                        <a href="#">{record.status=='1'?'冻结':record.status=='3'?'解冻':''}</a>
                    </Popconfirm>
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
           <MenuBox menulist={this.menulist} current={this.state.current}/>
           <div className="setting-ad">
               <SearchBar searchData={(info)=>this.searchFetch(info)} />
               <Row className="mgb30">
                <Col span={2} offset={22}>
                    <Button type="primary"><Link to="/members/detail">新增员工</Link></Button>
                </Col>
               </Row>
               <Table pagination={pageshow}  columns={this.columnTb()} dataSource={this.state.lists} />
           </div>
       </div>

        )
    }
}



export default Members;
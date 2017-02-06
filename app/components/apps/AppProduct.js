import React from 'react';
import {Link} from 'react-router';
import { Button, message,Row,Col,Table,Input,Popconfirm} from 'antd';
import {SettingModel} from '../../Datas/dataModel';
import AppDetailMenu from './AppDetailMenu';
class AppProduct extends React.Component{
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state = {
            current:'2',
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
    blurOrder(e,record){
        e.preventDefault();
        let change_value=e.target.value;
        if(change_value<=0 && change_value!=""){
            message.warning("排序不能小于1");
            e.target.value=record.order_number;
            return;
        }else if(change_value==record.order_number || change_value==""){
            message.warning("排序没有改变");
            e.target.value=record.order_number;
            return;
        }else{
            let _p={"action":"editHelpCategory","helpcategory_id":record.helpcategory_id,"order_number":change_value};
            SettingModel.fetchData(_p,_succ=>{
                if(_succ.status){
                    message.success("排序成功");
                    location.reload();
                }else{
                    message.warning(_succ.result);
                }
            });
        }
    }
    columnTb(){
        return [{
            title: '产品ID',
            dataIndex: 'admin_name'
        }, {
            title: '产品名称',
            dataIndex: 'real_name'
        }, {
            title: '图片',
            dataIndex: 'mobile'
        }, {
            title: '排序',
            dataIndex: 'order',
            render:(text,record)=>(
                <Input type="number" defaultValue={text} onBlur={(e)=>this.blurOrder(e,record)} />
            )
        },{
            title: '操作',
            dataIndex: 'action',
            render:(text, record) => (
                <div>
                    <span><Link to={`/members/MembersDetail/${record.key}`}>查看</Link></span>
                    <span className="ant-divider" />
                    <Popconfirm title="确定要删除该数据吗?" onConfirm={()=>this.handleDele(record.key)} onCancel={this.cancel} okText="确认" cancelText="取消">
                        <a href="#">删除</a>
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
                <AppDetailMenu  current={this.state.current} id={this.state.id}/>
                <div className="setting-ad">
                    <Row className="mgb30">
                        <Col span={2} offset={22}>
                            <Button type="primary"><Link to="/members/MembersDetail">新增产品</Link></Button>
                        </Col>
                    </Row>
                    <Table pagination={pageshow}  columns={this.columnTb()} dataSource={this.state.lists} />
                </div>
            </div>

        )
    }
}

export default AppProduct;
import React from 'react';
import {Link} from 'react-router';
import {Form,Input,Button,Row,Col,Icon,Select,Table,message,Popconfirm} from 'antd';
import {SettingModel} from '../../Datas/dataModel';
import VipActionMenu from './VipActionMenu';
const FormItem = Form.Item;
const Option = Select.Option;

message.config({
    top:'50%'
});

class VipLevel extends React.Component{
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state = {
            lists:[],
            page:1,
            total:1,
            pageSize:5,
            current:'2'
        };
        this.pageClick=this.pageClick.bind(this);
    }

    columnTb() {
        return [{
            title: '编号',
            dataIndex: 'key'
        },{
            title: '等级名称',
            dataIndex: 'grade_name'
        },{
            title: '需要经验',
            dataIndex: 'experience'
        }, {
            title: '折扣',
            dataIndex: 'discount'
        },{
            title: '操作',
            dataIndex: 'action',
            render:(text, record) => (
                <div>
                    <Link to={`/vip/level/detail/${record.grade_id}`}>详情/修改</Link>
                    <span className="ant-divider" />
                    <Popconfirm title="确定要删除该数据吗?" onConfirm={()=>this.confirm(record.grade_id)} onCancel={this.cancel} okText="确认" cancelText="取消">
                    <a href="#">删除</a>
                </Popconfirm>
                </div>
            )
        }];
    }
    confirm(ind) {
        if(ind!=''){
            let _p={"action":"editUserGrade","grade_id":ind,"type":"2","is_delete":"2"};
            SettingModel.fetchData(_p,_success=>{
                if(_success.status){
                    message.success('数据删除');
                    let count=this.state.page;
                    if((this.state.total-1) % this.state.pageSize == 0){
                        count--;
                    }
                    count=count<=0?1:count;
                    this.fetchData(count);
                }else{
                    message.warning(_success.result);
                }
            },_error=>{
                console.log(_error);
            });
        }else{
            message.warning('请选择要删除的数据');
        }

    }
    cancel() {
        message.error('取消删除');
    }
    fetchData(page){
        let actionInfo={"action":"getUserGradeLists","page":this.state.page,"limit":this.state.pageSize};
        SettingModel.fetchData(actionInfo,_success=>{
            if(_success.status && this._isMounted){
                let _list=[];
                _success.result.gradeRows.map((item,index)=>{
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
        const pageshow=this.state.total/this.state.pageSize>1?pages:false;
        return (
            <div>
                <VipActionMenu current={this.state.current} />
                <div className="setting-ad">
                    <Row className="mgb30">
                        <Col span={2} offset={22}>
                            <Button type="primary"><Link to="/vip/level/detail">新增等级</Link></Button>
                        </Col>
                    </Row>
                    <Table pagination={pageshow} columns={this.columnTb()} dataSource={this.state.lists} />
                </div>
            </div>
        )
    }
}

export default VipLevel;
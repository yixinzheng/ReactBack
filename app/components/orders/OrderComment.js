import React from 'react';
import {Link} from 'react-router';
import {Popconfirm, message,Table,Pagination,Row,Col} from 'antd';
import OrderMenu from './OrderMenu';

message.config({
    top:'50%'
});
import {SettingModel} from '../../Datas/dataModel';



class OrderComment extends React.Component{
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state={
            lists:[],
            page:1,
            total:1,
            pageSize:10,
            current:'8',
            selArr:[],
            rowSelection:{
                onChange: this.handleRowSelectionChang.bind(this)
            }
        };
        this.cancel=this.cancel.bind(this);
    }
    confirm(ind) {
        if(ind!=''){
            let _p= {"action":"delFeedBacks","feedback_id_arr":`[${ind}]`};
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
    handleRowSelectionChang (selectedRowKeys) {
        this.setState({
            selArr:`${selectedRowKeys}`
        })
    }
    fetchData(page){
        let _p={"action":"getFeedBackList","page":page,"limit":this.state.pageSize};
        SettingModel.fetchData(_p,_success=>{
            if(_success.status && this._isMounted){
                let _list=[];
                _success.result.feedbackRows.map((item,index)=>{
                    var it=item;
                    it.key=item.feedback_id;
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
            title: '买家姓名',
            dataIndex: 'user_name'
        }, {
            title: '产品名称',
            dataIndex: 'name',
            render: text => <a href="#">{text}</a>
        },{
            title: '评论内容',
            dataIndex: 'mobile'
        },{
            title: '星级',
            dataIndex: 'start'
        },{
            title: '时间',
            dataIndex: 'create_time'
        }, {
            title: '状态',
            dataIndex: 'is_read',
            render:(text, record) => {
                if(text=='1'){
                    return <span>未读</span>
                }else if(text=='2'){
                    return <span>已读</span>
                }
            }
        },{
            title: '操作',
            dataIndex: 'action',
            render:(text, record) => (
                <div>
                    <Link to={{ pathname: "/advice/AdviceDetail", query: {id: record.feedback_id} }}>查看</Link>
                    <span className="ant-divider" />
                    <Popconfirm title="确定要删除该数据吗?" onConfirm={()=>this.confirm(record.key)} onCancel={this.cancel} okText="确认" cancelText="取消">
                        <a href="#">删除</a>
                    </Popconfirm>

                </div>
            )
        }]
    }
    componentWillMount(){
        this._isMounted = true;
        this.fetchData(this.state.page);
    }
    componentWillUnmount(){
        this._isMounted=false;
    }
    pageClick(page){
        this.setState({
            page:page
        });
        this.fetchData(page);
    }

    render(){
        const arr=this.state.selArr;
        const pageshow=this.state.total/this.state.pageSize>1?true:false;
        return (
            <div>
                <OrderMenu current={this.state.current} />
                <div className="setting-ad">
                    <Table pagination={false}  rowSelection={this.state.rowSelection} columns={this.columnTb()} dataSource={this.state.lists}/>
                    <Row  className="pagination-line">
                        <Col span={2}>
                            <Popconfirm title="确定要通过吗?" onConfirm={()=>this.confirm(arr)} onCancel={this.cancel} okText="确认" cancelText="取消">
                                <a href="#">批量通过</a>
                            </Popconfirm>
                        </Col>
                        <Col span={2}>
                            <Popconfirm title="确定要拒绝吗?" onConfirm={()=>this.confirm(arr)} onCancel={this.cancel} okText="确认" cancelText="取消">
                                <a href="#">批量拒绝</a>
                            </Popconfirm>
                        </Col>
                        <Col span={12}>
                            {
                                pageshow?(
                                    <Pagination onChange={(page)=>this.pageClick(page)} current={this.state.page} pageSize={this.state.pageSize} total={this.state.total} className="ant-table-pagination"/>
                                ):""
                            }
                        </Col>

                    </Row>
                </div>
            </div>
        )
    }
}


export default OrderComment;
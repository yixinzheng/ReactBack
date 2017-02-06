import React from 'react';
import {Link} from 'react-router';
import {Menu,Table,Pagination,Row,Col,Popconfirm, message } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class SelTable extends React.Component{
    constructor(props){
        super(props);
        this.state={
            rowSelection:{
                onChange: this.handleRowSelectionChang.bind(this)
            },
            arr:''
        }
    }
    cancel() {
        message.error('取消删除');
    }
    handleRowSelectionChang (selectedRowKeys) {
        console.log(`selectedRowKeys: ${selectedRowKeys}`);
        //this.props.deleAll(selectedRowKeys);
        this.setState({
            arr:`${selectedRowKeys}`
        })
    }
    render(){
        const arr=this.state.arr;
        return (
            <div>
                <Table pagination={false}  rowSelection={this.state.rowSelection} columns={this.props.columns} dataSource={this.props.datas}/>
                 <Row  className="pagination-line">
                     <Col span={12}>
                         <Popconfirm title="确定要删除数据吗?" onConfirm={()=>this.props.deleAll(arr)} onCancel={this.cancel} okText="确认" cancelText="取消">
                             <a href="#">批量删除</a>
                         </Popconfirm>
                     </Col>
                     <Col span={12}>
                         <Pagination onChange={(page)=>this.props.pageChange(page)} current={this.props.current} pageSize={this.props.pagesize} total={this.props.total} className="ant-table-pagination"/>
                     </Col>

                 </Row>
            </div>
        )
    }
}


export default SelTable;
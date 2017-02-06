import React from 'react';
import {Form,Input,Button,Row,Col,Icon,Select,Table,Popconfirm} from 'antd';
import SetMenu from './SetMenu';
const FormItem = Form.Item;
const Option = Select.Option;

class SettingSearch extends React.Component{
    constructor(props){
        super(props);
        this.state={
            lists:[{
                key: '1',
                keyword: '母婴banner',
                times: 'New York No. 1 Lake Park',
                action:''
            }, {
                key: '2',
                keyword: '母婴banner',
                times: 'New York No. 1 Lake Park',
                action:''
            }, {
                key: '3',
                keyword: '母婴banner',
                times: 'New York No. 1 Lake Park',
                action:''
            }, {
                key: '4',
                keyword: '母婴banner',
                times: 'New York No. 1 Lake Park',
                action:''
            }],
            page:1,
            total:1,
            pageSize:10,
            current:'5',
            selArr:[],
            rowSelection:{
                onChange: this.handleRowSelectionChang.bind(this)
            }
        }
    }
    handleRowSelectionChang (selectedRowKeys) {
        this.setState({
            selArr:`${selectedRowKeys}`
        })
    }
    columnTb(){
        return [{
            title: '关键字',
            dataIndex: 'keyword',
            render: text => <a href="#">{text}</a>
        }, {
            title: '搜索次数',
            dataIndex: 'times'
        }, {
            title: '操作',
            dataIndex: 'action',
            render:(text, record) => (
                <div>
                    <span> 修改{record.key}</span>
                    <span className="ant-divider" />
                    <span> 删除</span>
                    <span className="ant-divider" />
                    <span>取消推荐</span>
                </div>
            )
        }];
    }
    render(){
        const pageshow=this.state.total/this.state.pageSize>1?true:false;
        return (
            <div>
                <SetMenu current={this.state.current} />
                <div className="setting-ad">
                    <Row>
                        <Col span={24} className="setting-search-line">
                            <Form inline>
                                <FormItem>
                                    <span>Banner名称：</span>
                                    <Input  placeholder="请输入网站名称"  style={{ width: 200 }} type="text"  name="webtitle"/>
                                </FormItem>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{"textAlign":"right"}}>
                            <span className="setting-add-btn">新增关键字</span>
                        </Col>
                    </Row>

                    <Table pagination={false}  rowSelection={this.state.rowSelection} columns={this.columnTb()} dataSource={this.state.lists} />
                    <Row  className="pagination-line">
                        <Col span={12}>
                            <Popconfirm title="确定要删除数据吗?" onConfirm={()=>this.confirm(arr)} onCancel={this.cancel} okText="确认" cancelText="取消">
                                <a href="#">批量删除</a>
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


export default SettingSearch;
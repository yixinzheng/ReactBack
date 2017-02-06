import React from 'react';
import {Form,Input,Button,Row,Col,Icon,Select,Table,Popconfirm } from 'antd';
import SetMenu from './SetMenu';
const FormItem = Form.Item;
const Option = Select.Option;


class SearchBar extends React.Component{
    render(){
        return (
            <Row className="setting-search-line">
                <Col span={14}>
                    <Form inline>
                        <FormItem>
                            <span>Banner名称：</span>
                            <Input  placeholder="请输入网站名称"  style={{ width: 200 }} type="text"  name="webtitle"/>
                        </FormItem>
                        <FormItem>
                            <span>所属分类：</span>
                            <Select size="large" defaultValue="lucy" style={{ width: 200 }} onChange={this.handleChange}>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="disabled">Disabled</Option>
                                <Option value="yiminghe">Yiminghe</Option>
                            </Select>
                        </FormItem>
                        <Button className="setting-search-btn" htmlType="submit">
                            <Icon type="search" />
                        </Button>
                    </Form>
                </Col>
                <Col span={10} style={{"textAlign":"right"}}>
                    <span className="setting-add-btn">新增banner</span>
                    <span className="theme-color">编辑banner分类》</span>
                </Col>
            </Row>
        )
    }
}
class SettingBanner extends React.Component{
    constructor(props){
        super(props);
        this.state={
            lists:[{
                key: '1',
                name: '母婴banner',
                img: 'http://image57.360doc.com/DownloadImg/2012/12/1116/28840930_86.jpg',
                type: 'New York No. 1 Lake Park',
                action:''
            }, {
                key: '2',
                name: '母婴banner',
                img: 'http://image57.360doc.com/DownloadImg/2012/12/1116/28840930_86.jpg',
                type: 'New York No. 1 Lake Park',
                action:''
            }, {
                key: '3',
                name: '母婴banner',
                img: 'http://image57.360doc.com/DownloadImg/2012/12/1116/28840930_86.jpg',
                type: 'New York No. 1 Lake Park',
                action:''
            }, {
                key: '4',
                name: '母婴banner',
                img: 'http://image57.360doc.com/DownloadImg/2012/12/1116/28840930_86.jpg',
                type: 'New York No. 1 Lake Park',
                action:''
            }],
            page:1,
            total:1,
            pageSize:10,
            current:'3',
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
            title: '名称',
            dataIndex: 'name',
            render: text => <a href="#">{text}</a>
        }, {
            title: '图片',
            dataIndex: 'img',
            render:(src)=>(
                <img src={src} alt="" className="tr-img"/>
            )
        }, {
            title: '分类',
            dataIndex: 'type'
        },{
            title: '操作',
            dataIndex: 'action',
            render:(text, record) => (
                <div>
                    <span><Icon type="edit" /> 修改</span>
                    <span className="ant-divider" />
                    <span><Icon type="delete" /> 删除</span>
                </div>
            )
        }];
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
    render(){
        const pageshow=this.state.total/this.state.pageSize>1?true:false;
        return (
            <div>
                <SetMenu current={this.state.current} />
                <div className="setting-ad">
                    <SearchBar />
                    <Table  pagination={false}  rowSelection={this.state.rowSelection} columns={this.columnTb()} dataSource={this.state.lists} />
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


export default SettingBanner;
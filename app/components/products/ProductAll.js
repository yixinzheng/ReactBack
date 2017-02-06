import React from 'react';
import {Form, Input, Button, Row, Col, Icon, Select, Table} from 'antd';
import ProductMenu from './ProductMenu';
const FormItem = Form.Item;
const Option = Select.Option;

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statusList: {
                "1": "是",
                "2": "否"
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let username = values.username != undefined ? values.username : '';
                let realname = values.realname != undefined ? values.realname : '';
                let nickname = values.nickname != undefined ? values.nickname : '';
                let status = values.status != undefined ? values.status : '';
                let searchInfo = {
                    username: username,
                    realname: realname,
                    nickname: nickname,
                    status: status
                };
                this.props.searchData(searchInfo);
            }
        });

    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const status = this.state.statusList;
        const _list = Object.keys(status).map((value, index)=> {
            return (<Option value={value} key={value}>{status[value]}</Option>);
        });

        return (
            <Form inline className="setting-search-line" onSubmit={this.handleSubmit}>
                <Row>
                    <Col span={2} className="txt-right">
                        <span>一级分类：</span>
                    </Col>
                    <Col span={6}>
                        {getFieldDecorator('first')(
                            <Select size="large">
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="disabled">Disabled</Option>
                                <Option value="yiminghe">Yiminghe</Option>
                            </Select>
                        )}
                    </Col>
                    <Col span={2} className="txt-right">
                        <span>二级分类：</span>
                    </Col>
                    <Col span={6}>
                        {getFieldDecorator('second')(
                            <Select size="large">
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="disabled">Disabled</Option>
                                <Option value="yiminghe">Yiminghe</Option>
                            </Select>
                        )}
                    </Col>
                    <Col span={2} className="txt-right">
                        <span>三级分类：</span>
                    </Col>
                    <Col span={6}>
                        {getFieldDecorator('third')(
                            <Select size="large">
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="disabled">Disabled</Option>
                                <Option value="yiminghe">Yiminghe</Option>
                            </Select>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col span={2} className="txt-right">
                        <span>产品名称：</span>
                    </Col>
                    <Col span={6}>
                        {getFieldDecorator('name')(
                            <Input  type="text" />
                        )}
                    </Col>
                    <Col span={2} className="txt-right">
                        <span>产品编号：</span>
                    </Col>
                    <Col span={6}>
                        {getFieldDecorator('num')(
                            <Input  type="text" />
                        )}
                    </Col>
                    <Col span={2} className="txt-center">
                        <span>是否推荐</span>
                    </Col>
                    <Col span={6}>
                        {getFieldDecorator('recommend')(
                            <Select size="large" onChange={this.handleChange}>
                                {_list}
                            </Select>
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>共有118件的订单</Col>
                    <Col span={16} className="txt-right">
                        <Button className="setting-search-btn" htmlType="submit">
                            <Icon type="search"/>
                        </Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}
SearchBar = Form.create()(SearchBar);

class ProductAll extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: [],
            page: 1,
            total: 1,
            pageSize: 5,
            selArr:[],
            rowSelection:{
                onChange: this.handleRowSelectionChange.bind(this)
            },
            current:'1'
        }
    }
    confirm(ind) {
        if(ind!=''){
            let actionInfo=  {"action":"exportUserFlowLists","user_id":this.props.params.user_id,"type":"1","flow_id_arr":`[${this.state.selArr}]`};
            SettingModel.fetchData(actionInfo,_success=>{
                if(_success.status){
                    message.success('成功导出');
                    window.open(_success.result.url);
                }else{
                    message.warning(_success.result);
                }
            },_error=>{
                console.log(_error);
            });
        }else{
            message.warning('请选择要导出的数据');
        }
    }
    cancel() {
        message.error('取消导出');
    }
    handleRowSelectionChange (selectedRowKeys) {
        //console.log(`selectedRowKeys: ${selectedRowKeys}`);
        //this.props.deleAll(selectedRowKeys);
        this.setState({
            selArr:`${selectedRowKeys}`
        })
    }
    columnTb() {
        return [{
            title: '产品编号',
            dataIndex: 'key'
        }, {
            title: '产品名称',
            dataIndex: 'times'
        }, {
            title: '产品分类',
            dataIndex: 'name'
        }, {
            title: '操作',
            dataIndex: 'action',
            render: (text, record) => (
                <div>
                    <span>修改{record.key}</span>
                    <span className="ant-divider"/>
                    <span>取消推荐{record.key}</span>
                    <span className="ant-divider"/>
                    <span>下架{record.key}</span>
                </div>
            )
        }];
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

    fetchData(page) {
        let actionInfo = {
            "action": "getUserLists",
            "page": page,
            "limit": this.state.pageSize,
            "user_name": this.state.username,
            "nickname": this.state.nickname,
            "real_name": this.state.realname,
            "status": this.state.status
        };
        SettingModel.fetchData(actionInfo, _success=> {
            if (_success.status && this._isMounted) {
                let _list = [];
                _success.result.userRows.map((item, index)=> {
                    var it = item;
                    it.key = index + 1;
                    _list.push(it);
                });
                this.setState({
                    lists: _list,
                    page: _success.result.current,
                    total: _success.result.total
                });
            } else {
                message.warning(_success.result);
            }
        }, _error=> {
            console.log(_error);
        });
    }

    render() {
        const pages={
            current:this.state.page,
            pageSize:this.state.pageSize,
            total:this.state.total,
            onChange:this.pageClick
        };
        return (
            <div>
                <ProductMenu current={this.state.current} />
                <div className="setting-ad">
                    <SearchBar searchData={(info)=>this.searchFetch(info)}/>
                    <Table pagination={pages} rowSelection={this.state.rowSelection} columns={this.columnTb()} dataSource={this.state.lists}/>
                </div>
            </div>
        )
    }
}

ProductAll = Form.create()(ProductAll);

export default ProductAll;
import React from 'react';
import {Form,Input,Button,Row,Col,Icon,Select,Table} from 'antd';
import ProductMenu from './ProductMenu';
const FormItem = Form.Item;
const Option = Select.Option;

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statusList: {
                "1": "多",
                "2": "少"
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
                <Row className="setting-search-line">
                    <Col span={2} className="txt-right">
                        <span>分类名称：</span>
                    </Col>
                    <Col span={5}>
                        {getFieldDecorator('name')(
                            <Input  type="text" />
                        )}
                    </Col>
                    <Col span={2} className="txt-right">
                        <span>SKU编号：</span>
                    </Col>
                    <Col span={5}>
                        {getFieldDecorator('num')(
                            <Input  type="text" />
                        )}
                    </Col>
                    <Col span={2} className="txt-right">
                        <span>库存紧缺排序：</span>
                    </Col>
                    <Col span={5} className="txt-right">
                        {getFieldDecorator('order')(
                            <Select size="large" onChange={this.handleChange}>
                                {_list}
                            </Select>
                        )}
                    </Col>
                    <Col span={3} className="txt-right">
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

class ProductShelves extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lists: [],
            page: 1,
            total: 1,
            pageSize: 5,
            current:'4'
        }
    }

    columnTb() {
        return [{
            title: 'SKU编号',
            dataIndex: 'key'
        },{
            title: 'SKU属性',
            dataIndex: 'p'
        },{
            title: '产品名称',
            dataIndex: 'name'
        },{
            title: '销量',
            dataIndex: 's'
        },{
            title: '库存',
            dataIndex: 'prices'
        },{
            title: '操作',
            dataIndex: 'action',
            render:(text, record) => (
                <div>
                    <span>详情</span>
                    <span className="ant-divider"/>
                    <span>修改</span>
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
    render(){
        return (
            <div>
                <ProductMenu current={this.state.current} />
                <div className="setting-ad">
                    <SearchBar searchData={(info)=>this.searchFetch(info)}/>
                    <Table columns={this.columnTb()} dataSource={this.state.lists}/>
                </div>
            </div>
        )
    }
}

ProductShelves=Form.create()(ProductShelves);

export default ProductShelves;
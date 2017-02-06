import React from 'react';
import {Form,Input,Button,Row,Col,Icon,Select,Table} from 'antd';
import ProductMenu from './ProductMenu';
const FormItem = Form.Item;
const Option = Select.Option;

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
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
        return (
            <Form inline className="setting-search-line" onSubmit={this.handleSubmit}>
                <Row>
                    <Col span={2} className="txt-right">
                        <span>模版名称：</span>
                    </Col>
                    <Col span={6}>
                        {getFieldDecorator('name')(
                            <Input  type="text" />
                        )}
                    </Col>
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

class ProductFreight extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lists: [],
            page: 1,
            total: 1,
            pageSize: 5,
            current:'3'
        }
    }

    columnTb() {
        return [{
            title: '模板名称',
            dataIndex: 'name'
        },{
            title: '运费（元）',
            dataIndex: 'prices'
        },{
            title: '操作',
            dataIndex: 'action',
            render:(text, record) => (
                <div>
                    <span>修改</span>
                    <span className="ant-divider"/>
                    <span>删除</span>
                    <span className="ant-divider"/>
                    <span>设为默认</span>
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
                    <Row className="mgb30">
                        <Col span={24} style={{"textAlign":"right"}}>
                            <Button type="primary">新增运费模版</Button>
                        </Col>
                    </Row>
                    <Table columns={this.columnTb()} dataSource={this.state.lists}/>
                </div>
            </div>
        )
    }
}

ProductFreight=Form.create()(ProductFreight);

export default ProductFreight;
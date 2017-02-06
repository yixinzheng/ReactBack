import React from 'react';
import {Form,Input,Button,Row,Col,Icon,Select,Table} from 'antd';
import ProductMenu from './ProductMenu';
const FormItem = Form.Item;
const Option = Select.Option;


const columns = [{
    title: '分类名称',
    dataIndex: 'tname'
},{
    title: '父级名称',
    dataIndex: 'pname'
}, {
    title: '图片',
    dataIndex: 'img',
    render:(text)=>(
        <img src={text} className="tr-img" />
    )
}, {
    title: '排序',
    dataIndex: 'sorts',
    render:(text)=>(
        <Input />
    )
},{
    title: '操作',
    dataIndex: 'action',
    render:(text, record) => (
        <div>
            <span> 查看{record.key}</span>
            <span> 删除}</span>
            <span> 购物车属性</span>
            <span> 普通属性</span>
        </div>
    )
}];


const data = [{
    key: '1',
    tname:'223',
    pname: '18659217919',
    img:'王四/18659217919',
    sorts:'交易成功',
    action:''
}, {
    key: '2',
    tname:'223',
    pname: '18659217919',
    img:'王四/18659217919',
    sorts:'交易成功',
    action:''
}, {
    key: '3',
    tname:'223',
    pname: '18659217919',
    img:'王四/18659217919',
    sorts:'交易成功',
    action:''
}, {
    key: '4',
    tname:'223',
    pname: '18659217919',
    img:'王四/18659217919',
    sorts:'交易成功',
    action:''
}];

class ProductBrand extends React.Component{
    constructor(props){
        super(props);
        this.state={
            current:'6'
        }
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <ProductMenu current={this.state.current} />
                <div className="setting-ad">
                    <Row className="mgb30">
                        <Col span={24} style={{"textAlign":"right"}}>
                            <span className="setting-add-btn">新增关键字</span>
                        </Col>
                    </Row>
                    <Table columns={columns} dataSource={data} />
                </div>
            </div>
        )
    }
}

ProductBrand=Form.create()(ProductBrand);

export default ProductBrand;
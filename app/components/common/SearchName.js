import React from 'react';
import {Form,Input,Button,Row,Col,Icon} from 'antd';
import {Link} from 'react-router';
class SearchName extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let sname=values.sortName!=undefined?values.sortName:'';
                let searchInfo={
                    sname:sname
                };
                this.props.searchData(searchInfo);
            }
        });

    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Row className="setting-search-line">
                <Form inline onSubmit={this.handleSubmit}>
                <Col span={2} className="txt-center">
                    <span>{this.props.ntitle}</span>
                </Col>
                    <Col span={5}>
                        {getFieldDecorator('sortName')(
                            <Input  style={{ width: '100%' }} type="text" />
                        )}
                    </Col>
                    <Col span={2} className="txt-center">
                        <Button className="setting-search-btn" htmlType="submit">
                            <Icon type="search" />
                        </Button>
                    </Col>
                </Form>
                <Col span={15} className="txt-right">
                   <Link to={this.props.link}>
                       <Button type="primary">
                           {this.props.btitle}
                       </Button>
                   </Link>
                </Col>
            </Row>
        )
    }
}
SearchName=Form.create()(SearchName);


export default SearchName;
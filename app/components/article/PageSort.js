import React from 'react';
import {Form,Input,Row,Col,Button,message} from 'antd';

import {SettingModel} from '../../Datas/dataModel';



class PageSort extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title:'',
            type:this.props.params.type
        };
        console.log(this.props.params.type);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    componentDidMount(){
        if(this.state.type=='Edit'){
            let ids=this.props.params.title;
            this.props.form.setFieldsValue({
                sortname:ids
            });
        }
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err){
                //新增文章列表分类
                if(this.state.type=='Add'){
                    let _p={"action":"addPageCategory","title":values.sortname};
                    console.log(_p);
                    SettingModel.fetchData(_p,_succ=>{
                        if(_succ.status){
                            message.success('操作成功');
                            history.go(-1);
                        }else{
                            message.warning(_succ.result);
                        }
                    },_err=>{
                        console.log(_err);
                    });
                    return;
                }else if(this.state.type=='Edit'){
                    let _p={"action":"editPageCategory","cate_id":this.props.params.id,"title":values.sortname};
                    SettingModel.fetchData(_p,_succ=>{
                        if(_succ.status){
                            message.success('操作成功');
                            history.go(-1);
                        }else{
                            message.warning(_succ.result);
                        }
                    },_err=>{
                        console.log(_err);
                    });
                    return;
                }
            }else{
                message.error(err.sortname.errors[0].message)
            }
        });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Row className="addsort-title">
                    <Col span={2} className="txt-center">
                        {this.state.type=='Edit'?'修改分类':'添加分类'}
                    </Col>
                </Row>
                <Form inline onSubmit={this.handleSubmit}>
                   <Row className="mgb30">
                       <Col span={2} className="txt-center">分类名称</Col>
                       <Col span={7}>
                           {getFieldDecorator('sortname',{
                               rules: [{ required: true, message: '分类名称不能为空' }]
                           })(
                               <Input style={{ width: '100%' }} type="text"/>
                           )}
                       </Col>
                   </Row>
                    <Row>
                        <Col offset={2}>
                            <Button className="setting-search-btn" htmlType="submit">
                                {`确定`}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}
PageSort=Form.create()(PageSort);
export default PageSort;
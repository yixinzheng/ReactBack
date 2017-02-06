import React from 'react';
import { Button, message,Form,Row,Col,Input} from 'antd';
import {SettingModel} from '../../Datas/dataModel';
import AppDetailMenu from './AppDetailMenu';
import PicUpload from '../common/PicUpload';
const FormItem = Form.Item;

class AppModel extends React.Component{
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state={
            defaulimage:'',
            id:this.props.params.id,
            current:"1"
        };
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.params.id !== this.state.id) {
            this.setState({ id: nextProps.params.id },function(){
                this.fetchData();
            });
        }
    }
    componentWillMount(){
        this._isMounted = true;
        this.fetchData();
    }
    componentWillUnmount(){
        this._isMounted = false;
    }
    fetchData(){
        let _p={"action":"getHeadLinesCategoryListsNoPage"};
        SettingModel.fetchData(_p,_succ=>{
            if(_succ.status && this._isMounted){
                this.setState({
                    title:_succ.result
                });
            }else{
                message.warning(_succ.result);
            }
        },_err=>{
            console.log(_err);
        })
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let _p={"action":"addHeadLine","title":values.title,"category_id":values.category,"content":this.refs.editor.getContent(),"image":this.state.defaulimage};
            SettingModel.fetchData(_p,_succ=>{
                if(_succ.status){
                    message.success(msg);
                    history.go(-1);
                }else{
                    message.warning(_succ.result);
                }
            },_err=>{
                console.log(_err,'add');
            });
        });

    }
    changeImg(files){
        this.setState({
            defaulimage:files
        })
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <div className="mgb30">
                    <AppDetailMenu current={this.state.current} id={this.state.id}/>
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col span={2} className="txt-center">模型标题*</Col>
                        <Col span={7}>
                            <FormItem>
                                {getFieldDecorator('title',{
                                    rules: [{ required: true, message: '模型标题不能为空' }]
                                })(
                                    <Input style={{ width: '100%' }} type="text"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2} className="txt-center">模型副标题*</Col>
                        <Col span={7}>
                            <FormItem>
                                {getFieldDecorator('stitle',{
                                    rules: [{ required: true, message: '模型副标题不能为空' }]
                                })(
                                    <Input style={{ width: '100%' }} type="text"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2} className="txt-center">模型头部图片*</Col>
                        <Col span={7}>
                            <FormItem>
                                <PicUpload title="上传图片" fileurl={this.state.defaulimage} uploadImg={(file)=>this.changeImg(file)} />
                            </FormItem>
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

AppModel=Form.create()(AppModel);
export default AppModel;
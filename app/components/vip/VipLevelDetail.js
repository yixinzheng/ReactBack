import React from 'react';
import {Form,Input,Button,Row,Col,Icon,Select,Table,Popconfirm, message} from 'antd';
import {SettingModel} from '../../Datas/dataModel';
import PicUpload from '../common/PicUpload';
const FormItem = Form.Item;
const Option = Select.Option;
message.config({
    top:'50%'
});

class VipLevelDetail extends React.Component{
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state={
            status:this.props.params.user_id ? '2' : '1',/*1新增 2修改*/
            doneImg:'',
            waitImg:'',
            name:'',
            exp:'',
            discount:'',
            privary:'',
            id:this.props.params.user_id?this.props.params.user_id:''
        };
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.location!=this.props.location){
            location.reload();
        }
    }
    componentWillMount(){
        this._isMounted = true;
        this.fetchDetail();
    }
    componentWillUnmount(){
        this._isMounted = false;
    }
    fetchDetail(){
        if(this.state.status == '2'){
            let _p={"action":"getUserGradeDetail","grade_id":this.state.id};
            SettingModel.fetchData(_p,_success=>{
                if(_success.status && this._isMounted){
                    let result=_success.result;
                    this.setState({
                        doneImg:result.photo1,
                        waitImg:result.photo,
                        name:result.grade_name,
                        exp:result.experience,
                        discount:result.discount,
                        privary:result.privilege
                    });
                    this.props.form.setFieldsValue({
                        name:result.grade_name,
                        exp:result.experience,
                        discount:result.discount,
                        privary:result.privilege
                    });
                }else{
                    message.warning(_success.result);
                    location.hash="/vip/level";
                }
            },_error=>{
                console.log(_error);
            });
        }
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
           if(!err){
               if(!this.state.waitImg){
                   message.warning("未点亮图不能为空!");
                   return;
               }
               if(!this.state.doneImg){
                   message.warning("点亮图不能为空!");
                   return;
               }
               if(this.state.status == '1'){
                   let _p={"action":"addUserGrade","grade_name":values.name,"experience":values.exp,"discount":values.discount,"privilege":values.privary,"photo":this.state.waitImg,"photo1":this.state.doneImg};
                   SettingModel.fetchData(_p,_success=>{
                       if(_success.status){
                           message.success('新增成功');
                           location.hash = '/vip/level';
                       }else{
                           message.warning(_success.result);
                       }
                   },_error=>{
                       console.log(_error);
                   });
               }else{
                   let _p={"action":"editUserGrade","grade_id":this.state.id,"type":"1","grade_name":values.name,"experience":values.exp,"discount":values.discount,"photo":this.state.waitImg,"photo1":this.state.doneImg,"privilege":values.privary};
                   SettingModel.fetchData(_p,_success=>{
                       if(_success.status){
                           message.success('修改成功');
                           location.hash = '/vip/level';
                       }else{
                           message.warning(_success.result);
                       }
                   },_error=>{
                       console.log(_error);
                   });
               }
           }
        });
    }
    changewaitImg(files){
        this.setState({
            waitImg:files
        })
    }
    changedoneImg(files){
        this.setState({
            doneImg:files
        })
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Row className="addsort-title">
                    <Col span={2} className="txt-center">
                        {this.state.status=="2"?"修改会员等级":"添加会员等级"}
                    </Col>
                </Row>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col span={2} className="txt-center">等级名称*</Col>
                        <Col span={7}>
                            <FormItem>
                                {getFieldDecorator('name',{
                                    rules: [{ required: true, message: '等级名称不能为空' }]
                                })(
                                    <Input style={{ width: '100%' }} type="text"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2} className="txt-center">升级经验*</Col>
                        <Col span={7}>
                            <FormItem>
                                {getFieldDecorator('exp',{
                                    rules: [{ required: true, message: '升级经验不能为空' }]
                                })(
                                    <Input style={{ width: '100%' }} type="number"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2} className="txt-center">优惠折扣*</Col>
                        <Col span={7}>
                            <FormItem>
                                {getFieldDecorator('discount',{
                                    rules: [{ required: true, message: '优惠折扣不能为空' }]
                                })(
                                    <Input style={{ width: '100%' }} type="text"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={1}>%</Col>
                    </Row>
                    <Row>
                        <Col span={2} className="txt-center">未点亮图*</Col>
                        <Col span={7}>
                            <FormItem>
                                <PicUpload  fileurl={this.state.waitImg} uploadImg={(file)=>this.changewaitImg(file)} />
                            </FormItem>

                        </Col>
                    </Row>
                    <Row>
                        <Col span={2} className="txt-center">点亮图*</Col>
                        <Col span={7}>
                            <FormItem>
                                <PicUpload fileurl={this.state.doneImg} uploadImg={(file)=>this.changedoneImg(file)} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row className="mgb30">
                        <Col span={2} className="txt-center">特权*</Col>
                        <Col span={7}>
                            <FormItem>
                                {getFieldDecorator('privary',{
                                    rules: [{ required: true, message: '特权不能为空' }]
                                })(
                                    <Input style={{ width: '100%' }} type="textarea"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2} offset={2}>
                            <Button className="setting-search-btn" htmlType="submit">
                                确定
                            </Button>
                        </Col>
                        <Col span={2}>
                            <Button>取消</Button>
                        </Col>
                    </Row>
                </Form>

            </div>
        )
    }
}
VipLevelDetail=Form.create()(VipLevelDetail);

export default VipLevelDetail;
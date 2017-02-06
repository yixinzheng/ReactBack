import React from 'react';
import {Form,Input,Button,Row,Col,Icon,Select,Table,Popconfirm, message} from 'antd';
import {SettingModel} from '../../Datas/dataModel';
const FormItem = Form.Item;
const Option = Select.Option;
message.config({
    top:'50%'
});

class MembersDetail extends React.Component{
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state={
            status:this.props.params.id == undefined ? '1' : '2',/*1新增 2修改*/
            adminname:'',
            pwd:'',
            realname:'',
            mobile:'',
            id:''
        };
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.params.id &&nextProps.params.id!=this.props.params.id){
            this.setState({
                id:nextProps.params.id
            },function(){
                this.modifyDetail();
            })
        }
    }
    componentWillMount(){
        this._isMounted = true;
        if(this.state.status == '2'){
            this.setState({id:this.props.params.id},function () {
                this.modifyDetail()
            });
        }else{
            this.props.form.setFieldsValue({
                adminname:this.state.adminname,
                pwd:this.state.pwd,
                realname:this.state.realname,
                mobile:this.state.mobile
            });
        }
    }
    componentWillUnmount () {
        this._isMounted = false;
    }
    modifyDetail(){
        const id=this.state.id;
        let _p={"action":"getAdminDetail","admin_id":id};
        SettingModel.fetchData(_p,_success=>{
            if(_success.status && this._isMounted){
                this.setState({
                    adminname:_success.result.admin_name,
                    realname:_success.result.real_name,
                    mobile:_success.result.mobile
                });
                this.props.form.setFieldsValue({
                    adminname:_success.result.admin_name,
                    realname:_success.result.real_name,
                    mobile:_success.result.mobile
                });
            }else{
                message.warning(_success.result);
                location.hash="/members"
            }
        },_error=>{
            console.log(_error);
        });
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
           if(!err){
               if(this.state.status == '1'){
                   let _p={"action":"addAdmin","admin_name":values.adminname,"real_name":values.realname,"mobile":values.mobile,"password":values.pwd};
                   SettingModel.fetchData(_p,_success=>{
                       if(_success.status){
                           message.success('新增成功');
                           location.hash = '/members';
                       }else{
                           message.warning(_success.result);
                       }
                   },_error=>{
                       console.log(_error);
                   });
               }else{
                   let _p={"action":"editAdmin","admin_id":this.state.id,"real_name":values.realname,"mobile":values.mobile,"password":values.pwd};
                   console.log(_p);
                   SettingModel.fetchData(_p,_success=>{
                       if(_success.status){
                           message.success('修改成功');
                           location.hash = '/members';
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
    checkPwd(rule, value, callback) {
        if (value && value.length<6) {
            callback('密码至少为6位数');
        } else {
            callback();
        }
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <div className="addsort-title">
                    {this.state.status == '1' ? '新增' : '修改'}员工
                </div>
                <Form onSubmit={this.handleSubmit}>
                    <Row className="form-row">
                        <Col span={2} className="txt-center">用户名：</Col>
                        <Col span={8}>
                            <FormItem>
                            {getFieldDecorator('adminname', {
                                rules: [{ required: true, message: '请输入用户名！' }]
                            })(
                                <Input style={{ width: '100%' }} type="text" disabled={this.state.status == 1 ? false : true}/>
                            )}
                                </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2} className="txt-center">密码：</Col>
                        <Col span={8}>
                            <FormItem>
                            {getFieldDecorator('pwd', {
                                rules: [
                                    { required: true, message: '请输入密码！' },
                                    { validator: this.checkPwd}
                                ]
                            })(
                                <Input style={{ width:  '100%' }} type="password"/>
                            )}
                                </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2} className="txt-center">姓名：</Col>
                        <Col span={8}>
                            <FormItem>
                            {getFieldDecorator('realname', {
                                rules: [{ required: true, message: '请输入姓名！' }]
                            })(
                                <Input style={{ width:  '100%' }} type="text"/>
                            )}
                                </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2} className="txt-center">手机号：</Col>
                        <Col span={8}>
                            <FormItem>
                            {getFieldDecorator('mobile', {
                                rules: [{ required: true, message: '请输入手机号！' }]
                            })(
                                <Input style={{ width: '100%' }} type="text"/>
                            )}
                                </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col offset={2}>
                            <Button className="setting-search-btn" type="primary" htmlType="submit">
                                {this.state.status == '1' ? '新增' : '修改'}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}
MembersDetail=Form.create()(MembersDetail);

export default MembersDetail;
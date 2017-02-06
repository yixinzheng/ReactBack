import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {UserModel} from '../../Datas/dataModel';
import {Link} from 'react-router';


const FormItem = Form.Item;
class Login extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                UserModel.login(values,data=>{
                    if(data){
                        location.hash='/';
                        //this.context.router.push('/');
                    }else{
                        location.hash='/login';
                        //this.context.router.push('/login');
                    }
                },err=>{
                    console.log(err,'error');
                })
            }
        });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-box">
                <div className="login-title">XMISP 点击网络</div>
                <div className="login-stitle">电商后台管理系统</div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '请输入用户名!' }]
                        })(
                            <Input addonBefore={<Icon type="user" />} placeholder="Username" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码！' }]
                        })(
                            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </FormItem>
                </Form>
                <div className="login-footer">
                    <p>版权所有：厦门鑫点击网络科技股份有限公司</p>
                    <p>CopyRight @ 2002--2014www.xmisp.com</p>
                </div>
            </div>
        )
    }
}


Login = Form.create({})(Login);

export default Login;
import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import SetMenu from './SetMenu';
const FormItem = Form.Item;

class SettingMail extends React.Component{
    constructor(props){
        super(props);
        this.state={
            current:'7'
        };
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    componentWillMount(){
        this.props.form.setFieldsValue({
            email:"2243064033@qq.com",
            emailsmtp:"smtp.qq.com",
            pwd:"ddd"
        });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="setting-one">
                <SetMenu current={this.state.current} />
                <Form onSubmit={this.handleSubmit}>
                <table cellPadding="0" cellSpacing="0" className="setting-tb">
                    <tbody>
                    <tr>
                        <th className="stitle">项目</th>
                        <th className="stitle">内容</th>
                    </tr>
                    <tr>
                        <td>电子邮箱：</td>
                        <td>
                            <FormItem>
                                {getFieldDecorator('email', {
                                    rules: [{ required: true, message: '请输入电子邮箱' }]
                                })(
                                    <Input  placeholder="请输入电子邮箱" type="text"  name="email"/>
                                )}
                            </FormItem>
                            </td>
                    </tr>
                    <tr>
                        <td>电子邮箱smtp</td>
                        <td>
                            <FormItem>
                                {getFieldDecorator('emailsmtp', {
                                    rules: [{ required: true, message: '请输入电子邮箱smtp' }]
                                })(
                                    <Input  placeholder="请输入电子邮箱smtp" type="text" name="emailsmtp"/>
                                )}
                            </FormItem>
                           </td>
                    </tr>
                    <tr>
                        <td>SEO关键词</td>
                        <td>
                            <FormItem>
                                {getFieldDecorator('pwd', {
                                    rules: [{ required: true, message: '请输入密码' }]
                                })(
                                    <Input  placeholder="请输入密码" type="password" name="pwd"/>
                                )}
                            </FormItem>
                            </td>
                    </tr>
                    </tbody>
                </table>
                    <div className="setting-btn-line">
                        <FormItem>
                            <Button htmlType="submit">保存修改</Button>
                        </FormItem>
                    </div>
              </Form>
            </div>
        )
    }
}
SettingMail=Form.create()(SettingMail);

export default SettingMail;
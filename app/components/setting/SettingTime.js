import React from 'react';
import { Form, Icon, InputNumber , Button } from 'antd';
import SetMenu from './SetMenu';
const FormItem = Form.Item;

class SettingTime extends React.Component{
    constructor(props){
        super(props);
        this.state={
            current:'4'
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
            pay:"1",
            receipt:"1",
            sale:"1",
            evaluate:"1"
        });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <SetMenu current={this.state.current} />
                <div className=" setting-one">
                    <Form onSubmit={this.handleSubmit} inline>
                        <table cellPadding="0" cellSpacing="0" className="setting-tb">
                            <tbody>
                            <tr>
                                <th className="stitle">名称</th>
                                <th className="stitle">内容</th>
                            </tr>
                            <tr>
                                <td>付款超时：<Icon type="question-circle" /></td>
                                <td>
                                    <FormItem>
                                        {getFieldDecorator('pay', {
                                            rules: [{ required: true,message:'填写数字' }]
                                        })(
                                            <InputNumber  min={0} max={60}  name="pay"/>
                                        )}
                                    </FormItem>
                                    分
                                </td>
                            </tr>
                            <tr>
                                <td>收货超时 <Icon type="question-circle" /></td>
                                <td>
                                    <FormItem>
                                        {getFieldDecorator('receipt', {
                                            rules: [{ required: true,message:'填写数字'}]
                                        })(
                                            <InputNumber  min={0} max={366}  name="receipt"/>
                                        )}
                                    </FormItem>
                                    天
                                </td>
                            </tr>
                            <tr>
                                <td>售后超时 <Icon type="question-circle" /></td>
                                <td>
                                    <FormItem>
                                        {getFieldDecorator('sale', {
                                            rules: [{ required: true,message:'填写数字'}]
                                        })(
                                            <InputNumber  min={0} max={366}   name="sale"/>
                                        )}
                                    </FormItem>
                                    天
                                </td>
                            </tr>
                            <tr>
                                <td>评价超时 <Icon type="question-circle" /></td>
                                <td>
                                    <FormItem>
                                        {getFieldDecorator('evaluate', {
                                            rules: [{ required: true,message:'填写数字'}]
                                        })(
                                            <InputNumber   min={0} max={366}  name="evaluate"/>
                                        )}
                                    </FormItem>
                                    天
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
            </div>
        )
    }
}
SettingTime=Form.create()(SettingTime);

export default SettingTime;
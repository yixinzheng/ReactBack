import React from 'react';
import { Form, Icon, Input, Button,Row,Col } from 'antd';
import PicUpload from '../common/PicUpload';
import AppMenu from './AppMenu';

const FormItem = Form.Item;

class SettingShare extends React.Component{
    constructor(props){
        super(props);
        this.state={
            defaulimage:'',
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
            email:"2243064033@qq.com",
            emailsmtp:"smtp.qq.com",
            pwd:"ddd"
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
            <div className="setting-one">
                <AppMenu  current={this.state.current}/>
                <Form onSubmit={this.handleSubmit}>
                <table cellPadding="0" cellSpacing="0" className="setting-tb mgb30">
                    <tbody>
                    <tr>
                        <th className="stitle">项目</th>
                        <th className="stitle">内容</th>
                    </tr>
                    <tr>
                        <td>分享标题</td>
                        <td>
                            <FormItem>
                                {getFieldDecorator('titles', {
                                    rules: [{ required: true, message: '请输入分享标题' }]
                                })(
                                    <Input  placeholder="请输入分享标题" type="text"  name="titles"/>
                                )}
                            </FormItem>
                            </td>
                    </tr>
                    <tr>
                        <td>分享链接</td>
                        <td>
                            <FormItem>
                                {getFieldDecorator('link', {
                                    rules: [{ required: true, message: '请输入分享链接' }]
                                })(
                                    <Input  placeholder="请输入分享链接" type="text" name="link"/>
                                )}
                            </FormItem>
                           </td>
                    </tr>
                    <tr>
                        <td>分享内容</td>
                        <td>
                            <FormItem>
                                {getFieldDecorator('contents', {
                                    rules: [{ required: true, message: '请输入分享内容' }]
                                })(
                                    <Input  placeholder="请输入分享内容" type="textarea" name="contents"/>
                                )}
                            </FormItem>
                            </td>
                    </tr>
                    </tbody>
                </table>
                    <Row className="mgb30">
                        <Col span={6} className="txt-center">分享图标</Col>
                        <Col span={7}>
                            <PicUpload title="上传封面" fileurl={this.state.defaulimage} uploadImg={(file)=>this.changeImg(file)} />
                        </Col>
                        <Col span={10}>
                            <span>建议上传png透明图片，图片大小建议: 230*50像素</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col offset={6}>
                            <Button htmlType="submit">保存修改</Button>
                        </Col>
                    </Row>
              </Form>
            </div>
        )
    }
}
SettingShare=Form.create()(SettingShare);

export default SettingShare;
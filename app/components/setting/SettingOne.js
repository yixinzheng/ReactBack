import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import SetMenu from './SetMenu';
const FormItem = Form.Item;

class SettingOne extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.state={
            current:'1'
        }
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
            webtitle:"点击",
            seotitle:"点击母婴商城系统_电子商务网站建设_独立网店系统-点击电子商务系统提供商",
            seokeywords:"母婴自营电商，wap，APP",
            seodescription:"Djmall-厦门鑫点击网络科技股份有限公司旗下品牌,点击电子商务系统,专注电子商务网站建设.为中小企业及个人提供网上商城系统、电子商务网站建设、微信商城系统等产品和解决方案.更注重SEO优化,大幅降低建站成本.独有可视化编辑功能,让您无需开发人员,建设网上商城系统,实现快速建站",
            record:"闽ICP备07030066号-1",
            copyright:"©2003-2016xmisp.com版权所有",
            telephone:"400-884-1138",
            qq:"4008841138;875032582",
            mail:"kefu@xmisp.com",
            address:"厦门市思明区厦禾路844号"
        });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <SetMenu current={this.state.current}/>
                <Form onSubmit={this.handleSubmit}>
                    <table cellPadding="0" cellSpacing="0" className="setting-tb">
                        <tbody>
                        <tr>
                            <th className="stitle">项目</th>
                            <th className="stitle">内容</th>
                        </tr>
                        <tr>
                            <td>网站名称</td>
                            <td>
                                <FormItem>
                                    {getFieldDecorator('webtitle', {
                                        rules: [{ required: true, message: '请输入网站名称' }]
                                    })(
                                        <Input  placeholder="请输入网站名称" type="text"  name="webtitle"/>
                                    )}
                                </FormItem>
                            </td>
                        </tr>
                        <tr>
                            <td>SEO标题 <Icon type="question-circle" /></td>
                            <td>
                                <FormItem>
                                    {getFieldDecorator('seotitle', {
                                        rules: [{ required: true, message: '请输入网站标题' }]
                                    })(
                                        <Input  placeholder="请输入网站标题" type="text" name="seotitle"/>
                                    )}
                                </FormItem>
                            </td>
                        </tr>
                        <tr>
                            <td>SEO关键词 <Icon type="question-circle"  title="多个关键词请用英文;隔开" /></td>
                            <td>
                                <FormItem>
                                    {getFieldDecorator('seokeywords', {
                                        rules: [{ required: true, message: '多个关键词请用英文;隔开' }]
                                    })(
                                        <Input  placeholder="多个关键词请用英文 ; 隔开" type="text" name="seokeywords"/>
                                    )}
                                </FormItem>
                            </td>
                        </tr>
                        <tr>
                            <td>SEO描述 <Icon type="question-circle" title="网站的描述信息，建议在100字以内" /></td>
                            <td>
                                <FormItem>
                                    {getFieldDecorator('seodescription', {
                                        rules: [{ required: true, message: '请输入SEO描述' }]
                                    })(
                                        <Input type="textarea" autosize={{ minRows: 2, maxRows: 6 }} placeholder="请输入SEO描述" name="seodescription" />
                                    )}
                                </FormItem>
                            </td>
                        </tr>
                        <tr>
                            <td>备案号</td>
                            <td>
                                <FormItem>
                                    {getFieldDecorator('record', {
                                        rules: [{ required: true, message: '请输入备案号' }]
                                    })(
                                        <Input  placeholder="请输入备案号" type="text" name="record"/>
                                    )}
                                </FormItem>
                            </td>
                        </tr>
                        <tr>
                            <td>版权信息</td>
                            <td>
                                <FormItem>
                                    {getFieldDecorator('copyright', {
                                        rules: [{ required: true, message: '请输入版权信息' }]
                                    })(
                                        <Input  placeholder="请输入版权信息" type="text"  name="copyright"/>
                                    )}
                                </FormItem>
                            </td>
                        </tr>
                        <tr>
                            <td>联系电话</td>
                            <td>
                                <FormItem>
                                    {getFieldDecorator('telephone', {
                                        rules: [{ required: true, message: '请输入联系电话' }]
                                    })(
                                        <Input  placeholder="请输入联系电话" type="text" name="telephone"/>
                                    )}
                                </FormItem>
                            </td>
                        </tr>
                        <tr>
                            <td>联系QQ</td>
                            <td>
                                <FormItem>
                                    {getFieldDecorator('qq', {
                                        rules: [{ required: true, message: '请输入联系QQ' }]
                                    })(
                                        <Input  placeholder="请输入联系QQ" type="text"  name="qq"/>
                                    )}
                                </FormItem>
                            </td>
                        </tr>
                        <tr>
                            <td>客服邮箱</td>
                            <td>
                                <FormItem>
                                    {getFieldDecorator('mail', {
                                        rules: [{ required: true, message: '请输入客服邮箱' }]
                                    })(
                                        <Input  placeholder="请输入客服邮箱" type="text" name="mail"/>
                                    )}
                                </FormItem>
                            </td>
                        </tr>
                        <tr>
                            <td>地址</td>
                            <td>
                                <FormItem>
                                    {getFieldDecorator('address', {
                                        rules: [{ required: true, message: '请输入地址' }]
                                    })(
                                        <Input  placeholder="请输入地址" type="text" name="address"/>
                                    )}
                                </FormItem>

                            </td>
                        </tr>
                        <tr>
                            <td>统计代码 <Icon type="question-circle"  title="如有接入统计后台,请将验证代码由此填入,保存即可" /></td>
                            <td>
                                <FormItem>
                                    {getFieldDecorator('statistics', {
                                        rules: [{ message: '如有接入统计后台,请将验证代码由此填入,保存即可' }]
                                    })(
                                        <Input type="textarea" placeholder="如有接入统计后台,请将验证代码由此填入,保存即可" name="statistics" />
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
SettingOne=Form.create()(SettingOne);

export default SettingOne;
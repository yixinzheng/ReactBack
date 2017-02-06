import React from 'react';
import { Form,Upload, Button, Icon ,Row,Col,Input} from 'antd';
import PicUpload from '../common/PicUpload';
import SetMenu from './SetMenu';
const FormItem = Form.Item;


class SettingLogo extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            current:'2',
            logo_img:'',
            blogo_img:'',
            tele_img:'',
            icon_img:'',
            scan_img:'',
            app_img:'',
            ad_img:'',
            adlogo_img:''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    handleChange(e) {
        console.log(e.target.value);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <SetMenu current={this.state.current}/>
                <div className="setting-one setting-logo">
                    <Form inline onSubmit={this.handleSubmit}>
                        <Row className="mgb30">
                            <Col span={6}>
                                LOGO
                            </Col>
                            <Col span={8}>
                                <PicUpload fileurl={this.state.logo_img} uploadImg={(file)=>this.setState({logo_img:file})} />
                            </Col>
                            <Col span={10}>
                                建议上传png透明图片，图片大小建议: 230*50像素
                            </Col>
                        </Row>
                        <Row className="mgb30">
                            <Col span={6}>
                                底部LOGO
                            </Col>
                            <Col span={8}>
                                <PicUpload fileurl={this.state.blogo_img} uploadImg={(file)=>this.setState({blogo_img:file})} />
                            </Col>
                            <Col span={10}>
                                建议上传png透明图片，图片大小建议: 145*75像素
                            </Col>
                        </Row>
                        <Row className="mgb30">
                            <Col span={6}>
                                手机LOGO
                            </Col>
                            <Col span={8}>
                                <PicUpload fileurl={this.state.tele_img} uploadImg={(file)=>this.setState({tele_img:file})} />
                            </Col>
                            <Col span={10}>
                                建议上传png透明图片，图片大小建议: 145*75像素
                            </Col>
                        </Row>
                        <Row className="mgb30">
                            <Col span={6}>
                                ICON
                            </Col>
                            <Col span={8}>
                                <PicUpload fileurl={this.state.icon_img} uploadImg={(file)=>this.setState({icon_img:file})} />
                            </Col>
                            <Col span={10}>
                                必须上传.png格式的透明图片，图片大小建议: 20*20像素
                            </Col>
                        </Row>
                        <Row className="mgb30">
                            <Col span={6}>
                                微信二维码
                            </Col>
                            <Col span={8}>
                                <PicUpload fileurl={this.state.scan_img} uploadImg={(file)=>this.setState({scan_img:file})} />
                            </Col>
                            <Col span={10}>
                                建议上传png透明图片，图片大小建议: 155*155像素
                            </Col>
                        </Row>
                        <Row className="mgb30">
                            <Col span={6}>
                                APP二维码
                            </Col>
                            <Col span={8}>
                                <PicUpload fileurl={this.state.app_img} uploadImg={(file)=>this.setState({app_img:file})} />
                            </Col>
                            <Col span={10}>
                                建议上传png透明图片，图片大小建议: 155*155像素
                            </Col>
                        </Row>
                        <Row className="mgb30">
                            <Col span={6}>
                                APP广告页
                            </Col>
                            <Col span={8}>
                                <PicUpload fileurl={this.state.ad_img} uploadImg={(file)=>this.setState({ad_img:file})} />
                            </Col>
                            <Col span={10}>
                                建议上传png透明图片，图片大小建议: 155*155像素
                            </Col>
                        </Row>
                        <Row className="mgb30">
                            <Col span={6}>
                                公告LOGO
                            </Col>
                            <Col span={8}>
                                <PicUpload fileurl={this.state.adlogo_img} uploadImg={(file)=>this.setState({adlogo_img:file})} />
                            </Col>
                            <Col span={10}>
                                建议上传png透明图片，图片大小建议: 155*155像素
                            </Col>
                        </Row>
                        <Row>
                            <Col offset={6} span={18}>
                                <FormItem>
                                    <Button htmlType="submit">保存修改</Button>
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        )
    }
}

SettingLogo = Form.create()(SettingLogo);
export default SettingLogo;
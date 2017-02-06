import React from 'react';
import {Form,Input,Select,Row,Col,Button,message,Upload,Icon,Cascader } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
import Ueditor from '../common/Editor';
import PicUpload from '../common/PicUpload';
import {SettingModel,UserModel,goobleApi} from '../../Datas/dataModel';

const options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
        }],
    }],
}];

class ProductAdd extends React.Component{
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state={
            catogary:'',
            defaulimage:'',
            content:'',
            id:this.props.params.id||'',
            action:this.props.params.action
        };
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.params.id !== this.state.id) {
            this.setState({ id: nextProps.params.id },function(){
                this.fetchData();
                console.log(nextProps);
                if(this.state.action=="Modify"){
                    this.fetchAllData();
                }else{
                    this.props.form.setFieldsValue({
                        category:this.state.id
                    });
                }
            });
        }
    }
    componentWillMount(){
        this._isMounted = true;
        this.fetchData();
        if(this.state.action=="Modify"){
            this.fetchAllData();
        }else{
            this.props.form.setFieldsValue({
                category:this.state.id
            });
        }
    }
    componentWillUnmount(){
        this._isMounted = false;
    }
    fetchAllData(){
        let _p={"action":"getHeadLineDetailByHeadLinesId","headlines_id":this.state.id};
        SettingModel.fetchData(_p,_succ=>{
            if(_succ.status && this._isMounted){
                this.props.form.setFieldsValue({
                    title:_succ.result.title,
                    category:_succ.result.category_id
                });
                this.setState({
                    contents:_succ.result.content,
                    defaulimage:_succ.result.image
                });
            }else{
                message.warning(_succ.result);
                location.hash=`/article/headLines`;
            }
        },_err=>{
            console.log(_err);
        })
    }
    fetchData(){
        let _p={"action":"getHeadLinesCategoryListsNoPage"};
        SettingModel.fetchData(_p,_succ=>{
            if(_succ.status && this._isMounted){
                this.setState({
                    catogary:_succ.result
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
            let action=this.state.action;
            let _p=action=="Add"?({"action":"addHeadLine","title":values.title,"category_id":values.category,"content":this.refs.editor.getContent(),"image":this.state.defaulimage}):({"action":"editHeadLine","headlines_id":this.state.id,"title":values.title,"category_id":values.category,"content":this.refs.editor.getContent(),"image":this.state.defaulimage});
            SettingModel.fetchData(_p,_succ=>{
                if(_succ.status){
                    let msg=action=="Modify"?"修改成功":"新增成功";
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
        const tk=UserModel.fetchToken();
        const pic_props={
            multiple:true,
            action:`${goobleApi}api/admin/upload-img?token=${tk}`,
            listType:'picture'
        };
        return (
            <div>
                <Row className="addsort-title">
                    <Col span={2} className="txt-center">
                        {this.state.action=="Modify"?"修改产品详情":"添加产品详情"}
                    </Col>
                </Row>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col span={3} className="txt-right">选择产品分类*：</Col>
                        <Col span={7}>
                            <FormItem>
                                {getFieldDecorator('types',{
                                    rules: [{ required: true, message: '产品分类不能为空' }]
                                })(
                                    <Cascader options={options} placeholder="请选择产品分类" />

                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={3} className="txt-right">产品标题*：</Col>
                        <Col span={7}>
                            <FormItem>
                                {getFieldDecorator('title',{
                                    rules: [{ required: true, message: '产品标题不能为空' }]
                                })(
                                    <Input style={{ width: '100%' }} type="text"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={3} className="txt-right">标签*：</Col>
                        <Col span={7}>
                            <FormItem>
                                {getFieldDecorator('tags',{
                                    rules: [{ required: true, message: '标签不能为空' }]
                                })(
                                    <Input style={{ width: '100%' }} type="text"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={3} className="txt-right">品牌*：</Col>
                        <Col span={7}>
                            <FormItem>
                                {getFieldDecorator('brand',{
                                    rules: [{ required: true, message: '请选择品牌' }]
                                })(
                                    <Cascader options={options} placeholder="请选择品牌" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={3} className="txt-right">参考价*：</Col>
                        <Col span={4}>
                            <FormItem>
                                {getFieldDecorator('ref_price',{
                                    rules: [{ required: true, message: '请填写参考价' }]
                                })(
                                    <Input type="number" placeholder="请填写参考价" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={1}>元</Col>
                    </Row>
                    <Row>
                        <Col span={3} className="txt-right">销售价*：</Col>
                        <Col span={4}>
                            <FormItem>
                                {getFieldDecorator('sale_price',{
                                    rules: [{ required: true, message: '请填写销售价' }]
                                })(
                                    <Input type="number" placeholder="请填写销售价" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={1}>元</Col>
                    </Row>
                    <Row>
                        <Col span={3} className="txt-right">库存*：</Col>
                        <Col span={4}>
                            <FormItem>
                                {getFieldDecorator('stock',{
                                    rules: [{ required: true, message: '请填写库存' }]
                                })(
                                    <Input type="number" placeholder="请填写库存" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={3} className="txt-right">产品图片*：</Col>
                        <Col span={20}>
                            <Upload
                                {...pic_props}
                                className="upload-list-inline"
                                >
                                <Button type="primary">
                                    <Icon type="upload" />
                                    上传图片
                                </Button>
                            </Upload>
                        </Col>
                    </Row>
                    <Row className="mgb30">
                        <Col offset={3} span={21}>
                            <p>提示：1.本地上传图片大小不能超过2M。</p>
                            <p>2.本类目下您最多可上传6张图片。</p>
                            <p>3.背景图是xmisp提供的范例，请尽量参照范例选图，发布后范例不会显示。</p>
                            <p>4.若不上传竖图，搜索列表、活动等页面的竖图模式将无法展示宝贝</p>
                        </Col>
                    </Row>
                    <Row className="mgb30">
                        <Col span={3} className="txt-right">产品描述：</Col>
                        <Col span={15}>
                            <Ueditor ref="editor"  contents={this.state.contents}  id="content" height="200" />
                        </Col>
                    </Row>
                    <Row>
                        <Col offset={3}>
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

ProductAdd=Form.create()(ProductAdd);
export default ProductAdd;
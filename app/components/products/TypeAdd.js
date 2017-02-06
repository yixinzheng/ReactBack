import React from 'react';
import {Form,Input,Row,Col,Button,message,Upload,Icon,Radio,Cascader } from 'antd';
import PicUpload from '../common/PicUpload';
import {SettingModel,UserModel,goobleApi} from '../../Datas/dataModel';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;



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
class TypeAdd extends React.Component{
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state={
            cateVal:1,
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
    onCateChange(e) {
        this.setState({
            cateVal: e.target.value
        });
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
                        {this.state.action=="Modify"?"修改分类":"添加分类"}
                    </Col>
                </Row>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col span={3} className="txt-right">分类名称*：</Col>
                        <Col span={7}>
                            <FormItem>
                                {getFieldDecorator('types',{
                                    rules: [{ required: true, message: '分类名称不能为空' }]
                                })(
                                    <Input style={{ width: '100%' }} type="text"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={3} className="txt-right">产品图片*：</Col>
                        <Col span={3}>
                            <FormItem>
                            <Upload
                                {...pic_props}
                                className="upload-list-inline"
                                >
                                <Button type="primary">
                                    <Icon type="upload" />
                                    上传图片
                                </Button>
                            </Upload>
                            </FormItem>
                        </Col>
                        <Col span={3}>
                            建议大小：210*430px
                        </Col>
                    </Row>
                    <Row>
                        <Col span={3} className="txt-right">分类等级*：</Col>
                        <Col span={7}>
                            <FormItem>
                                <RadioGroup onChange={(e)=>this.onCateChange(e)} value={this.state.cateVal}>
                                    <Radio value={1}>一级</Radio>
                                    <Radio value={2}>二级</Radio>
                                    <Radio value={3}>三级</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                    </Row>
                    {(this.state.cateVal && this.state.cateVal!== 1) ?
                    <Row>
                        <Col span={3} className="txt-right">产品分类*：</Col>
                        <Col span={7}>
                            <FormItem>
                                {getFieldDecorator('category',{
                                    rules: [{ required: true, message: '请选择等级' }]
                                })(
                                    <Cascader options={options} placeholder="请选择等级" />
                                )}
                            </FormItem>
                        </Col>
                    </Row> : null}

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

TypeAdd=Form.create()(TypeAdd);
export default TypeAdd;
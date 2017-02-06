import React from 'react';
import {Form,Input,Select,Row,Col,Button,message,Upload,Icon} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
import Ueditor from '../common/Editor';
import PicUpload from '../common/PicUpload';
import {SettingModel} from '../../Datas/dataModel';



class HeadLinesListAdd extends React.Component{
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state={
            catogary:'',
            defaulimage:'',
            content:'',
            id:this.props.params.id,
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
        const selelist=this.state.catogary;
        const _list=Object.keys(selelist).map((value,index)=>{
            return (<Option value={selelist[value].cate_id} key={index}>{selelist[value].title}</Option>);
        });
        return (
            <div>
                <Row className="addsort-title">
                    <Col span={2} className="txt-center">
                        {this.state.action=="Modify"?"修改头条文章":"添加头条文章"}
                    </Col>
                </Row>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col span={2} className="txt-center">标题*</Col>
                        <Col span={7}>
                            <FormItem>
                            {getFieldDecorator('title',{
                                rules: [{ required: true, message: '标题不能为空' }]
                            })(
                                <Input style={{ width: '100%' }} type="text"/>
                            )}
                                </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2} className="txt-center">分类*</Col>
                        <Col span={7}>
                            <FormItem>
                            {getFieldDecorator('category',{
                                rules: [{ required: true, message: '分类不能为空' }]
                            })(
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="选择分类"
                                    optionFilterProp="children"
                                    >
                                    {_list}
                                </Select>
                            )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2} className="txt-center">封面*</Col>
                        <Col span={7}>
                            <FormItem>
                                <PicUpload title="上传封面" fileurl={this.state.defaulimage} uploadImg={(file)=>this.changeImg(file)} />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row className="mgb30">
                        <Col span={2} className="txt-center">内容</Col>
                        <Col span={15}>
                            <Ueditor ref="editor"  contents={this.state.contents}  id="content" height="200" />
                        </Col>
                    </Row>
                    <Row>
                        <Col offset={2}>
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

HeadLinesListAdd=Form.create()(HeadLinesListAdd);
export default HeadLinesListAdd;
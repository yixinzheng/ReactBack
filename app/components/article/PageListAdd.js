import React from 'react';
import {Form,Input,Select,Row,Col,Button,message} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
import Ueditor from '../common/Editor';
import {SettingModel} from '../../Datas/dataModel';


class PageListAdd extends React.Component{
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state={
            catogary:'',
            contents:'',
            id:this.props.params.id,
            action:this.props.params.action
        };
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.params.id !== this.state.id) {
            this.setState({ id: nextProps.params.id },function(){
                this.fetchData();
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
                category:this.state.id,
                types:"1"
            });
        }

    }
    componentWillUnmount(){
        this._isMounted = false;
    }
    fetchAllData(){
        let _p={"action":"getPageDetailByPageId","page_id":this.state.id};
        SettingModel.fetchData(_p,_succ=>{
            if(_succ.status && this._isMounted){
                this.props.form.setFieldsValue({
                    title:_succ.result.title,
                    types:_succ.result.type,
                    category:_succ.result.page_cate
                });
                this.setState({
                    contents:_succ.result.content
                });
            }else{
                message.warning(_succ.result);
                location.hash=`/article`;
            }
        },_err=>{
            console.log(_err);
        })
    }
    fetchData(){
        let _p={"action":"getPageCategoryListsNoPage"};
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
            let _p;
            if(values.types=="1"){
                _p=action=="Add"?({"action":"addPage","title":values.title,"type":values.types,"page_cate":values.category,"content":this.refs.editor.getContent()}):({"action":"editPage","page_id":this.state.id,"title":values.title,"type":values.types,"page_cate":values.category,"content":this.refs.editor.getContent()});
            }else{
                _p=action=="Add"?({"action":"addPage","title":values.title,"type":values.types,"page_cate":values.category,"href":values.links}):({"action":"editPage","page_id":this.state.id,"title":values.title,"type":values.types,"page_cate":values.category,"href":values.links});
            }

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
                        {this.state.action=="Add"?"添加文章":"修改文章"}
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
                        <Col span={2} className="txt-center">类型*</Col>
                        <Col span={7}>
                            <FormItem>
                            {getFieldDecorator('types',{
                                rules: [{ required: true, message: '类型不能为空' }]
                            })(
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="选择类型"
                                    optionFilterProp="children"
                                    >
                                    <Option value="1">单页</Option>
                                    <Option value="2">自定义</Option>
                                </Select>
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
                    <Row className="mgb30" style={{display:this.props.form.getFieldValue("types")=="1"?"block":"none"}}>
                        <Col span={2} className="txt-center">内容</Col>
                        <Col span={15}>
                            <Ueditor ref="editor" contents={this.state.contents}  id="content" height="200" />
                        </Col>
                    </Row>
                    <Row style={{display:this.props.form.getFieldValue("types")=="1"?"none":"block"}}>
                        <Col span={2} className="txt-center">链接*</Col>
                        <Col span={7}>
                            <FormItem>
                                {getFieldDecorator('links',{
                                    rules: [{ required: true, message: '链接不能为空' }]
                                })(
                                    <Input addonBefore="http://" type="text"/>
                                )}
                            </FormItem>
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

PageListAdd=Form.create()(PageListAdd);
export default PageListAdd;
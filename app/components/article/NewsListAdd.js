import React from 'react';
import {Form,Input,Select,Row,Col,Button,message} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
import Ueditor from '../common/Editor';
import {SettingModel} from '../../Datas/dataModel';



class NewsListAdd extends React.Component{
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state={
            catogary:'',
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
        let _p={"action":"getNewsDetailByNewsId","news_id":this.state.id};
        SettingModel.fetchData(_p,_succ=>{
            if(_succ.status && this._isMounted){
                this.props.form.setFieldsValue({
                    title:_succ.result.title,
                    about:_succ.result.about,
                    category:_succ.result.category_id
                });
                this.setState({
                    contents:_succ.result.content
                });
            }else{
                message.warning(_succ.result);
                location.hash=`/article/news`;
            }
        },_err=>{
            console.log(_err);
        })
    }
    fetchData(){
        let _p={"action":"getNewsCategoryListsPage"};
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
            let _p=action=="Add"?({"action":"addNews","title":values.title,"category_id":values.category,"content":this.refs.editor.getContent(),"about":values.about!=undefined?values.about:""}):({"action":"editNews","news_id":this.state.id,"title":values.title,"category_id":values.category,"content":this.refs.editor.getContent(),"about":values.about});
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
                        {this.state.action=="Modify"?"修改资讯文章":"添加资讯文章"}
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
                        <Col span={2} className="txt-center">简介*</Col>
                        <Col span={7}>
                            <FormItem>
                                {getFieldDecorator('about')(
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
                    <Row className="mgb30">
                        <Col span={2} className="txt-center">内容</Col>
                        <Col span={15}>
                            <Ueditor ref="editor" contents={this.state.contents}  id="content" height="200" />
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

NewsListAdd=Form.create()(NewsListAdd);
export default NewsListAdd;
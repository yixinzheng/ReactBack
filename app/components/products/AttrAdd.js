import React from 'react';
import {Form,Input,Row,Col,Button,message,Icon,Radio } from 'antd';
import {SettingModel,UserModel,goobleApi} from '../../Datas/dataModel';
const FormItem = Form.Item;



class AttrAdd extends React.Component{
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
                        {this.state.action=="Modify"?"修改属性":"添加属性"}
                    </Col>
                </Row>
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col span={3} className="txt-right">隶属分类*：</Col>
                        <Col span={7}>
                            <FormItem>
                                <Input style={{ width: '100%' }} type="text"/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={3} className="txt-right">属性名称*：</Col>
                        <Col span={7}>
                            <FormItem>
                                {getFieldDecorator('name',{
                                    rules: [{ required: true, message: '属性名称不能为空' }]
                                })(
                                    <Input style={{ width: '100%' }} type="text"/>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={3} className="txt-right">属性值*：</Col>
                        <Col span={7}>
                            <p>一行表示一个属性参数，每行请只填写一个</p>
                            <FormItem>
                                {getFieldDecorator('vals')(
                                    <Input style={{ width: '100%' }} type="textarea"/>
                                )}
                            </FormItem>
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

AttrAdd=Form.create()(AttrAdd);
export default AttrAdd;
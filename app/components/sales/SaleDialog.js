import React from 'react';
import {Link} from 'react-router';
import {Form,Input,Button,Row,Col,Icon,Table, message,Modal} from 'antd';
import {SettingModel} from '../../Datas/dataModel';
message.config({
    top:'50%'
});
import DetailMenu from './DetailMenu';
const FormItem = Form.Item;

class SaleDialog extends React.Component{
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state = {
            lists:[],
            page:1,
            total:1,
            pageSize:10,
            current:'2',
            id:this.props.params.id,
            visible:false,
            msg:''
        };
        this.pageClick=this.pageClick.bind(this);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.params.id && nextProps.params.id!=this.state.id){
            this.setState({
                id:nextProps.params.id
            },function(){
                this.fetchData(1);
            })
        }
    }
    fetchData(page){
        let _p={"action":"getCustomerTalk","page":page,"limit":this.state.pageSize,"apply_id":this.state.id};
        SettingModel.fetchData(_p,_success=>{
            if(_success.status && this._isMounted){
                let _list=[];
                _success.result.dialogueRows.map((item,index)=>{
                    var it=item;
                    it.key=index+1;
                    _list.push(it);
                });
                this.setState({
                    lists:_list,
                    page:_success.result.current,
                    total:_success.result.total
                });
            }else{
                message.warning(_success.result);
                history.back();
            }
        },_error=>{
            console.log(_error);
        });
    }
    columnTb(){
        return [{
            title: '回复方',
            dataIndex: 'type',
            render:(text)=>(
                <span>{text==1?"用户":"平台"}</span>
            )
        }, {
            title: '内容',
            dataIndex: 'content'
        }, {
            title: '回复时间',
            dataIndex: 'create_time'
        }];
    }
    componentWillMount(){
        this._isMounted = true;
        this.fetchData(this.state.page);
    }
    componentWillUnmount(){
        this._isMounted = false;
    }
    pageClick(page){
        this.setState({
            page:page
        });
        this.fetchData(page);
    }
    showModal() {
        this.setState({
            visible: true
        });
    }
    handleOk() {
        if(this.state.msg!=""){
            let actionInfo={"action":"replyCustomer","apply_id":this.state.id,"content":this.state.msg};
            SettingModel.fetchData(actionInfo,_success=>{
                if(_success.status){
                    this.fetchData(this.state.page);
                }else{
                    message.warning(_success.result);
                }
            },_error=>{
                console.log(_error);
            });
        }
        this.setState({
            visible: false
        });
    }
    handleCancel(e) {
        this.setState({
            visible: false,
            msg:''
        });
    }
    saveMsg(e){
        this.setState({
            msg:e.target.value
        })
    }
    render(){
        const pages={
            current:this.state.page,
            pageSize:this.state.pageSize,
            total:this.state.total,
            onChange:this.pageClick
        };
        const pageshow=this.state.total/this.state.pageSize>1?pages:false;
        return (
            <div>
                <DetailMenu current={this.state.current} id={this.state.id}/>
                <div className="setting-ad">
                    <Row className="mgb30">
                        <Col span={2} offset={22}>
                            <Button type="primary" onClick={this.showModal.bind(this)}>回复</Button>
                        </Col>
                    </Row>
                    <Modal title="回复内容" visible={this.state.visible}
                           onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                        >
                       <div style={{margin:'20px'}}>
                           <span>内容</span>
                           <Input type="text" onChange={this.saveMsg.bind(this)}  style={{width:'400px',marginLeft:'10px'}} value={this.state.msg}/>
                       </div>
                    </Modal>
                    <Table pagination={pageshow} columns={this.columnTb()} dataSource={this.state.lists} />
                </div>
            </div>

        )
    }
}



export default SaleDialog;
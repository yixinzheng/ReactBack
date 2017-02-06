import React from 'react';
import {message,Input,Button} from 'antd';
import {SettingModel} from '../../Datas/dataModel';
import {Link} from 'react-router';


import DetailMenu from './DetailMenu';
class SaleView extends React.Component{
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state={
            current:"1",
            result:{},
            id:this.props.params.id,
            values:""
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.params.id && nextProps.params.id!=this.state.id){
            this.setState({
                id:nextProps.params.id
            },function(){
                this.fetchData();
            })
        }
    }
    componentWillMount(){
        this._isMounted = true;
        this.fetchData();
    }
    componentWillUnmount(){
        this._isMounted = false;
    }
    fetchData(){
        let actionInfo={"action":"getCustomerDetail","apply_id":this.state.id};
        SettingModel.fetchData(actionInfo,_success=>{
            if(_success.status && this._isMounted){
                this.setState({
                    result:_success.result
                })
            }else{
                message.warning(_success.result);
                history.back();
            }
        },_error=>{
            console.log(_error);
        });
    }
    saveReason(e){
        this.setState({
            values:e.target.value
        })
    }
    clickSale(status){
        let actionInfo={"action":"responseCustomer","apply_id":this.state.id,"status":status,"remart":this.state.values};
        console.log(actionInfo);
        SettingModel.fetchData(actionInfo,_success=>{
            if(_success.status){
                this.fetchData();
            }else{
                message.warning(_success.result);
            }
        },_error=>{
            console.log(_error);
        });
    }
    render(){
        return (
            <div>
                <div className="mgb30">
                    <DetailMenu current={this.state.current} id={this.state.id}/>
                </div>
                <table className="detail-tb" cellPadding="0" cellSpacing="0" >
                    <tbody>
                    <tr>
                        <td width='10%'>售后编号</td>
                        <td>{this.state.result.number}</td>
                    </tr>
                    <tr>
                        <td>订单编号</td>
                        <td>{this.state.result.ordernum}</td>
                    </tr>
                    <tr>
                        <td>订单状态</td>
                        <td>{this.state.result.orderstatus}</td>
                    </tr>
                    <tr>
                        <td>产品名称</td>
                        <td>{this.state.result.product_name}</td>
                    </tr>
                    <tr>
                        <td>买家姓名</td>
                        <td>{this.state.result.user_name}</td>
                    </tr>
                    <tr>
                        <td>售后类型</td>
                        <td>{this.state.result.type}</td>
                    </tr>
                    <tr>
                        <td>申请理由</td>
                        <td>{this.state.result.reason}</td>
                    </tr>
                    <tr>
                        <td>申请数量</td>
                        <td>{this.state.result.num}</td>
                    </tr>
                    <tr>
                        <td>申请时间</td>
                        <td>{this.state.result.create_time}</td>
                    </tr>
                    <tr>
                        <td>处理状态</td>
                        <td>
                            {this.state.result.status==1?"处理中":this.state.result.status==2?"成功":this.state.result.status==3?"拒绝":this.state.result.status==4?"撤销":"全部"}
                        </td>
                    </tr>
                    {
                        this.state.result.status==1?<tr>
                            <td>备注</td>
                            <td>
                                <Input type="textarea" placeholder="请输入理由" style={{width:'350px',margin:'20px 0',height:'80px'}} value={this.state.values} onChange={this.saveReason.bind(this)} autosize={{ minRows: 2, maxRows: 6 }}/>
                            </td>
                        </tr>:null
                    }
                    {
                        this.state.result.status==1?<tr>
                            <td>操作</td>
                            <td>
                                <Button type="primary" style={{marginRight:'20px'}} onClick={()=>this.clickSale(2)}>成功</Button>
                                <Button onClick={()=>this.clickSale(3)}>拒绝</Button>
                            </td>
                        </tr>:null
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}


export default SaleView;
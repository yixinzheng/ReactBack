import React from 'react';
import {message} from 'antd';
import {SettingModel} from '../../Datas/dataModel';

class AdviceDetail extends React.Component{
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state={
            name:'',
            username:'',
            mobile:'',
            content:'',
            time:'',
            id:this.props.location.query.id
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.location.query.id && nextProps.location.query.id!=this.props.location.query.id){
            this.setState({
                id:nextProps.location.query.id
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
        let actionInfo={"action":"getFeedBackDetail","feedback_id":this.state.id};
        SettingModel.fetchData(actionInfo,_success=>{
            if(_success.status && this._isMounted){
                this.setState({
                    name:_success.result.name,
                    username:_success.result.user_name,
                    mobile:_success.result.mobile,
                    content:_success.result.content,
                    time:_success.result.create_time
                })
            }else{
                message.warning(_success.result);
                location.hash="/advice";
            }
        },_error=>{
            console.log(_error);
        });
    }
    render(){
        return (
            <div>
                <table className="detail-tb" cellPadding="0" cellSpacing="0" >
                    <tbody>
                        <tr>
                            <td width='10%'>用户</td>
                            <td>{this.state.name}</td>
                        </tr>
                        <tr>
                            <td>联系人</td>
                            <td>{this.state.username}</td>
                        </tr>
                        <tr>
                            <td>手机</td>
                            <td>{this.state.mobile}</td>
                        </tr>
                        <tr>
                            <td>反馈内容</td>
                            <td>{this.state.content}</td>
                        </tr>
                        <tr>
                            <td>时间</td>
                            <td>{this.state.time}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}


export default AdviceDetail;
import React from 'react';
import { Button, message} from 'antd';
import {SettingModel} from '../../Datas/dataModel';
import VipDetailMenu from './VipDetailMenu';
message.config({
    top: '50%'
});

class VipInfo extends React.Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            nickname: '1',
            realname: '2',
            grade: '3',
            experience: '4',
            integral: '5',
            sex: '6',
            occupation: '7',
            birthday: '8',
            current: '1',
            id:this.props.params.user_id||""
        };
        this.resetPassword = this.resetPassword.bind(this);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.params.user_id && nextProps.params.user_id!=this.props.params.user_id){
            location.reload();
        }
    }
    componentWillMount() {
        this._isMounted = true;
        this.fetchData();
    }
    componentWillUnmount(){
        this._isMounted = false;
    }
    fetchData(){
        let actionInfo = {"action": "getUserDetail", "user_id": this.state.id};
        SettingModel.fetchData(actionInfo, _success=> {
            if (_success.status && this._isMounted) {
                let result = _success.result;
                this.setState({
                    nickname: result.nickname,
                    realname: result.real_name,
                    grade: result.grade,
                    experience: result.experience,
                    integral: result.integral,
                    sex: result.sex,
                    occupation: result.occupation,
                    birthday: result.birthday
                })
            } else {
                message.warning(_success.result);
                history.go(-1);
            }
        }, _error=> {
            console.log(_error);
        });
    }
    resetPassword(e) {
        e.preventDefault();
        const user_id = this.props.params.user_id;
        let resetInfo = {"action": "editUser", "user_id": user_id, "password": "123456"};
        SettingModel.fetchData(resetInfo, _success=> {
            if (_success.status) {
                message.success("重置成功");
            } else {
                message.warning(_success.result);
            }
        }, _error=> {
            console.log(_error);
        });
    }

    render() {
        return (
            <div>
                <div className="mgb30">
                    <VipDetailMenu current={this.state.current} user_id={this.props.params.user_id}/>
                </div>
                <table className="detail-tb" cellPadding="0" cellSpacing="0">
                    <tbody>
                    <tr className="vip-box">
                        <td width='10%'>会员昵称</td>
                        <td>{this.state.nickname}</td>
                    </tr>
                    <tr className="vip-box">
                        <td >会员姓名</td>
                        <td>{this.state.realname}</td>
                    </tr>
                    <tr className="vip-box">
                        <td >会员等级</td>
                        <td>{this.state.grade}</td>
                    </tr>
                    <tr className="vip-box">
                        <td >当前经验</td>
                        <td>{this.state.experience}</td>
                    </tr>
                    <tr className="vip-box">
                        <td >会员积分</td>
                        <td>{this.state.integral}</td>
                    </tr>
                    <tr className="vip-box">
                        <td >会员性别</td>
                        <td>{this.state.sex}</td>
                    </tr>
                    <tr className="vip-box">
                        <td >会员职业</td>
                        <td>{this.state.occupation}</td>
                    </tr>
                    <tr className="vip-box">
                        <td >出生日期</td>
                        <td>{this.state.birthday}</td>
                    </tr>
                    <tr>
                        <td>操作</td>
                        <td>
                            <Button className="reset-pwd" onClick={this.resetPassword}>重置密码</Button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default VipInfo;
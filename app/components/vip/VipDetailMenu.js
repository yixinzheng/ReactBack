import React from 'react';
import MenuBox from '../common/MenuBox';


class VipDetailMenu extends React.Component{
    constructor(props){
        super(props);
        const user_id = this.props.user_id;
        this.menulist= [{
            links:`/vip/detail/${user_id}`,
            title:"会员信息"
        },{
            links:`/vip/detail/vipOrder/${user_id}`,
            title:"订单信息"
        },{
            links:`/vip/detail/vipFund/${user_id}`,
            title:"资金信息"
        },{
            links:`/vip/detail/vipPoint/${user_id}`,
            title:"积分信息"
        },{
            links:`/vip/detail/vipExp/${user_id}`,
            title:"经验信息"
        }];

        this.state={
            current:this.props.current?this.props.current:"1"
        };
    }

    render(){

        return (
            <div>
                <MenuBox menulist={this.menulist} current={this.state.current}/>
                {this.props.children}
            </div>
        )
    }
}


export default VipDetailMenu;




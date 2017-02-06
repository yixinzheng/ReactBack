import React from 'react';
import MenuBox from '../common/MenuBox';


class VipActionMenu extends React.Component{
    constructor(props){
        super(props);
        this.menulist= [{
            links:"/vip",
            title:"会员管理"
        },{
            links:"/vip/level",
            title:"会员等级"
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


export default VipActionMenu;




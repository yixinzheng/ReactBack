import React from 'react';
import MenuBox from '../common/MenuBox';
class SaleMenu extends React.Component{
    constructor(props){
        super(props);
        this.menulist= [{
            links:{pathname:"/order"},
            title:'全部订单'
        },{
            links:{pathname:"/order",query:{status:"1"}},
            title:'未付款'
        },{
            links:{pathname:"/order",query:{status:"2"}},
            title:'待发货'
        },{
            links:{pathname:"/order",query:{status:"3"}},
            title:'已发货'
        },{
            links:{pathname:"/order",query:{status:"4"}},
            title:'待评价'
        },{
            links:{pathname:"/order",query:{status:"5"}},
            title:'交易关闭'
        },{
            links:{pathname:"/order",query:{status:"6"}},
            title:'交易成功'
        },{
            links:{pathname:"/order/swan",query:{status:"2"}},
            title:'催货提醒'
        },{
            links:{pathname:"/order/comment"},
            title:'评价审核'
        }];
        this.state={
            current:this.props.current?this.props.current:"1"
        };
    }

    render(){
        return (
            <MenuBox menulist={this.menulist} current={this.state.current}/>
        )
    }
}


export default SaleMenu;
import React from 'react';
import MenuBox from '../common/MenuBox';
class SaleMenu extends React.Component{
    constructor(props){
        super(props);
        this.menulist= [{
            links:{pathname:"/sale",query:{type:"1"}},
            title:'退款'
        },{
            links:{pathname:"/sale/refunds",query:{type:"3"}},
            title:'退货退款'
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
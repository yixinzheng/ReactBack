import React from 'react';
import MenuBox from '../common/MenuBox';
class DetailMenu extends React.Component{
    constructor(props){
        super(props);
        let id=this.props.id;
        this.menulist= [{
            links:`/sale/detail/${id}`,
            title:"详情"
        },{
            links:`/sale/detail/dialog/${id}`,
            title:"对话"
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


export default DetailMenu;
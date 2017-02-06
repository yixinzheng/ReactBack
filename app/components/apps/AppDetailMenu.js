import React from 'react';
import MenuBox from '../common/MenuBox';


class AppDetailMenu extends React.Component{
    constructor(props){
        super(props);
        const user_id = this.props.id;
        this.menulist= [{
            links:`/apps/home/model/${user_id}`,
            title:"模板类型"
        },{
            links:`/apps/home/product/${user_id}`,
            title:"产品"
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


export default AppDetailMenu;




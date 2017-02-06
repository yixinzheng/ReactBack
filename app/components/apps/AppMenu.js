import React from 'react';
import MenuBox from '../common/MenuBox';
class AppMenu extends React.Component{
    constructor(props){
        super(props);
        this.menulist= [{
            links:"/apps",
            title:"APP首页"
        },{
            links:"/apps/android",
            title:"安卓APP版本"
        },{
            links:"/apps/ios",
            title:"IosAPP版本"
        },{
            links:"/apps/share",
            title:"分享设置"
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


export default AppMenu;




import React from 'react';
import {Link} from 'react-router';
import { Menu, Icon } from 'antd';


class MenuBox extends React.Component{
    constructor(props){
        super(props);
        this.state={
            current:this.props.current,
            menulist:this.props.menulist
        };
        this.handleClick=this.handleClick.bind(this);
    }
    handleClick(e) {
        this.setState({
            current: e.key
        });
    }
    render(){
        const _lists=this.state.menulist.map((values,index)=>{
            return (
                <Menu.Item key={index+1}>
                    <Link to={values.links}>{values.title}</Link>
                </Menu.Item>
            )
        });
        return (
            <div>
                <Menu onClick={this.handleClick}
                       selectedKeys={[this.state.current]}
                       mode="horizontal"
                    >
                    {_lists}
                </Menu>
            </div>
        )
    }
}

export default MenuBox;
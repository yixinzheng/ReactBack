import React from 'react';
import MenuBox from '../common/MenuBox';
class ProductMenu extends React.Component{
    constructor(props){
        super(props);
        this.menulist= [{
            links:{pathname:"/product"},
            title:'产品中心'
        },{
            links:{pathname:"/product/types"},
            title:'产品分类'
        },{
            links:{pathname:"/product/freight"},
            title:'运费管理'
        },{
            links:{pathname:"/product/shelves"},
            title:'库存管理'
        },{
            links:{pathname:"/product/stock"},
            title:'下架管理'
        },{
            links:{pathname:"/product/brand"},
            title:'品牌管理'
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


export default ProductMenu;
import React from 'react';
import MenuBox from '../common/MenuBox';
class ArticleMenu extends React.Component{
    constructor(props){
        super(props);
        this.menulist= [{
            links:"/article",
            title:"文章管理"
        },{
            links:"/article/help",
            title:"帮助中心"
        },{
            links:"/article/news",
            title:"资讯管理"
        },{
            links:"/article/headLines",
            title:"头条管理"
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


export default ArticleMenu;




import React from 'react';
import ArticleMenu from './ArticleMenu';


class PageCommon extends React.Component{
    constructor(props){
        super(props);
        this.state={
            current:"1"
        }
    }
    render(){
        return (
            <div>
                <ArticleMenu current={this.state.current}/>
                {this.props.children}
            </div>
        )
    }
}


export default PageCommon;
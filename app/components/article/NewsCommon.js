import React from 'react';
import ArticleMenu from './ArticleMenu';


class NewsCommon extends React.Component{
    constructor(props){
        super(props);
        this.state={
            current:"3"
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


export default NewsCommon;
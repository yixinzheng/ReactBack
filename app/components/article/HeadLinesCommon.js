import React from 'react';
import ArticleMenu from './ArticleMenu';


class HeadLinesCommon extends React.Component{
    constructor(props){
        super(props);
        this.state={
            current:"4"
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


export default HeadLinesCommon;
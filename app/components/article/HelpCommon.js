import React from 'react';
import ArticleMenu from './ArticleMenu';


class HelpCommon extends React.Component{
    constructor(props){
        super(props);
        this.state={
            current:"2"
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


export default HelpCommon;
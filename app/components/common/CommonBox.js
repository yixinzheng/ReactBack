import React from 'react';


class CommonBox extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}


export default CommonBox;
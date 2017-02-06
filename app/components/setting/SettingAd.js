import React from 'react';
import {Table,Icon} from 'antd';
import SetMenu from './SetMenu';

class SettingAd extends React.Component{
    constructor(props){
        super(props);
        this.state={
            lists:[{
                key: '1',
                name: '18659217919',
                link:'278.00',
                type:'交易成功',
                action:''
            }, {
                key: '2',
                name: '18659217919',
                link:'278.00',
                type:'交易成功',
                action:''
            }, {
                key: '3',
                name: '18659217919',
                link:'278.00',
                type:'交易成功',
                action:''
            }, {
                key: '4',
                name: '18659217919',
                link:'278.00',
                type:'交易成功',
                action:''
            }],
            page:1,
            total:1,
            pageSize:10,
            current:'6'
        }
    }
    colunmTb(){
        return [{
            title: '名称',
            dataIndex: 'name'
        },{
            title: '图片',
            dataIndex: 'img',
            render:(src)=>(
                <img src={src} alt="" className="tr-img"/>
            )
        }, {
            title: '链接',
            dataIndex: 'link',
            render:(text)=>(
                <a href="#/app">{text}</a>
            )
        }, {
            title: '分类',
            dataIndex: 'type'
        },{
            title: '操作',
            dataIndex: 'action',
            render:(text, record) => (
                <div>
                    <Icon type="edit" /> 修改
                </div>
            )
        }];
    }
    render(){
        return (
           <div>
               <SetMenu current={this.state.current} />
               <div className="setting-ad">
                   <Table columns={this.colunmTb()} dataSource={this.state.lists} title={() => '广告列表'} />
               </div>
           </div>
        )
    }
}

export default SettingAd;
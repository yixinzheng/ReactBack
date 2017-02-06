import React from 'react';
import {Table,Popconfirm,message,Input} from 'antd';
import {Link} from 'react-router';
import SearchName from '../common/SearchName';
import {SettingModel} from '../../Datas/dataModel';

class PageList extends React.Component{
    constructor(props){
        super(props);
        this._isMounted = false;
        this.state={
            lists:[],
            page:1,
            total:1,
            pageSize:10,
            sname:'',
            id:this.props.params.cate_id
        };
        this.pageClick=this.pageClick.bind(this);
    }
    searchFetch(info){
        this.setState({
            sname:info.sname
        },()=>{
            this.fetchData(1);
        })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.params.cate_id !== this.state.id) {
            this.setState({ id: nextProps.params.cate_id },function(){
                this.fetchData(this.state.page);
            });
        }
    }
    fetchData(page){
        const id=this.state.id;
        let _p={"action":"getPageListByCateId","title":this.state.sname,"page":page,"limit":this.state.pageSize,"cate_id":id};
        SettingModel.fetchData(_p,_success=>{
            if(_success.status && this._isMounted){
                let _list=[];
                _success.result.pageRows.map((item,index)=>{
                    var it=item;
                    it.key=index+1;
                    _list.push(it);
                });
                this.setState({
                    lists:_list,
                    page:_success.result.current,
                    total:_success.result.total
                });
            }else{
                message.warning(_success.result);
                location.hash="/article";
            }
        },_error=>{
            console.log(_error);
        });
    }
    confirm(ind) {
        if(ind!=''){
            let articleDel= {"ids":ind};
            let _p= {"action":"editPage","page_id":ind,"status":"2"};
            SettingModel.fetchData(_p,_success=>{
                if(_success.status){
                    message.success('数据删除');
                    let count=this.state.page;
                    if((this.state.total-1) % this.state.pageSize == 0){
                        count--;
                    }
                    count=count<=0?1:count;
                    this.fetchData(count);
                }else{
                    message.warning(_success.result);
                }
            },_error=>{
                console.log(_error);
            });
        }else{
            message.warning('请选择要删除的数据');
        }

    }
    cancels() {
        message.error('取消删除');
    }
    pageClick(page){
        this.setState({
            page:page
        });
        this.fetchData(page);
    }
    componentWillMount(){
        this._isMounted = true;
        this.fetchData(this.state.page);
    }
    componentWillUnmount(){
        this._isMounted = false;
    }
    blurOrder(e,record){
        e.preventDefault();
        let change_value=e.target.value;
        if(change_value<=0 && change_value!=""){
            message.warning("排序不能小于1");
            e.target.value=record.order_number;
            return;
        }else if(change_value==record.order_number || change_value==""){
            message.warning("排序没有改变");
            e.target.value=record.order_number;
            return;
        }else{
            let _p={"action":"editPage","page_id":record.page_id,"order_number":change_value};
            SettingModel.fetchData(_p,_succ=>{
                if(_succ.status){
                    message.success("排序成功");
                    location.reload();
                }else{
                    message.warning(_succ.result);
                }
            });
        }
    }
    columnTb(){
        return [{
            title: '标题',
            dataIndex: 'title'
        },{
            title: '所属分类',
            dataIndex: 'cate_name'
        }, {
            title: '发布时间',
            dataIndex: 'date'
        }, {
            title: '排序',
            dataIndex: 'order_number',
            render:(text,record)=>{
                return (
                    <Input type="number" defaultValue={text} onBlur={(e)=>this.blurOrder(e,record)} />
                )
            }
        },{
            title: '操作',
            dataIndex: 'action',
            render:(text, record) => (
                <div>
                    <Link to={`/article/page/articleModify/${record.page_id}`}>修改</Link>
                    <span className="ant-divider" />
                    <Popconfirm title="确定要删除该数据吗?" onConfirm={()=>this.confirm(record.page_id)} onCancel={this.cancels} okText="确认" cancelText="取消">
                        <a href="#">删除</a>
                    </Popconfirm>
                </div>
            )
        }];
    }
    render(){
        const pages={
            current:this.state.page,
            pageSize:this.state.pageSize,
            total:this.state.total,
            onChange:this.pageClick
        };
        const pageshow=this.state.total/this.state.pageSize>1?pages:false;
        return (
            <div className="setting-ad">
                <SearchName searchData={(info)=>this.searchFetch(info)} link={`/article/page/articleAdd/${this.state.id}`} ntitle="文章标题" btitle="新增文章"/>
                <Table pagination={pageshow} columns={this.columnTb()} dataSource={this.state.lists} />
            </div>
        )
    }
}


export default PageList;
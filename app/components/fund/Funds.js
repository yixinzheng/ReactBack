import React from 'react';
import {Link} from 'react-router';
import {Popconfirm, message,Table,Pagination,Row,Col,Form,Input,Button,Icon} from 'antd';
import MenuBox from '../common/MenuBox';
import {SettingModel} from '../../Datas/dataModel';
import MyDatePicker from '../common/MyDatePicker';
const FormItem = Form.Item;


class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            startValue: '',
            endValue: ''
        };
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    datePicker(fields){
        this.setState({
            startValue: fields.startValue?fields.startValue.valueOf():'',
            endValue: fields.endValue?fields.endValue.valueOf():''
        })
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let id=values.fund_id!=undefined?values.fund_id:'';
                let username=values.username!=undefined?values.username:'';
                let moneys=values.moneys!=undefined?values.moneys:'';
                let searchInfo={
                    id:id,
                    username:username,
                    moneys:moneys,
                    startTime:this.state.startValue,
                    endTime:this.state.endValue
                };
                this.props.searchData(searchInfo);
            }
        });

    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Form inline className="setting-search-line" onSubmit={this.handleSubmit}>
                <Row>
                    <Col span={2} className="txt-right">
                        <span>流水编号：</span>
                    </Col>
                    <Col span={6}>
                        {getFieldDecorator('fund_id')(
                            <Input  type="text" />
                        )}
                    </Col>
                    <Col span={2} className="txt-right">
                        <span>用户名：</span>
                    </Col>
                    <Col span={6}>
                        {getFieldDecorator('username')(
                            <Input  type="text"/>
                        )}
                    </Col>
                    <Col span={2} className="txt-right">
                        <span>金额：</span>
                    </Col>
                    <Col span={6}>
                        {getFieldDecorator('moneys')(
                            <Input  type="number" />
                        )}
                    </Col>
                </Row>
                <Row>
                    <Col span={16}>
                        <MyDatePicker dataPick={(field)=>this.datePicker(field)} title="交易时间"/>
                    </Col>
                    <Col span={8} className="txt-right">
                        <Button className="setting-search-btn" htmlType="submit">
                            <Icon type="search" />
                        </Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}
SearchBar=Form.create()(SearchBar);


class Funds extends React.Component{
    constructor(props){
        super(props);
        this.menulist= [{
            links:"/funds",
            title:"资金管理"
        }];
        this._isMounted = false;
        this.state={
            lists:[],
            page:1,
            total:1,
            pageSize:10,
            current:'1',
            selArr:[],
            rowSelection:{
                onChange: this.handleRowSelectionChang.bind(this)
            }
        };
        this.cancel=this.cancel.bind(this);
    }
    searchFetch(info){
        console.log(info);
        //this.setState({
        //    username:info.username,
        //    realname:info.realname,
        //    nickname:info.nickname,
        //    startValue:info.startTime,
        //    endValue:info.endTime,
        //    status:info.status
        //},()=>{
        //    this.fetchData(1);
        //})
    }
    confirm(ind) {
        if(ind!=''){
            let _p= {"action":"delFeedBacks","feedback_id_arr":`[${ind}]`};
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
    cancel() {
        message.error('取消删除');
    }
    handleRowSelectionChang (selectedRowKeys) {
        this.setState({
            selArr:`${selectedRowKeys}`
        })
    }
    fetchData(page){
        let _p={"action":"getFeedBackList","page":page,"limit":this.state.pageSize};
        SettingModel.fetchData(_p,_success=>{
            if(_success.status && this._isMounted){
                let _list=[];
                _success.result.feedbackRows.map((item,index)=>{
                    var it=item;
                    it.key=item.feedback_id;
                    _list.push(it);
                });
                this.setState({
                    lists:_list,
                    page:_success.result.current,
                    total:_success.result.total
                });
            }else{
                message.warning(_success.result);
            }
        },_error=>{
            console.log(_error);
        });
    }
    columnTb(){
        return [{
            title: '流水编号',
            dataIndex: 'user_name'
        }, {
            title: '金额',
            dataIndex: 'name'
        },{
            title: '交易时间',
            dataIndex: 'create_time'
        },{
            title: '用户名',
            dataIndex: 'mobile',
            render:(text)=><a href="#">{text}</a>
        }, {
            title: '操作',
            dataIndex: 'is_read',
            render:(text, record) => (
                <a href="#">详情</a>
            )
        }]
    }
    componentWillMount(){
        this._isMounted = true;
        this.fetchData(this.state.page);
    }
    componentWillUnmount(){
        this._isMounted=false;
    }
    pageClick(page){
        this.setState({
            page:page
        });
        this.fetchData(page);
    }

    render(){
        const arr=this.state.selArr;
        const pageshow=this.state.total/this.state.pageSize>1?true:false;
        return (
            <div>
                <MenuBox menulist={this.menulist} current={this.state.current}/>
                <div className="setting-ad">
                    <SearchBar searchData={(info)=>this.searchFetch(info)}/>
                    <Table pagination={false}  rowSelection={this.state.rowSelection} columns={this.columnTb()} dataSource={this.state.lists}/>
                    <Row  className="pagination-line">
                        <Col span={12}>
                            <Popconfirm title="确定要删除数据吗?" onConfirm={()=>this.confirm(arr)} onCancel={this.cancel} okText="确认" cancelText="取消">
                                <a href="#">批量导出</a>
                            </Popconfirm>
                        </Col>
                        <Col span={12}>
                            {
                                pageshow?(
                                    <Pagination onChange={(page)=>this.pageClick(page)} current={this.state.page} pageSize={this.state.pageSize} total={this.state.total} className="ant-table-pagination"/>
                                ):""
                            }
                        </Col>

                    </Row>
                </div>
            </div>
        )
    }
}


export default Funds;
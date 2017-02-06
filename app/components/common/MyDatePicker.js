import React from 'react';
import {Icon,DatePicker,Row,Col} from 'antd';
import zhCN from 'antd/lib/date-picker/locale/zh_CN';

class MyDatePicker extends React.Component{
    constructor(props){
        super(props);
        this.state={
            startValue: '',
            endValue: '',
            endOpen: false
        };
        this.disabledStartDate=this.disabledStartDate.bind(this);
        this.disabledEndDate=this.disabledEndDate.bind(this);
        this.onChange=this.onChange.bind(this);
        this.onStartChange=this.onStartChange.bind(this);
        this.onEndChange=this.onEndChange.bind(this);
        this.handleStartOpenChange=this.handleStartOpenChange.bind(this);
        this.handleEndOpenChange=this.handleEndOpenChange.bind(this);
    }
    disabledStartDate (startValue)  {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    disabledEndDate  (endValue)  {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }

    onChange(field, value)  {
        this.setState({
            [field]: value
        });
    }

    onStartChange(value){
        this.onChange('startValue', value);
        this.props.dataPick({startValue:value,endValue:this.state.endValue});
    }

    onEndChange (value){
        this.onChange('endValue', value);
        this.props.dataPick({startValue:this.state.startValue,endValue:value});
    }

    handleStartOpenChange(open){
        if (!open) {
            this.setState({ endOpen: true });
        }
    }

    handleEndOpenChange(open){
        this.setState({ endOpen: open });
    }
    render(){
        const { endOpen } = this.state;
        return (
            <Row>
                <Col span={12}>
                    <Row>
                        <Col span={6} className="txt-right">{this.props.title}：</Col>
                        <Col span={18}>
                            <DatePicker
                                disabledDate={this.disabledStartDate}
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                placeholder="Start"
                                onChange={this.onStartChange}
                                onOpenChange={this.handleStartOpenChange}
                                style={{'width':'100%'}}
                                />
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Row>
                        <Col span={6} className="txt-center">---</Col>
                        <Col span={18}>
                            <DatePicker
                                disabledDate={this.disabledEndDate}
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                placeholder="End"
                                onChange={this.onEndChange}
                                open={endOpen}
                                onOpenChange={this.handleEndOpenChange}
                                style={{'width':'100%'}}
                                />
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}
export default MyDatePicker;
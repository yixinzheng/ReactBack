import React from 'react';
import echarts from 'echarts';



export default class Mechart extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.drawCharts(this.props.data);
    }
    drawCharts(dataSet){
        var myChart = echarts.init(document.getElementById('charts'));

        // 指定图表的配置项和数据
        var option = {
            tooltip : {
                trigger: 'axis'
            },
            legend:{
                data:'订单数'
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'订单统计',
                    type:'line',
                    stack: '总量',
                    data:dataSet
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表
        myChart.setOption(option);
    }
    render(){
        return (
            <div className="main-card echart" style={{'border':'1px solid','borderColor':this.props.color}}>
                <div className="main-card-head"  style={{'backgroundColor':this.props.color}}>
                    订单统计图
                </div>
                <div className="main-card-extra">
                    <a href="#">切换年份</a>
                </div>
                <div id="charts" data={this.props.data} style={{width:'100%',height:'400px'}}></div>
            </div>
        )
    }
}
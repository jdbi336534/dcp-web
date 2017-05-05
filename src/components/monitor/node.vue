<template>
    <div class='zero-node-box'>
        <div class="zeronode-chart">
            <div class="zeronode-chart-left">
                <div class="cpu-chart chart-one-box" v-loading="cpuchartloading">
                    <!-- <cpu-chart @cpuresize='cpuresize' ref='cpu' :cpudata="cpuchartdata"></cpu-chart> -->
                    <chart :options="nodecpuoption" auto-resize></chart>
                </div>
                <div class="memory-chart chart-one-box" v-loading="memorychartloading">
                    <!-- <memory-chart @memoryresize='memoryresize' ref='memory' :memorydata="memorychartdata"></memory-chart>
                    -->
                    <chart :options="nodememoryoption" auto-resize></chart>
                </div>
                <div class="network-chart chart-one-box" v-loading="networkchartloading">
                    <!--  <network-chart @networkresize='networkresize' ref='network' :networkdata="networkchartdata"></network-chart> -->
                    <chart :options="nodenetworkoption" auto-resize></chart>
                </div>
                <div class="disk-chart chart-one-box" v-loading="diskchartloading">
                    <!-- <disk-chart @diskresize='diskresize' ref='disk'></disk-chart> -->
                    <chart :options="nodediskoption" auto-resize></chart>
                </div>
            </div>
            <div class="zeronode-chart-right" v-loading="piechartloading">
                <chart :options="nodepieoption" auto-resize></chart>
            </div>
        </div>
        <div class="zeronode-table systemdlm-table-column">
            <p class="title">节点</p>
            <el-table :data="tableData" style="width: 100%;" height='300' v-loading="tableloading" element-loading-text="拼命加载中">
                <el-table-column label="名称" show-overflow-tooltip>
                    <template scope="scope">
                        <status :type="scope.row.status.conditions[3].namestatus"></status>
                        <span style="margin-left: 10px"><router-link class="router" :to="{path:'/dcp/monitor/nodedetails/'+scope.row.metadata.name}">{{scope.row.metadata.name}}</router-link></span>
                    </template>
                </el-table-column>
                <el-table-column prop="metadata" label="标签" :formatter="formatter" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="状态" show-overflow-tooltip>
                    <template scope="scope">{{scope.row.status.conditions[3].showstatus}}</template>
                </el-table-column>
                <el-table-column label="创建日期" show-overflow-tooltip>
                    <template scope="scope">{{scope.row.metadata.creationTimestamp}}</template>
                </el-table-column>
            </el-table>
            <!-- <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage3" :page-size="20" layout="total,  prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div> -->
        </div>
    </div>
</template>
<script>
import status from '../common/Status';
import echarts from 'echarts';
import {
    setSessionStore
} from '@/assets/js/mUtils';
import {
    getNode,
    nodeclusterchart,
    //   nodeclusterchart,
} from '../../assets/js/queryData2';
export default {
    name: 'view',
    components: {
        status
    },
    props: {},
    data() {
        return {
            cpuchartloading: true,
            memorychartloading: true,
            networkchartloading: false,
            diskchartloading: false,
            piechartloading: true,
            tableloading: true,
            currentPage3: 1,
            total: 1,
            resizelist: [],
            tableData: [],
            cpuchartdata: {
                cpuobj: {
                    type: 'cpu',
                    name: 'usage_rate'
                },
                type: 'all',
                pagetype: 'node',
            },
            memorychartdata: {
                memoryobj: {
                    type: 'memory',
                    name: 'usage'
                },
                type: 'all',
                pagetype: 'node',
            },
            networkchartdata: {
                networkobj: {
                    type: 'network',
                    name: 'rx'
                },
                type: 'all',
                pagetype: 'node',
            },
            nodecpuoption: {
                title: {
                    text: 'cpu',
                    textStyle: {
                        color: 'rgba(250,250,250,0.6)',
                        fontSize: 12,
                    },
                    borderColor: 'rgba(36,202,243,1)',
                    borderWidth: 1,
                    left: '52',
                    top: '0',
                },
                grid: {
                    left: '100',
                    right: '40',
                    top: '36',
                    bottom: '32',
                    borderWidth: 1
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: '{b} </br>{a}: {c} %'
                },
                dataZoom: [{
                    type: 'inside',
                    realtime: true,
                }],
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    interval: 0,
                    splitLine: {
                        show: false,
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(250,250,250,0.7)',
                            fontSize: 12,
                        },
                    },
                    data: []
                },
                yAxis: {
                    splitLine: {
                        show: false,
                    },
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(250,250,250,0.7)',
                            fontSize: 12,
                        },
                        formatter: '{value}%'
                    },
                    min: 'dataMin',
                },
                series: [{
                    name: 'cpu',
                    type: 'line',
                    data: [],
                    symbol: 'none',
                    lineStyle: {
                        normal: {
                            width: 1,
                            // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            //     offset: 0,
                            //     color: 'rgba(48, 120,192,1)'
                            // }, {
                            //     offset: 1,
                            //     color: 'rgba(48, 120,192,0.5)'
                            // }], false)
                            color: 'rgba(48, 120,192,1)'
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(48, 120,192,0.4)'
                            }, {
                                offset: 1,
                                color: 'rgba(48, 120,192,0.16)'
                            }], false)
                        }
                    },
                }]
            },
            nodememoryoption: {
                title: {
                    text: '内存',
                    textStyle: {
                        color: 'rgba(250,250,250,0.6)',
                        fontSize: 12,
                    },
                    borderColor: 'rgba(36,202,243,1)',
                    borderWidth: 1,
                    left: '52',
                    top: '0',
                },
                grid: {
                    left: '100',
                    right: '40',
                    top: '36',
                    bottom: '32',
                    borderWidth: 1
                },
                tooltip: {
                    trigger: 'axis',
                    // formatter: '{b} </br>{a}: {c} (TB)'
                    formatter: function(params, ticket, callback) {
                        var tooltipvalue = (params[0].value).toFixed(5)
                        return (params[0].axisValueLabel + '</br>内存: ' + tooltipvalue + '(TB)')
                    }
                },
                dataZoom: [{
                    type: 'inside',
                    realtime: true,
                }],
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    splitLine: {
                        show: false,
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(250,250,250,0.7)',
                            fontSize: 12,
                        },
                    },
                    data: []
                },
                yAxis: {
                    splitLine: {
                        show: false,
                    },
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(250,250,250,0.7)',
                            fontSize: 12,
                        },
                        formatter: '{value}GB'
                    },
                    min: 'dataMin',
                },
                series: [{
                    name: '内存使用率',
                    type: 'line',
                    data: [],
                    symbol: 'none',
                    lineStyle: {
                        normal: {
                            color: 'rgba(145,40,102,1)'
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: 'rgba(145,40,102,0.4)'
                        }
                    }
                }]
            },
            nodenetworkoption: {
                title: {
                    text: '网络',
                    textStyle: {
                        color: 'rgba(250,250,250,0.6)',
                        fontSize: 12,
                    },
                    borderColor: 'rgba(36,202,243,1)',
                    borderWidth: 1,
                    left: '52',
                    top: '0',
                },
                grid: {
                    left: '100',
                    right: '40',
                    top: '36',
                    bottom: '32',
                    borderWidth: 1
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        animation: false,
                        label: {
                            backgroundColor: '#505765'
                        }
                    },
                    formatter: function(params, ticket, callback) {
                        var tooltipvalue = (params[0].value).toFixed(5)
                        return (params[0].axisValueLabel + '</br>网络: ' + tooltipvalue + '(Gbps)')
                    }
                },
                dataZoom: [{
                    type: 'inside',
                    realtime: true,
                }],
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        onZero: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(250,250,250,0.7)',
                            fontSize: 12,
                        },
                    },
                    data: ['1:00', '2:00', '3:00', '4:00', '5:00']
                }],
                yAxis: [{
                    name: '',
                    type: 'value',
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(250,250,250,0.7)',
                            fontSize: 12,
                        },
                        formatter: '{value}Gbps'
                    },
                    min: 'dataMin',
                }],
                series: [{
                    name: '网络',
                    type: 'line',
                    animation: false,
                    symbol: 'none',
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(160, 42,108,0.7)'
                            }, {
                                offset: 1,
                                color: 'rgba(160, 42,108,0.3)'
                            }], false)
                        }
                    },
                    // label: {
                    //     normal: {
                    //         show: true,
                    //         formatter: '{b}: {c} ({d}%)',
                    //         position: 'inner'
                    //     },
                    //     emphasis: {
                    //         show: true,
                    //         textStyle: {
                    //             fontSize: '18',
                    //             fontWeight: 'bold'
                    //         }
                    //     }
                    // },
                    lineStyle: {
                        normal: {
                            width: 1,
                            color: 'rgba(160,42,108,1)'
                        }
                    },
                    data: [5, 2, 8, 4, 6]
                }]
            },
            nodediskoption: {
                title: {
                    text: '磁盘',
                    textStyle: {
                        color: 'rgba(250,250,250,0.6)',
                        fontSize: 12,
                    },
                    borderColor: 'rgba(36,202,243,1)',
                    borderWidth: 1,
                    left: '52',
                    top: '0',
                },
                grid: {
                    left: '100',
                    right: '40',
                    top: '36',
                    bottom: '32',
                    borderWidth: 1
                },
                tooltip: {
                    trigger: 'axis'
                },
                dataZoom: [{
                    type: 'inside',
                    realtime: true,
                }],
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    splitLine: {
                        show: false,
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(250,250,250,0.7)',
                            fontSize: 12,
                        },
                    },
                    data: ['12:10', '12:12', '12:13', '12:14', '12:15', '12:16', '12:17']
                },
                yAxis: {
                    splitLine: {
                        show: false,
                    },
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(250,250,250,0.7)',
                            fontSize: 12,
                        },
                        formatter: '{value} GB'
                    }
                },
                series: [{
                    name: '最高磁盘容量',
                    type: 'line',
                    data: [10, 10, 10, 10, 10, 14, 11],
                    symbol: 'none',
                    lineStyle: {
                        normal: {
                            color: 'rgba(145,40,102,1)'
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: 'rgba(145,40,102,0.4)'
                        }
                    }
                }, {
                    name: '最低磁盘容量',
                    type: 'line',
                    symbol: 'none',
                    data: [6, 6, 6, 6, 6, 6, 5],
                    lineStyle: {
                        normal: {
                            color: 'rgba(48,120,192,1)'
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: 'rgba(48,120,192,0.5)'
                        }
                    }
                }]
            },
            nodepieoption: {
                title: {
                    text: '节点数量',
                    textStyle: {
                        color: 'rgba(36,202,243,0.7)',
                        fontSize: 12,
                    },
                    left: '38%',
                    top: '32%',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)',
                },
                legend: {
                    orient: 'vertical',
                    x: '45%',
                    y: '72%',
                    data: ['活动', '停止'],
                    textStyle: {
                        color: 'rgba(250,250,250,0.7)'
                    }
                },
                color: ['rgba(84,32,76,0.9)', 'rgba(46,124,120,0.9)'],
                series: [{
                    name: '访问来源',
                    type: 'pie',
                    radius: ['30%', '60%'],
                    center: ['50%', '35%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            formatter: '{b}: {c} ({d}%)',
                            position: 'inner'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '18',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                            },
                            labelLine: {
                                show: true
                            }
                        }
                    },
                    data: [{
                        value: 20,
                        name: '活动',
                    }, {
                        value: 20,
                        name: '停止'
                    }]
                }]
            },
        }
    },
    beforeUpdate() {},
    updated() {},
    created() {},
    mounted() {
        setSessionStore('defaultActive', '/dcp/monitor/node');
        getNode('').then(res => {
            for (let i in res.items) {
                if (res.items[i].status.conditions[3].status === 'Unknown') {
                    res.items[i].status.conditions[3].namestatus = 'warning';
                    res.items[i].status.conditions[3].showstatus = '异常';
                } else if (res.items[i].status.conditions[3].status === 'True') {
                    res.items[i].status.conditions[3].namestatus = 'success';
                    res.items[i].status.conditions[3].showstatus = '活跃';
                } else {
                    res.items[i].status.conditions[3].namestatus = 'wrong';
                    res.items[i].status.conditions[3].showstatus = '停止';
                }
            }
            // console.log('res.data:', res);
            this.tableData = res.items;
            this.tableloading = false;
        });
        this.Getcpudata();
        this.Getmemorydata();
        this.Getpiedata();
        this.settime();
    },
    computed: {},
    methods: {
        formatter(row, column) {
            for (let i in row.metadata.labels) {
                return (`${i}:${row.metadata.labels[i]}`);
            }
        },
        Getcpudata() {
            nodeclusterchart(this.cpuchartdata.cpuobj).then(res => {
                //  console.log('cpu-res', JSON.stringify(res, null, 4));
                this.cpuchartloading = false;
                let xAxisdata = [];
                let seriesdata = [];
                for (let i in res.metrics) {
                    var timestring = res.metrics[i].timestamp.substring(11, 16);
                    xAxisdata.push(timestring);
                    seriesdata.push((res.metrics[i].value) / 1000)
                }
                this.nodecpuoption.xAxis.data = xAxisdata;
                this.nodecpuoption.series[0].data = seriesdata;
            });
        },
        Getmemorydata() {
            nodeclusterchart(this.memorychartdata.memoryobj).then(res => {
                let xAxisdata = [];
                let seriesdata = [];
                for (let i in res.metrics) {
                    var timestring = res.metrics[i].timestamp.substring(11, 16);
                    xAxisdata.push(timestring);
                    var valueGB = (res.metrics[i].value / (1024 * 1024 * 1024 * 8));
                    seriesdata.push(valueGB);
                }
                this.memorychartloading = false;
                this.nodememoryoption.xAxis.data = xAxisdata;
                this.nodememoryoption.yAxis.min = (seriesdata.sort(function(a, b) {
                    return a - b;
                })[0]).toFixed(2)
                this.nodememoryoption.series[0].data = seriesdata;
            })
        },
        Getpiedata() {
            getNode('').then(res => {
                let activedata = 0;
                let stop = 0;
                for (let i in res.items) {
                    if (res.items[i].status.conditions[0].status === 'Running') {
                        activedata++;
                    } else {
                        stop++;
                    }
                }
                this.piechartloading = false;
                this.nodepieoption.title.text = '节点总量:' + res.items.length;
                this.nodepieoption.series[0].data[0].value = activedata;
                this.nodepieoption.series[0].data[1].value = stop;
            });
        },
        settime() {
            setInterval(() => {
                this.Getcpudata();
                this.Getmemorydata();
                this.Getpiedata();
            }, 60000);
        },
    }
}
</script>
<style lang="scss">
@import '../../assets/css/systemcommon/common.scss';
</style>
<style lang="scss" scoped>
.zero-node-box {
    height: 100%;
    width: 100%;
    overflow: auto;
    .zeronode-chart,
    .zeronode-table {
        width: calc(100% - 70px);
        margin-left: 28px;
        padding: 0 0 0 20px;
    }
    .zeronode-chart {
        height: 350px;
        margin-top: 17px;
        margin-left: 0px;
        .zeronode-chart-left {
            height: 100%;
            width: 80%;
            float: left;
            .chart-one-box {
                width: 50%;
                height: 50%;
                float: left;
                overflow: hidden;
                .echarts {
                    height: 100%;
                    width: 100%;
                } //   background-color: red;
            }
        }
        .zeronode-chart-right {
            width: 20%;
            height: 100%;
            float: right;
            .echarts {
                height: 100%;
                width: 100%;
            }
        }
    }
    .zeronode-table {
        padding: 0;
        width: calc(100% - 70px);
        height: calc(100% - 377px);
        margin-top: 10px;
        .title {
            font-size: 17px;
            color: #3590BF;
            margin: 0;
            padding-left: 20px;
        }
        .el-table {
            height: calc(100% - 28px)!important;
            .router {
                text-decoration: none;
                color: rgba(36, 202, 243, 0.9);
            }
        } // .pagination {
        //     margin-top: 10px;
        //     text-align: center;
        // }
    } //当屏幕高度小于749px的时候，改变弹框的top值
    // @media screen and (max-width: 1280px) {
    //     .zeronode-chart {
    //         width: 900px;
    //     }
    //     .zeronode-table {
    //         width: 850px;
    //     }
    // } //当屏幕高度小于749px的时候，改变弹框的top值
    @media screen and (max-height: 749px) {
        .zeronode-chart {
            height: 270px;
        }
        .zeronode-table {
            height: calc(100% - 297px);
        }
    }
}
</style>

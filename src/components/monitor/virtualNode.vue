<template>
    <div class="zero-virtuanode-box">
        <div class="virtuanode-chart">
            <div class="virtuanode-cpu-box">
                <chart :options="nodecpuoption" auto-resize></chart>
            </div>
            <div class="virtuanode-memory-box">
                <chart :options="nodememoryoption" auto-resize></chart>
            </div>
        </div>
        <div class="virtuanode-table systemdlm-table-column">
            <p class="title">虚拟节点</p>
            <el-table :data="tableData" style="width: 100%;margin-top:10px;" height='360'>
                <el-table-column label="名称" width="400" show-overflow-tooltip>
                    <template scope="scope">
                        <status :type="scope.row.namestatus"></status>
                        <span style="margin-left: 10px"><router-link class="router" :to="{path:'/dcp/monitor/virtualnodeLookup/'+scope.row.name+'/'+'0'+'/'+scope.row.name}">{{scope.row.name}}</router-link></span>
                    </template>
                </el-table-column>
                <el-table-column prop="phase" label="状态" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="restartCount" label="重启次数" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="creationTimestamp" label="存活时间" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="address" label="CPU(cores)" width="150">
                    <template scope="scope">
                        <div style="height:40px;width:140px;float:left;">
                            <linecpu-chart @linecpuresize='linecpuresize' ref='cpu'></linecpu-chart>
                        </div>
                        <!--  <span class="el-table-column-span"> 787888</span> -->
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="内存(bytes)" width="150">
                    <template scope="scope">
                        <div style="height:40px;width:140px;float:left;">
                            <linememory-chart @linememoryresize='linememoryresize' ref='memory'></linememory-chart>
                        </div>
                        <!--  <span class="el-table-column-span">wrrthojk787888</span> -->
                    </template>
                </el-table-column>
                <el-table-column label="" width="90">
                    <template scope="scope">
                        <router-link class="router" :to="{path:'/dcp/monitor/offLinelogs'}">
                            <i class="logs"></i>
                        </router-link>
                        <el-popover placement="bottom" width="46" trigger="hover">
                            <ul>
                                <li @click="Delete(scope.$index, scope.row)" id="selectboeder">删除</li>
                                <!-- <li @click="Edit(scope.$index, scope.row)">编辑</li> -->
                            </ul>
                            <el-button type="text" slot="reference">
                                <i style="cursor:pointer;color:#24caf3;" class="el-icon-more"></i>
                            </el-button>
                        </el-popover>
                    </template>
                </el-table-column>
            </el-table>
            <!--  <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage3" :page-size="20" layout="total,  prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div> -->
        </div>
        <modal-box :visible="deletemodalvisible" titlename="" @click-close="Offdelectmodal" class='delectbox nodedelect'>
            <div slot="jdb" class="delect jz">
                <div class="delectBox jz">
                    <p>确认删除</p>
                    <ul>
                        <li class="hand">
                            <el-button class="databtn laststep" @click="delcancel">取消</el-button>
                        </li>
                        <li class="hand">
                            <el-button class="databtn" :loading="false" @click="delconfirm">确认</el-button>
                        </li>
                    </ul>
                </div>
            </div>
        </modal-box>
    </div>
</template>
<script>
import modalBox from '../common/ModalBox';
// import cpuChart from '../common/Cpuchart';
// import memoryChart from '../common/Memorychart';
import linecpuChart from '../common/linecpuchart';
import linememoryChart from '../common/linememorychart';
import status from '../common/Status';
import echarts from 'echarts';
import {
    getPods,
    deletePods,
    nodeclusterchart,
} from '../../assets/js/queryData2';
import {
    setSessionStore
} from '@/assets/js/mUtils';
export default {
    data() {
            return {
                delatename: '',
                deletemodalvisible: false,
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
            }
        },
        components: {
            // cpuChart,
            // memoryChart,
            linecpuChart,
            linememoryChart,
            status,
            modalBox
        },
        beforeUpdate() {},
        updated() {},
        created() {},
        mounted() {
            setSessionStore('defaultActive', '/dcp/monitor/virtualNode');
            // 获取所有虚拟节点（详情页面）
            getPods('').then(res => {
                let temparr = [];
                for (let i in res.items) {
                    let tempobj = {};
                    tempobj.name = res.items[i].metadata.name;
                    // tempobj.phase = res.items[i].status.phase;
                    tempobj.restartCount = res.items[i].status.containerStatuses[0].restartCount;
                    tempobj.creationTimestamp = res.items[i].metadata.creationTimestamp;
                    if (res.items[i].status.phase === 'Running' || res.items[i].status.phase === 'Succeeded') {
                        tempobj.namestatus = 'success';
                        tempobj.phase = '运行中';
                    } else if (res.items[i].status.phase === 'Pending') {
                        tempobj.namestatus = 'warning';
                        tempobj.phase = '启动中';
                    } else {
                        tempobj.namestatus = 'wrong';
                        tempobj.phase = '启动失败';
                    }
                    temparr.push(tempobj);
                }
                this.tableData = temparr;
            });
            this.Getcpudata();
            this.Getmemorydata();
            this.settime();
        },
        computed: {},
        methods: {
            Getcpudata() {
                nodeclusterchart(this.cpuchartdata.cpuobj).then(res => {
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
                    this.nodememoryoption.xAxis.data = xAxisdata;
                    this.nodememoryoption.yAxis.min = (seriesdata.sort(function(a, b) {
                        return a - b;
                    })[0]).toFixed(2)
                    this.nodememoryoption.series[0].data = seriesdata;
                });
            },
            settime() {
                setInterval(() => {
                    this.Getcpudata();
                    this.Getmemorydata();
                }, 60000);
            },
            linecpuresize(nodeval) {
                //  this.resizearraylist.push(nodeval);
            },
            linememoryresize(nodeval) {
                // this.resizearraylist.push(nodeval);
            },
            handleSizeChange() {

            },
            handleCurrentChange() {},
            Delete(index, row) {
                this.deletemodalvisible = true;
                this.delatename = row.name;
            },
            Edit(index, row) {},
            delconfirm() {
                deletePods(this.delatename).then(res => {
                    // console.log
                    ('删除接口返回的数据：', res);
                });
            },
            delcancel() {
                this.deletemodalvisible = false;
            },
            Offdelectmodal() {
                this.deletemodalvisible = false;
            },
        },
}
</script>
<style lang="scss">
@import '../../assets/css/systemcommon/common.scss'; // popover全局样式覆盖
.el-popover[x-placement^="bottom"] .popper__arrow::after {
    border-bottom-color: #028bb4!important;
}

.el-popover[x-placement^="bottom"] {
    margin-top: 0px!important;
}

.el-popover {
    min-width: 20px!important;
    padding: 5px!important;
    background: rgba(2, 145, 187, 0.95)!important;
    border: 1px solid #2AC2F3!important;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04)!important;
    border-radius: 1px!important;
    li {
        height: 20px;
        line-height: 20px;
        text-align: center;
        padding: 0 10px;
        font-size: 12px;
        color: #FFFFFF;
        cursor: pointer;
        &:first-child {
            padding-bottom: 2px;
            border-bottom: 0;
        }
        &:last-child {
            padding-top: 2px;
        }
        &:hover {
            color: #2ac2f3;
        }
    }
    #selectboeder {
        border-bottom: 0;
    }
} // popover全局样式覆盖结束
</style>
<style lang="scss" scoped>
.zero-virtuanode-box {
    height: 100%;
    width: 100%;
    overflow: auto;
    .virtuanode-chart,
    .virtuanode-table {
        width: calc(100% - 90px);
        margin-left: 28px;
        margin-top: 27px;
        padding: 20px;
    }
    .virtuanode-chart {
        width: calc(100% - 30px);
        height: 200px;
        padding: 0 10px;
        margin-left: 0px;
        .virtuanode-cpu-box,
        .virtuanode-memory-box {
            width: 50%;
            height: 100%;
            float: left;
            .echarts {
                height: 100%;
                width: 100%;
            }
        }
    }
    .virtuanode-table {
        height: calc(100% - 310px);
        box-shadow: 0 4px 28px 0 rgba(0, 0, 0, 0.50), inset 0 0 28px 0 rgba(53, 215, 255, 0.4);
        p {
            font-size: 16px;
        }
        .el-table {
            margin-top: 0px;
            height: calc(100% - 68px)!important;
            padding-bottom: 40px;
            .el-table-column-span {
                height: 40px;
                line-height: 40px;
            }
            .router {
                text-decoration: none;
                color: rgba(36, 202, 243, 0.9);
            }
            .el-icon-more {
                transform: rotate(90deg);
                -ms-transform: rotate(90deg);
                /* IE 9 */
                -moz-transform: rotate(90deg);
                /* Firefox */
                -webkit-transform: rotate(90deg);
                /* Safari 和 Chrome */
                -o-transform: rotate(90deg);
                /* Opera */
            }
            .logs {
                height: 18px;
                width: 18px;
                margin-right: 10px;
                display: inline-block;
                vertical-align: middle;
                background: url(../../assets/img/system/logs.png) no-repeat;
                background-size: 100% 100%;
            }
        }
    }
}
</style>
<style lang="scss">
.zero-virtuanode-box {
    .nodedelect {
        padding: 0;
        .el-dialog {
            width: 400px!important;
            height: 200px!important;
            margin-top: 10%;
        }
        .delect {
            font-size: 14px;
            font-family: "微软雅黑";
            color: rgba(0, 187, 236, 0.9);
            p {
                width: 290px;
                height: 100px;
                text-align: center;
                font-size: 18px;
                line-height: 60px;
                text-indent: 2em;
                margin-top: -30px;
                font-family: "微软雅黑";
            }
            ul {
                width: 320px;
                height: 60px;
                color: #fff;
                padding: 0 10px 0 15px; //    background-color: red;
                li {
                    float: left;
                    color: #fff;
                    width: 60px;
                    height: 25px; //   margin: 0 35px;
                    background: #0C1A34;
                    border-radius: 0px;
                    line-height: 24px;
                    text-align: center;
                    border: 1px solid #0C1A34;
                    .el-loading-mask {
                        background-color: rgba(13, 44, 77, 1)!important;
                    }
                    .el-loading-spinner .circular {
                        width: 20px;
                    }
                }
                li:nth-child(1) {
                    float: left;
                }
                li:nth-child(2) {
                    float: right;
                }
                li:hover {
                    border: 1px solid #05bde6;
                    color: #fff;
                    box-shadow: inset 0 0 10px 0 rgba(98, 208, 248, 0.42);
                }
                /*li:nth-child(2) {
                background-color: #05bde6;
            }*/
            }
        }
    }
}
</style>

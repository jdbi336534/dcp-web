<template>
    <div class="virtualNodelookup">
        <div class="navigationbox">
            <el-breadcrumb separator=">" v-if="$route.params.flag==='1'">
                <el-breadcrumb-item>节点</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path:'/dcp/monitor/nodedetails/'+$route.params.fatherip}">节点详情</el-breadcrumb-item>
                <el-breadcrumb-item>虚拟节点查看页</el-breadcrumb-item>
            </el-breadcrumb>
            <el-breadcrumb separator=">" v-else>
                <el-breadcrumb-item :to="{path:'/dcp/monitor/virtualnode'}">虚拟节点</el-breadcrumb-item>
                <el-breadcrumb-item>虚拟节点查看页</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="charts">
            <div class="chartone">
                <chart :options="virtualnodecpuoption" auto-resize v-loading="cpuchartloading"></chart>
            </div>
            <div class="chartone">
                <chart :options="virtualnodememoryoption" auto-resize v-loading="memorychartloading"></chart>
            </div>
        </div>
        <div class="details">
            <p class="title">详细信息</p>
            <div class="details-colum">
                <el-row>
                    <!-- 左边部分 -->
                    <el-col :span="14">
                        <div>
                            <el-row class="margin">
                                <el-col :span="3" class="textright">名称 </el-col>
                                <el-col :span="21" class="textleft">{{details.name}}</el-col>
                            </el-row>
                            <el-row class="margin">
                                <el-col :span="3" class="textright">命名空间 </el-col>
                                <el-col :span="21" class="textleft">{{details.namespace}}</el-col>
                            </el-row>
                            <el-row class="margin">
                                <el-col :span="3" class="textright">标签 </el-col>
                                <el-col :span="21" class="textleft">
                                    <el-tag :key="tag" v-for="tag in details.tag" type="success" style="margin-right:5px;margin-bottom:2px;">
                                        {{tag}}
                                    </el-tag>
                                </el-col>
                            </el-row>
                            <el-row class="margin">
                                <el-col :span="3" class="textright">注释 </el-col>
                                <el-col :span="21" class="textleft">
                                    <el-tag type="success">
                                        {{details.annotations}}
                                    </el-tag>
                                </el-col>
                            </el-row>
                            <el-row class="margin">
                                <el-col :span="3" class="textright">创建时间 </el-col>
                                <el-col :span="21" class="textleft">{{details.creationTimestamp}}</el-col>
                            </el-row>
                            <el-row class="margin">
                                <el-col :span="3" class="textright">状态 </el-col>
                                <el-col :span="21" class="textleft">{{details.phase}}</el-col>
                            </el-row>
                            <el-row class="margin">
                                <el-col :span="3" class="textright" style="height:1px;"></el-col>
                                <el-col :span="21" class="textleft">
                                    <router-link class="router" :to="{path:'/dcp/monitor/onLinelogs/'+$route.params.node}"> 查看日志</router-link>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                    <!-- 右边部分 -->
                    <el-col :span="10">
                        <div>
                            <el-row style="margin-top:28px">
                                <el-col :span="4" class="textright" style="font-size:14px;">网络</el-col>
                                <el-col :span="20" class="textleft">
                                    <el-row style="margin-bottom:30px">
                                        <el-col :span="3" class="textright">节点</el-col>
                                        <el-col :span="21" class="textleft">{{details.nodeName}}</span>
                                        </el-col>
                                    </el-row>
                                    <el-row style="margin-bottom:30px">
                                        <el-col :span="3" class="textright">IP</el-col>
                                        <el-col :span="21" class="textleft">{{details.podIP}}</span>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="containers">
            <p class="title">容器(Containers)</p>
            <div class="con-details">
                <el-col :span="16">
                    <el-row class="margin">
                        <el-col :span="3" class="textright">名称 </el-col>
                        <el-col :span="21" class="textleft">{{containers.name}}</el-col>
                    </el-row>
                    <el-row class="margin">
                        <el-col :span="3" class="textright">镜像 </el-col>
                        <el-col :span="21" class="textleft">{{containers.image}}</el-col>
                    </el-row>
                    <el-row class="margin">
                        <el-col :span="3" class="textright">环境变量 </el-col>
                        <el-col :span="21" class="textleft">
                            <p class="pstyle">{{containers.envname}}</p>
                        </el-col>
                    </el-row>
                    <el-row class="margin">
                        <el-col :span="3" class="textright" style="height:1px;"></el-col>
                        <el-col :span="21" class="textleft">
                            <router-link class="router" :to="{path:'/dcp/monitor/onLinelogs/'+$route.params.node}"> 查看日志</router-link>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="8">
                    <el-row class="margin">
                        <el-col :span="4" class="textright">命令 </el-col>
                        <el-col :span="20" class="textleft"></el-col>
                    </el-row>
                    <el-row class="margin">
                        <el-col :span="4" class="textright">存活时间 </el-col>
                        <el-col :span="20" class="textleft">-</el-col>
                    </el-row>
                </el-col>
            </div>
        </div>
        <!-- <div class="condition">
            <p class="title">条件</p>
            <el-table :data="condition" style="width: 100%;margin-top:10px;" v-loading="tableloading" element-loading-text="拼命加载中">
                <el-table-column prop="type" label="类型" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="status" label="状态" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="lastProbeTime" label="最后心跳时间" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="lastTransitionTime" label="最后转岗时间" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="address" label="原因" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="address" label="消息" show-overflow-tooltip>
                </el-table-column>
            </el-table>
        </div> -->
    </div>
</template>
<script>
import {
    getPods,
    virnodeone
} from '../../assets/js/queryData2';
import echarts from 'echarts';
import {
    keyPlusvalue,
    setSessionStore
} from '../../assets/js/mUtils';
export default {
    components: {},
    data() {
        return {
            cpuchartloading: true,
            memorychartloading: true,
            tableloading: true,
            // nametitle:this.$route.params.node.name

            cpuchartdata: {
                cpuobj: {
                    ip: this.$route.params.node,
                    type: 'cpu',
                    name: 'usage_rate'
                },
                type: 'one',
                pagetype: 'virtualnode',
            },
            memorychartdata: {
                memoryobj: {
                    ip: this.$route.params.node,
                    type: 'memory',
                    name: 'usage'
                },
                type: 'one',
                pagetype: 'virtualnode',
            },
            virtualnodecpuoption: {
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
            virtualnodememoryoption: {
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
            resizelist: [],
            details: {
                name: '',
                namespace: '',
                tag: [],
                annotations: '',
                creationTimestamp: '',
                phase: '',
                nodeName: '',
                podIP: ''
            },
            containers: {
                name: '',
                image: '',
                envname: ''
            },
            condition: [],
        };
    },
    mounted() {
        setSessionStore('defaultActive', '/dcp/monitor/virtualNode');
        // 获取虚拟节点详情
        getPods(this.$route.params.node).then(res => {
            // 详情
            this.details.name = res.metadata.name;
            this.details.namespace = res.metadata.namespace;
            this.details.creationTimestamp = res.metadata.creationTimestamp;
            this.details.tag = keyPlusvalue(res.metadata.labels);
            this.details.phase = res.status.phase;
            this.details.annotations =
                `创建者：${res.metadata.ownerReferences[0].kind} ${res.metadata.ownerReferences[0].name}`;
            this.details.nodeName = res.spec.nodeName;
            this.details.podIP = res.status.podIP;
            // 容器
            this.containers.name = res.spec.containers[0].name;
            this.containers.image = res.spec.containers[0].image;
            if (res.spec.containers[0].env) {
                this.containers.envname = res.spec.containers[0].env[0].name;
            } else {
                this.containers.envname = '';
            }
            // 条件
            this.condition = res.status.conditions;
            this.tableloading = false;
        });
        this.Getcpuvirtualnode();
        this.Getmemoryvirtualnode();
        setInterval(() => {
            this.Getcpuvirtualnode();
            this.Getmemoryvirtualnode();
        }, 60000);
    },
    created() {},
    methods: {
        // 得到cpu的值并绘制
        Getcpuvirtualnode() {
            virnodeone(this.cpuchartdata.cpuobj).then(res => {
                let xAxisdata = [];
                let seriesdata = [];
                for (let i in res.metrics) {
                    var timestring = res.metrics[i].timestamp.substring(11, 16);
                    xAxisdata.push(timestring);
                    seriesdata.push((res.metrics[i].value) / 10)
                }
                this.cpuchartloading = false;
                this.virtualnodecpuoption.xAxis.data = xAxisdata;
                this.virtualnodecpuoption.series[0].data = seriesdata;
            })
        },
        // 得到内存的值并绘制
        Getmemoryvirtualnode() {
            virnodeone(this.memorychartdata.memoryobj).then(res => {
                let xAxisdata = [];
                let seriesdata = [];
                for (let i in res.metrics) {
                    var timestring = res.metrics[i].timestamp.substring(11, 16);
                    xAxisdata.push(timestring);
                    seriesdata.push((res.metrics[i].value) / (1024 * 1024 * 1024))
                }
                this.memorychartloading = false;
                let ymin = (seriesdata.sort(function(a, b) {
                        return a - b;
                    })[0]).toFixed(7)
                    //  console.log(ymin)
                this.virtualnodememoryoption.yAxis.min = ymin;
                this.virtualnodememoryoption.xAxis.data = xAxisdata;
                this.virtualnodememoryoption.series[0].data = seriesdata;
            })
        },
        btnclick() {

        }
    }
};
</script>
<style lang="scss">
.virtualNodelookup {
    height: 100%;
    width: 100%;
    overflow: auto;
    .navigationbox {
        height: 50px;
        width: calc(100% - 375px);
        position: fixed;
        background-color: #0D152F; //  background-color: red;
        z-index: 2;
    }
    .charts,
    .details,
    .containers,
    .condition {
        width: calc(100% - 90px);
        margin-left: 28px;
        margin-top: 27px;
        padding: 20px;
    }
    .details,
    .containers,
    .condition {
        box-shadow: 0 4px 28px 0 rgba(0, 0, 0, 0.50), inset 0 0 28px 0 rgba(53, 215, 255, 0.4);
    }
    .charts {
        height: 260px;
        margin-top: 57px;
        margin-left: 0px;
        .chartone {
            width: 50%;
            height: 100%;
            float: left;
            .echarts {
                height: 100%;
                width: 100%;
            }
        }
    }
    .details {
        .title {
            font-size: 17px;
            color: #3590BF;
            margin: 0;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(30, 157, 194, 0.10);
        }
        .details-colum {
            font-size: 12px;
            color: #41B6EC;
            letter-spacing: 1.71px;
            .textright {
                text-align: right;
                line-height: 18px;
            }
            .textleft {
                text-align: left;
                padding: 0 27px;
                line-height: 18px;
            }
            .margin {
                margin-top: 30px;
            }
            .router {
                text-decoration: none;
                color: #C4E9FB;
            }
        }
    }
    .containers {
        overflow: hidden;
        margin-bottom: 27px;
        .pstyle {
            &:first-child {
                margin-top: 0;
            }
            &:last-child {
                margin-bottom: 0;
            }
        }
        .title {
            font-size: 17px;
            color: #3590BF;
            margin: 0;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(30, 157, 194, 0.10);
        }
        .con-details {
            font-size: 12px;
            color: #41B6EC;
            .textright {
                text-align: right;
                line-height: 18px;
            }
            .textleft {
                text-align: left;
                padding: 0 27px;
                line-height: 18px;
            }
            .margin {
                margin-top: 30px;
            }
            .router {
                text-decoration: none;
                color: #C4E9FB;
            }
        }
    }
    .condition {
        margin-bottom: 27px;
        .title {
            font-size: 17px;
            color: #3590BF;
            margin: 0;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(30, 157, 194, 0.10);
        }
        .el-table {
            th,
            td {
                height: 40px;
            }
            th.is-leaf {
                border-bottom: 1px solid #0E2A45;
            }
            td {
                border-bottom: 1px solid #0E2A45;
            }
            th {
                background-color: transparent;
            }
            .el-table__header-wrapper thead div {
                background-color: transparent;
            }
        }
    }
}

@media screen and (max-width: 1550px) {
    .virtualNodelookup .navigationbox {
        width: calc(100% - 360px);
    }
}

@media screen and (max-width: 1400px) {
    .virtualNodelookup .navigationbox {
        width: calc(100% - 345px);
    }
}
</style>

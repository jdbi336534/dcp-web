<template>
    <div class="node">
        <div class="navigationbox">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">节点</el-breadcrumb-item>
                <el-breadcrumb-item>节点详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="charts">
            <div class="cpu-chart chart-one-box">
                <chart :options="onenodecpuoption" auto-resize v-loading="cpuchartloading"></chart>
            </div>
            <div class="memory-chart chart-one-box">
                <chart :options="onenodememoryoption" auto-resize v-loading="memorychartloading"></chart>
            </div>
            <div class="network-chart chart-one-box">
                <chart :options="onenodenetworkoption" auto-resize v-loading="networkchartloading"></chart>
            </div>
            <div class="disk-chart chart-one-box">
                <chart :options="onenodediskoption" auto-resize v-loading="diskchartloading"></chart>
            </div>
        </div>
        <div class="details">
            <p class="title">详细信息</p>
            <div class="details-colum">
                <el-row>
                    <!-- 左边部分 -->
                    <el-col :span="12">
                        <div>
                            <el-row class="margin">
                                <el-col :span="3" class="textright">名称 </el-col>
                                <el-col :span="21" class="textleft">{{details.name}}</el-col>
                            </el-row>
                            <el-row class="margin">
                                <el-col :span="3" class="textright">标签 </el-col>
                                <el-col :span="21" class="textleft">
                                    <el-tag type="success">{{details.tag}}</el-tag>
                                </el-col>
                            </el-row>
                            <el-row class="margin">
                                <el-col :span="3" class="textright">注释 </el-col>
                                <el-col :span="21" class="textleft">
                                    <el-tag type="success">{{details.annotations}}</el-tag>
                                </el-col>
                            </el-row>
                            <el-row class="margin">
                                <el-col :span="3" class="textright">创建时间 </el-col>
                                <el-col :span="21" class="textleft">{{details.creationTimestamp}}</el-col>
                            </el-row>
                            <el-row class="margin">
                                <el-col :span="3" class="textright">外部ID </el-col>
                                <el-col :span="21" class="textleft">{{details.externalID}}</el-col>
                            </el-row>
                            <el-row class="margin">
                                <el-col :span="3" class="textright">不可安排 </el-col>
                                <el-col :span="21" class="textleft">-</el-col>
                            </el-row>
                        </div>
                    </el-col>
                    <!-- 右边部分 -->
                    <el-col :span="12">
                        <div>
                            <el-row style="margin-top:28px">
                                <el-col :span="4" class="textright" style="font-size:14px;">系统信息</el-col>
                                <el-col :span="20" class="textleft"><span>服务器ID：</span><span>{{sysinfo.machineID}}</span></el-col>
                            </el-row>
                            <el-row style="margin-top:10px;">
                                <el-col :span="4" class="textright" style="height:1px;"></el-col>
                                <el-col :span="20" class="textleft"><span>系统UUID：</span><span>{{sysinfo.systemUUID}}</span></el-col>
                            </el-row>
                            <el-row style="margin-top:10px;">
                                <el-col :span="4" class="textright" style="height:1px;"></el-col>
                                <el-col :span="20" class="textleft"><span>Boot ID：</span><span>{{sysinfo.bootID}}</span></el-col>
                            </el-row>
                            <el-row style="margin-top:10px;">
                                <el-col :span="4" class="textright" style="height:1px;"></el-col>
                                <el-col :span="20" class="textleft"><span>内核版本：</span><span>{{sysinfo.kernelVersion}}</span></el-col>
                            </el-row>
                            <el-row style="margin-top:10px;">
                                <el-col :span="4" class="textright" style="height:1px;"></el-col>
                                <el-col :span="20" class="textleft"><span>操作系统镜像：</span><span>{{sysinfo.osImage}}</span></el-col>
                            </el-row>
                            <el-row style="margin-top:10px;">
                                <el-col :span="4" class="textright" style="height:1px;"></el-col>
                                <el-col :span="20" class="textleft"><span>Container Runtime版本：</span><span>{{sysinfo.containerRuntimeVersion}}</span></el-col>
                            </el-row>
                            <el-row style="margin-top:10px;">
                                <el-col :span="4" class="textright" style="height:1px;"></el-col>
                                <el-col :span="20" class="textleft"><span>Kubelet版本：</span><span>{{sysinfo.kubeletVersion}}</span></el-col>
                            </el-row>
                            <el-row style="margin-top:10px;">
                                <el-col :span="4" class="textright" style="height:1px;"></el-col>
                                <el-col :span="20" class="textleft"><span>Kubele-Proxyt版本：</span><span>{{sysinfo.kubeProxyVersion}}</span></el-col>
                            </el-row>
                            <el-row style="margin-top:10px;">
                                <el-col :span="4" class="textright" style="height:1px;"></el-col>
                                <el-col :span="20" class="textleft"><span>操作系统：</span><span>{{sysinfo.operatingSystem}}</span></el-col>
                            </el-row>
                            <el-row style="margin-top:10px;">
                                <el-col :span="4" class="textright" style="height:1px;"></el-col>
                                <el-col :span="20" class="textleft"><span>架构：</span><span>{{sysinfo.architecture}}</span></el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="Allocatedresources">
            <p class="title">已分配资源</p>
            <el-table :data="allocatable" style="width: 100%;margin-top:10px;" v-loading="tableloading" element-loading-text="拼命加载中">
                <el-table-column prop="cpureq" label="CPU请求(内核)" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="cpureqpct" label="%" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="cpurestrict" label="CPU限制(内核)" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="cpurestrictpct" label="%" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="memoryreq" label="内存请求(bytes)" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="memoryreqpct" label="%" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="memoryrestrict" label="内存限制(bytes)" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="memoryrestrictpct" label="%" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="node" label="虚拟节点" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="nodepct" label="%" show-overflow-tooltip>
                </el-table-column>
            </el-table>
        </div>
        <div class="virtualnode">
            <p class="title">虚拟节点</p>
            <el-table :data="pods" style="width: 100%;margin-top:10px;" v-loading="tableloading" element-loading-text="拼命加载中">
                <el-table-column label="名称" width="400" show-overflow-tooltip>
                    <template scope="scope">
                        <status :type="scope.row.namestatus"></status>
                        <!-- <span style="margin-left: 10px"><router-link class="router" :to="{path:'/dcp/system/virtualnodeLookup/'+scope.row.name}">{{scope.row.name}}</router-link></span> -->
                        <span style="margin-left: 10px"><router-link class="router" :to="{path:'/dcp/monitor/virtualnodeLookup/'+scope.row.name+'/'+'1'+'/'+$route.params.ip}">{{scope.row.name}}</router-link></span>
                    </template>
                </el-table-column>
                <el-table-column prop="phase" label="状态" width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="restartCount" label="重启次数" width="100" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="creationTimestamp" label="存活时间" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="address" label="CPU(cores)" show-overflow-tooltip>
                    <template scope="scope">
                        <div style="height:40px;width:120px;float:left;" class="linechartbox">
                            <chart :options="scope.row.cpudata" auto-resize></chart>
                        </div>
                        <!-- <span class="el-table-column-span  linechartboxspan"> 787888</span> -->
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="内存(bytes)" show-overflow-tooltip>
                    <template scope="scope">
                        <div style="height:40px;width:120px;float:left;" class="linechartbox">
                            <chart :options="scope.row.memorydata" auto-resize></chart>
                        </div>
                        <!-- <span class="el-table-column-span linechartboxspan">w</span> -->
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="" width="90">
                    <template scope="scope">
                        <router-link class="router" :to="{path:'/dcp/monitor/offLinelogs'}">
                            <i class="logs"></i>
                        </router-link>
                        <el-popover placement="bottom" width="46" trigger="hover">
                            <ul>
                                <li @click="Delete(scope.$index, scope.row)">删除</li>
                                <!-- <li @click="Edit(scope.$index, scope.row)">编辑</li> -->
                            </ul>
                            <el-button type="text" slot="reference">
                                <i style="cursor:pointer;color:#24caf3;" class="el-icon-more"></i>
                            </el-button>
                        </el-popover>
                    </template>
                </el-table-column>
            </el-table>
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
import status from '../common/Status';
import linecpuChart from '../common/linecpuchart';
import linememoryChart from '../common/linememorychart';
import echarts from 'echarts';
import {
    getNode,
    getPods,
    virnodeone,
    deletePods,
    nodechart
} from '../../assets/js/queryData2';
import {
    keyPlusvalue,
    setSessionStore
} from '@/assets/js/mUtils';
export default {
    components: {
        linecpuChart,
        linememoryChart,
        status,
        modalBox,
    },
    data() {
        return {
            cpuchartloading: true,
            memorychartloading: true,
            networkchartloading: true,
            diskchartloading: false,
            delatename: '',
            tableloading: true,
            tempcpulist: [],
            tempmemorylist: [],
            allocatable: [{
                cpureq: '',
                cpureqpct: '',
                cpurestrict: '',
                cpurestrictpct: '',
                memoryreq: '',
                memoryreqpct: '',
                memoryrestrict: '',
                node: '',
                nodepct: ''
            }],
            deletemodalvisible: false,
            cpuchartdata: {
                cpuobj: {
                    ip: this.$route.params.ip,
                    type: 'cpu',
                    name: 'usage_rate'
                },
                type: 'one',
                pagetype: 'node',
            },
            networkchartdata: {
                networkobj: {
                    ip: this.$route.params.ip,
                    type: 'network',
                    name: 'rx'
                },
                type: 'one',
                pagetype: 'node',
            },
            networkchartdatatx: {
                networkobj: {
                    ip: this.$route.params.ip,
                    type: 'network',
                    name: 'tx'
                },
                type: 'one',
                pagetype: 'node',
            },
            memorychartdata: {
                memoryobj: {
                    ip: this.$route.params.ip,
                    type: 'memory',
                    name: 'usage'
                },
                type: 'one',
                pagetype: 'node',
            },
            linecpuoption: {
                grid: {
                    left: '5',
                    right: '5',
                    top: '5',
                    bottom: '5',
                    borderWidth: 1
                },
                tooltip: {
                    trigger: 'axis',
                    position: [0, -10],
                    textStyle: {
                        fontSize: 12,
                    }
                },
                dataZoom: [{
                    type: 'inside',
                    realtime: true,
                }],
                xAxis: {
                    show: false,
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
                    show: false,
                    type: 'value',
                    boundaryGap: [0, '100%'],
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(250,250,250,0.7)',
                            fontSize: 12,
                        },
                    },
                    splitLine: {
                        show: false
                    },
                    min: 'dataMin',
                },
                series: [{
                    name: 'cpu',
                    type: 'line',
                    showSymbol: false,
                    roam: true,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(98, 255,208,1)'
                            }, {
                                offset: 1,
                                color: 'rgba(15, 112,225,1)'
                            }])
                        }
                    },
                    data: []
                }]
            },
            linememoryoption: {
                grid: {
                    left: '5',
                    right: '5',
                    top: '5',
                    bottom: '5',
                    borderWidth: 1
                },
                tooltip: {
                    trigger: 'axis',
                    position: [0, -10],
                    textStyle: {
                        fontSize: 12,
                    }
                },
                dataZoom: [{
                    type: 'inside',
                    realtime: true,
                }],
                xAxis: {
                    show: false,
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
                    show: false,
                    type: 'value',
                    boundaryGap: [0, '100%'],
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(250,250,250,0.7)',
                            fontSize: 12,
                        },
                    },
                    splitLine: {
                        show: false
                    },
                    min: 'dataMin',
                },
                series: [{
                    name: '内存',
                    type: 'line',
                    showSymbol: false,
                    roam: true,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(98, 255,208,1)'
                            }, {
                                offset: 1,
                                color: 'rgba(15, 112,225,1)'
                            }])
                        }
                    },
                    data: []
                }]
            },
            onenodecpuoption: {
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
                    right: '140',
                    top: '36',
                    bottom: '52',
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
            onenodememoryoption: {
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
                    right: '140',
                    top: '36',
                    bottom: '52',
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
            onenodenetworkoption: {
                legend: {
                    data: ['网络发送', '网络接收'],
                    x: 'left',
                    y: 'bottom',
                    textStyle: {
                        color: 'rgba(250,250,250,0.6)'
                    }
                },
                color: ['rgba(160, 42,108,1)', 'rgba(48,120,192,1)'],
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
                    right: '140',
                    top: '36',
                    bottom: '52',
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
                }, {
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
                    name: '网络发送',
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
                    lineStyle: {
                        normal: {
                            width: 1,
                            color: 'rgba(160,42,108,1)'
                        }
                    },
                    data: [5, 2, 8, 4, 6]
                }, {
                    name: '网络接收',
                    type: 'line',
                    yAxisIndex: 1,
                    animation: false,
                    symbol: 'none',
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(48, 120,192,0.2)'
                            }, {
                                offset: 1,
                                color: 'rgba(48, 120,192,0.1)'
                            }], false)
                        }
                    },
                    lineStyle: {
                        normal: {
                            width: 1,
                            color: 'rgba(48,120,192,1)'
                        }
                    },
                    data: [0, 2, 8, 4, 6]
                }]
            },
            onenodediskoption: {
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
                    right: '140',
                    top: '36',
                    bottom: '52',
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
                    },
                    textStyle: {
                        color: 'red',
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
            resizelist: [],
            details: {
                name: '',
                tag: '',
                annotations: '',
                creationTimestamp: '',
                externalID: '',
            },
            sysinfo: {},
            data: {},
            pods: [],
            podstable: [],
        };
    },
    mounted() {
        setSessionStore('defaultActive', '/dcp/monitor/node');
        // 获取所有虚拟节点（详情页面）
        getPods('').then(res => {
            let temparr = [];
            for (let i in res.items) {
                if (res.items[i].spec.nodeName === this.$route.params.ip) {
                    let tempobj = {};
                    tempobj.name = res.items[i].metadata.name;
                    // tempobj.phase = res.items[i].status.phase;
                    tempobj.restartCount = res.items[i].status.containerStatuses[0].restartCount;
                    tempobj.creationTimestamp = res.items[i].metadata.creationTimestamp;
                    tempobj.cpudata = this.linecpuoption;
                    tempobj.memorydata = this.linememoryoption;
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
            }
            this.pods = temparr;
            this.tableloading = false;
        }).then(() => {
            // 获取节点
            getNode(this.$route.params.ip).then(res => {
                // console.log(res);
                res.metadata.tag = keyPlusvalue(res.metadata.labels)[0];
                res.metadata.exp = keyPlusvalue(res.metadata.annotations)[0];
                // 详情
                this.details.name = res.metadata.name;
                this.details.tag = res.metadata.tag;
                this.details.annotations = res.metadata.exp;
                this.details.creationTimestamp = res.metadata.creationTimestamp;
                this.details.externalID = res.spec.externalID;
                // 系统信息
                this.sysinfo = res.status.nodeInfo;
                // 已分配资源列表
                this.allocatable[0].cpureq = `0/${res.status.allocatable.cpu}`;
                this.allocatable[0].cpureqpct = 0 / res.status.allocatable.cpu;
                this.allocatable[0].cpurestrict = `0/${res.status.allocatable.cpu}`;
                this.allocatable[0].cpurestrictpct = 0 / res.status.allocatable.cpu;
                let tempnum = (res.status.allocatable.memory.substring(0, res.status.allocatable.memory.length - 2) /
                    1024 / 1024).toFixed(3);
                this.allocatable[0].memoryreq = '0/' + tempnum + 'Gi';
                this.allocatable[0].memoryreqpct = 0 / tempnum;
                this.allocatable[0].memoryrestrict = '0/' + tempnum + 'Gi';
                this.allocatable[0].memoryrestrictpct = 0 / tempnum;
                this.allocatable[0].node = this.pods.length + '/' + res.status.allocatable.pods;
                this.allocatable[0].nodepct = (this.pods.length / res.status.allocatable.pods).toFixed(3);
            });
            for (let j in this.pods) {
                // 请求cpu的使用率数据
                virnodeone({
                    ip: this.pods[j].name,
                    type: 'cpu',
                    name: 'usage'
                }).then(res => {
                    this.changedata(res, this.linecpuoption);
                    this.pods[j].cpudata = this.linecpuoption;
                    // 请求memory的使用率数据
                    virnodeone({
                        ip: this.pods[j].name,
                        type: 'memory',
                        name: 'usage'
                    }).then(res => {
                        this.changedata(res, this.linememoryoption);
                        this.pods[j].memorydata = this.linememoryoption;
                    });
                });
            }
        });
        // 调用绘制cpu，内存，网络的函数
        this.Getonecpudata();
        this.Getonememorydata();
        this.Getnetworkdata();
        this.Getnetworktxdata();
        setInterval(() => {
            this.Getonecpudata();
            this.Getonememorydata();
            this.Getnetworkdata();
            this.Getnetworktxdata();
        }, 60000);
    },
    created() {},
    updated() {},
    methods: {
        // 得到cpu数据并绘制
        Getonecpudata() {
            nodechart(this.cpuchartdata.cpuobj).then(res => {
                let xAxisdata = [];
                let seriesdata = [];
                for (let i in res.metrics) {
                    var timestring = res.metrics[i].timestamp.substring(11, 16);
                    xAxisdata.push(timestring);
                    seriesdata.push((res.metrics[i].value) / 10)
                }
                this.cpuchartloading = false;
                this.onenodecpuoption.xAxis.data = xAxisdata;
                this.onenodecpuoption.series[0].data = seriesdata;
            })
        },
        // 得到内存数据并绘制
        Getonememorydata() {
            nodechart(this.memorychartdata.memoryobj).then(res => {
                if (res.metrics.length > 0) {
                    let xAxisdata = [];
                    let seriesdata = [];
                    for (let i in res.metrics) {
                        var timestring = res.metrics[i].timestamp.substring(11, 16);
                        xAxisdata.push(timestring);
                        var valueGB = (res.metrics[i].value / (1024 * 1024 * 1024));
                        seriesdata.push(valueGB);
                    }
                    this.memorychartloading = false;
                    this.onenodememoryoption.xAxis.data = xAxisdata;
                    this.onenodememoryoption.yAxis.min = (seriesdata.sort(function(a, b) {
                        return a - b;
                    })[0]).toFixed(2)
                    this.onenodememoryoption.series[0].data = seriesdata;
                } else {
                    this.onenodememoryoption.xAxis.data = [];
                    this.onenodememoryoption.series[0].data = [];
                }
            })
        },
        // 得到网络的数据并绘制
        Getnetworkdata() {
            nodechart(this.networkchartdata.networkobj).then(res => {
                if (res.metrics.length > 0) {
                    let xAxisdata = [];
                    let seriesdata = [];
                    for (let i in res.metrics) {
                        var timestring = res.metrics[i].timestamp.substring(11, 16);
                        xAxisdata.push(timestring);
                        var valueGB = (res.metrics[i].value / (1024 * 8 * 1024 * 1024));
                        seriesdata.push(valueGB);
                    }
                    this.networkchartloading = false;
                    this.onenodenetworkoption.xAxis[0].data = xAxisdata;
                    let ymin = (seriesdata.sort(function(a, b) {
                        return a - b;
                    })[0]).toFixed(5);
                    //   console.log('y-min', ymin);
                    // this.onenodenetworkoption.yAxis.min = (seriesdata.sort(function(a, b) {
                    //     return a - b;
                    // })[0]).toFixed(2)
                    this.onenodenetworkoption.yAxis[0].min = ymin;
                    this.onenodenetworkoption.series[0].data = seriesdata;
                } else {
                    this.onenodenetworkoption.xAxis[0].data = [];
                    this.onenodenetworkoption.series[0].data = [];
                }
            })
        },
        Getnetworktxdata() {
            // console.log('tx')
            nodechart(this.networkchartdatatx.networkobj).then(res => {
                //    console.log('network', res)
                if (res.metrics.length > 0) {
                    let xAxisdata = [];
                    let seriesdata = [];
                    for (let i in res.metrics) {
                        var timestring = res.metrics[i].timestamp.substring(11, 16);
                        xAxisdata.push(timestring);
                        var valueGB = (res.metrics[i].value / (1024 * 8 * 1024 * 1024));
                        seriesdata.push(valueGB);
                    }
                    this.networkchartloading = false;
                    let ymin = (seriesdata.sort(function(a, b) {
                        return a - b;
                    })[0]).toFixed(5);
                    //   console.log('y-min', ymin);
                    // this.onenodenetworkoption.yAxis.min = (seriesdata.sort(function(a, b) {
                    //     return a - b;
                    // })[0]).toFixed(2)
                    this.onenodenetworkoption.yAxis[1].min = ymin;
                    this.onenodenetworkoption.series[1].data = seriesdata;
                } else {
                    this.onenodenetworkoption.series[1].data = [];
                }
            })
        },
        changedata(resdata, chartdata) {
            // console.log('传过来的', resdata)
            let xAxisdata = [];
            let seriesdata = [];
            for (let i in resdata.metrics) {
                let timestring = resdata.metrics[i].timestamp.substring(11, 16);
                xAxisdata.push(timestring);
                seriesdata.push(resdata.metrics[i].value)
            }
            // console.log('转化后的', seriesdata)
            chartdata.xAxis.data = xAxisdata;
            chartdata.series[0].data = seriesdata;
            // console.log('node-this.cpuchartdata', chartdata)
        },
        // 虚拟节点表格中的删除
        Delete(index, row) {
            this.deletemodalvisible = true;
            this.delatename = row.name;
        },
        // 虚拟及诶单表格中的修改
        Edit(index, row) {

        },
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
    }
};
</script>
<style lang="scss">
.node {
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
    .Allocatedresources,
    .virtualnode {
        width: calc(100% - 90px);
        margin-left: 28px;
        margin-top: 27px;
        padding: 20px;
    }
    .details,
    .Allocatedresources,
    .virtualnode {
        box-shadow: 0 4px 28px 0 rgba(0, 0, 0, 0.50), inset 0 0 28px 0 rgba(53, 215, 255, 0.4);
        .router {
            text-decoration: none;
            color: rgba(36, 202, 243, 0.9);
        }
    }
    .charts {
        height: 440px;
        margin-top: 50px;
        margin-left: 10px;
        .chart-one-box {
            width: 50%;
            height: 50%;
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
        }
    }
    .Allocatedresources {
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
    .virtualnode {
        margin-bottom: 27px;
        .title {
            font-size: 17px;
            color: #3590BF;
            margin: 0;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(30, 157, 194, 0.10);
        }
        .el-table {
            .linechartbox {
                line-height: 40px;
                .echarts {
                    width: 110px;
                    height: 38px;
                }
            }
            .linechartboxspan {
                height: 100%;
                line-height: 40px;
            }
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

@media screen and (max-width: 1550px) {
    .node .navigationbox {
        width: calc(100% - 360px);
    }
}

@media screen and (max-width: 1400px) {
    .node .navigationbox {
        width: calc(100% - 345px);
    }
}
</style>
<style lang="scss">
.node {
    .nodedelect .el-dialog {
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
</style>

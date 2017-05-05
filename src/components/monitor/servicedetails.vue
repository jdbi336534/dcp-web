<template>
    <div class="zero-servicedetail-box">
        <div class="navigationbox">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{path:$route.params.ip.father}">{{$route.params.ip.nametitle}}</el-breadcrumb-item>
                <el-breadcrumb-item>服务详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="servicedetail-chart">
            <div class="servicedetail-cpu-box">
                <chart :options="cpuchart" auto-resize></chart>
            </div>
            <div class="servicedetail-memory-box">
                <chart :options="memorychart" auto-resize></chart>
            </div>
        </div>
        <div class="servicedetail-table">
            <p class="title">详细信息</p>
            <div class="details-colum">
    <el-row>
        <!-- 左边部分 -->
        <el-col :span="12">
            <div>
                <el-row class="margin">
                    <el-col :span="3" class="textright">名称 </el-col>
                    <el-col :span="21" class="textleft">{{detailedinformation.metadata.name}}</el-col>
                </el-row>
                <el-row class="margin">
                    <el-col :span="3" class="textright">命名空间 </el-col>
                    <el-col :span="21" class="textleft">{{detailedinformation.metadata.namespace}}</el-col>
                </el-row>
                <el-row class="margin">
                    <el-col :span="3" class="textright">标签</el-col>
                    <el-col :span="21" class="textleft">
                        <el-tag :key="tag" v-for="tag in detailedinformation.metadata.labelslist" type="success" style="margin-right:5px;margin-bottom:2px;">
                            {{tag}}
                        </el-tag>
                    </el-col>
                </el-row>
                <el-row class="margin">
                    <el-col :span="3" class="textright">类型 </el-col>
                    <el-col :span="21" class="textleft">{{detailedinformation.spec.type}}</el-col>
                </el-row>
            </div>
        </el-col>
        <!-- 右边部分 -->
        <el-col :span="12">
            <div>
                <el-row class="margin">
                    <el-col :span="6" class="textright">标签选择器 </el-col>
                    <el-col :span="18" class="textleft">{{detailedinformation.spec.selector['k8s-app']}}</el-col>
                </el-row>
                <el-row class="margin">
                    <el-col :span="6" class="textright">集合 </el-col>
                    <el-col :span="18" class="textleft"></el-col>
                </el-row>
                <el-row class="margin">
                    <el-col :span="6" class="textright">Cluster IP </el-col>
                    <el-col :span="18" class="textleft">{{detailedinformation.spec.clusterIP}}</span>
                    </el-col>
                </el-row>
                <el-row style="margin-top:28px">
                    <el-col :span="6" class="textright">内部端点</el-col>
                    <el-col :span="18" class="textleft">
                        <el-row style="margin-bottom:30px">
                            <el-col :span="24" class="textleft">
                                {{`${detailedinformation.metadata.name}:${detailedinformation.spec.ports[0].port}${detailedinformation.spec.ports[0].protocol}`}}</span>
                            </el-col>
                        </el-row>
                        <el-row style="margin-bottom:30px">
                            <el-col :span="24" class="textleft">
                                {{`${detailedinformation.metadata.name}:${detailedinformation.spec.ports[0].port}${detailedinformation.spec.ports[0].protocol}`}}
                                </span>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
        </el-col>
    </el-row>
</div>

        </div>
    </div>
</template>
<script>
import {
    servicesDiscoverydetails,
    getPods,
    virnodeone
} from '../../assets/js/queryData2';
import {
    setSessionStore
} from '@/assets/js/mUtils';
import echarts from 'echarts';
export default {
    data() {
            return {
                currentPage3: 1,
                total: 1,
                resizelist: [],
                detailedinformation: {
                    'metadata': {
                        'name': null,
                        'namespace': null,
                        'selfLink': '/api/v1/namespaces/kube-system/services/elasticsearch-logging',
                        'uid': '20ff53cc-2431-11e7-a3f7-84ad58d9f6ca',
                        'resourceVersion': '2986051',
                        'creationTimestamp': '2017-04-18T12:18:28Z',
                        'labels': {
                            'addonmanager.kubernetes.io/mode': null,
                            'k8s-app': null,
                            'kubernetes.io/cluster-service': null,
                            'kubernetes.io/name': null
                        },
                        'labelslist': [
                            null,
                        ]
                    },
                    'spec': {
                        'ports': [{
                            'protocol': null,
                            'port': null,
                            'targetPort': null,
                            'nodePort': null
                        }],
                        'selector': {
                            'k8s-app': null
                        },
                        'clusterIP': null,
                        'type': null,
                        'sessionAffinity': null
                    },
                    'status': {
                        'loadBalancer': {}
                    }
                },
                virtuualnode: [],
                cpuobj: {
                    ip: '',
                    type: 'cpu',
                    name: 'usage_rate'
                },
                memoryobj: {
                    ip: '',
                    type: 'memory',
                    name: 'usage'
                },
                cpuchart: {
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
                    }],
                },
                memorychart: {
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
                        formatter: function(params, ticket, callback) {
                            var tooltipvalue = (params[0].value).toFixed(8)
                            return (params[0].axisValueLabel + '</br>内存: ' + tooltipvalue + '(GB)')
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
        components: {},
        beforeUpdate() {},
        updated() {},
        created() {

        },
        mounted() {
            setSessionStore('defaultActive', '/dcp/monitor/serviceDiscovery');

            // 服务详情
            servicesDiscoverydetails(this.$route.params
                    .ip.ip).then(res => {
                    //  console.log('详细信息', (JSON.stringify(res, null, 4)))
                    this.detailedinformation = res;
                    var arr = [];
                    for (let i in this.detailedinformation.metadata.labels) {
                        var str = i + ':' + this.detailedinformation.metadata.labels[i];
                        arr.push(str);
                    }
                    this.detailedinformation.metadata.labelslist = arr;
                })
                // 获取虚拟节点
            getPods('').then(res => {
                // console.log('res:', res);
                // console.log('this.detailedinformation:', this.detailedinformation);
                for (let k = 0; k < res.items.length; k++) {
                    if (res.items[k].metadata.labels['k8s-app'] || res.items[k].metadata.labels['app'] === this.detailedinformation.spec.selector['k8s-app'] || this.detailedinformation.spec.selector['app']) {
                        this.virtuualnode.push(res.items[k]);
                    }
                }
                if (this.virtuualnode.length === 0) {
                    this.cpuobj.ip = 'elasticsearch-logging-v1-h3psz';
                    this.memoryobj.ip = 'elasticsearch-logging-v1-h3psz';
                } else {
                    let num = parseInt(Math.random() * this.virtuualnode.length);
                    this.cpuobj.ip = this.virtuualnode[num].metadata.name;
                    this.memoryobj.ip = this.virtuualnode[num].metadata.name;
                }
            }).then(() => {
                // 获取cpu图表数据
                virnodeone(this.cpuobj).then(res => {
                    //  console.log('cpu-res', JSON.stringify(res, null, 4))
                    this.changedata(res, this.cpuchart);
                });
                virnodeone(this.memoryobj).then(res => {
                    //   console.log('memory-res', JSON.stringify(res, null, 4))
                    this.changememorydata(res, this.memorychart);
                })
            });

            // 定时器每一分钟刷新一次
            setInterval(() => {
                virnodeone(this.cpuobj).then(res => {
                    //   console.log('cpu-res', res)
                    this.changedata(res, this.cpuchart);
                });
                virnodeone(this.memoryobj).then(res => {
                    this.changememorydata(res, this.memorychart);
                })
            }, 60000);
        },
        computed: {},
        methods: {
            handleSizeChange() {

            },
            handleCurrentChange() {},
            changedata(resdata, chartdata) {
                let xAxisdata = [];
                let seriesdata = [];
                for (let i in resdata.metrics) {
                    var timestring = resdata.metrics[i].timestamp.substring(11, 16);
                    xAxisdata.push(timestring);
                    seriesdata.push((resdata.metrics[i].value) / 10)
                }
                chartdata.xAxis.data = xAxisdata;
                chartdata.series[0].data = seriesdata;
                //  console.log(chartdata.series[0].data)
            },
            changememorydata(resdata, chartdata) {
                let xAxisdata = [];
                let seriesdata = [];
                for (let i in resdata.metrics) {
                    var timestring = resdata.metrics[i].timestamp.substring(11, 16);
                    xAxisdata.push(timestring);
                    var valueGB = (resdata.metrics[i].value / (1024 * 1024 * 1024));
                    seriesdata.push(valueGB);
                }
                chartdata.xAxis.data = xAxisdata;
                chartdata.yAxis.min = (seriesdata.sort(function(a, b) {
                    return a - b;
                })[0]).toFixed(6);
                chartdata.series[0].data = seriesdata;
            },
        },
}
</script>
<style lang="scss">
@import '../../assets/css/systemcommon/common.scss';
</style>
<style lang="scss" scoped>
.zero-servicedetail-box {
    height: 100%;
    width: 100%;
    overflow: auto;
    .navigationbox {
        height: 50px;
        width: 100%;
        background-color: #0D152F;
        z-index: 2;
    }
    .servicedetail-chart,
    .servicedetail-table {
        width: calc(100% - 90px);
        margin-left: 28px;
        margin-top: 27px;
        padding: 20px;
    }
    .servicedetail-chart {
        height: 200px;
        padding: 0 20px;
        margin-top: 17px;
        margin-left: 0px;
        .servicedetail-cpu-box,
        .servicedetail-memory-box {
            width: 50%;
            height: 100%;
            float: left;
            .echarts {
                width: 100%;
                height: 100%;
            }
        }
    }
    .servicedetail-table {
        box-shadow: 0 4px 28px 0 rgba(0, 0, 0, 0.50), inset 0 0 28px 0 rgba(53, 215, 255, 0.4);
        margin-bottom: 30px;
        p {
            font-size: 16px;
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
}

@media screen and (max-width: 1550px) {
    .zero-servicedetail-box .navigationbox {
        width: calc(100% - 360px);
    }
}

@media screen and (max-width: 1400px) {
    .zero-servicedetail-box .navigationbox {
        width: calc(100% - 345px);
    }
}
</style>

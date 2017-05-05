<template>
    <div class="serviceManager">
        <div class="serviceManager-top-box">
            <div class="btn_group">
                <el-button type="primary">
                    <i class="el-icon-plus el-icon--right"></i>
                    <!--  <el-select v-model="value" placeholder="新增服务" @change="selectChange">
                        <el-option v-for="item in optionsnode" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select> -->
                    <el-dropdown @command="handleCommand" trigger="click">
                        <span class="el-dropdown-link">
                            新增服务<i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="serviceip">服务一</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-button>
            </div>
        </div>
        <div class="charts">
            <div class="cpu-chart chart-one-box">
                <chart :options="nodecpuoption" auto-resize></chart>
            </div>
            <div class="memory-chart chart-one-box">
                <chart :options="nodememoryoption" auto-resize></chart>
            </div>
        </div>
        <div class="table">
            <p class="title">服务</p>
            <el-table :data="servicelistdata" style="width: 100%">
                <el-table-column label="名称" show-overflow-tooltip>
                    <template scope="scope">
                        <i style="background: #25CD6B;border-radius:50%;height:7px;width:7px;display:inline-block;vertical-align:middle;"></i>
                        <span style="margin-left: 10px">
                            <router-link :to="{name:'servicedetails',params:{ip:{ip:scope.row.metadata.name,father:'/dcp/monitor/serviceManager',nametitle:'服务管理'}}}">{{scope.row.metadata.name}}</router-link>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="标签" width="400" show-overflow-tooltip>
                    <template scope="scope">
                        {{ scope.row.metadata.labelstring}}
                    </template>
                </el-table-column>
                <el-table-column prop="node" label="虚拟节点" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="alive" label="存活时间" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="jingx" label="镜像" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="" width="60">
                    <template scope="scope">
                        <el-popover placement="bottom" width="46" trigger="hover">
                            <ul>
                                <!-- <li @click="Lookup(scope.$index, scope.row)">查看</li> -->
                                <li @click="Delete(scope.$index, scope.row)" id="selectboeder">删除</li>
                            </ul>
                            <el-button type="text" slot="reference"><i style="cursor:pointer;color:#24caf3;" class="el-icon-more"></i></el-button>
                        </el-popover>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" layout="total,  prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div> -->
        </div>
        <div class="table">
            <p class="title">发布</p>
            <el-table :data="releasedata" style="width: 100%">
                <el-table-column label="名称" show-overflow-tooltip>
                    <template scope="scope">
                        <i style="background: #25CD6B;border-radius:50%;height:7px;width:7px;display:inline-block;vertical-align:middle;"></i>
                        <span style="margin-left: 10px">
                         <router-link :to="{name:'servicedetails',params:{ip:{ip:scope.row.metadata.name,father:'/dcp/monitor/serviceManager',nametitle:'服务管理'}}}">{{scope.row.metadata.name}}</router-link>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="标签" width="400" show-overflow-tooltip>
                    <template scope="scope">
                        {{ scope.row.metadata.labelstring}}
                    </template>
                </el-table-column>
                <el-table-column prop="node" label="虚拟节点" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="alive" label="存活时间" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="jingx" label="镜像" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="" width="60">
                    <template scope="scope">
                        <el-popover placement="bottom" width="46" trigger="hover">
                            <ul>
                                <!-- <li @click="Lookup(scope.$index, scope.row)">查看</li> -->
                                <li @click="releaseDelete(scope.$index, scope.row)" id="selectboeder">删除</li>
                            </ul>
                            <el-button type="text" slot="reference"><i style="cursor:pointer;color:#24caf3;" class="el-icon-more"></i></el-button>
                        </el-popover>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <modal-box :visible="deletemodalvisible" @click-close="Offdelectmodal" class='delectbox nodedelect'>
            <div slot="jdb" class="delect jz">
                <div class="delectBox jz">
                    <p>确认删除</p>
                    <ul>
                        <li class="hand">
                            <el-button class="databtn laststep" @click="delcancel">取消</el-button>
                        </li>
                        <li class="hand">
                            <el-button class="databtn" :loading="btnloading" @click="delconfirm">确认</el-button>
                        </li>
                    </ul>
                </div>
            </div>
        </modal-box>
    </div>
</template>
<script>
import modalBox from '../common/ModalBox';
import echarts from 'echarts';
import {
    setSessionStore
} from '@/assets/js/mUtils';
import {
    getServices,
    deleteservicesDiscovery,
    nodeclusterchart,
    newService,
    queryService,
    delService
} from '../../assets/js/queryData2';
export default {
    components: {
        modalBox
    },
    data() {
        return {
            deletemodalvisible: false,
            delatename: '',
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
            currentPage: 1,
            pageSize: 20,
            total: 0,
            flag: 'release',
            btnloading: false,
            dom: {},
            resizelist: [],
            releasedata: [],
            value: '',
            servicelistdata: [{
                'metadata': {
                    'name': '',
                    'creationTimestamp': '',
                    'labels': {
                        'addonmanager.kubernetes.io/mode': '',
                        'k8s-app': '',
                        'kubernetes.io/cluster-service': '',
                        'kubernetes.io/name': ''
                    },
                    'labelstring': ''
                },
                'spec': {
                    'selector': {
                        'k8s-app': ''
                    },
                    'clusterIP': '',
                    'type': '',
                    'sessionAffinity': ''
                }
            }],
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
        };
    },
    created() {},
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
        // handleCurrentChange(val) {
        //     this.currentPage = val;
        // },
        // clickicon() {
        //     let that = this;
        //     setTimeout(function() {
        //         that.dom = $('.el-dropdown-menu').offset();
        //     }, 0);
        // },
        // 删除服务
        Delete(index, row) {
            this.flag = 'service';
            this.delatename = row.metadata.name;
            this.deletemodalvisible = true;
        },
        // 删除发布
        releaseDelete(index, row) {
            this.flag = 'release';
            this.delatename = row.metadata.name;
            this.deletemodalvisible = true;
        },
        // Lookup(index, row) {
        //     console.log(index, row);
        // },
        // 新增服务下拉框选择发生变化的时候
        handleCommand(val) {
            // console.log(val);
            newService(val).then(res => {
                // if (res.code === '200') {
                this.value = '';
                this.$message({
                    message: '新增服务成功！',
                    type: 'success'
                });
                // 保险起见延迟去请求数据
                setTimeout(() => {
                    this.queryTabledata();
                }, 0);
                // }
            });
        },
        delconfirm() {
            this.btnloading = true;
            if (this.flag === 'service') {
                // console.log(this.flag);
                deleteservicesDiscovery(this.delatename).then(res => {
                    if (res.code === 200) {
                        this.btnloading = false;
                        this.deletemodalvisible = false;
                        this.queryTabledata();
                        this.$message({
                            message: '删除成功！',
                            type: 'success'
                        });
                    }
                });
            } else if (this.flag === 'release') {
                // console.log(this.flag);
                delService(this.delatename).then(res => {
                    // if (res.code === '200') {
                    this.btnloading = false;
                    this.deletemodalvisible = false;
                    this.queryTabledata();
                    this.$message({
                        message: '删除成功！',
                        type: 'success'
                    });
                    // }
                })
            }
        },
        delcancel() {
            this.deletemodalvisible = false;
        },
        // 点击关闭弹窗
        Offdelectmodal() {
            this.btnloading = false;
            this.deletemodalvisible = false;
        },
        queryTabledata() {
            // 请求服务列表数据
            getServices().then(res => {
                // console.log('getServices', res)
                this.servicelistdata = res.items;
                for (var j = 0; j < this.servicelistdata.length; j++) {
                    var arr = [];
                    for (let i in this.servicelistdata[j].metadata.labels) {
                        var str = i + ':' + this.servicelistdata[j].metadata.labels[i];
                        arr.push(str);
                    }
                    var labelstring = arr.join('; ');
                    this.servicelistdata[j].metadata.labelstring = labelstring;
                }
            });
            // 查询所有发布的列表数据
            queryService('').then(res => {
                // console.log(res)
                // if (res.code === '200') {
                this.releasedata = res.items;
                for (let j = 0; j < this.releasedata.length; j++) {
                    let arr = [];
                    for (let i in this.releasedata[j].metadata.labels) {
                        let str = i + ':' + this.releasedata[j].metadata.labels[i];
                        arr.push(str);
                    }
                    let labelstring = arr.join('; ');
                    this.releasedata[j].metadata.labelstring = labelstring;
                }
                // }
            });
        },
        queryAlldata() {
            // 请求服务列表数据
            getServices().then(res => {
                // console.log('getServices', res)
                this.servicelistdata = res.items;
                for (var j = 0; j < this.servicelistdata.length; j++) {
                    var arr = [];
                    for (let i in this.servicelistdata[j].metadata.labels) {
                        var str = i + ':' + this.servicelistdata[j].metadata.labels[i];
                        arr.push(str);
                    }
                    var labelstring = arr.join('; ');
                    this.servicelistdata[j].metadata.labelstring = labelstring;
                }
            });
            // 查询所有发布的列表数据
            queryService('').then(res => {
                //  console.log(res)
                // if (res.code === '200') {
                this.releasedata = res.items;
                for (let j = 0; j < this.releasedata.length; j++) {
                    let arr = [];
                    for (let i in this.releasedata[j].metadata.labels) {
                        let str = i + ':' + this.releasedata[j].metadata.labels[i];
                        arr.push(str);
                    }
                    let labelstring = arr.join('; ');
                    this.releasedata[j].metadata.labelstring = labelstring;
                }
                // }
            });
            this.Getcpudata();
            this.Getmemorydata();
            this.settime();
        }
    },
    watch: {
        dom(val) {
            // console.log('this.dom:val', val);
            $('.el-dropdown-menu').offset({
                left: val.left + 17
            });
        }
    },
    mounted() {
        setSessionStore('defaultActive', '/dcp/monitor/serviceManager');
        this.queryAlldata();
    },
};
</script>
<style lang="scss">
// popover全局样式覆盖
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
            padding-bottom: 2px; //   border-bottom: 1px solid transparent;
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
// 下拉菜单样式
.el-dropdown-menu {
    font-size: 14px;
    background-color: #0F2642!important;
    color: #24caf3;
    border: solid 1px #24caf3!important;
}

.el-dropdown-menu__item:not(.is-disabled):hover {
    background-color: rgba(10, 10, 10, 0.38)!important;
    color: #24caf3!important;
} // 下拉菜单样式结束
.serviceManager {
    height: 100%;
    width: 100%;
    overflow: auto;
    .charts,
    .table {
        width: calc(100% - 57px);
        margin-left: 28px;
        margin-top: 27px;
    }
    .charts {
        height: 180px;
        width: calc(100% - 30px);
        margin-left: 0px;
        .chart-one-box {
            float: left;
            width: 50%;
            height: 100%;
            .echarts {
                height: 100%;
                width: 100%;
            }
        }
    }
    .table {
        // height: calc(100% - 262px);
        .title {
            font-size: 17px;
            color: #24CAF3;
            text-align: left;
            margin-bottom: 5px;
        }
        .el-table {
            // height: calc(100% - 28px)!important;
            td>div a {
                color: rgba(36, 202, 243, 1);
                text-decoration: none;
            }
            td {
                border-bottom: 1px solid rgba(98, 208, 248, 0.1);
                height: 40px;
            }
            th {
                background-color: transparent;
                height: 40px;
            }
            .el-table__header-wrapper {
                thead div {
                    background-color: transparent;
                }
                th {
                    border-bottom: 1px solid rgba(98, 208, 248, 0.1);
                }
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
        }
        .pagination {
            margin-top: 10px;
            text-align: center;
        }
    }
}
</style>
<style lang="scss">
.serviceManager {
    .serviceManager-top-box {
        width: 100%;
        height: 8%;
        position: absolute;
        top: -8.3%;
        .btn_group {
            position: absolute;
            height: 80%;
            width: 90%; // background-color: yellow;
            top: 10%;
            left: 7%;
            font-size: 16px;
            .el-button {
                border: 0;
                background: url("../../assets/img/system/topimg/btn-bg.png") no-repeat center;
                background-size: 100% 100%;
                height: 100%;
                width: 10%;
                color: rgba(182, 239, 253, 0.9);
                position: relative;
                top: -3%;
                padding: 0px;
                left: 0.3rem;
                >span {
                    height: 100%;
                    width: 100%;
                    line-height: 0.52rem;
                    .el-dropdown {
                        height: 100%;
                        .el-dropdown-link {
                            color: #24caf3;
                            height: 100%;
                        }
                    }
                }
                .el-icon-plus {
                    color: #2BEDE6;
                }
            }
            .el-button:hover {
                background: url("../../assets/img/system/topimg/btn-bg-on.png") no-repeat;
                background-size: 100% 100%;
            }
        }
    }
}

@media screen and (max-width: 1366px) {
    .serviceManager {
        .serviceManager-top-box {
            .btn_group {
                left: 4%;
                .el-button {
                    font-size: 12px;
                    width: 14%;
                } //  background-color:red;
            }
        }
    }
}
</style>
<style lang="scss">
.serviceManager {
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

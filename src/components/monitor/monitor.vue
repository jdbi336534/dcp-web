<template>
    <div class='zero-logsmanagement-box'>
        <div class="logsmanagement-top-box">
            <div class="btn_group">
                <el-tooltip :content="content" placement="top">
                    <el-button type="primary">
                        <el-cascader :options="options" :show-all-levels="false" v-model="selected" @active-item-change="handleItemChange" @change="cascadChange" :clearable="clear">
                        </el-cascader>
                    </el-button>
                </el-tooltip>
            </div>
        </div>
        <div class="logs-chart-box">
            <div class="logs-chart-one" v-loading="cpuchartloading" element-loading-text="拼命加载中">
                <chart :options="logscpuoption" auto-resize></chart>
            </div>
            <div class="logs-chart-one" v-loading="memorychartloading" element-loading-text="拼命加载中">
                <chart :options="logsavalableoption" auto-resize></chart>
            </div>
            <div class="logs-chart-one" v-loading="systemchartloading" element-loading-text="拼命加载中">
                <chart :options="logssystemloadoption" auto-resize></chart>
            </div>
            <div class="logs-chart-one" v-loading="networkchartloading" element-loading-text="拼命加载中">
                <chart :options="logsnetworkoption" auto-resize></chart>
            </div>
        </div>
    </div>
</template>
<script>
import {
    setSessionStore
} from '@/assets/js/mUtils';
import {
    nodeclusterchart,
    getfirstCascader,
    getPods,
    virnodeone
} from '../../assets/js/queryData2';
import echarts from 'echarts';
export default {
    data() {
            return {
                clear: true,
                cpuchartloading: true,
                memorychartloading: true,
                systemchartloading: false,
                networkchartloading: false,
                options: [],
                selected: [],
                k8sapp: '',
                index: '',
                content: '请选择',
                podsInterval: {},
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
                logscpuoption: {
                    title: {
                        text: 'cpu',
                        textStyle: {
                            color: 'rgba(250,250,250,0.6)',
                            fontSize: 12,
                        },
                        borderColor: 'rgba(36,202,243,1)',
                        borderWidth: 1,
                        left: '12',
                        top: '0',
                    },
                    grid: {
                        left: '100',
                        right: '100',
                        top: '40',
                        bottom: '50',
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
                        formatter: '{b} </br>{a}: {c} %'
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
                        data: []
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
                            formatter: '{value}%'
                        },
                        min: 'dataMin',
                    }],
                    series: [{
                        name: 'cpu使用率',
                        type: 'line',
                        animation: false,
                        symbol: 'none',
                        areaStyle: {
                            normal: {
                                color: 'rgba(113, 195,215,0.2)'
                            }
                        },
                        lineStyle: {
                            normal: {
                                width: 1,
                                color: 'rgba(113, 195,215,1)'
                            }
                        },
                        data: [],
                    }]
                },
                logsnetworkoption: {
                    legend: {
                        data: ['网络发送', '网络接收'],
                        x: 'left',
                        y: 'bottom',
                        textStyle: {
                            color: 'rgba(250,250,250,0.6)'
                        }
                    },
                    color: ['rgba(197, 102,48,1)', 'rgba(228, 196,104,1)'],
                    title: {
                        text: '网络IO',
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
                        right: '100',
                        top: '40',
                        bottom: '50',
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
                        data: ['1:00', '2:00', '3:00', '4:00', '5:00'],
                    }],
                    yAxis: [{
                        min: 'dataMin',
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
                    }, {
                        min: 'dataMin',
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
                    }],
                    series: [{
                        name: '网络发送',
                        type: 'line',
                        animation: false,
                        symbol: 'none',
                        areaStyle: {
                            normal: {
                                color: 'rgba(197, 102,48,0.2)'
                            }
                        },
                        lineStyle: {
                            normal: {
                                width: 1,
                                color: 'rgba(197, 102,48,1)'
                            }
                        },
                        data: [5, 0, 7, 8, 6],
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
                                    color: 'rgba(228, 196,104,0.2)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(228, 196,104,0.1)'
                                }], false)
                            }
                        },
                        lineStyle: {
                            normal: {
                                width: 1,
                                color: 'rgba(228, 196,104,1)'
                            }
                        },
                        data: [0, 2, 8, 4, 6]
                    }]
                },
                logsavalableoption: {
                    title: {
                        text: '可用内存',
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
                        right: '90',
                        top: '40',
                        bottom: '20',
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
                            return (params[0].axisValueLabel + '</br>内存: ' + tooltipvalue + '(GB)')
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
                        data: [],
                    }],
                    yAxis: [{
                        min: 'dataMin',
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
                            formatter: '{value}GB'
                        },
                    }],
                    series: [{
                        name: '内存',
                        type: 'line',
                        animation: false,
                        symbol: 'none',
                        areaStyle: {
                            normal: {
                                color: 'rgba(228, 196,104,0.15)'
                            }
                        },
                        lineStyle: {
                            normal: {
                                width: 1,
                                color: 'rgba(228, 196,104,1)'
                            }
                        },
                        data: [],
                    }]
                },
                logssystemloadoption: {
                    title: {
                        text: 'System load',
                        textStyle: {
                            color: 'rgba(250,250,250,0.6)',
                            fontSize: 12,
                        },
                        borderColor: 'rgba(36,202,243,1)',
                        borderWidth: 1,
                        left: '12',
                        top: '0',
                    },
                    grid: {
                        left: '100',
                        right: '100',
                        top: '40',
                        bottom: '50',
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
                        data: ['1:00', '2:00', '3:00', '4:00', '5:00'],
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
                        },
                    }],
                    series: [{
                        name: '流量',
                        type: 'line',
                        animation: false,
                        symbol: 'none',
                        lineStyle: {
                            normal: {
                                width: 1,
                                color: 'rgba(208, 175,50,1)'
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: 'rgba(208, 175,50,0.15)'
                            }
                        },
                        data: [5, 2, 8, 4, 6],
                    }]
                },
                optionstop: [{
                    value: 'zujian',
                    label: '物理节点',
                    children: [{
                        value: 'basic',
                        label: 'Basic',
                        children: [{
                            value: 'layout',
                            label: 'Layout 布局'
                        }, {
                            value: 'color',
                            label: 'Color 色彩'
                        }, {
                            value: 'typography',
                            label: 'Typography 字体'
                        }, {
                            value: 'icon',
                            label: 'Icon 图标'
                        }, {
                            value: 'button',
                            label: 'Button 按钮'
                        }]
                    }, {
                        value: 'form',
                        label: 'Form',
                        children: [{
                            value: 'radio',
                            label: 'Radio 单选框'
                        }, {
                            value: 'checkbox',
                            label: 'Checkbox 多选框'
                        }, {
                            value: 'input',
                            label: 'Input 输入框'
                        }, {
                            value: 'input-number',
                            label: 'InputNumber 计数器'
                        }, {
                            value: 'select',
                            label: 'Select 选择器'
                        }, {
                            value: 'cascader',
                            label: 'Cascader 级联选择器'
                        }, {
                            value: 'switch',
                            label: 'Switch 开关'
                        }, {
                            value: 'slider',
                            label: 'Slider 滑块'
                        }, {
                            value: 'time-picker',
                            label: 'TimePicker 时间选择器'
                        }, {
                            value: 'date-picker',
                            label: 'DatePicker 日期选择器'
                        }, {
                            value: 'datetime-picker',
                            label: 'DateTimePicker 日期时间选择器'
                        }, {
                            value: 'upload',
                            label: 'Upload 上传'
                        }, {
                            value: 'rate',
                            label: 'Rate 评分'
                        }, {
                            value: 'form',
                            label: 'Form 表单'
                        }]
                    }, {
                        value: 'data',
                        label: 'Data',
                        children: [{
                            value: 'table',
                            label: 'Table 表格'
                        }, {
                            value: 'tag',
                            label: 'Tag 标签'
                        }, {
                            value: 'progress',
                            label: 'Progress 进度条'
                        }, {
                            value: 'tree',
                            label: 'Tree 树形控件'
                        }, {
                            value: 'pagination',
                            label: 'Pagination 分页'
                        }, {
                            value: 'badge',
                            label: 'Badge 标记'
                        }]
                    }, {
                        value: 'notice',
                        label: 'Notice',
                        children: [{
                            value: 'alert',
                            label: 'Alert 警告'
                        }, {
                            value: 'loading',
                            label: 'Loading 加载'
                        }, {
                            value: 'message',
                            label: 'Message 消息提示'
                        }, {
                            value: 'message-box',
                            label: 'MessageBox 弹框'
                        }, {
                            value: 'notification',
                            label: 'Notification 通知'
                        }]
                    }, {
                        value: 'navigation',
                        label: 'Navigation',
                        children: [{
                            value: 'menu',
                            label: 'NavMenu 导航菜单'
                        }, {
                            value: 'tabs',
                            label: 'Tabs 标签页'
                        }, {
                            value: 'breadcrumb',
                            label: 'Breadcrumb 面包屑'
                        }, {
                            value: 'dropdown',
                            label: 'Dropdown 下拉菜单'
                        }, {
                            value: 'steps',
                            label: 'Steps 步骤条'
                        }]
                    }, {
                        value: 'others',
                        label: 'Others',
                        children: [{
                            value: 'dialog',
                            label: 'Dialog 对话框'
                        }, {
                            value: 'tooltip',
                            label: 'Tooltip 文字提示'
                        }, {
                            value: 'popover',
                            label: 'Popover 弹出框'
                        }, {
                            value: 'card',
                            label: 'Card 卡片'
                        }, {
                            value: 'carousel',
                            label: 'Carousel 走马灯'
                        }, {
                            value: 'collapse',
                            label: 'Collapse 折叠面板'
                        }]
                    }]
                }]
            }
        },
        beforeUpdate() {},
        updated() {},
        created() {},
        mounted() {
            setSessionStore('defaultActive', '/dcp/monitor/monitors');
            // 首先请求一次数据
            nodeclusterchart(this.cpuchartdata.cpuobj).then(res => {
                this.changedata(res, this.logscpuoption);
                this.cpuchartloading = false;
            });
            nodeclusterchart(this.memorychartdata.memoryobj).then(res => {
                this.changememorydata(res, this.logsavalableoption);
                this.memorychartloading = false;
            });
            // 在不选择下拉选框的情况下，一分钟刷新一次
            this.podsInterval = setInterval(() => {
                nodeclusterchart(this.cpuchartdata.cpuobj).then(res => {
                    this.changedata(res, this.logscpuoption);
                    this.cpuchartloading = false;
                });
                nodeclusterchart(this.memorychartdata.memoryobj).then(res => {
                    this.changememorydata(res, this.logsavalableoption);
                    this.memorychartloading = false;
                });
            }, 60000);
            // 获取下拉选框第一级菜单
            getfirstCascader().then(res => {
                let temparr = [];
                res.items.map((item, index) => {
                    let tempobj = {};
                    tempobj.label = item.metadata.name;
                    tempobj.value = item.metadata.name;
                    tempobj.k8sapp = item.spec.selector['k8s-app'] || item.spec.selector['app'];
                    tempobj.index = index;
                    tempobj.children = [];
                    temparr.push(tempobj);
                    //   console.log(item.metadata.name);
                });
                this.options = temparr;
                // console.log('temparr:', temparr);
            });
        },
        computed: {},
        methods: {
            handleItemChange(val) {
                // 根据val获取k8sapp的值
                this.options.map(item => {
                    if (item.value === val[0]) {
                        this.k8sapp = item.k8sapp;
                        this.index = item.index;
                    }
                });
                // 从此接口中获取下拉菜单中的二级菜单
                if (!this.options[this.index].children.length) {
                    getPods('').then(res => {
                        let temparr = [];
                        res.items.map(item => {
                            if (this.k8sapp === (item.metadata.labels['k8s-app'] || item.metadata.labels['app'])) {
                                let tempobj = {};
                                tempobj.label = item.metadata.name;
                                tempobj.value = item.metadata.name;
                                temparr.push(tempobj);
                            }
                        })
                        this.options[this.index].children = temparr;
                    });
                }
            },
            cascadChange(val) {
                if (val[1]) {
                    this.content = val[1];
                    // 如果选择了，就清除全部pods定时请求
                    clearTimeout(this.podsInterval);
                    // 先请求一次数据在设置定时器
                    this.queryChartData({
                        ip: val[1],
                        type: 'cpu',
                        name: 'usage_rate'
                    }, {
                        ip: val[1],
                        type: 'memory',
                        name: 'usage'
                    }, {
                        ip: val[1],
                        type: 'network',
                        name: 'rx'
                    }, {
                        ip: val[1],
                        type: 'network',
                        name: 'tx'
                    });
                    // 设置定时器
                    this.podsInterval = setInterval(() => {
                        this.queryChartData({
                            ip: val[1],
                            type: 'cpu',
                            name: 'usage_rate'
                        }, {
                            ip: val[1],
                            type: 'memory',
                            name: 'usage'
                        }, {
                            ip: val[1],
                            type: 'network',
                            name: 'rx'
                        }, {
                            ip: val[1],
                            type: 'network',
                            name: 'tx'
                        });
                    }, 60000);
                } else {
                    nodeclusterchart(this.cpuchartdata.cpuobj).then(res => {
                        this.changedata(res, this.logscpuoption);
                        this.cpuchartloading = false;
                    });
                    nodeclusterchart(this.memorychartdata.memoryobj).then(res => {
                        this.changememorydata(res, this.logsavalableoption);
                        this.memorychartloading = false;
                    });
                    clearTimeout(this.podsInterval);
                    this.podsInterval = setInterval(() => {
                        nodeclusterchart(this.cpuchartdata.cpuobj).then(res => {
                            this.changedata(res, this.logscpuoption);
                            this.cpuchartloading = false;
                        });
                        nodeclusterchart(this.memorychartdata.memoryobj).then(res => {
                            this.changememorydata(res, this.logsavalableoption);
                            this.memorychartloading = false;
                        });
                    }, 60000);
                }
            },
            // 请求图表的数据
            queryChartData(cpu, memory, networkrx, networktx) {
                this.cpuchartloading = true;
                this.memorychartloading = true;
                // 请求cpu数据
                virnodeone(cpu).then(res => {
                    // console.log('fuck:', res);
                    this.cpuchartloading = false;
                    this.changedata(res, this.logscpuoption);
                });
                // 请求内存数据
                virnodeone(memory).then(res => {
                    // console.log('fuck:', res);
                    this.memorychartloading = false;
                    this.changememorydata(res, this.logsavalableoption);
                });
                // 请求网络发送和接受数据
                virnodeone(networkrx).then(res => {
                    // console.log('fuck:', res);
                    this.cpuchartloading = false;
                    this.changenetworkrx(res, this.logsnetworkoption);
                });
                virnodeone(networktx).then(res => {
                    // console.log('fuck:', res);
                    this.memorychartloading = false;
                    this.changenetworktx(res, this.logsnetworkoption);
                });
            },
            // 给cpu图表赋值的函数
            changedata(resdata, chartdata) {
                let xAxisdata = [];
                let seriesdata = [];
                for (let i in resdata.metrics) {
                    var timestring = resdata.metrics[i].timestamp.substring(11, 16);
                    xAxisdata.push(timestring);
                    seriesdata.push((resdata.metrics[i].value) / 1000)
                }
                chartdata.xAxis[0].data = xAxisdata;
                chartdata.series[0].data = seriesdata;
            },
            // 给内存图表赋值的函数
            changememorydata(resdata, chartdata) {
                let xAxisdata = [];
                let seriesdata = [];
                for (let i in resdata.metrics) {
                    var timestring = resdata.metrics[i].timestamp.substring(11, 16);
                    xAxisdata.push(timestring);
                    var valueGB = (resdata.metrics[i].value / (1024 * 1024 * 1024 * 8));
                    seriesdata.push(valueGB);
                }
                chartdata.xAxis[0].data = xAxisdata;
                chartdata.yAxis[0].min = (seriesdata.sort(function(a, b) {
                    return a - b;
                })[0]).toFixed(5)
                chartdata.series[0].data = seriesdata;
            },
            // 网络接收图表赋值函数
            changenetworkrx(resdata, chartdata) {
                if (resdata.metrics.length > 0) {
                    let xAxisdata = [];
                    let seriesdata = [];
                    for (let i in resdata.metrics) {
                        var timestring = resdata.metrics[i].timestamp.substring(11, 16);
                        xAxisdata.push(timestring);
                        var valueGB = (resdata.metrics[i].value / (1024 * 1024 * 1024 * 8));
                        seriesdata.push(valueGB);
                    }
                    let ymin = (seriesdata.sort(function(a, b) {
                        return a - b;
                    })[0]).toFixed(5);
                    chartdata.yAxis[0].min = ymin;
                    chartdata.xAxis[0].data = xAxisdata;
                    chartdata.series[0].data = seriesdata;
                } else {
                    chartdata.xAxis[0].data = [];
                    chartdata.series[0].data = [];
                    chartdata.yAxis[0].min = 0;
                }
            },
            // 网络发送图表赋值函数
            changenetworktx(resdata, chartdata) {
                if (resdata.metrics.length > 0) {
                    let xAxisdata = [];
                    let seriesdata = [];
                    for (let i in resdata.metrics) {
                        var timestring = resdata.metrics[i].timestamp.substring(11, 16);
                        xAxisdata.push(timestring);
                        var valueGB = (resdata.metrics[i].value / (1024 * 1024 * 1024 * 8));
                        seriesdata.push(valueGB);
                    }
                    let ymin = (seriesdata.sort(function(a, b) {
                        return a - b;
                    })[0]).toFixed(5);
                    chartdata.yAxis[1].min = ymin;
                    chartdata.series[1].data = seriesdata;
                } else {
                    //   chartdata.xAxis[0].data = [];
                    chartdata.series[1].data = [];
                }
            },
        }
}
</script>
<style lang="scss">
@import '../../assets/css/systemcommon/common.scss';
</style>
<style lang="scss" scoped>
.zero-logsmanagement-box {
    height: 100%;
    width: 100%;
    overflow: auto;
    .logs-chart-box {
        height: 100%;
        width: 100%;
        .logs-chart-one {
            width: calc(50% - 40px);
            height: calc(50% - 100px);
            float: left;
            padding: 50px 20px;
            .echarts {
                height: 100%!important;
                width: 100%!important;
            }
        }
    }
}
</style>
<style lang="scss">
.zero-logsmanagement-box {
    .logsmanagement-top-box {
        width: 100%;
        height: 8%;
        position: absolute;
        top: -8.3%;
        .btn_group {
            position: absolute;
            height: 80%;
            width: 90%; // background-color: yellow;
            top: 10%;
            left: 1.2rem;
            font-size: 16px;
            .el-button {
                border: 0;
                background: url("../../assets/img/system/topimg/btn-bg-sx.png") no-repeat;
                background-size: 100% 100%;
                height: 100%;
                width: 12%;
                color: rgba(182, 239, 253, 0.9);
                position: relative;
                top: -3%;
                padding: 0px;
                .el-cascader {
                    background-color: rgba(182, 239, 253, 0);
                    height: 100%;
                    width: 100%;
                    .el-input {
                        height: 100%;
                        .el-input__inner {
                            height: 100%;
                            border: 0;
                            padding-left: .5rem;
                        }
                    }
                    .el-cascader__label {
                        line-height: 0.5rem;
                        padding: 0 25px 0 0.5rem;
                    }
                    .el-input__icon {
                        color: #2BEDE6;
                    }
                }
            }
            .el-button:hover {
                background: url("../../assets/img/system/topimg/btn-bg-on-sx.png") no-repeat;
                background-size: 100% 100%;
            }
        }
    }
}

.el-cascader-menus {
    //  margin-left: -20px;
}

@media screen and (max-width: 1400px) {
    .zero-logsmanagement-box {
        .logsmanagement-top-box {
            .btn_group {
                left: .5rem;
                .el-button {
                    font-size: 12px;
                    width: 13%;
                    padding: 0px;
                    .el-icon--right {
                        zoom: 0.7;
                    }
                }
            }
        }
    }
    .el-cascader-menus {
        margin-left: -20px;
    }
}
</style>

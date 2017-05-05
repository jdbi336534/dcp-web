<template>
    <div class="onlinelogs">
        <div class="topselected">
            <div class="btn_group">
                <div class="bgimg">
                    <el-tooltip :content="content" placement="top">
                        <el-cascader :options="options" :show-all-levels="false" v-model="selected" @active-item-change="handleItemChange" @change="cascadChange"></el-cascader>
                    </el-tooltip>
                </div>
            </div>
        </div>
        <div class="textarealogs" v-loading="textarealoading" element-loading-text="拼命加载中">
            <el-input type="textarea" class="mytextarea" spellcheck="false" v-model="textarea" readonly="readonly">
            </el-input>
        </div>
    </div>
</template>
<script>
import {
    getfirstCascader,
    getPods,
    getLogs
}
from '../../assets/js/queryData2'
import {
    setSessionStore
} from '@/assets/js/mUtils';
export default {
    data() {
            return {
                textarealoading: true,
                options: [],
                k8sapp: '',
                index: '',
                textarea: '',
                content: '请选择',
                selectedOptions: [],
                selected: [],
                firstquery: '',
            }
        },
        mounted() {
            setSessionStore('defaultActive', '/dcp/monitor/offLinelogs/pleasechoose');
            // 如果路由中传过来的pod不为pleasechoose
            if (this.$route.params.pod !== 'pleasechoose') {
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
                    });
                    this.options = temparr;
                });
                // 根据传过来的值取到级联选择以及菜单
                getPods(this.$route.params.pod).then(res => {
                    this.selectedOptions[0] = res.metadata.labels['k8s-app'] || res.metadata.labels['app'];
                    this.selectedOptions[1] = this.$route.params.pod;
                }).then(() => {
                    // 调用接口，请求下级菜单数据
                    getPods('').then(res => {
                        let temparr = [];
                        res.items.map(item => {
                                if (this.selectedOptions[0] === (item.metadata.labels['k8s-app'] || item.metadata.labels['app'])) {
                                    let tempobj = {};
                                    tempobj.label = item.metadata.name;
                                    tempobj.value = item.metadata.name;
                                    temparr.push(tempobj);
                                }
                            })
                            // 遍历 this.options找到对应的k8s-app
                        this.options.map((item, index) => {
                            if (item.k8sapp === this.selectedOptions[0]) {
                                this.options[index].children = temparr;
                                this.selected.push(this.selectedOptions[0]);
                                this.selected.push(this.selectedOptions[1]);
                            }
                        });
                    });
                });
                // 请求日志数据
                this.content = this.$route.params.pod;
                getLogs(this.$route.params.pod, (data) => {
                    // 成功的回调
                    if (data.length <= 0) {
                        this.$message.success('暂无数据！');
                    }
                    this.textarea = data;
                    this.textarealoading = false;
                }, (xhr) => {
                    // 失败的回调
                    this.$message.error('请求出错，请联系管理员！');
                    this.textarea = '';
                    this.textarealoading = false;
                });
            } else {
                // 如果路由中传过来的pod为pleasechoose
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
                    });
                    this.options = temparr;
                }).then(() => {
                    if (this.options.length > 0) {
                        // 默认取options的第一组数据
                        this.k8sapp = this.options[0].k8sapp;
                        this.index = this.options[0].index;
                    }
                    // 获取下拉选框中的第二级菜单
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
                        this.selected.push(this.options[0].value);
                        this.selected.push(this.options[0].children[0].value);
                        this.content = this.options[0].children[0].value;
                        this.firstquery = this.options[0].children[0].value;
                    }).then(() => {
                        // 请求日志数据
                        getLogs(this.firstquery, (data) => {
                            // 成功的回调
                            if (data.length <= 0) {
                                this.$message.success('暂无数据！');
                            }
                            this.textarea = data;
                            this.textarealoading = false;
                        }, (xhr) => {
                            // 失败的回调
                            this.$message.error('请求出错，请联系管理员！');
                            this.textarea = '';
                            this.textarealoading = false;
                        });
                    });
                });
            }
        },
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
                // 如果选择了第二级后，去请求相应的日志数据
                if (val[1]) {
                    this.content = val[1];
                    this.textarealoading = true;
                    // 清空之前显示的数据
                    // this.textarea = '';
                    getLogs(val[1], (data) => {
                        // 成功的回调
                        if (data.length <= 0) {
                            this.$message.success('暂无数据！');
                        }
                        this.textarea = data;
                        this.textarealoading = false;
                    }, (xhr) => {
                        // console.log('xhr:', xhr);
                        // 失败的回调
                        this.$message.error('请求出错，请联系管理员！');
                        this.textarea = '';
                        this.textarealoading = false;
                    });
                }
            }
        }

}
</script>
<style lang="scss">
.onlinelogs {
    height: 100%;
    width: 100%;
    overflow: hidden;
    .topselected {
        width: 100%;
        height: 8%;
        position: absolute;
        top: -8.3%;
        .btn_group {
            position: absolute;
            height: 80%;
            width: 90%;
            top: 9%;
            left: 9%;
            font-size: 16px;
            .bgimg {
                height: 100%;
                width: 10%;
                background: url('../../assets/img/system/topimg/btn-log.png') no-repeat;
                background-size: 100% 100%;
                &:hover {
                    background: url('../../assets/img/system/topimg/btn-log-on.png') no-repeat;
                    background-size: 100% 100%;
                }
                .el-cascader {
                    background-color: transparent;
                    height: 100%;
                    .el-input {
                        height: 100%;
                        ::-webkit-input-placeholder {
                            /* WebKit, Blink, Edge */
                            color: #24caf3;
                        }
                        :-moz-placeholder {
                            /* Mozilla Firefox 4 to 18 */
                            color: #24caf3;
                        }
                        ::-moz-placeholder {
                            /* Mozilla Firefox 19+ */
                            color: #24caf3;
                        }
                        :-ms-input-placeholder {
                            /* Internet Explorer 10-11 */
                            color: #24caf3;
                        }
                    }
                    .el-cascader__label {
                        line-height: 0.5rem;
                        padding: 0 25px 0 0.5rem;
                    }
                    .el-input__icon {
                        color: #2BEDE6;
                    }
                    .el-input__inner {
                        height: 100%;
                        padding-left: .5rem;
                        border: none;
                    }
                }
            }
        }
    }
    .textarealogs {
        height: 100%;
        width: 100%;
        .mytextarea {
            height: 100%;
            width: 100%;
            textarea {
                height: 100%;
                width: 100%;
                border: 0px;
                background: transparent;
                padding: 15px 20px;
            }
        }
    }
}
</style>

<template>
    <!-- <div class="modleBox  data-details-modle jz"> -->
    <modal-box :visible="modalvisible" titlename="" btnname="" @click-close="offthreeModule">
        <div slot="jdb" class="data-details jz">
            <div class="head">
                <p class="shxqBtn hand" v-on:click='Showdatadetails'>数据详情</p>
                <p class="threeBtn hand" v-on:click='Showdatatree'>树状结构</p>
            </div>
            <div class="detail-tree-box" id="shdataxqMain1">
                <div class="shdataxqMainScrollBox">
                    <div class="sjxqBox">
                        <div class="sjxqBoxMain">
                            <data-details :detailsData="datadetailsOne"></data-details>
                        </div>
                    </div>
                    <div class="threebox hide">
                        <div class="treetop__wrap">
                            <div class="title">数据源结构</div>
                            <el-scrollbar class="treestrcscroll" wrap-class="treestructer__wrap" show="true">
                                <div class="treestructer">
                                    <!-- 树结构 -->
                                    <el-tree class="filter-tree" :data="datatree" :props="defaultProps" ref="treedetails" @node-click="handleNodeClick" :highlight-current="true">
                                    </el-tree>
                                    <!-- 树结构 -->
                                </div>
                            </el-scrollbar>
                        </div>
                        <div class="tablestructer">
                            <!-- 树状结构中的表格 -->
                            <el-table :data="threeTable" height="466" style="width: 100%;">
                                <el-table-column prop="columnName" label="字段名称" width="180" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="dataType" label="字段类型" width="180" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="dataLength" label="字段长度" :formatter="formatdataLength" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="dataPrecision" label="字段精度" :formatter="formatdataPrecision" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="dataNotNull" label="是否非空" :formatter="formatdataNotNull" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="dataConstraintType" label="键类型" show-overflow-tooltip>
                                </el-table-column>
                            </el-table>
                            <!-- 树状结构中的表格 -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </modal-box>
    <!--  </div> -->
</template>
<script>
import DataDetails from './dataDetails';
import modalBox from '../common/ModalBox';
import {
    datasourceThreeTablez,
} from '../../assets/js/queryData';
export default {
    data() {
            return {
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                datadetailsOne: null,
                threeTable: null,
                datamagOne: null,
                datatree: [{}],
                modalvisible: false,
            }
        },
        beforeUpdate() {
            //  console.info('beforeUpdate');
        },
        updated() {
            //  console.info('updated');
        },
        created() {

        },
        mounted() {

        },

        computed: {

        },
        components: {
            DataDetails,
            modalBox,
        },
        methods: {
            Assignmentdetail(argumentdetail) {
                console.log('进入组件内部函数')
                this.datadetailsOne = argumentdetail;
                this.modalvisible = true;
                // $('.data-details-modle').removeClass('hide');
                console.log('this.datadetailsOne', this.datadetailsOne)
            },
            Assignmenttree(argumenttree) {
                console.log('组件复制datatree')
                this.datatree = argumenttree;
                console.log('this.datatree组件复制', this.datatree)
            },
            Showdatadetails() {
                $('.threebox').addClass('hide');
                $('.sjxqBox').removeClass('hide');
            },
            Showdatatree() {
                console.log('this.datatree显示树', this.datatree)
                $('.threebox').removeClass('hide');
                $('.sjxqBox').addClass('hide');
            },
            offthreeModule() {
                this.modalvisible = false;
                $('.threebox').addClass('hide');
                $('.sjxqBox').removeClass('hide');
                this.threeTable = [];
            },
            // 当树的节点被点击的时候
            handleNodeClick(data, node) {
                if (node.level === 2) {
                    console.info('data', data.id);
                    datasourceThreeTablez(data.id).then(res => {
                        if (res.code === 200) {
                            console.log('datasourceThreeTablez')
                            console.log(res)
                            this.threeTable = res.data;
                        } else if (res.code === 300) {
                            this.$message.success(res.msg);
                        } else {
                            this.$message.error(res.msg);
                            // this.$alert('失败原因:' + res.msg, '获取数据失败！', {
                            //     confirmButtonText: '确定',
                            // });
                        }
                    })
                }
            },
            // 格式化字段长度
            formatdataLength(row, column) {
                if (row.dataLength === -1) {
                    return '';
                } else {
                    return row.dataLength;
                }
            },
            // 格式化字段精度
            formatdataPrecision(row, column) {
                if (row.dataPrecision === -1) {
                    return '';
                } else {
                    return row.dataPrecision;
                }
            },
            // 格式化是否非空
            formatdataNotNull(row, column) {
                if (row.dataNotNull === -1) {
                    return '';
                } else if (row.dataNotNull === 1) {
                    return '否';
                } else if (row.dataNotNull === 0) {
                    return '是';
                }
            },
        }
}
</script>
<style lang="scss">
@import '../../assets/css/data/dataCommon.scss';
.data-details {
    padding-left: 25px;
    .head {
        width: 900px;
        height: 70px;
        position: relative;
        top: -60px;
        P {
            width: 100px;
            height: 50px;
            float: left;
            line-height: 50px;
            padding: 10px 0 0 50px;
            font-size: 18px;
        }
        P:hover {
            color: rgba(80, 213, 246, 1);
        }
        .shxqBtn {
            margin-left: 120px;
        }
        .threeBtn {
            margin-left: 330px;
        }
    }
    .detail-tree-box {
        width: 1000px;
        height: 480px;
        margin-top: -50px;
    }
    .threebox {
        width: 1000px;
        height: 480px;
        margin: 0;
        padding: 0;
    }
}
</style>

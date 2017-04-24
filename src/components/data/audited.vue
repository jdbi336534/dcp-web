<template>
    <div class="datasource-hasaudit data-box">
        <div class="datasource-topbox">
            <div class="search-box">
                <input type="text" id="search" placeholder="请输入关键字" @keypress="presskey">
            </div>
        </div>
        <div class="hasaudit-listbox">
            <div class="datasource-list">
                <el-table :data="datalistz" :resizable="true" height='660' border empty-text="暂如数据" style="width: 100%;" v-loading="tableloading" element-loading-text="拼命加载中">
                    <el-table-column label="数据源ID" show-overflow-tooltip>
                        <template scope="scope">{{scope.row.dataSourceId}}</template>
                    </el-table-column>
                    <el-table-column label="数据源名称" show-overflow-tooltip>
                        <template scope="scope">{{scope.row.dataSourceName}}</template>
                    </el-table-column>
                    <el-table-column label="数据源种类" show-overflow-tooltip>
                        <template scope="scope">{{scope.row.dataSourceKindName}}</template>
                    </el-table-column>
                    <el-table-column label="所属部门" show-overflow-tooltip>
                        <template scope="scope">{{scope.row.vestInOrganiztionName}}</template>
                    </el-table-column>
                    <el-table-column label="创建时间" width="200">
                        <template scope="scope">{{scope.row.createTime}}</template>
                    </el-table-column>
                    <el-table-column label="部署地点" show-overflow-tooltip>
                        <template scope="scope">{{scope.row.deploymentAddressName}}</template>
                    </el-table-column>
                    <el-table-column label="数据源简称" show-overflow-tooltip>
                        <template scope="scope">{{scope.row.dataSourceShortName}}</template>
                    </el-table-column>
                    <el-table-column label="物理地址" show-overflow-tooltip>
                        <template scope="scope">{{scope.row.physicalAddress}}</template>
                    </el-table-column>
                    <el-table-column label="状态" show-overflow-tooltip>
                        <template scope="scope">{{scope.row.aproveStatusName}}</template>
                    </el-table-column>
                    <el-table-column label="操作" width="250">
                        <template scope="scope">
                            <el-tooltip class="item" effect="dark" content="查看详情" placement="bottom-start">
                                <el-button @click='Lookdetailandtree(scope.row)' class="jrshHide3 hand" type="text" size="small">
                                    <img src="../../assets/img/btn-detail.png" alt="">
                                </el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="查看审核记录" placement="bottom-start">
                                <el-button @click='Showauditlogging(scope.row.dataSourceId)' class="jrshHide3 hand" type="text" size="small">
                                    <img src="../../assets/img/btn-record.png" alt="">
                                </el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage3" :page-size="20" layout="total,  prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <div class="hasaudit-model">
            <audit-logging ref='Auditlogging'></audit-logging>
            <data-details-tree ref='Datadetailsevent'></data-details-tree>
        </div>
        <data-detail ref="audited_detail"></data-detail>
    </div>
</template>
<script>
//  赵凯芳引入详情和树状结构
import dataDetailsTree from './dataDetailsAndTree.vue';
import auditLogging from './auditLogging.vue';
import DataDetail from './dataDetail';

import {
    getSessionStore,
    formatTime,
} from '../../assets/js/mUtils';
import {
    CompletedApprovedList,
    datasourceApproveStatus,
} from '../../assets/js/queryData';
//  import moment from 'moment';
export default {
    data() {
            return {
                tableloading: true,
                datalistz: [],
                currentPage3: 1,
                total: 0,
                usermsg: {},
                datamagOne: null,
            }
        },
        beforeUpdate() {},
        updated() {},
        created() {
            this.usermsg = getSessionStore('userInfo');
        },
        mounted() {
            CompletedApprovedList({
                'pageNum': this.currentPage3,
                'pageSize': 20,
                'userId': this.usermsg.id,
            }).then(res => {
                if (res.code === 200) {
                    this.datalistz = res.data.list;
                    for (var i = 0; i < this.datalistz.length; i++) {
                        this.datalistz[i].checkChild = false;
                        this.datalistz[i].createTime = formatTime(this.datalistz[i].createTime);
                    }
                    this.total = res.data.total;
                } else if (res.code === 300) {
                    this.$message.success(res.msg);
                } else {
                    this.tableloading = false;
                    this.$message.error(res.msg);
                }
                this.tableloading = false;
            })
        },
        computed: {},
        components: {
            dataDetailsTree,
            auditLogging,
            DataDetail
        },
        methods: {
            // 回车搜索
            presskey(e) {
                if (e.keyCode === 13) {
                    // 接入已审核
                    console.log('接入已审核');
                    this.tableloading = true;
                    CompletedApprovedList({
                        'pageNum': this.currentPage3,
                        'pageSize': 20,
                        'userId': this.usermsg.id,
                        'dataSourceName': e.target.value
                    }).then(res => {
                        if (res.code === 200) {
                            this.datalistz = res.data.list;
                            for (var i = 0; i < this.datalistz.length; i++) {
                                this.datalistz[i].checkChild = false;
                                this.datalistz[i].createTime = formatTime(this.datalistz[i].createTime);
                            }
                            this.total = res.data.total;
                        } else if (res.code === 300) {
                            this.$message.success(res.msg);
                        } else {
                            this.$message.error(res.msg);
                        }
                        this.tableloading = false;
                    })
                }
            },
            Showauditlogging(cid) {
                this.$refs.Auditlogging.Showauditloggingbox();
                datasourceApproveStatus(cid, 'datasource').then(res => {
                    console.log('Auditlogging', res)
                    if (res.code === '200') {
                        this.datasourceApproveStatusData = res.list;
                        for (var m = 0; m < res.list.length; m++) {
                            this.datasourceApproveStatusData[m].ADD_DATE = formatTime(this.datasourceApproveStatusData[m].ADD_DATE);
                        }
                        console.log('this.datasourceApproveStatusData')
                        this.$refs.Auditlogging.Showauditloggingdata(this.datasourceApproveStatusData);
                    } else if (res.code === 300) {
                        this.$message.success(res.msg);
                    } else {
                        this.$message.error(res.msg);
                        // this.$alert('失败原因:' + res.msg, '获取数据失败！', {
                        //     confirmButtonText: '确定',
                        // });
                    }
                })
            },
            Lookdetailandtree(row) {
                this.$refs.audited_detail.open({
                    dataSourceId: row.dataSourceId,
                    dataSourceKind: row.dataSourceKind
                });
                // this.datamagOne = this.datalistz[cIndex];
                // console.log('this.datamagOne', this.datamagOne);
                // this.$refs.Datadetailsevent.Assignmentdetail(this.datamagOne);
                // datasourceThreez(cid).then(res => {
                //     if (res.code === 200) {
                //         let fatemparr = [];
                //         for (var i = 1; i < res.data.length; i++) {
                //             let tempobj = {};

                //             let temparr = [];
                //             tempobj.id = i;
                //             tempobj.label = res.data[i].tables[0].schemaName;
                //             for (let j in res.data[i].tables) {
                //                 let tempobjj = {};
                //                 tempobjj.label = res.data[i].tables[j].tableName;
                //                 tempobjj.id = res.data[i].tables[j].sourceTableId;
                //                 temparr.push(tempobjj);
                //             }
                //             tempobj.children = temparr;
                //             fatemparr.push(tempobj);
                //         }
                //         //  执行ref
                //         //  this.data2 = fatemparr;
                //         this.$refs.Datadetailsevent.Assignmenttree(fatemparr);
                //         console.log('jdbjdbjdbjdbjdbjdb:', JSON.stringify(fatemparr));
                //     } else if (res.code === 300) {
                //         this.$message.success(res.msg);
                //     } else {
                //         this.$message.error(res.msg);
                //         // this.$alert('失败原因:' + res.msg, '获取数据失败！', {
                //         //     confirmButtonText: '确定',
                //         // });
                //     }
                // })
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage3 = val;
                this.tableloading = true;
                console.log(`当前页: ${val}`);
                //  数据源介入审核
                this.queryCompletedApprovedList();
            },
            queryCompletedApprovedList() {
                //  数据源接入已审核
                CompletedApprovedList({
                    'pageNum': this.currentPage3,
                    'pageSize': 20,
                    'userId': this.usermsg.id,
                }).then(res => {
                    if (res.code === 200) {
                        this.datalistz = res.data.list;
                        for (var i = 0; i < this.datalistz.length; i++) {
                            this.datalistz[i].checkChild = false;
                            this.datalistz[i].createTime = formatTime(this.datalistz[i].createTime);
                        }
                        this.total = res.data.total;
                    } else if (res.code === 300) {
                        this.$message.success(res.msg);
                    } else {
                        this.$message.error(res.msg);
                    }
                    this.tableloading = false;
                })
            },
        }
}
</script>
<style lang="scss">
@import '../../assets/css/data/dataCommon.scss';
.datasource-hasaudit {
    @import '../../assets/css/data/datasource-topbox.scss';
    .hasaudit-listbox {
        height: 100%;
    }
    .datasource-list {
        .el-table {
            height: 100%!important;
        }
    }
}
</style>

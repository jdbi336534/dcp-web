<template>
    <div class="serve-audited">
        <apply-pop ref="pop"></apply-pop>
        <record ref="record"></record>
        <el-table :data="tableData" :resizable="true" border empty-text="暂无数据" style="width: 100%; height: 100%;" v-loading="tableloading" element-loading-text="拼命加载中">
            <el-table-column prop="ownerUserName" label="数据源拥有者名称">
            </el-table-column>
            <el-table-column prop="operatorName" label="数据资源使用者">
            </el-table-column>
            <el-table-column prop="applyTime" label="申请时间">
                <template scope="scope">
                    {{ formatTime(scope.row.applyTime) }}
                </template>
            </el-table-column>
            <el-table-column prop="exchangeTypeName" label="交换方式">
            </el-table-column>
            <el-table-column prop="serviceTypeName" label="传输方式">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button type="text" size="small" @click="handleApply(scope.$index, scope.row)">
                        <img src="../../assets/img/btn-detail.png" alt="" title="审核详情">
                    </el-button>
                    <el-button type="text" size="small" @click="handleRecord(scope.$index, scope.row)">
                        <img src="../../assets/img/btn-record.png" alt="" title="审核记录">
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- fenye -->
        <el-pagination @current-change="handleCurrentChange" :current-page="pageNum" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="pageTotal">
        </el-pagination>
    </div>
</template>
<script>
import ApplyPop from './apply_pop';
import Record from './record';
import {
    completedApprovedList
} from '@/assets/js/queryData.js';
import {
    getUserId,
    formatTime,
    setSessionStore
} from '@/assets/js/mUtils.js'
export default {
    data() {
            return {
                tableData: [],
                tableloading: true,
                pageNum: 1,
                pageSize: 20,
                pageTotal: 0,
                userId: null
            }
        },
        components: {
            ApplyPop,
            Record
        },
        created() {
            this.userId = getUserId();
        },
        mounted() {
            this.getTableData({
                pageSize: this.pageSize,
                pageNum: this.pageNum
            });
            setSessionStore('defaultActive', '/dcp/serve/audited');
        },
        methods: {
            formatTime(t) {
                return formatTime(t);
            },
            getTableData(obj) {
                obj.assigneeId = this.userId;
                completedApprovedList(obj).then(res => {
                    let {
                        code,
                        data,
                        msg
                    } = res;
                    if (code === 200) {
                        var list = data.list;
                        this.pageTotal = data.total;
                        this.tableData = list;
                    } else if (code === 300) {
                        this.$message({
                            type: 'success',
                            message: msg
                        });
                    } else {
                        this.pageTotal = 0;
                        this.tableData = [];
                        // this.$message.error(msg);
                    }
                    this.tableloading = false;
                });
            },
            handleCurrentChange(val) {
                this.pageNum = val;
                var obj = {
                    pageSize: this.pageSize,
                    pageNum: val
                }
                this.getTableData(obj);
            },
            handleApply(index, row) {
                let {
                    applyId,
                    exchangeType,
                    dataSourceName,
                    taskId,
                    serviceType
                } = row;
                let obj = {
                    applyId,
                    exchangeType,
                    dataSourceName,
                    serviceType,
                    taskId,
                    state: 'detail'
                };
                this.$refs.pop.onOpen(obj);
            },
            handleRecord(index, row) {
                this.$refs.record.handleOpen(row.applyId);
            }
        }
}
</script>
<style lang="scss">
.serve-audited {
    height: calc(100% - 50px);
    .el-table th.is-leaf {
        text-align: left;
    }
    .el-table__body-wrapper {
        height: calc(100% - 40px);
    }
    .el-pagination {
        margin-top: 5px;
        text-align: center;
    }
}
</style>

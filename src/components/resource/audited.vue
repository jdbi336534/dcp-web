<template>
    <div class="resource-audited">
        <resource-details ref="details"></resource-details>
        <el-table :data="tableData.list" style="width: 100%; height: 100%;" border empty-text="暂无数据" v-loading="tableloading" element-loading-text="拼命加载中">
            <el-table-column prop="batchId" label="审批流水号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="dataSourceShortName" label="数据源名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="businessSysName" label="业务系统名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="dataSourceKind" label="数据源种类" :formatter="formateKind" show-overflow-tooltip></el-table-column>
            <el-table-column prop="departmentName" label="所属部门" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip>
                <template scope="scope">
                    {{ formatTime(scope.row.createTime) }}
                </template>
            </el-table-column>
            <el-table-column prop="fullName" label="部署地点" show-overflow-tooltip></el-table-column>
            <el-table-column prop="physicalAdress" label="物理地址" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button type="text" size="small" @click="handleCheckApply(scope.$index, scope.row)">
                        <img src="../../assets/img/btn-detail.png" alt="" title="审核详情">
                    </el-button>
                    <el-button type="text" size="small" @click="handleDetails(scope.$index, scope.row)">
                        <img src="../../assets/img/btn-record.png" alt="" title="审核记录">
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="total,  prev, pager, next, jumper" :page-size="pageSize" :total="tableData.total" @current-change="handleCurrentChange"></el-pagination>
    </div>
</template>
<script>
import {
    getResourcesReviewedData
} from '@/assets/js/queryData';
import {
    formatTime,
    getUserId,
    setSessionStore
} from '@/assets/js/mUtils'
import resourceDetails from './details'
export default {
    data() {
            return {
                tableData: {},
                pageNum: 1,
                pageSize: 20,
                tableloading: true,
                userId: null
            }
        },
        components: {
            resourceDetails
        },
        created() {
            this.userId = getUserId();
        },
        mounted() {
            this.getData({
                pageSize: this.pageSize,
                pageNum: this.pageNum
            });
            setSessionStore('defaultActive', '/dcp/resource/audited');
        },
        methods: {
            formateKind(row) {
                var type = '';
                if (row.dataSourceKind === 'db') {
                    type = '数据类型'
                } else if (row.dataSourceKind === 'file') {
                    type = '文件类型'
                }
                return type;
            },
            formatTime(t) {
                return formatTime(t);
            },
            getData(obj) { // 获取表格数据, 包括分页信息
                getResourcesReviewedData(this.userId, obj.pageNum, obj.pageSize)
                    .then(res => {
                        let {
                            data,
                            code,
                            msg
                        } = res;
                        if (code === 200) {
                            this.$data.tableData = data;
                        } else {
                            this.$message.success(msg);
                        }
                        this.tableloading = false;
                    });
            },
            handleCurrentChange(currentPage) {
                let obj = {
                    pageNum: currentPage,
                    pageSize: this.$data.pageSize
                }
                this.getData(obj);
            },
            handleCheckApply(index, row) {
                if (row.dataSourceKind === 'db') {
                    this.$router.push({
                        path: '/dcp/resource/applycheck/' + row.batchId + '/' + row.taskId + '/' + 0,
                    });
                } else if (row.dataSourceKind === 'file') {
                    this.$router.push({
                        path: '/dcp/resource/applycheckfile/' + row.batchId + '/audited/' + 1,
                    });
                }
            },
            handleDetails(index, row) {
                let {
                    batchId
                } = row;
                this.$refs.details.handleOpen(batchId);
            }
        },
}
</script>
<style lang="scss">
.resource-audited {
    width: 100%;
    height: calc(100% - 50px);
    margin: 0;
    padding: 0;
    .databtn {
        font-size: 13px;
        color: #24CAF3;
        background: #01172F;
        border: 1px solid rgba(7, 113, 147, 0.98);
        box-shadow: inset 0 0 10px 0 rgba(98, 208, 248, 0.42);
        border-radius: 1px;
        width: 70px;
        height: 35px;
        &:hover {
            border-color: #05bde6;
            box-shadow: inset 0 0 10px 0 rgba(98, 208, 248, 0.42);
        }
    }
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

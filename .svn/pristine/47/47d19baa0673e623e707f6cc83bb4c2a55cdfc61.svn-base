<template>
    <div class="resource-review">
        <resource-details ref="details"></resource-details>
        <el-table class="review-table" :data="tableData.list" style="width: 100%; height: 100%;" border empty-text="暂无数据" v-loading="tableloading" element-loading-text="拼命加载中">
            <el-table-column prop="batchId" label="审批流水号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="dataSourceShortName" label="数据源名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="businessSysName" label="业务系统名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="dataSourceKind" label="数据源种类" :formatter="formateKind" show-overflow-tooltip></el-table-column>
            <el-table-column prop="departmentName" label="所属部门" show-overflow-tooltip></el-table-column>
            <el-table-column label="创建时间" show-overflow-tooltip>
                <template scope="scope">
                    {{ formatTime(scope.row.createTime) }}
                </template>
            </el-table-column>
            <el-table-column prop="fullName" label="部署地点" show-overflow-tooltip></el-table-column>
            <el-table-column prop="physicalAdress" label="物理地址" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button type="text" size="small" @click="handleCheckApply(scope.$index, scope.row)">
                        <img src="../../assets/img/btn-apply.png" alt="" title="审核">
                    </el-button>
                    <el-button type="text" size="small" @click="handleRecord(scope.$index, scope.row)">
                        <img src="../../assets/img/btn-record.png" alt="" title="审核详情">
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="total,  prev, pager, next, jumper" :page-size="pageSize" :total="tableData.total" @current-change="handleCurrentChange"></el-pagination>
    </div>
</template>
<script>
import {
    getResourcesReviewData
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
            this.userId = getUserId() || 53;
        },
        mounted() {
            this.getData(this.pageNum, this.pageSize);
            setSessionStore('defaultActive', '/dcp/resource/review');
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
            getData(pageNum, pageSize) { // 获取表格数据, 包括分页信息
                getResourcesReviewData(pageNum, pageSize, this.userId)
                    .then(res => {
                        let {
                            data,
                            code,
                            msg
                        } = res;
                        if (code === 200) {
                            this.$data.tableData = data;
                        } else if (code === 300) {
                            // this.$message({
                            //     type: 'success',
                            //     message: msg
                            // });
                        } else {
                            this.$message.error(msg);
                        }
                        this.tableloading = false;
                    });
            },
            handleCurrentChange(currentPage) {
                this.getData(currentPage, this.pageSize);
            },
            handleCheckApply(index, row) {
                if (row.dataSourceKind === 'db') {
                    this.$router.push({
                        path: '/dcp/resource/applycheck/' + row.batchId + '/' + row.taskId + '/' + 1,
                    });
                } else if (row.dataSourceKind === 'file') {
                    this.$router.push({
                        path: '/dcp/resource/applycheckfile/' + row.batchId + '/' + row.taskId + '/' + 0,
                    });
                }
            },
            handleRecord(index, row) {
                let {
                    batchId
                } = row;
                this.$refs.details.handleOpen(batchId);
            }
        }
};
</script>
<style lang="scss">
.resource-review {
    width: 100%;
    height: calc(100% - 50px);
    margin: 0;
    padding: 0;
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

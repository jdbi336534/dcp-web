<template>
    <div class="resource-details">
        <dcp-dialog title="查看审核记录" ref="dialog" :width="1034" :height="630">
            <template slot="dialog_body">
                <el-table :data="tableData" style="width: 100%; height: 100%;" border empty-text=" " v-loading="tableloading" element-loading-text="拼命加载中">
                    <el-table-column prop="realName" label="经办人">
                    </el-table-column>
                    <el-table-column prop="OPERATION_AUDIT_STATE" label="审核状态">
                    </el-table-column>
                    <el-table-column prop="ADD_DATE" label="审核时间">
                        <template scope="scope">
                            {{ formatTime(scope.row.ADD_DATE) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="OPINION_AUDIT" label="审核意见">
                    </el-table-column>
                </el-table>
            </template>
        </dcp-dialog>
    </div>
</template>
<script>
import {
    getResourcesReviewedRecordData
} from '@/assets/js/queryData';
import {
    formatTime
} from '@/assets/js/mUtils'
import DcpDialog from '@/components/common/DCPDialog'
export default {
    data() {
            return {
                tableData: [],
                tableloading: true
            }
        },
        components: {
            DcpDialog
        },
        methods: {
            formatTime(t) {
                return formatTime(t);
            },
            handleOpen(batchId) {
                this.$refs.dialog.open();
                this.getData(batchId);
            },
            handleClose() {
                this.$data.tableloading = true;
                this.$data.tableData = [];
                this.$refs.dialog.close();
            },
            getData(batchId) {
                getResourcesReviewedRecordData(batchId).then(res => {
                    let {
                        data,
                        code,
                        msg
                    } = res;
                    if (code === 200) {
                        this.tableData = data;
                    } else {
                        this.$message.error(msg);
                    }
                    this.tableloading = false;
                });
            }
        }
}
</script>
<style lang="scss">
.resource-details {
    .el-table th.is-leaf {
        text-align: left;
    }
    .el-table__body-wrapper {
        height: calc(100% - 50px);
    }
    .el-pagination {
        margin-top: 5px;
        text-align: center;
    }
}
</style>

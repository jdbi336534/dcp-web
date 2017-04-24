<template>
    <div class="serve-record">
        <dcp-dialog title="查看审核记录" ref="dialog" :width="1034" :height="630">
            <template slot="dialog_body">
                <el-table :data="tableData" style="width: 100%;" height="450" border empty-text=" " v-loading="tableloading" element-loading-text="拼命加载中">
                    <el-table-column prop="realName" label="经办人">
                    </el-table-column>
                    <el-table-column prop="operationAuditState" label="审核状态">
                    </el-table-column>
                    <el-table-column prop="addDate" label="审核时间">
                        <template scope="scope">
                            {{ formatTime(scope.row.addDate) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="opinionAudit" label="审核意见">
                    </el-table-column>
                </el-table>
            </template>
        </dcp-dialog>
    </div>
</template>
<script>
import {
    approveHistory
} from '@/assets/js/queryData';
import {
    formatTime
} from '@/assets/js/mUtils'
import DcpDialog from '@/components/common/DCPDialog'
export default {
    data() {
            return {
                isShow: false,
                tableloading: true,
                tableData: []
            };
        },
        components: {
            DcpDialog
        },
        methods: {
            formatTime(t) {
                return formatTime(t);
            },
            handleOpen(applyId) {
                this.getData(applyId);
                this.$refs.dialog.open();
            },
            getData(applyId) {
                approveHistory({
                    applyId
                }).then(res => {
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

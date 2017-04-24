<template>
    <div class="region-delete">
        <dcp-dialog ref="region_del" id="region_del" :width="400" :height="200">
            <template slot="dialog_body">
                <div class="msg">确认删除当前信息吗？</div>
            </template>
            <template slot="dialog_footer">
                <el-button type="text" @click="cancel">取消</el-button>
                <el-button type="dcp" @click="confirm">确定</el-button>
            </template>
        </dcp-dialog>
    </div>
</template>
<script>
import DcpDialog from '@/components/common/DCPDialog'
import {
    removeAreaInfo
} from '@/assets/js/queryData'
import {
    getUserId
} from '@/assets/js/mUtils'
export default {
    data() {
            return {
                userId: null,
                deleteId: null
            }
        },
        components: {
            DcpDialog
        },
        created() {
            this.userId = getUserId();
        },
        methods: {
            open(deleteId) {
                this.deleteId = deleteId;
                this.$refs.region_del.open();
            },
            cancel() {
                this.$refs.region_del.close();
            },
            confirm() {
                removeAreaInfo(this.deleteId).then(res => {
                    let {
                        code,
                        msg
                    } = res;
                    if (code === 200) {
                        this.$message({
                            type: 'success',
                            message: msg
                        });
                    } else {
                        this.$message.error(msg);
                    }
                    this.cancel();
                    this.refresh();
                });
            },
            refresh() {
                this.$emit('on-refresh');
            }
        }
}
</script>
<style lang="scss">
.region-delete {
    .msg {
        text-align: center;
        font-size: 18px;
        line-height: 80px;
    }
}
</style>

<template>
    <div class="data-pop">
        <dcp-dialog ref="data_pop" id="data_pop" :width="400" :height="200" title="">
            <template slot="dialog_body">
                <div class="msg">{{message}}</div>
            </template>
            <template slot="dialog_footer">
                <el-button type="text" @click="cancel">取消</el-button>
                <el-button type="dcp" @click="confirm">确定</el-button>
            </template>
        </dcp-dialog>
    </div>
</template>
<script>
import {
    isDataSourceNameExist,
    removeDataSourceInfo,
    submitDataSource,
} from '../../assets/js/queryData';
import {
    getUserId
} from '@/assets/js/mUtils'
import DcpDialog from '@/components/common/DCPDialog'
export default {
    data() {
            return {
                state: 'delete',
                message: '确认删除当前信息吗?',
                row: null,
                userId: null
            }
        },
        components: {
            DcpDialog
        },
        props: {

        },
        created() {
            this.userId = getUserId();
        },
        methods: {
            open(state, row) {
                this.state = state;
                this.row = row;
                this.getContentMsg(state);
                this.$refs.data_pop.open();
            },
            cancel() {
                this.$refs.data_pop.close();
            },
            confirm() {
                let state = this.state;
                if (state === 'delete') {
                    let {
                        dataSourceId,
                        dataSourceKind
                    } = this.row;
                    removeDataSourceInfo({
                        dataSourceId,
                        dataSourceKind
                    }).then(res => {
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
                } else if (state === 'test') {
                    let {
                        dataSourceName
                    } = this.row;
                    isDataSourceNameExist({
                        dataSourceName
                    }).then(res => {
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
                } else if (state === 'apply') {
                    let {
                        dataSourceId
                    } = this.row;
                    submitDataSource({
                        dataSourceId: dataSourceId,
                        userId: this.userId
                    }).then(res => {
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
                }
            },
            getContentMsg(state) {
                if (state === 'delete') {
                    this.message = '确认删除当前信息吗?';
                } else if (state === 'test') {
                    this.message = '确认测试连接吗?';
                } else if (state === 'apply') {
                    this.message = '确认提交审核吗?';
                }
            },
            refresh() {
                this.$emit('on-refresh');
            }
        }
}
</script>
<style lang="scss">
.data-pop {
    .msg {
        text-align: center;
        font-size: 18px;
        line-height: 80px;
    }
}
</style>

<template>
<div>
    <el-button @click="openDialog">click me</el-button>
    <dcp-dialog id="restDialog" ref="restDialog" :title="title" @on-close="closeDialog">
        <div slot="dialog_body" class="exchg-dialog">
            <section class="left-cont">
                <div>
                    <h4 class="title">交换信息</h4>
                    <el-form ref="exchg" :model="exchgForm" label-width="90px">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="采购中心：">
                                    <el-input :disabled="isDisabled"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="资源名称：">
                                    <el-input :disabled="isDisabled"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="交换方式：">
                                    <el-input :disabled="isDisabled"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="传输方式：">
                                    <el-input :disabled="isDisabled"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="审核状态：">
                                    <el-input :disabled="isDisabled"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="服务状态：">
                                    <el-input :disabled="isDisabled"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item label="交换方式：">
                            <el-input type="textarea" :disabled="isDisabled"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div>
                    <h4 class="title">接口参数说明</h4>
                    <el-table height="180">
                        <el-table-column label="参数" width="120px" header-align="center"></el-table-column>
                        <el-table-column label="必须" width="120px" header-align="center"></el-table-column>
                        <el-table-column label="说明" header-align="center"></el-table-column>
                    </el-table>
                </div>
            </section>
            <section class="right-table">
                <h4 class="title">交换资源信息</h4>
                <el-table height="414">
                    <el-table-column label="字段名称"></el-table-column>
                    <el-table-column label="数据类型"></el-table-column>
                    <el-table-column label="数据长度"></el-table-column>
                    <el-table-column label="是否非空"></el-table-column>
                    <el-table-column label="业务计算"></el-table-column>
                    <el-table-column label="IT计算规则"></el-table-column>
                </el-table>
            </section>
        </div>
    </dcp-dialog>
</div>
</template>
<script>
import DcpDialog from '../common/DCPDialog';
export default {
    components: {
        DcpDialog
    },
    data() {
        return {
            title: '服务详情',
            isDisabled: true,
            exchgForm: {},
        }
    },
    methods: {
        openDialog() {
            this.$refs.restDialog.open();
        },
        /**
         * 关闭对话框的回调，用于处理关闭时的操作
         */
        closeDialog() {

        }
    }
}
</script>
<style lang="scss">
.exchg-dialog {
    padding: 10px 20px 0;

    &:after {
        content: '';
        display: table;
        clear: both;
    }

    .title {
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        text-align: center;
        margin: 0 0 10px;
    }

    .left-cont, .right-table {
        float: left;
        box-shadow: inset 0 0 38px rgba(53, 215, 255, 0.3);
        padding: 10px;
        box-sizing: border-box;
    }

    .left-cont {
        width: 45%;
        margin-right: 10px;
    }

    .right-table {
        width: calc(55% - 10px);
    }

    /**表单元素样式重置 */
    .el-input.is-disabled .el-input__inner,
    .el-textarea.is-disabled .el-textarea__inner {
        background-color: transparent;
        border: none;
        border-bottom: 1px solid #075174;
    }

    .el-form-item {
        margin-bottom: 5px;
    }
}
</style>

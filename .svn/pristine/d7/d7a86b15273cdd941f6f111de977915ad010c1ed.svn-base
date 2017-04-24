<template>
    <div class="tag-operation">
        <dcp-dialog ref="operation" id="operation" :title="title" :width="900" :height="400" @on-close="cancel">
            <template slot="dialog_body">
                <el-form label-width="100px" label-position="right" :model="ruleForm" :rules="rules" ref="tagForm" class="tag-form">
                    <el-row :gutter="20" style="margin: 0; padding: 80px 20px 0">
                        <el-col :span="12" v-if="type === 'detail'">
                            <el-form-item label="标签ID" prop="id">
                                <el-input class="form-input" v-model="ruleForm.id" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="标签名称" prop="tagName">
                                <el-input class="form-input" v-model="ruleForm.tagName" :disabled="type === 'detail'"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="标签编码" prop="tagCode">
                                <el-input class="form-input" v-model="ruleForm.tagCode" :disabled="type === 'detail'"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="标签描述" prop="tagDescription">
                                <el-input class="form-input" v-model="ruleForm.tagDescription" :disabled="type === 'detail'"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </template>
            <template slot="dialog_footer">
                <el-button type="text" @click="cancel">{{ type === 'detail' ? '关闭' : '取消' }}</el-button>
                <el-button type="dcp" @click="confirm" v-if="type !== 'detail'">确定</el-button>
            </template>
        </dcp-dialog>
    </div>
</template>
<script>
import DcpDialog from '@/components/common/DCPDialog'
import {
    saveTagInfo,
    updateTagInfo
} from '@/assets/js/queryData'
// import { // formatTime // } from '@/assets/js/mUtils'
import {
    getUserId
} from '@/assets/js/mUtils'
export default {
    data() {
            var validateNum = (rule, value, callback) => {
                if (isNaN(value)) {
                    callback(new Error('请输入数字'));
                } else {
                    callback();
                }
            };
            return {
                type: 'create', // create, edit, detail
                userId: null,
                ruleForm: {
                    tagName: '',
                    tagCode: '',
                    tagDescription: '',
                    id: '',
                    addDate: ''
                },
                rules: {
                    tagName: [{
                        required: true,
                        message: '请输入标签名',
                        trigger: 'blur'
                    }],
                    tagCode: [{
                        required: true,
                        message: '请输入标签编码',
                        trigger: 'blur',
                    }, {
                        validator: validateNum,
                        trigger: 'blur, change'
                    }],
                    tagDescription: [{
                        required: true,
                        message: '请选输入标签描述',
                        trigger: 'blur'
                    }],
                },

            }
        },
        props: {
            title: {
                type: String,
                default: ''
            }
        },
        components: {
            DcpDialog
        },
        created() {
            this.userId = getUserId();
        },
        methods: {
            open(type, data) {
                this.type = type;
                if (!$.isEmptyObject(data)) {
                    let {
                        id,
                        addDate,
                        tagName,
                        tagCode,
                        tagDescription
                    } = data;
                    this.ruleForm = {
                        id,
                        addDate,
                        tagName,
                        tagCode,
                        tagDescription
                    };
                } else {
                    this.ruleForm = {
                        tagName: '',
                        tagCode: '',
                        tagDescription: '',
                        id: '',
                        addDate: ''
                    };
                }
                this.$refs.operation.open();
            },
            cancel() {
                this.$refs.tagForm.resetFields();
                this.$refs.operation.close();
            },
            confirm() {
                let bool = this.$refs.tagForm.validate();
                this.$refs.tagForm.validate((valid) => {
                    bool = valid;
                });
                if (!bool) {
                    return;
                }
                let obj = Object.assign({}, this.ruleForm);
                obj.tagCode = parseInt(obj.tagCode, 10);
                obj.userId = this.userId;
                let method = null;
                if (this.type === 'create') {
                    method = saveTagInfo;
                } else if (this.type === 'edit') {
                    method = updateTagInfo;
                }
                method(obj).then(res => {
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
.tag-operation {
    .tag-form {
        .el-form-item__label {
            color: #24caf3;
        }
        .el-input__inner {
            border-radius: 0;
        }
        .el-input.is-disabled .el-input__inner {
            color: #24caf3;
            background: transparent;
            border-color: #075174;
        }
    }
}
</style>

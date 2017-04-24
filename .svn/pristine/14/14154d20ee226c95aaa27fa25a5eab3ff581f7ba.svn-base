<template>
    <div class="region-operation">
        <dcp-dialog ref="operation" id="operation" :title="title" :width="900" :height="400" @on-close="cancel">
            <template slot="dialog_body">
                <el-form label-width="100px" label-position="right" :model="ruleForm" :rules="rules" ref="regionForm" class="region-form">
                    <el-row :gutter="48" style="margin: 0; padding: 80px 20px 0">
                        <el-col :span="12">
                            <el-form-item label="区域编号" prop="pIndex">
                                <el-input class="form-input" v-model="ruleForm.pIndex" :disabled="type !== 'create'"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="区域名称" prop="pName">
                                <el-input ref="pName" class="form-input" v-model="ruleForm.pName" :disabled="type === 'detail'" @change="handlePNameChange"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="所属上级" prop="parRegion">
                                <el-cascader ref="parRegion" class="form-input" expand-trigger="click" filterable change-on-select clearable :options="allRegion" v-model="parRegion" placeholder="" style="width: 100%;" @change="handleParChange" :disabled="type === 'detail'"></el-cascader>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="全名" prop="fullName">
                                <el-input class="form-input" v-model="fullName" disabled></el-input>
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
    listAreaDictionaryInfo,
    saveAreaInfo,
    modifyAreaInfo
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
                allRegion: [],
                ruleForm: {
                    pIndex: '',
                    pName: '',
                    parIndex: '',
                    fullName: '',
                },
                fullName: '',
                parRegion: [],
                rules: {
                    pIndex: [{
                        required: true,
                        message: '请输入区域编码',
                        trigger: 'blur'
                    }, {
                        validator: validateNum,
                        trigger: 'blur, change'
                    }],
                    pName: [{
                        required: true,
                        message: '请输入区域名称',
                        trigger: 'blur',
                    }]
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
        mounted() {
            listAreaDictionaryInfo().then(res => {
                let {
                    code,
                    data,
                    msg
                } = res;
                if (code === 200) {
                    this.allRegion = data
                } else {
                    this.allRegion = [];
                    this.$message.error(msg);
                }
            });
        },
        watch: {

        },
        methods: {
            initParIndex(id) {
                if (id !== null || id !== '') {
                    this.parRegion[0] = parseInt(id / 10000) * 10000;
                    this.parRegion[1] = parseInt(id / 100) * 100;
                    this.parRegion[2] = id;
                }
            },
            getFullName() {
                let parRegionLaebel = $(this.$refs.parRegion)[0].currentLabels.join('/');
                let pNameVal = $(this.$refs.pName)[0].currentValue ? $(this.$refs.pName)[0].currentValue : '';
                this.fullName = parRegionLaebel + '/' + pNameVal;
                this.ruleForm.fullName = parRegionLaebel + '/' + pNameVal;
            },
            handlePNameChange() {
                this.getFullName();
            },
            handleParChange(select) {
                this.getFullName();
                this.ruleForm.parIndex = select[select.length - 1];
            },
            open(type, data) {
                this.type = type;
                if (!$.isEmptyObject(data)) {
                    let {
                        parIndex,
                        pIndex,
                        pName,
                        fullName
                    } = data;
                    this.ruleForm = {
                        pIndex: '' + pIndex,
                        pName,
                        fullName,
                        parIndex
                    };
                    this.fullName = fullName;
                    this.initParIndex(parIndex);
                } else {
                    this.ruleForm = {
                        pIndex: '',
                        pName: '',
                        fullName: '',
                        parIndex: ''
                    };
                    this.fullName = '';
                    this.initParIndex('');
                }
                this.$refs.operation.open();
            },
            cancel() {
                this.fullName = '';
                this.$refs.regionForm.resetFields();
                this.$refs.operation.close();
            },
            confirm() {
                let bool = this.$refs.regionForm.validate();
                this.$refs.regionForm.validate((valid) => {
                    bool = valid;
                });
                if (!bool) {
                    return;
                }
                let obj = Object.assign({}, this.ruleForm);
                obj.userId = this.userId;
                let method = null;
                if (this.type === 'create') {
                    method = saveAreaInfo;
                } else if (this.type === 'edit') {
                    method = modifyAreaInfo;
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
.region-operation {
    .region-form {
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
    .el-cascader {
        background: transparent;
    }
    .el-cascader.is-disabled .el-cascader__label {
        z-index: 2;
        color: #24caf3;
    }
}
</style>

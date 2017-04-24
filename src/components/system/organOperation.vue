<template>
    <div class="organ-operation">
        <dcp-dialog ref="organ_opera" id="organ_opera" :title="title" :width="900" :height="400" @on-close="cancel">
            <template slot="dialog_body">
                <el-form label-width="100px" label-position="right" :model="ruleForm" :rules="rules" ref="organForm" class="organ-form">
                    <el-row :gutter="20" style="margin: 0; padding: 80px 20px 0">
                        <el-col :span="12">
                            <el-form-item label="机构编码" prop="organizationCode">
                                <el-input class="form-input" v-model="ruleForm.organizationCode" :disabled="type === 'detail'"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="机构名称" prop="organizationName">
                                <el-input class="form-input" v-model="ruleForm.organizationName" ref="organName" @change="handleOrganNameChange" :disabled="type === 'detail'"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="上级机构" prop="superiorOrganizationId">
                                <el-select v-model="ruleForm.superiorOrganizationId" ref="parOrgan" placeholder="请选择" @change="handleParOrganChange" style="width: 100%;">
                                    <el-option v-for="item in optionsOrg" :label="item.orgName" :value="item.id" :key="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="详细地址" prop="detailedAddressId">
                                <el-cascader ref="parRegion" class="form-input" expand-trigger="click" filterable change-on-select clearable :options="allRegion" v-model="addressIds" placeholder="" style="width: 100%;" @change="handlePathChange" :disabled="type === 'detail'"></el-cascader>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="机构路径" prop="path">
                                <el-input class="form-input" v-model="ruleForm.path" disabled></el-input>
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
    saveOrganizationInfo,
    modifyOrganizationInfo,
    listOrganizationInfo,
    listAreaDictionaryInfo
} from '@/assets/js/queryData'
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
                    organizationCode: '',
                    organizationName: '',
                    superiorOrganizationId: '',
                    detailedAddressId: '',
                    path: '',
                    id: '',
                    addDate: ''
                },
                optionsOrg: [],
                allRegion: [],
                addressIds: [],
                rules: {
                    organizationName: [{
                        required: true,
                        message: '请输入机构编码',
                        trigger: 'blur'
                    }],
                    organizationCode: [{
                        required: true,
                        message: '请输入机构名称',
                        trigger: 'blur',
                    }, {
                        validator: validateNum,
                        trigger: 'blur, change'
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
            listOrganizationInfo().then(res => {
                let {
                    code,
                    data
                } = res;
                if (code === 200) {
                    this.optionsOrg = data;
                } else {
                    this.optionsOrg = [];
                }
            });
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
        methods: {
            initParIndex(id) {
                if (id !== null || id !== '') {
                    this.addressIds[0] = parseInt(id / 10000) * 10000;
                    this.addressIds[1] = parseInt(id / 100) * 100;
                    this.addressIds[2] = id;
                }
                console.log(this.addressIds);
            },
            getPath() {
                let parOrganLabel = $(this.$refs.parOrgan)[0].selectedLabel || '';
                let organNameVal = $(this.$refs.organName)[0].currentValue || '';
                this.ruleForm.path = parOrganLabel + '/' + organNameVal;
            },
            handleOrganNameChange() {
                this.getPath();
            },
            handleParOrganChange() {
                this.getPath();
            },
            handlePathChange(select) {
                this.ruleForm.detailedAddressId = select[select.length - 1];
            },
            open(type, data) {
                this.type = type;
                if (!$.isEmptyObject(data)) {
                    let {
                        organizationCode,
                        organizationName,
                        superiorOrganizationId,
                        detailedAddressId,
                        path,
                        id,
                        addDate
                    } = data;
                    this.ruleForm = {
                        organizationCode,
                        organizationName,
                        superiorOrganizationId,
                        detailedAddressId,
                        path,
                        id,
                        addDate
                    };
                    this.initParIndex(detailedAddressId);
                } else {
                    this.ruleForm = {
                        organizationCode: '',
                        organizationName: '',
                        superiorOrganizationId: '',
                        detailedAddressId: '',
                        path: '',
                        id: '',
                        addDate: ''
                    };
                }
                this.$refs.organ_opera.open();
            },
            cancel() {
                this.$refs.organForm.resetFields();
                this.$refs.organ_opera.close();
            },
            confirm() {
                console.log(this.ruleForm);
                let bool = this.$refs.organForm.validate();
                this.$refs.organForm.validate((valid) => {
                    bool = valid;
                });
                if (!bool) {
                    return;
                }
                let obj = Object.assign({}, this.ruleForm);
                obj.userId = this.userId;
                let method = null;
                if (this.type === 'create') {
                    method = saveOrganizationInfo;
                } else if (this.type === 'edit') {
                    method = modifyOrganizationInfo;
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
.organ-operation {
    .organ-form {
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
        .el-cascader {
            background: transparent;
        }
        .el-cascader.is-disabled .el-cascader__label {
            z-index: 2;
            color: #24caf3;
        }
    }
}
</style>

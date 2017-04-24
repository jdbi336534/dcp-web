<template>
    <div class="newBoxz">
        <dcp-dialog id="add_user_modal" ref="addDialog" :title="title" :width="900" :height="500" @on-close="closeAddDialog">
            <div slot="dialog_body" class="form-inner">
                <el-form :model="form" :rules="rules" ref="ctyform" class="user-form">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="用户名" :label-width="formLabelWidth" prop="userName">
                                <el-input size="small" v-model="form.userName" auto-complete="off" :disabled="type!='add'?true:false"></el-input>
                            </el-form-item>
                            <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="realName">
                                <el-input size="small" v-model="form.realName" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱地址" :label-width="formLabelWidth" prop="email">
                                <el-input size="small" v-model="form.email" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="所属部门" :label-width="formLabelWidth" prop="departmentId">
                                <el-select v-model="form.departmentId" filterable placeholder="" size="small" style="width: 100%;">
                                    <el-option :key="i" v-for="(item, i) in optionsssbm" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="备注" :label-width="formLabelWidth">
                                <el-input size="small" type="textarea" v-model="form.describeText" auto-complete="off" class="textarea"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                                <el-input size="small" type="password" v-model="form.password" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="电话号码" :label-width="formLabelWidth" prop="phoneNumber">
                                <el-input size="small" v-model="form.phoneNumber" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="所属机构" :label-width="formLabelWidth" prop="organizationId">
                                <el-select v-model="form.organizationId" filterable placeholder="" size="small" @change="changessjg" style="width: 100%;">
                                    <el-option :key="i" v-for="(item, i) in optionsorgs" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="角色" :label-width="formLabelWidth" prop="roleId">
                                <el-select v-model="form.roleId" filterable placeholder="" size="small" style="width: 100%;">
                                    <el-option :key="i" v-for="(item, i) in rolesdataList" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div slot="dialog_footer">
                <el-button type="text" @click="closeDialog">取消</el-button>
                <el-button type="dcp" class="databtn" :loading="btnloading" @click="okbtn('ctyform')">确定</el-button>
            </div>
        </dcp-dialog>
    </div>
</template>
<script>
import ModalBox from '../common/ModalBox';
import DcpDialog from '../common/DCPDialog';
import {
    saveneewuser
} from '../../assets/js/queryData';

export default {
    components: {
        ModalBox,
        DcpDialog
    },
    data() {
        var validateuserName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户名'));
            } else {
                let temp = value.replace(/(^\s*)|(\s*$)/g, '');
                if (temp.length < 6) {
                    callback(new Error('用户名长度必须大于六位!'));
                } else if (/^[\u4E00-\u9FA5A-Za-z0-9]+$/.test(value) !== true) {
                    callback(new Error('请输入正确的用户名!'));
                } else {
                    callback();
                }
            }
        };

        var validatepassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                let temp = value.replace(/(^\s*)|(\s*$)/g, '');
                if (temp.length < 6) {
                    callback(new Error('密码长度必须大于六位!'));
                } else if (temp.length > 18) {
                    callback(new Error('密码长度小于18个字符!'));
                } else {
                    callback();
                }
            }
        };

        var validatephoneNumber = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入电话号码'));
            } else {
                let temp = value.replace(/(^\s*)|(\s*$)/g, '');
                if (temp.length === 0) {
                    callback(new Error('请输入正确的电话号码!'));
                } else if (/^\d{7,}$/.test(value) !== true) {
                    callback(new Error('请输入正确的电话号码!'));
                } else {
                    callback();
                }
            }
        };

        var validaterealNamer = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                let temp = value.replace(/(^\s*)|(\s*$)/g, '');
                if (temp.length === 0) {
                    callback(new Error('请输入正确的密码!'));
                } else {
                    callback();
                }
            }
        };

        var validatedescribeText = (rule, value, callback) => {
            if (value !== '') {
                let temp = value.replace(/(^\s*)|(\s*$)/g, '');
                if (temp.length > 500) {
                    callback(new Error('输入的备注字数太多!'));
                } else {
                    callback();
                }
            }
        };

        return {
            formLabelWidth: '120px',
            form: {
                userName: '',
                password: '',
                phoneNumber: '',
                email: '',
                organizationId: '',         // 所属机构id
                departmentId: '',           // 所属部门id
                realName: '',
                roelId: '',
                describeText: ''
            },
            type: 'add',
            rules: {
                userName: [{
                    required: true,
                    validator: validateuserName,
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    validator: validatepassword,
                    trigger: 'blur'
                }],
                phoneNumber: [{
                    required: true,
                    validator: validatephoneNumber,
                    message: '请填写电话号码',
                    trigger: 'blur'
                }],
                email: [{
                    required: true,
                    type: 'email',
                    message: '请填写邮箱',
                    trigger: 'blur'
                }],
                realName: [{
                    required: true,
                    validator: validaterealNamer,
                    message: '请填写真实姓名',
                    trigger: 'blur'
                }],
                organizationId: [{
                    required: true,
                    message: '请选择所属部门',
                    trigger: 'change'
                }],
                roleId: [{
                    required: true,
                    message: '请选择角色',
                    trigger: 'change'
                }],
                describeText: [{
                    validator: validatedescribeText
                }]
            },
            optionsssbm: [],            // 所属部门
            optionsorgs: [],            // 所属机构
            title: '新增用户信息',

            flagsf: 1,
            modalvisible: false,
            allOrg: [],
            allDep: [],
            allRole: [],
            btnloading: false,
            rolesdataList: []
        }
    },
    mounted() {
        // 组件初始化时请求数据
        // 获取可选角色列表信息
        this.csh();
        // 获取可选所属机构列表信息
        this.getAllList();
    },
    methods: {
        changessjg(val) {
            // 根据所选机构去请求部门数据
            var that = this;

            // 关闭模态框后，调用了form的reset方法，导致了select的chane方法再次调用，此时val为空
            if (!this.modalvisible) {
                return;
            }

            $.ajax({
                url: this.$store.state.common.ip + '/department/v1.0/listDepartmentInfo/' + val,
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                success: function(data) {
                    if (data.code === 200) {
                        var ssbmList = data.data;

                        if (ssbmList.length > 0) {
                            for (let i = 0; i < ssbmList.length; i++) {
                                ssbmList[i].value = ssbmList[i].id + '';
                                ssbmList[i].label = ssbmList[i].depName;
                            }

                            that.optionsssbm = ssbmList;
                        } else {
                            that.optionsssbm = [];
                            that.form.departmentId = '';
                        }
                    } else {
                        this.$message.error(data.msg);
                    }
                }
            });
        },
        csh() {
            var that = this;
            // 请求下拉框数据
            $.ajax({
                url: this.$store.state.common.ip + '/user/v1.0/initUserInfo',
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                success: function(data) {
                    if (data.code === 200) {
                        var zcdataList = data.data.orgs;

                        for (let i = 0; i < zcdataList.length; i++) {
                            zcdataList[i].value = zcdataList[i].id + '';
                            zcdataList[i].label = zcdataList[i].orgName;
                        }

                        that.optionsorgs = zcdataList;
                        that.value1 = zcdataList[0].value;

                        var rolesdataListzc = data.data.roles;
                        for (let i = 0; i < rolesdataListzc.length; i++) {
                            rolesdataListzc[i].value = rolesdataListzc[i].id + '';
                            rolesdataListzc[i].label = rolesdataListzc[i].cName;
                        }

                        that.rolesdataList = rolesdataListzc;
                        that.value2 = rolesdataListzc[0].value;
                    }
                }
            });
        },
        open() {
            // 打开模态框
            this.modalvisible = true;
            this.$refs.addDialog.open();
        },
        closeAddDialog() {
            // 关闭模态框，表单重置
            this.$refs.ctyform.resetFields();
        },
        closeDialog() {
            // 取消时关闭模态框
            this.modalvisible = false;
            this.$refs.addDialog.close();
        },
        okbtn(formName) {
            var that = this;
            var bool = false;

            this.$refs.ctyform.validate(valid => {
                if (valid) {
                    this.btnloading = true;
                    bool = true;
                } else {
                    bool = false;
                }
            });

            if (!bool) {
                return;
            }

            if (this.type === 'add') {
                // 新增，提交数据
                saveneewuser(this.form)
                    .then(res => {
                        this.btnloading = false;
                        this.modalvisible = false;
                        if (res.code === 200) {
                            this.$refs.ctyform.resetFields();
                            this.flagsf = 2;
                            this.$message({
                                message: '数据新增成功',
                                type: 'success',
                                duration: 1500
                            });
                        } else {
                            this.flagsf = 3;
                        }
                        this.$refs.addDialog.close();
                        this.$emit('repage', this.flagsf);
                    });
            } else {
                // 编辑，提交数据
                $.ajax({
                        url: this.$store.state.common.ip + '/user/v1.0/modifyUserInfo',
                        type: 'POST',
                        dataType: 'json',
                        data: JSON.stringify(this.form),
                        contentType: 'application/json',
                        success: function(data) {
                            if (data.code === 200) {
                                that.$refs[formName].resetFields();
                                that.$message({
                                    message: '数据修改成功',
                                    type: 'success',
                                    duration: 1500
                                });

                                that.flagsf = 2;
                                that.$emit('repage', that.flagsf);
                            }
                        }
                    })
                    .always(() => {
                        this.modalvisible = false;
                        this.btnloading = false;
                        this.$refs.addDialog.close();
                    });
            }
        },
        getAllList() {
            var that = this;

            $.ajax({
                url: this.$store.state.common.ip + '/areadictionary/v1.0/listAreaDictionaryInfo',
                type: 'GET',
                dataType: 'json',
                success: function(data) {
                    if (data.code === 200) {
                        that.allRegion = data.data;
                    }
                }
            })
        }
    }
}
</script>
<style lang="scss">
.form-inner {
    padding: 40px;
}

.newBoxz {
    .user-form {
        .el-form-item__label {
            color: #24caf3;
        }
        .el-input__inner {
            border-radius: 0;
        }
        .el-input.is-disabled .el-input__inner {
            color: #24caf3;
        }
        .textarea {
            .el-textarea__inner {
                background: transparent;
            }
        }
    }
}
</style>

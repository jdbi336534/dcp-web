<template>
    <div class="dept-management">
        <dcp-dialog id="add_dialog" ref="addDialog" :width="900" :height="420" :title="title" @on-close="closeDialog">
            <div slot="dialog_body" style="padding:40px;">
                <el-form :model="form" :rules="rules" ref="deptForm" class="dep-form" :label-width="labelWidth">
                    <el-row :gutter="20">
                        <el-col :span="12" v-show="this.state === 'view'">
                            <el-form-item label="ID" prop="id">
                                <el-input class="form-input" v-model="form.id" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="部门编码" prop="departmentCode">
                                <el-input class="form-input" v-model="form.departmentCode" :disabled="this.state === 'view'"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="部门名称" prop="departmentName">
                                <el-input class="form-input" v-model="form.departmentName" @change="onChange" :disabled="this.state === 'view'"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="所属机构">
                                <el-select v-model="form.theOrganizationId" placeholder="请选择" class="form-select" @change="organChange" :disabled="this.state === 'view'">
                                    <el-option v-for="(item, i) in orgList" :key="i" :label="item.orgName" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="上级部门名称">
                                <el-select v-model="form.superiorDepartment" placeholder="请选择" class="form-select" :disabled="this.state === 'view'" @change="departmentChange">
                                    <el-option v-for="(item, i) in departmentList" :key="i" :label="item.depName" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="详细地址">
                                <el-cascader ref="parRegion" class="form-input" expand-trigger="click" filterable change-on-select clearable :options="allRegion" v-model="form.detailedAddressId" placeholder="" style="width: 100%;"></el-cascader>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="部门全路径">
                                <el-input class="form-input" v-model="form.path" :disabled="this.state === 'view'"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" v-if="this.state === 'view'">
                            <el-form-item label="创建时间">
                                <el-input class="form-input" v-model="form.addDate" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div slot="dialog_footer">
                <el-button type="text" v-if="this.state === 'view'" @click="closeDialog('deptForm')">关 闭</el-button>
                <el-button type="text" v-if="this.state !== 'view'" @click="closeDialog('deptForm')">取 消</el-button>
                <el-button type="dcp" v-if="this.state !== 'view'" @click="okbtn">确 定</el-button>
            </div>
        </dcp-dialog>
    </div>
</template>
<script>
import DcpDialog from '../common/DCPDialog';

import {
    formatTime
} from '../../assets/js/mUtils';
import {
    listOrganizationInfo,
    listDepartmentInfo,
    saveDepartmentInfo,
    modifyDepartmentInfo,
    listAreaDictionaryInfo
} from '../../assets/js/queryData';

export default {
    components: {
        DcpDialog
    },
    data() {
        return {
            title: '新增部门信息',
            departmentList: [], // 上级部门列表信息
            orgList: [], // 机构列表信息
            isOrg: true,
            organ: '', // 机构名
            lastDep: '', // 上级部门名
            allRegion: [], // 详细地址
            state: 'add',
            form: {
                departmentCode: '', // 部门编码
                departmentName: '', // 部门名
                theOrganizationId: '', // 机构id
                superiorDepartment: '', // 上级部门id
                detailedAddressId: [], // 详细地址id
                path: '',
                addDate: '',
                id: ''
            },
            rules: {
                departmentCode: [{
                    required: true,
                    message: '请输入部门编码',
                    trigger: 'blur'
                }],
                departmentName: [{
                    required: true,
                    message: '请输入部门名称',
                    trigger: 'blur'
                }]
            },
            mode: '',
            labelWidth: '120px'
        }
    },
    mounted() {
        // 组件挂载时，请求所属机构信息
        this.getOrganData();
        // 获取详细地址信息列表
        this.getAreaData();
    },
    methods: {
        getOrganData() {
            // 获取所属机构数据
            listOrganizationInfo()
                .then(res => {
                    let {
                        code,
                        data
                    } = res;

                    if (code === 200) {
                        if (!data.length) {
                            this.orgList = [];
                            return;
                        }

                        this.orgList = data.map(item => {
                            item.id += '';
                            return item;
                        });
                    }
                });
        },
        getAreaData() {
            // 获取地址信息
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
        open(title = null, type = 'add', row) {
            // 打开模态框，type = [增加 | 查看 | 编辑];
            this.state = type;
            this.title = title;
            this.$refs.addDialog.open();
            this.mode = type;

            if (type === 'add') {
                return;
            }

            // 编辑和查看
            let {
                departmentCode,
                departmentName,
                theOrganizationId,
                superiorDepartment,
                detailedAddressId,
                path,
                addDate,
                id
            } = row;

            this.lastDep = row.superiorDepartmentName;

            this.form = {
                departmentCode,
                departmentName,
                theOrganizationId: '',
                superiorDepartment: '',
                detailedAddressId: [],
                path,
                addDate: formatTime(addDate),
                id
            };

            var addrType = typeof detailedAddressId;
            if (addrType !== 'Array') {
                if (addrType === 'Number') {
                    this.form.detailedAddressId.push(detailedAddressId);
                }
            } else {
                this.form.detailedAddressId = detailedAddressId;
            }

            // 延迟加载，为了等组件挂载到dom后再出发select的change事件
            setTimeout(() => {
                this.form.theOrganizationId = theOrganizationId + '';
                this.form.superiorDepartment = superiorDepartment + '';
            }, 0);
        },
        onChange() {
            // 部门名称改变，更改路径
            var paths = [this.organ, this.lastDep, this.form.departmentName];
            this.form.path = this.getFullPath(paths);
        },
        getFullPath(paths) {
            // 获取全路径
            var leftPaths = paths.concat([]);
            var len = paths.length;
            var path = leftPaths.shift();

            if (len === 1) {
                if (!path) {
                    return '';
                }

                return `/${path}`;
            }

            if (!path) {
                return `${this.getFullPath(leftPaths)}`;
            }

            return `/${path}${this.getFullPath(leftPaths)}`;
        },
        organChange(select) {
            // 新增部门信息，所属机构改变
            // 赋值organ所属机构名
            this.orgList.forEach(item => {
                if (parseInt(item.id, 10) === parseInt(select, 10)) {
                    this.organ = item.orgName;
                }
            });

            // 更新全路径
            this.form.path = this.getFullPath([this.organ, this.lastDep, this.form.departmentName]);

            // 获取上级部门列表数据
            this.getDepartmentData(select);
        },
        getDepartmentData(select) {
            // 根据所属机构id(select)，获取上级部门信息

            if (!select) {
                return;
            }
            listDepartmentInfo(select)
                .then(res => {
                    let {
                        code,
                        data
                    } = res;
                    let mode = this.mode;
                    if (mode === 'add') {
                        this.lastDep = '';
                        this.form.superiorDepartment = '';
                    }
                    // 成功返回
                    if (code === 200) {
                        // todo: isOrg?
                        this.isOrg = false;
                        // 机构没有所属上级部门，则清空上级部门信息
                        if (!data.length) {
                            this.departmentList = [];
                            if (mode !== 'add') {
                                this.lastDep = '';
                                this.form.superiorDepartment = '';
                            }
                            return;
                        }

                        // 将id类型由Number变为String, el-select组件的value类型为String
                        this.departmentList = data.map(item => {
                            item.id += '';
                            return item;
                        });
                    } else {
                        // 返回失败
                        this.isOrg = true;
                        this.departmentList = [];
                        this.$message.error('保存失败！');
                    }
                });
        },
        departmentChange(select) {
            // 新增部门操作，上级部门名称改变
            this.departmentList.forEach(item => {
                if (item.id + '' === select) {
                    this.lastDep = item.depName;
                }
            });
            // 更新全路径
            this.form.path = this.getFullPath([this.organ, this.lastDep, this.form.departmentName]);
        },
        okbtn() {
            // 新增、编辑部门信息，确定操作
            var bool = false;
            // 表单验证
            this.$refs.deptForm.validate(valid => {
                bool = valid;
            });

            if (!bool) {
                return;
            }

            var obj = {};

            let {
                departmentCode,
                departmentName,
                theOrganizationId,
                superiorDepartment,
                detailedAddressId,
                path,
            } = this.form;

            obj.departmentCode = departmentCode;
            obj.departmentName = departmentName;
            obj.theOrganizationId = theOrganizationId;
            obj.superiorDepartmentId = superiorDepartment;
            obj.detailedAddressId = detailedAddressId;
            obj.path = path;
            // 新增操作
            if (this.state === 'add') {
                // 保存新增部门信息
                saveDepartmentInfo(obj)
                    .then(res => {
                        let {
                            code,
                            msg
                        } = res;

                        if (code === 200) {
                            this.$message({
                                message: msg,
                                type: 'success'
                            });

                            // 关闭模态框，触发父组件关闭时间，在父组件关闭时间内更新表格数据
                            this.$emit('on-close');
                            this.$refs.addDialog.close();
                        } else {
                            // 返回异常，提示错误信息
                            this.$message.error(res.message);
                        }
                    });
            } else if (this.state === 'edit') {
                // 编辑操作
                obj.id = this.form.id;

                modifyDepartmentInfo(obj)
                    .then(res => {
                        let {
                            code,
                            msg
                        } = res;

                        if (code === 200) {
                            this.$message({
                                message: msg,
                                type: 'success'
                            });

                            // 触发父组件关闭模态框事件，更新编辑后表格数据
                            this.$emit('on-close');
                            this.$refs.addDialog.close();
                        } else {
                            this.$message.error(msg);
                        }
                    });
            }
        },
        closeDialog(formName) {
            // 关闭模态框，部门信息清空
            this.$refs.addDialog.close();
            this.lastDep = '';
            this.organ = '';

            this.form.departmentCode = ''; // 部门编码
            this.form.departmentName = ''; // 部门名
            this.form.theOrganizationId = ''; // 机构id
            this.form.superiorDepartment = ''; // 上级部门id
            this.form.detailedAddressId = []; // 详细地址id          
            this.form.addDate = '';
            this.form.id = '';

            // 清除错误提示信息
            this.$refs.deptForm.resetFields();
            this.form.path = '';
        }
    }
}
</script>
<style lang="scss">
.dept-management {
    .el-select {
        width: 100%;
    }
    .dep-form {
        .el-form-item__label {
            color: #24caf3;
        }
        .el-cascader {
            background: transparent;
        }
        .el-input.is-disabled .el-input__inner {
            color: #24caf3;
            background: none;
        }
    }
}
</style>

<template>
    <div class="user-wrap system-wrap">
        <import-export>
            <div slot="btn_group">
                <button @click="handleUserAddDialog">增加<img class="a" src="../../assets/img/system/import/add.png" alt=""></button>
                <button @click="openImport">导入<img src="../../assets/img/system/import/import.png" alt=""></button>
            </div>
        </import-export>
        <div class="user-outer data-table-outer">
            <div class="data-table-wrapper">
                <div class="data-table-inner">
                    <el-table :data="resourceList" :resizable="true" height="100%" style="width:100%;height:100%" border empty-text="暂无数据" v-loading="tableloading" element-loading-text="拼命加载中">
                        <el-table-column label="用户名" prop="userName" show-overflow-tooltip></el-table-column>
                        <el-table-column label="真实名" prop="realName" show-overflow-tooltip></el-table-column>
                        <el-table-column label="手机号" prop="phoneNumber" show-overflow-tooltip></el-table-column>
                        <el-table-column label="邮箱地址" prop="email" show-overflow-tooltip></el-table-column>
                        <el-table-column label="所属机构" prop="organizationName" show-overflow-tooltip></el-table-column>
                        <el-table-column label="所属部门" prop="departmentName" show-overflow-tooltip></el-table-column>
                        <el-table-column label="角色" prop="roleName" show-overflow-tooltip></el-table-column>
                        <el-table-column label="添加日期" prop="addDate" :formatter="formaterTime" width="200"></el-table-column>
                        <el-table-column label="操作" width="200">
                            <template scope="scope">
                                <el-button type="text" @click="openModalBox('view',scope.$index,scope.row)" title="查看">
                                    <img src="../../assets/img/btn-detail.png" alt="">
                                </el-button>
                                <el-button type="text" @click="openModalBox('edit',scope.$index,scope.row)" title="编辑">
                                    <img src="../../assets/img/btn-edit.png" alt="">
                                </el-button>
                                <el-button type="text" @click="deleteBtn(scope.$index,scope.row)" title="删除">
                                    <img src="../../assets/img/btn-delete.png" alt="">
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="pagination-inner">
                <el-pagination @current-change="handleCurrentChange" :current-page="pageNum" :page-size="pagesize" layout="total,  prev, pager, next, jumper" :total="pagetotal">
                </el-pagination>
            </div>
        </div>
        <user-add-dialog ref="addDialog" @repage="sxpage"></user-add-dialog>
        <user-detail-dialog ref="detailDialog" :form="form" :modalvisible="modalvisible" titlename="查看用户数据详情"></user-detail-dialog>
        <dcp-dialog id="user_del_dialog" ref="delDialog" :width="400" :height="200">
            <div slot="dialog_body">
                <div class="msg">确认删除当前信息吗？</div>
            </div>
            <div slot="dialog_footer">
                <el-button type="text" @click="cancelDelDialog">取消</el-button>
                <el-button type="dcp" @click="deleteInfo" v-loading="btnloading">确定</el-button>
            </div>
        </dcp-dialog>
        <dcp-import ref="import" title="用户导入" :isStep="false" importTitle="用户" serverAddress="/Batch/v1.0/importUserData" downloadAddress="/Batch/v1.0/DownDataSourceTemplateFile/用户" :isTest="false"></dcp-import>
    </div>
</template>
<script>
import importExport from '@/components/common/import_export'
import DcpDialog from '../common/DCPDialog';
import userAddDialog from './userAddDialog';
import userDetailDialog from './userDetailDialog';
import DcpImport from '../common/DCPImport';

import {
    formatTime
} from '../../assets/js/mUtils';

export default {
    components: {
        DcpDialog,
        userAddDialog,
        userDetailDialog,
        DcpImport,
        importExport
    },
    data() {
        return {
            pagetotal: 1,
            pagesize: 10,
            pageNum: 1,
            resourceList: [],
            tableloading: true,
            modalvisible: false,
            btnloading: false,
            titlename: '',
            btnname: '',
            dispcancel: true,
            dialogVisible: false,
            deleteInfoId: null,
            form: {
                delState: '',
                userName: '',
                phoneNumber: '',
                id: '',
                organizationName: '',
                organizationId: '',
                addDate: '',
                describeText: '',
                password: '',
                departmentId: '',
                departmentName: '',
                realName: '',
                roleId: '',
                roleName: '',
                email: '',
            },
            modalType: ''
        }
    },
    mounted() {
        this.getData({
            pageSize: this.pagesize,
            pageNum: 1
        });
    },
    methods: {
        uploadSuccess() {
            this.getData({
                pageSize: this.pagesize,
                pageNum: this.pageNum
            });
        },
        sxpage(val) {
            var that = this;
            var obj = null;
            if (val === 2) {
                obj = {
                    pageSize: this.pagesize,
                    pageNum: this.pageNum
                };

                this.tableloading = true;
                $.ajax({
                        url: this.$store.state.common.ip + '/user/v1.0/listUserInfo/',
                        type: 'POST',
                        dataType: 'json',
                        data: JSON.stringify(obj),
                        contentType: 'application/json',
                        success: function(data) {
                            if (data.code === 200) {
                                that.pagetotal = data.data.total;
                                that.resourceList = data.data.list;
                            }
                        }
                    })
                    .always(function() {
                        that.tableloading = false;
                    });
            } else {
                obj = {
                    pageSize: this.pageSize,
                    pageNum: this.pageNum
                };

                this.tableloading = true;
                $.ajax({
                        url: this.$store.state.common.ip + '/user/v1.0/listUserInfo',
                        type: 'POST',
                        dataType: 'json',
                        data: JSON.stringify(obj),
                        contentType: 'application/json',
                        success: function(data) {
                            if (data.code === 200) {
                                that.pagetotal = data.data.total;
                                that.resourceList = data.data.list;
                            }
                        }
                    })
                    .always(function() {
                        that.tableloading = false;
                    });
            }
        },
        handleUserAddDialog() {
            this.$refs.addDialog.open();
        },
        openImport() {
            this.$refs.import.open();
        },
        openModalBox(type, row, col) {
            var boxType = '';
            if (type === 'view') {
                boxType = '查看';
                this.btnname = '确定';
                this.modalType = 'view';
                this.inputstate = true;

                this.form.delState = col.delState;
                this.form.userName = col.userName;
                this.form.phoneNumber = col.phoneNumber;
                this.form.id = col.id;
                this.form.organizationName = col.organizationName;
                this.form.organizationId = col.organizationId;
                this.form.addDate = formatTime(col.addDate);
                this.form.describeText = col.describeText;
                this.form.password = col.password;
                this.form.departmentId = col.departmentId;
                this.form.departmentName = col.departmentName;
                this.form.realName = col.realName;
                this.form.roleId = col.roleId;
                this.form.roleName = col.roleName;
                this.form.email = col.email;

                this.$refs.detailDialog.open();
            } else if (type === 'edit') {
                boxType = '编辑';
                this.btnname = '保存';
                this.modalType = 'edit';
                this.inputstate = false;

                this.$refs.addDialog.title = '修改用户信息';
                this.$refs.addDialog.open();
                this.$refs.addDialog.type = 'edit';
                // this.$refs.addDialog.changessjg(col.organization);
                // this.$refs.addDialog.csh();

                let temp = {
                    userName: col.userName,
                    password: col.password,
                    phoneNumber: col.phoneNumber,
                    email: col.email,
                    organizationId: col.organization + '',
                    departmentId: col.departmentId + '',
                    realName: col.realName,
                    roleId: col.roleId + '',
                    describeText: col.describeText,
                    id: col.id
                };

                setTimeout(() => {
                    this.$refs.addDialog.form = temp;
                }, 0)
            }

            this.titlename = boxType + '用户详情';
        },
        closebtn() {
            this.modalvisible = false;
        },
        cancel() {
            this.modalvisible = false;
        },
        okbtn() {
            if (this.modalType === 'edit') {
                let obj = {
                    delState: this.form.delState,
                    userName: this.form.userName,
                    phoneNumber: this.form.phoneNumber,
                    id: this.form.id,
                    organizationName: this.form.organizationName,
                    organizationId: this.form.organizatoinId,
                    addDate: this.form.addDate,
                    describeText: this.form.describeText,
                    password: this.form.password,
                    departmentId: this.form.departmentId,
                    departmentName: this.form.departmentName,
                    realName: this.form.realName,
                    roleId: this.form.roleId,
                    roleName: this.form.roleName,
                    email: this.form.email
                };

                this.saveData(obj);
            } else {
                this.modalvisible = false;
            }
        },
        deleteBtn(i, col) {
            this.$refs.delDialog.open();
            this.deleteInfoId = col.id;
        },
        cancelDelDialog() {
            // 取消删除用户信息
            this.$refs.delDialog.close();
        },
        deleteInfo() {
            // 确认删除按钮
            if (this.deleteInfoId !== null) {
                var that = this;
                this.btnloading = true;

                $.ajax({
                        url: this.$store.state.common.ip + '/user/v1.0/removeUserInfo/' + this.deleteInfoId,
                        type: 'PUT',
                        dataType: 'json',
                        contentType: 'application/json',
                        success: function(data) {
                            if (data.code === 200) {
                                that.dialogVisible = false;
                                that.tableloading = true;
                                that.btnloading = false;

                                that.$message({
                                    message: '删除信息成功',
                                    type: 'success',
                                    duration: 1500
                                });
                            }

                            that.handleCurrentChange(that.pageNum);
                        }
                    })
                    .always(function() {
                        that.tableloading = false;
                        that.btnloading = false;
                        that.$refs.delDialog.close();
                    });
            }
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            var obj = {
                pageSize: this.pagesize,
                pageNum: val
            };

            this.getData(obj);
        },
        saveData(obj) {
            // 更新信息
            // var that = this;
            this.btnloading = true;

            $.ajax({
                url: this.$store.state.common.ip + '/user/v1.0/modifyUserInfo',
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(obj),
                contentType: 'application/json',
                success: function(data) {
                    if (data.code === 200) {

                    }
                }
            })
        },
        getData(obj) {
            var that = this;
            $.ajax({
                    url: this.$store.state.common.ip + '/user/v1.0/listUserInfo/',
                    type: 'POST',
                    dataType: 'json',
                    data: JSON.stringify(obj),
                    contentType: 'application/json',
                    success: function(data) {
                        if (data.code === 200) {
                            that.pagetotal = data.data.total;
                            that.resourceList = data.data.list;
                        }
                    }
                })
                .always(function() {
                    that.tableloading = false;
                });
        },
        formaterTime(row, col) {
            return formatTime(row.addDate);
        }
    }
};
</script>
<style lang="scss">
.system-wrap {
    height: 100%;
    /**样式重置 */
    .btn-top {
        position: absolute;
        top: -7.8%;
        left: 10%;
        width: 600px;
        height: 7%;
        .btn-group {
            width: 70%;
            height: 100%;
            button {
                font-size: 16px;
                color: rgba(0, 187, 236, .8);
                width: 40%;
                height: 100%;
                float: left;
                margin: 0 10px;
                background: url("../../assets/img/system/import/btn-bg.png") no-repeat center center;
                background-size: 100% 100%;
                cursor: pointer;
                border: none;
                outline: none;
                &:hover {
                    background-image: url("../../assets/img/system/import/btn-bg-on.png");
                }
                img {
                    display: inline-block;
                    vertical-align: middle;
                    width: 24px;
                    height: 22px;
                    margin-left: 5px;
                    &.a {
                        width: 37px;
                        height: 37px;
                        margin: 0;
                    }
                }
            }
        }
    }
    .msg {
        text-align: center;
        font-size: 18px;
        line-height: 80px;
    }
}
</style>

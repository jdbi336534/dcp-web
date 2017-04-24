<template>
    <div class="department-wrap system-wrap">
        <import-export>
            <div slot="btn_group">
                <button @click="handleDeptAddDialog">增加<img class="a" src="../../assets/img/system/import/add.png" alt=""></button>
                <button @click="openImport">导入<img src="../../assets/img/system/import/import.png" alt=""></button>
            </div>
        </import-export>
        <div class="dept-outer data-table-outer">
            <div class="data-table-wrapper">
                <div class="data-table-inner">
                    <el-table :data="resourceList" :resizable="true" border empty-text=" " height="100%" style="width:100%;height:100%" v-loading="tableloading" element-loading-text="拼命加载中">
                        <el-table-column label="部门编码" prop="departmentCode" show-overflow-tooltip></el-table-column>
                        <el-table-column label="部门名称" prop="departmentName" show-overflow-tooltip></el-table-column>
                        <el-table-column label="上级部门" prop="superiorDepartmentName" show-overflow-tooltip></el-table-column>
                        <el-table-column label="部门详细地址" prop="detailedAddressName" show-overflow-tooltip></el-table-column>
                        <el-table-column label="所属机构" prop="organizationName" show-overflow-tooltip></el-table-column>
                        <el-table-column label="部门全路径" prop="path" show-overflow-tooltip></el-table-column>
                        <el-table-column label="创建时间" prop="addDate" :formatter="formaterTime" width="200"></el-table-column>
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
        <dept-add-dialog ref="addDialog" @on-close="onDialogClose"></dept-add-dialog>
        <dcp-dialog ref="delDialog" id="del_col" :width="400" :height="200">
            <div slot="dialog_body">
                <p class="text-center">确认删除当前信息吗？</p>
            </div>
            <div slot="dialog_footer">
                <el-button type="text" @click="closeDelDialog">取消</el-button>
                <el-button type="dcp" @click="deleteInfo()">确定</el-button>
            </div>
        </dcp-dialog>
        <dcp-import ref="import" title="部门导入" :isStep="false" importTitle="部门" serverAddress="/Batch/v1.0/importDeptData" downloadAddress="/Batch/v1.0/DownDataSourceTemplateFile/部门" :isTest="false">
        </dcp-import>
    </div>
</template>
<script>
import importExport from '@/components/common/import_export'
import deptAddDialog from './deptAddDialog';
import DcpDialog from '../common/DCPDialog';
import DcpImport from '../common/DCPImport';
import {
    formatTime
} from '../../assets/js/mUtils';
export default {
    components: {
        deptAddDialog,
        DcpDialog,
        DcpImport,
        importExport
    },
    data() {
        return {
            pagetotal: 1,
            pagesize: 20,
            pageNum: 1,
            resourceList: [],
            tableloading: false
        }
    },
    mounted() {
        this.getData({
            pageSize: this.pagesize,
            pageNum: 1
        })
    },
    methods: {
        getData(obj) {
            var that = this;

            this.tableloading = true;
            $.ajax({
                    url: `${this.$store.state.common.ip}/department/v1.0/listDepartmentInfo`,
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
                .always(() => {
                    this.tableloading = false;
                });
        },
        handleCurrentChange(val) {
            // 分页
            this.pageNum = val;
            this.getData({
                pageSize: this.pagesize,
                pageNum: val
            });
        },
        handleDeptAddDialog() {
            this.$refs.addDialog.open('新增部门信息');
        },
        onDialogClose() {
            this.getData({
                pageSize: this.pagesize,
                pageNum: this.pageNum
            });
        },
        openModalBox(type, col, row) {
            // 点击表格操作按钮，弹出模态框
            var title = type === 'view' ? '查看部门信息' : '编辑部门信息';
            var state = type;

            this.$refs.addDialog.open(title, state, row);
        },
        deleteBtn(i, col) {
            this.$refs.delDialog.open();
            this.deleteInfoId = col.id;
        },
        deleteInfo() {
            // 确认删除表格行数据
            if (this.deleteInfoId === null) {
                return;
            }

            var that = this;
            this.btnloading = false;

            $.ajax({
                    url: `${this.$store.state.common.ip}/department/v1.0/removeDepartmentInfo/${this.deleteInfoId}`,
                    type: 'PUT',
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function(data) {
                        if (data.code === 200) {
                            that.$message({
                                message: '删除信息成功',
                                type: 'success',
                                duration: 1500
                            });
                        } else {
                            that.$message.error(data.msg);
                        }
                        that.handleCurrentChange(that.pageNum);
                    }
                })
                .always(() => {
                    this.tableloading = false;
                    this.btnloading = false;
                    this.$refs.delDialog.close();
                });
        },
        closeDelDialog() {
            this.$refs.delDialog.close();
        },
        openImport() {
            // 导入
            this.$refs.import.open();
        },
        formaterTime(row, col) {
            return formatTime(row.addDate);
        }
    }
}
</script>
<style lang="scss">
.data-table-outer {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    .data-table-wrapper {
        flex: 1;
        overflow: auto;
    }
    .data-table-inner {
        height: calc(100% - 10px);
    }
    .pagination-inner {
        height: 40px;
        text-align: center;
    }
}

p.text-center {
    text-align: center;
    font-size: 18px;
    line-height: 60px;
}

.system-wrap {
    height: 100%;
    /**样式重置 */
    .el-input,
    .el-textarea,
    .el-select {
        &.is-disabled {
            .el-input__inner,
            .el-textarea_inner,
            .el-select__inner {
                border-color: #075174;
                background-color: transparent;
            }
        }
    }
}
</style>

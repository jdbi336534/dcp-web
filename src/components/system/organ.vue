<template>
    <div class="sys_organ">
        <import-export>
            <div slot="btn_group">
                <button @click="handleOpen('create')">增加<img class="a" src="../../assets/img/system/import/add.png" alt=""></button>
                <button @click="openImport">导入<img src="../../assets/img/system/import/import.png" alt=""></button>
            </div>
        </import-export>
        <div class="sys_table">
            <el-table :data="tableData" :resizable="true" border empty-text=" " height="100%" style="width: 100%;height:100%" v-loading="tableloading" element-loading-text="拼命加载中">
                <el-table-column label="机构编码" prop="organizationCode" show-overflow-tooltip
></el-table-column>
                <el-table-column label="机构名称" prop="organizationName" show-overflow-tooltip></el-table-column>
                <el-table-column label="上级机构" prop="superiorOrganizationName" show-overflow-tooltip></el-table-column>
                <el-table-column label="机构详细地址" prop="detailedAddressName" show-overflow-tooltip></el-table-column>
                <el-table-column label="组织机构全路径" prop="path" show-overflow-tooltip></el-table-column>
                <el-table-column label="创建时间" prop="addDate" width="200">
                    <template scope="scope">
                        {{ formatTime(scope.row.addDate) }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template scope="scope">
                        <el-button type="text" @click="handleOpen('detail',scope.$index,scope.row)" title="查看">
                            <img src="../../assets/img/btn-detail.png" alt=""></el-button>
                        <el-button type="text" @click="handleOpen('edit',scope.$index,scope.row)" title="修改">
                            <img src="../../assets/img/btn-edit.png" alt=""></el-button>
                        <el-button type="text" @click="handleDelete(scope.$index,scope.row)" title="删除">
                            <img src="../../assets/img/btn-delete.png" alt=""></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页查询 -->
        <div class="sys_page">
            <el-pagination @current-change="handleCurrentChange" :current-page="pageNum" :page-size="pageSize" layout="total,  prev, pager, next, jumper" :total="pageTotal">
            </el-pagination>
        </div>
        <!-- 导入 -->
        <dcp-import ref="import" title="机构导入" :isStep="false" importTitle="机构" serverAddress="/Batch/v1.0/importDeptData" downloadAddress="/Batch/v1.0/DownDataSourceTemplateFile/机构" :isTest="false">
        </dcp-import>
        <!-- 删除 -->
        <organ-delete ref="organ_del" @on-refresh="onRefresh"></organ-delete>
        <!-- 增加 编辑 -->
        <organ-operation ref="organ_opera" :title="title" @on-refresh="onRefresh"></organ-operation>
    </div>
</template>
<script>
import importExport from '@/components/common/import_export'
import DcpImport from '../common/DCPImport';
import organDelete from './organDelete'
import organOperation from './organOperation'
import {
    formatTime
} from '../../assets/js/mUtils'
import {
    getOrganInfoList
} from '@/assets/js/queryData.js'
export default {
    data() {
            return {
                tableData: [],
                tableloading: true,
                pageNum: 1,
                pageSize: 20,
                pageTotal: 0,
                title: '',
                type: null,
            }
        },
        computed: {},
        mounted() {
            this.getData({
                pageSize: this.pageSize,
                pageNum: this.pageNum
            });
        },
        components: { // 注册的组建
            DcpImport,
            importExport,
            organDelete,
            organOperation
        },
        methods: {
            onRefresh() {
                if (this.type === 'create') {
                    this.pageNum = 1;
                }
                this.getData({
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                });
            },
            formatTime(t) {
                return formatTime(t);
            },
            openImport() {
                this.$refs.import.open();
            },
            handleOpen(type, index, row) {
                let data = row || {};
                this.type = type;
                if (type === 'create') {
                    this.title = '增加机构信息';
                } else if (type === 'edit') {
                    this.title = '编辑机构信息';
                } else if (type === 'detail') {
                    this.title = '查看机构信息';
                }
                this.$refs.organ_opera.open(type, data);
            },
            handleDelete(index, row) {
                this.$refs.organ_del.open(row.id);
            },
            handleCurrentChange(val) {
                this.pageNum = val;
                var obj = {
                    pageSize: this.pageSize,
                    pageNum: val
                }
                this.getData(obj);
            },
            getData(obj) {
                getOrganInfoList(obj).then(res => {
                    let {
                        code,
                        data,
                        msg
                    } = res;
                    if (code === 200) {
                        this.pageTotal = data.total;
                        this.tableData = data.list;
                    } else if (code === 300) {
                        this.$message({
                            type: 'success',
                            message: msg
                        });
                    } else {
                        this.$message.error(msg);
                    }
                    this.tableloading = false;
                });
            }
        }
};
</script>
<style lang="scss">
@import '../../assets/css/colors.scss';
.sys_organ {
    margin: 0;
    padding: 0;
    font-size: 14px;
    width: 100%;
    height: 100%;
    .sys_table {
        width: 100%;
        height: calc(100% - 50px);
    }
    .sys_page {
        height: 50px;
        padding-top: 10px;
        box-sizing: border-box;
        width: 100%;
        text-align: center
    }
}
</style>

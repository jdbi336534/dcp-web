<template>
    <div class="sys-region">
        <import-export>
            <div slot="btn_group">
                <button @click="handleOpen('create')">增加<img class="a" src="../../assets/img/system/import/add.png" alt=""></button>
                <button @click="openImport">导入<img src="../../assets/img/system/import/import.png" alt=""></button>
            </div>
        </import-export>
        <el-table :data="tableData" :resizable="true" border empty-text=" " style="width: 100%; height: 100%;" v-loading="tableloading" element-loading-text="拼命加载中">
            <el-table-column label="区域名称" prop="pName" show-overflow-tooltip></el-table-column>
            <el-table-column label="区域编码" prop="pIndex" show-overflow-tooltip></el-table-column>
            <el-table-column label="上级区域名称" prop="parName" show-overflow-tooltip></el-table-column>
            <el-table-column label="区域全路径" prop="fullName" show-overflow-tooltip></el-table-column>
            <el-table-column label="创建时间" prop="addDate" width="200">
                <template scope="scope">
                    {{ formatTime(scope.row.addDate) }}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
                <template scope="scope">
                    <el-button type="text" @click="handleOpen('detail',scope.$index,scope.row)">
                        <img src="../../assets/img/btn-detail.png" alt="" title="查看">
                    </el-button>
                    <el-button type="text" @click="handleOpen('edit',scope.$index,scope.row)">
                        <img src="../../assets/img/btn-edit.png" alt="" title="编辑">
                    </el-button>
                    <el-button type="text" @click="handleDelete(scope.$index,scope.row)">
                        <img src="../../assets/img/btn-delete.png" alt="" title="删除">
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @current-change="handleCurrentChange" :current-page="pageNum" :page-size="pageSize" layout="total,  prev, pager, next, jumper" :total="pageTotal">
        </el-pagination>
        <dcp-import ref="region_import" title="区域导入" :isStep="false" importTitle="区域" downloadAddress="/Batch/v1.0/DownDataSourceTemplateFile/区域" serverAddress="/Batch/v1.0/importAreaData" :isTest="false" @on-refresh="onRefresh"></dcp-import>
        <region-operation ref="region_opera" :title="title" @on-refresh="onRefresh"></region-operation>
        <region-delete ref="region_del" @on-refresh="onRefresh"></region-delete>
    </div>
</template>
<script>
import importExport from '@/components/common/import_export'
import DcpImport from '@/components/common/DCPImport'
import regionOperation from './regionOperation'
import regionDelete from './regionDelete'
import {
    listAreaDictionary
}
from '@/assets/js/queryData'
import {
    formatTime
} from '@/assets/js/mUtils'
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
        components: {
            importExport,
            DcpImport,
            regionOperation,
            regionDelete
        },
        created() {},
        mounted() {
            this.getData({
                pageNum: this.pageNum,
                pageSize: this.pageSize
            });
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
            getData(obj) {
                listAreaDictionary(obj).then(res => {
                    let {
                        code,
                        data,
                        msg
                    } = res;
                    if (code === 200) {
                        this.tableData = data.list;
                        this.pageTotal = data.total;
                    } else {
                        this.$message.error(msg);
                        this.tableData = [];
                        this.pageTotal = 0;
                    }
                    this.tableloading = false;
                })
            },
            handleOpen(type, index, row) {
                // type = create(增加), edit(编辑), detail(删除)
                let data = row || {};
                this.type = type;
                if (type === 'create') {
                    this.title = '增加区域信息';
                } else if (type === 'edit') {
                    this.title = '编辑区域信息';
                } else if (type === 'detail') {
                    this.title = '查看区域信息';
                }
                this.$refs.region_opera.open(type, data);
            },
            handleDelete(index, row) {
                this.$refs.region_del.open(row.pIndex);
            },
            handleCurrentChange(current) {
                this.pageNum = current;
                this.getData({
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                });
            },
            openImport() {
                this.$refs.region_import.open();
            }
        }
}
</script>
<style lang="scss">
.sys-region {
    width: 100%;
    height: calc(100% - 50px);
    margin: 0;
    padding: 0;
    .el-table th.is-leaf {
        text-align: left;
    }
    .el-table__body-wrapper {
        height: calc(100% - 40px);
    }
    .el-pagination {
        margin-top: 5px;
        text-align: center;
    }
}
</style>

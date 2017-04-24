<template>
    <div class="resource-apply">
        <import-export>
            <div slot="btn_group">
                <button @click="handleImport">导入<img src="../../assets/img/import.png" alt=""></button>
                <button>导出<img src="../../assets/img/export.png" alt=""></button>
            </div>
        </import-export>
        <div class="resource-apply-table">
            <el-table :data="resourceList" :resizable="true" border height="100%" empty-text="暂无数据" style="width: 100%; height: 100%;" v-loading="tableloading" element-loading-text="拼命加载中">
                <el-table-column label="数据源ID" prop="id" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="数据源名称" prop="dataSourceShortName" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="业务系统名称" prop="businessSysName" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="数据资源种类" prop="dataSourceKind" :formatter="formateKind" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="所属部门" prop="departmentName" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="创建时间" show-overflow-tooltip>
                    <template scope="scope">
                        {{formatTimes(scope.row.createTime)}}
                    </template>
                </el-table-column>
                <el-table-column label="部署地点" prop="fullName" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="物理地址" prop="description" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template scope="scope">
                        <el-button type="text" @click="handleEdit(scope.row)">
                            <img src="../../assets/img/btn-edit.png" title="修改">
                        </el-button>
                        <el-button type="text" @click="handleApply(scope.row)" v-if="scope.row.resourceCount!==0">
                            <img src="../../assets/img/btn-submit.png" title="提交审核">
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- fenye -->
            <div class="resource-apply-page">
                <el-pagination @current-change="handleCurrentChange" :current-page="pageNum" :page-size="pageSize" layout="total,  prev, pager, next, jumper" :total="pageTotal">
                </el-pagination>
            </div>
        </div>
        <dcp-import ref="import" title="数据资源导入" downloadAddress="/Batch/v1.0/DownDataSourceTemplateFile/数据资源" serverAddress="/Batch/v1.0/uploadDataResourceExcelFile" :isTest="false"></dcp-import>
    </div>
</template>
<script>
import {
    findDatasourceList
} from '@/assets/js/queryData'
import {
    formatTime,
    getUserId,
    setSessionStore
} from '@/assets/js/mUtils'
import DcpImport from '@/components/common/DCPImport'
import importExport from '@/components/common/import_export'
export default {
    data() {
            return {
                pageNum: 1,
                pageSize: 20,
                pageTotal: 0,
                tableloading: true,
                resourceList: [],
                userId: null
            }
        },
        mounted() {
            this.getData2({
                pageSize: this.pageSize,
                pageNum: this.pageNum,
                dataSourceOwner: getUserId(),
            });
            setSessionStore('defaultActive', '/dcp/resource/apply');
        },
        components: {
            DcpImport,
            importExport
        },
        methods: {
            formateKind(row) {
                var type = '';
                if (row.dataSourceKind === 'db') {
                    type = '数据类型'
                } else if (row.dataSourceKind === 'file') {
                    type = '文件类型'
                }
                return type;
            },
            formatTimes(t) {
                return formatTime(t)
            },
            getData(obj) {
                findDatasourceList(obj).then(res => {
                    let {
                        code,
                        data,
                        msg
                    } = res;
                    if (code === 200) {
                        this.resourceList = data.list;
                        this.pageTotal = data.total;
                    } else {
                        this.$message.error(msg);
                    }
                    this.tableloading = false;
                })
            },
            getData2(obj) {
                var that = this;
                $.ajax({
                    url: `${this.$store.state.common.ip}/dataResources/v1.0/findDataSourceList/${getUserId()}/${obj.pageNum}/${obj.pageSize}`,
                    type: 'GET',
                    dataType: 'json',
                    success: function(data) {
                        console.log(data)
                        that.resourceList = data.data.list;
                        that.pageTotal = data.data.total;
                    }
                }).always(function() {
                    that.tableloading = false;
                });
            },
            open() {},
            handleCurrentChange() {},
            handleEdit(row) {
                if (row.dataSourceKind === 'file') {
                    this.$router.push({
                        path: '/dcp/resource/applyFiles/' + row.id,
                    });
                } else if (row.dataSourceKind === 'db') {
                    this.$router.push({
                        path: '/dcp/resource/applyedit/' + row.id,
                    });
                }
            },
            handleApply(row) {
                if (row.dataSourceKind === 'file') {
                    this.$router.push({
                        path: '/dcp/resource/applyFilesAudit/' + row.id,
                    });
                } else if (row.dataSourceKind === 'db') {
                    this.$router.push({
                        path: '/dcp/resource/applysubmit/' + row.id,
                    });
                }
            },
            handleImport() {
                this.$refs.import.open();
            }
        }
}
</script>
<style lang="scss">
.resource-apply {
    width: 100%;
    height: 100%;
    overflow: auto;
    .resource-apply-table {
        height: calc(100% - 50px);
    }
    .resource-apply-page {
        margin: 5px 0;
        height: 40px;
        text-align: center;
    }
}
</style>

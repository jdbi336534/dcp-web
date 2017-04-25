<!--
    @author: dongmm,
    @data  : 2017/4/23
-->
<template>
<div id="applied_wrap" class="applied-wrap">
    <div class="table-wrap">
        <el-table :data="list" height="100%" style="height: 100%;" empty-text="暂无数据" v-loading="tableLoading" element-loading-text="拼命加载中">
            <el-table-column label="数据资源提供方" prop="ownerName"></el-table-column>
            <el-table-column label="交换方式" prop="exchangeTypeName"></el-table-column>
            <el-table-column label="传输方式" prop="serviceTypeName"></el-table-column>
            <el-table-column label="申请时间" prop="applyTime" :formatter="formaterTime"></el-table-column>
            <el-table-column label="审核状态" prop="capproveStatus"></el-table-column>
            <el-table-column label="服务状态" prop="cserviceStatus"></el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-tooltip effect="dark" content="详情" placement="bottom-start">
                        <el-button size="small" type="text" @click="openDetailModal(scope.row)">
                            <img src="../../assets/img/btn-detail.png">
                        </el-button>
                    </el-tooltip>
                    <el-tooltip effect="dark" content="详情" placement="bottom-start">
                        <el-button size="small" type="text">
                            <img src="../../assets/img/btn-detail.png">
                        </el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="pagination-wrap">
        <el-pagination :page-size="pageSize" :current-page="pageNum" layout="total, prev, pager, next, jumper" 
            :total="pageTotal" @current-change="go"></el-pagination>
    </div>
    <restapi-dialog ref="restDialog"></restapi-dialog>
</div>
</template>
<script>
import RestapiDialog from './rest';
import {
    listOfApplied
} from '../../assets/js/queryData';
import {
    getSessionStore,
    formatTime,
} from '../../assets/js/mUtils';

export default {
    components: {
        RestapiDialog
    },
    data() {
        return {
            userInfo: '',
            pageSize: 20,
            pageNum: 0,
            pageTotal: 0,
            tableLoading: false,
            list: [],               // 已申请资源列表,
        }
    },
    /**
     * 组件挂载后获取userinfo
     */
    mounted() {
        this.userInfo = getSessionStore('userInfo');
        this.pageNum = 1;
    },
    watch: {
        pageNum() {
            this.getServicesApplied();
        }
    },
    methods: {
        /**
         * 请求已申请服务table
         */
        getServicesApplied() {
            let param = {
                operatorId: this.userInfo.id,
                pageNum: this.pageNum,
                pageSize: this.pageSize
            };
            // 启用表格加载动画
            this.tableLoading = true;
            
            // 获取已申请服务列表
            listOfApplied(param)
                .then(res => {
                    // 关闭表格加载动画
                    this.tableLoading = false;

                    let { code, msg } = res;
                    // 正常返回， 但没有数据
                    if (code !== 200) {
                        return this.$message({
                            type: 'warning',
                            message: msg
                        });
                    }

                    // 正常返回数据
                    let { list, total } = res.data;
                    this.list = list;
                    this.pageTotal = total;
                })
                .catch(() => {
                    // 网络异常
                    this.tableLoading = false;
                    this.$message.error('网络错误，请重试。');
                });
        },
        
        /**
         * 页码跳转
         */
        go(num) {
            this.pageNum = num;
        },
        
        /**
         * 打开不同类型行详情弹框
         */
        openDetailModal(row) {
            this.restModalShow = true;
            let { serviceId, serviceTypeName } = row;

            if (serviceTypeName === 'REST') {
                this.$refs.restDialog.open(serviceId);
            }
        },

        /**
         * 时间日期格式化
         */
        formaterTime(row) {
            return formatTime(row.applyTime);
        }
    }
}
</script>
<style lang="scss">
.applied-wrap {
    height: 100%;

    .table-wrap {
        height: calc(100% - 50px);
    }

    .pagination-wrap {
        height: 50px;
        text-align: center;
    }
}
</style>

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
                <el-table-column label="申请时间">
                    <template scope="scope">{{ formaterTime(scope.row.applyTime )}}</template>
                </el-table-column>
                <el-table-column label="审核状态" prop="capproveStatus"></el-table-column>
                <el-table-column label="服务状态" prop="cserviceStatus"></el-table-column>
                <el-table-column label="操作">
                    <template scope="scope">
                        <el-button size="small" type="text" title="详情" @click="openDetailModal(scope.row)">
                            <img src="../../assets/img/btn-detail.png">
                        </el-button>
                        <el-button size="small" type="text" title="审核记录" @click="openReviewModal(scope.row)">
                            <img src="../../assets/img/btn-apply.png">
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination-wrap">
            <el-pagination :page-size="pageSize" :current-page="pageNum" layout="total, prev, pager, next, jumper" :total="pageTotal" @current-change="go"></el-pagination>
        </div>
        <restapi-dialog ref="restDialog"></restapi-dialog>
        <!--审核记录-->
        <dcp-dialog id="review" :width="800" :height="500" ref="reviewDialog" title="审核记录">
            <div class="ph-4" slot="dialog_body">
                <el-table :data="listOfReviewInfo" height="390" v-loading="reviewLoading">
                    <el-table-column label="经办人" prop="realName"></el-table-column>
                    <el-table-column label="审核状态" prop="operationAuditState"></el-table-column>
                    <el-table-column label="审核时间">
                        <template scope="scope">
                            {{ formaterTime(scope.row.addDate) }}
                        </template>
                    </el-table-column>
                    <el-table-column label="审核意见" prop="opinionAudit"></el-table-column>
                </el-table>
            </div>
        </dcp-dialog>
        <apply-pop ref="applyPop" title="DIP详情"></apply-pop>
        <apply-pop-file ref="popaudited" :audited="true" title="FTP详情"></apply-pop-file>
    </div>
</template>
<script>
import RestapiDialog from './rest';
import DcpDialog from '../common/DCPDialog';
import ApplyPop from './apply_pop';
import ApplyPopFile from './apply_pop_file';
import {
    listOfApplied,
    getRestAPIDetail
} from '../../assets/js/queryData';
import {
    getSessionStore,
    formatTime,
    setSessionStore,
} from '../../assets/js/mUtils';

export default {
    components: {
        RestapiDialog,
        DcpDialog,
        ApplyPop,
        ApplyPopFile,
    },
    data() {
        return {
            userInfo: '',
            pageSize: 20,
            pageNum: 0,
            pageTotal: 0,
            tableLoading: false,
            reviewLoading: false,
            list: [], // 已申请资源列表,
            listOfReviewInfo: [], // 已审核信息
            serviceId: 0,
        }
    },
    /**
     * 组件挂载后获取userinfo
     */
    mounted() {
        this.userInfo = getSessionStore('userInfo');
        this.pageNum = 1;
        setSessionStore('defaultActive', '/dcp/serve/applied');
    },
    watch: {
        pageNum() {
            this.getServicesApplied();
        }
    },
    methods: {
        /**
         * 审核记录
         */
        openReviewModal(row) {
            this.$refs.reviewDialog.open();
            let {
                serviceId
            } = row;

            if (this.serviceId === serviceId) {
                return;
            }
            this.getReviewData(serviceId);
        },

        /**
         *
         */
        getReviewData(serviceId) {
            this.reviewLoading = true;
            $.ajax({
                    url: '/api/dataResourcesAuthor/v1.0/serviceApproveHistory',
                    type: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    dataType: 'json',
                    data: JSON.stringify({
                        serviceId
                    })
                })
                .done(res => {
                    let {
                        code,
                        msg
                    } = res;
                    if (code !== 200) {
                        this.$message({
                            type: 'warning',
                            message: msg
                        });

                        return;
                    }

                    this.serviceId = serviceId;
                    this.listOfReviewInfo = res.data;
                })
                .fail(() => {
                    this.listOfReviewInfo = [];
                    this.serviceId = 0;
                    this.$message.error('网络错误，请重试。');
                })
                .always(() => {
                    this.reviewLoading = false;
                });
        },

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

                    let {
                        code,
                        msg
                    } = res;
                    // 正常返回， 但没有数据
                    if (code !== 200) {
                        return this.$message({
                            type: 'warning',
                            message: msg
                        });
                    }

                    // 正常返回数据
                    let {
                        list,
                        total
                    } = res.data;
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
            let {
                serviceId,
                serviceType,
                exchangeType
            } = row;

            if (serviceType === 'rest') {
                this.$refs.restDialog.open(serviceId);
            } else if (serviceType === 'dip') {
                this.getDetailInfo(serviceId, serviceType, exchangeType);
            } else if (serviceType === 'ftp') {
                this.$refs.popaudited.onOpen(JSON.stringify(row));
            }
        },
        getDetailInfo(id, type, exchangeType) {
            getRestAPIDetail({
                    serviceId: id
                })
                .then(res => {
                    let {
                        code,
                        msg,
                        data
                    } = res;
                    if (code === !200) {
                        this.$message({
                            type: 'warning',
                            message: msg
                        });
                        return;
                    }
                    if (type === 'dip') {
                        let {
                            operatorDataSourceName,
                            serviceTypeName,
                            applyId
                        } = data;
                        let obj = {
                            applyId: applyId,
                            dataSourceName: operatorDataSourceName,
                            serviceTypeName: serviceTypeName,
                            exchangeType: exchangeType,
                            state: 'detail',
                            taskId: null
                        };
                        this.$refs.applyPop.onOpen(obj);
                    }
                })
                .catch(() => {
                    this.$message.error('网络错误，请重试。');
                });
        },

        /**
         * 时间日期格式化
         */
        formaterTime(date) {
            return formatTime(date);
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
    .ph-4 {
        padding: 0 20px;
    }
}
</style>

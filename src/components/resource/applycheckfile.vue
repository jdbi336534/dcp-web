<template>
    <div class="applycheckfile">
        <div :class="{tablebox:true,on:!isAudited}">
            <el-table :data="tableData" border height="100%" style="width: 100%;height:100%" empty-text="暂无数据" v-loading="tableloading" element-loading-text="拼命加载中">
                <el-table-column label="文件名" prop="fileName"></el-table-column>
                <el-table-column label="中文名" prop="cnName">
                </el-table-column>
                <el-table-column label="英文名" prop="enName">
                </el-table-column>
                <el-table-column label="简称" prop="shortName">
                </el-table-column>
                <el-table-column label="业务名" prop="businessFileName">
                </el-table-column>
                <el-table-column label="审核状态" prop="approveState" :formatter="formatterState"></el-table-column>
                <el-table-column label="文件路径" prop="path"></el-table-column>
                <el-table-column label="标签">
                    <template scope="scope">
                        <el-tooltip placement="top" v-for="(item,k) in scope.row.tagList" :key="item.tagName">
                            <div slot="content" style="max-width:100px">{{item.tagDescription}}</div>
                            <span class="sontag"> <el-tag :type="gettype(k)" close-transition>{{item.tagName}}</el-tag></span>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="bbb" v-if="isAudited">
            <textarea v-model="aproveMessage" placeholder="请输入审核意见"></textarea>
        </div>
        <div class="footer">
            <el-button type="text" @click="onBack">返回</el-button>
            <el-button type="dcp" @click="onSubmit('refused')" v-if="isAudited">驳回</el-button>
            <el-button type="dcp" @click="onSubmit('passed')" v-if="isAudited">通过</el-button>
        </div>
    </div>
</template>
<style lang="scss">
@import "../../assets/css/colors.scss";
.applycheckfile {
    width: 100%;
    height: 100%;
    .tablebox {
        height: calc(100% - 150px);
        &.on {
            height: calc(100% - 50px);
        }
    }
    .bbb {
        height: 100px;
        text-align: center;
        textarea {
            box-sizing: border-box;
            height: 100%;
            width: 98%;
            background: none;
            border-color: $dcp--border-color;
            color: #fff;
        }
    }
    .footer {
        height: 50px;
        box-sizing: border-box;
        padding-top: 7px;
        padding-right: 10px;
        text-align: right;
    }
}
</style>
<script>
import {
    setSessionStore,
    getUserId
} from '@/assets/js/mUtils'
export default {
    data() {
            return {
                tableData: [],
                pageNum: 1,
                pageSize: 9999,
                tableloading: true,
                aproveMessage: '',
            }
        },
        computed: {
            isAudited() {
                if (this.$route.params.isShow === '0') {
                    return true
                } else {
                    return false
                }
            },
        },
        mounted() {
            var id = this.$route.params.batchId;
            this.getData(id);
            var father = 'review';
            if (this.$route.params.isShow) father = 'audited';
            setSessionStore('defaultActive', '/dcp/resource/' + father);
        },
        methods: {
            gettype(i) {
                //  var color = [null, 'gray', 'primary', 'success', 'warning', 'danger'];
                //  return color[i % 6];
                return 'success'
            },
            onSubmit(aproveStatus) {
                var that = this;
                var datas = {
                    dataSourceKind: 'file',
                    operatorId: getUserId(),
                    resourceIdList: this.resourceIdList,
                }
                $.ajax({
                        url: `${this.$store.state.common.ip}/dataResources/v1.0/approveResources/${getUserId()}/file/${this.$route.params.batchId}/${this.$route.params.taskId}/${aproveStatus}/${this.aproveMessage || '无'}`,
                        type: 'PUT',
                        dataType: 'json',
                        contentType: 'application/json',
                        data: JSON.stringify(datas),
                    })
                    .done(function(data) {
                        console.log('success', data);
                        that.$message.success('审核成功！');
                        that.onBack()
                    })
                    .fail(function() {
                        console.log('error');
                    })
                    .always(function() {
                        that.sendding = false
                    });
            },
            onBack() {
                var father = '';
                var isShow = this.$route.params.isShow;
                if (isShow === '0') {
                    father = 'review';
                } else if (isShow === '1') {
                    father = 'audited';
                }
                this.$router.push({
                    path: '/dcp/resource/' + father
                })
            },
            formatterState(row, column) {
                var state = '';
                if (row.approveState === 'passed') {
                    state = '审核通过'
                } else if (row.approveState === 'normal') {
                    state = '未提交'
                } else if (row.approveState === 'refused') {
                    state = '审核拒绝'
                } else if (row.approveState === 'approving') {
                    state = '审核中'
                }
                return state;
            },
            getData(id) {
                var that = this;
                $.ajax({
                    url: `${this.$store.state.common.ip}/dataResources/v1.0/findApproveFileList/${id}/${this.pageNum}/${this.pageSize}`,
                    type: 'GET',
                    dataType: 'json',
                    success: function(data) {
                        console.log(data)
                        that.tableData = data.data.list
                    }
                }).always(function() {
                    that.tableloading = false;
                });
            }
        }
}
</script>

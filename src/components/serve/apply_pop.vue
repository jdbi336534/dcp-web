<template>
    <div class="serve-apply-dailog">
        <dcp-dialog ref="dialog" @on-close="cancel" :title="title" id="serve_apply_dialog" :width="1340" :height="630">
            <template slot="dialog_body">
                <div class="bo left">
                    <div class="top">表信息</div>
                    <div class="content">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="right">
                            <el-form-item label="交换方式" prop="change">
                                <el-select class="form-input" v-model="ruleForm.change" placeholder="请选择" :disabled="state !== 'apply'" @change="handleChangeListChange">
                                    <el-option v-for="item in changeList" :label="item.exchangeTypeName" :value="item.exchangeType" :disabled="item.disabled" :key="item.exchangeType">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="传输方式" prop="port">
                                <el-select class="form-input" v-model="ruleForm.port" placeholder="请选择" @change="handlePortChange" :disabled="state !== 'apply'">
                                    <el-option v-for="item in portList" :label="item.serviceTypeName" :value="item.serviceType" :key="item.exchangeServiceId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="接收数据源" prop="datasource" v-if="changeType !== 'required'">
                                <el-select class="form-input" v-model="ruleForm.datasource" placeholder="请选择" :disabled="state !== 'apply'" style="width: 56%;">
                                    <el-option v-for="item in sourceList" :label="item.dataSourceName" :value="item.operatorDataSourceId" :key="item.operatorDataSourceId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="服务有效期">
                                <br/>
                                <div style="display: block; float: left;width: 100%;">
                                    <el-form-item label="启用时间">
                                        <el-date-picker v-model="ruleForm.serviceValidityStartDate" type="date" placeholder="选择日期" :disabled="state !== 'apply'" style="width: 67%;">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-radio-group v-model="ruleForm.serviceValidityEndtype" :disabled="state !== 'apply'">
                                            <el-radio :label="0" class="serve-radio">
                                                <el-form-item>永久</el-form-item>
                                            </el-radio>
                                            <br/>
                                            <el-radio :label="1" class="serve-radio">
                                                <el-form-item>
                                                    <el-input v-model="ruleForm.serviceValidityNum" class="serve-number-input" type="number" :disabled="state !== 'apply'">
                                                    </el-input>
                                                    次
                                                </el-form-item>
                                            </el-radio>
                                            <br />
                                            <el-radio label="2" class="serve-radio">
                                                <el-form-item label="失效日期">
                                                    <el-date-picker v-model="ruleForm.serviceValidityEndDate" type="date" placeholder="选择日期" :disabled="state !== 'apply'" style="width: 60%;">
                                                    </el-date-picker>
                                                </el-form-item>
                                            </el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </div>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="msg-content" v-if="state === 'review'">
                        <div class="sh">审核意见：</div>
                        <textarea class="textarea" id="msg" placeholder="" v-model="textarea_msg"></textarea>
                    </div>
                </div>
                <div class="bo mid" v-if="state === 'apply'">
                    <el-table :data="cloumnList" :resizable="true" border empty-text=" " style="width: 100%; height: 100%;" v-loading="tableloading" element-loading-text="拼命加载中" @selection-change="handleSelectionChange" ref="table" row-key="id">
                        <el-table-column type="selection" width="55" :reserve-selection="true">
                        </el-table-column>
                        <el-table-column prop="businessColumnName" label="业务名称" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="columnName" label="字段名称" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="dataType" label="数据类型" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="dataLength" label="数据长度" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="dataNotNull" label="是否非空" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="businessComputationRule" label="业务计算规则" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="itComputationRule" label="IT计算规则" show-overflow-tooltip></el-table-column>
                    </el-table>
                </div>
                <div class="bo mid" v-if="state !== 'apply'">
                    <el-table :data="cloumnList" :resizable="true" border empty-text=" " style="width: 100%; height: 100%;" v-loading="tableloading" element-loading-text="拼命加载中" ref="table">
                        <el-table-column prop="businessColumnName" label="业务名称" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="columnName" label="字段名称" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="dataType" label="数据类型" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="dataLength" label="数据长度" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="dataNotNull" label="是否非空" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="businessComputationRule" label="业务计算规则" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="itComputationRule" label="IT计算规则" show-overflow-tooltip></el-table-column>
                    </el-table>
                </div>
                <div class="bo right">
                    <div class="top">表业务名称-提供方</div>
                    <div class="content">
                        <ul class="right-ul" id="scm">
                            <li class="right-li" v-for="(item,k) in ulData" @click="handleCol(k, item)">{{item.cnName + '-' + item.ownerUserName}}</li>
                        </ul>
                    </div>
                </div>
            </template>
            <template slot="dialog_footer">
                <el-button :loading="loading" type="text" @click="cancel">返回</el-button>
                <el-button :loading="loading" v-if="state === 'review'" type="dcp" @click="handleCheckResult('refused')">驳回</el-button>
                <el-button :loading="loading" v-if="state === 'review'" type="dcp" @click="handleCheckResult('passed')">通过</el-button>
                <el-button :loading="loading" v-if="state === 'apply'" type="dcp" @click="confirm">提交</el-button>
            </template>
        </dcp-dialog>
    </div>
</template>
<style lang="scss">
.serve-apply-dailog {
    .bo {
        border-top: 1px solid #0F3551;
        border-bottom: 1px solid #0F3551;
    }
    .left {
        height: 100%;
        width: 22%;
        float: left;
        box-sizing: border-box;
        border-right: 1px solid #0F3551;
        .top {
            height: 50px;
            line-height: 50px;
            text-align: center;
            font-size: 16px;
            background: #0A3553;
        }
        .content {
            margin-top: 10px;
            overflow: hidden;
            overflow-y: auto;
            height: 50%;
            .el-form {
                .el-form-item {
                    margin-left: 10px;
                }
                .el-form-item__content {
                    line-height: 30px;
                    font-size: 14px;
                    .el-select {
                        width: 60%;
                    }
                    .el-input__inner {
                        background: none;
                        height: 40px;
                        box-sizing: border-box;
                        border: none;
                        border-bottom: 1px solid #144C69;
                        border-radius: 0;
                        color: #fff;
                        font-size: 14px;
                        margin-top: -10px;
                    }
                    .serve-check {
                        .el-checkbox__input {
                            line-height: 20px;
                            margin: 10px;
                        }
                    }
                    .serve-check + .serve-check {
                        margin-left: 0;
                    }
                    .el-radio-group {
                        .el-radio {
                            .el-radio__input {
                                .el-radio__inner {
                                    background: transparent;
                                }
                            }
                        }
                        .serve-radio {
                            margin: 10px;
                            .serve-number-input {
                                width: 60px;
                            }
                            .el-radio__input {
                                float: left;
                                line-height: 43px;
                            }
                            .el-radio__label {
                                width: 220px;
                                display: block;
                                float: left;
                            }
                        }
                    }
                }
                .el-form-item__label {
                    color: #01ABDA;
                    font-size: 14px;
                }
                .form-input {
                    &.el-input {
                        display: block;
                        float: left;
                        input {
                            background: none;
                            height: 40px;
                            box-sizing: border-box;
                            border: none;
                            border-bottom: 1px solid #144C69;
                            border-radius: 0;
                            color: #fff;
                            font-size: 14px;
                            margin-top: -10px;
                        }
                    }
                    .el-input {
                        .el-input__icon {
                            color: #144C69;
                            font-size: 12px;
                        }
                        .el-input__inner {
                            background: none;
                            height: 40px;
                            box-sizing: border-box;
                            border: none;
                            border-bottom: 1px solid #144C69;
                            border-radius: 0;
                            color: #fff;
                            font-size: 14px;
                            margin-top: -10px;
                        }
                    }
                }
            }
        }
        .msg-content {
            height: 150px;
            overflow: hidden;
            width: 100%;
            .sh {
                padding-left: 10px;
            }
            .textarea {
                width: 94%;
                height: 80%;
                background: #0D152F;
                margin: 5px;
                color: #fff;
                resize: none;
                border-color: #144C69;
                &:focus {
                    border-color: #144C69;
                }
            }
        }
    }
    .mid {
        width: 58%;
        height: 100%;
        float: left;
        box-sizing: border-box;
        .el-table__body-wrapper {
            height: calc(100% - 40px);
            overflow-y: auto;
        }
    }
    .right {
        width: 20%;
        height: 100%;
        float: left;
        box-sizing: border-box;
        border-left: 1px solid #0F3551;
        .top {
            height: 50px;
            line-height: 50px;
            text-align: center;
            font-size: 16px;
            background: #0A3553;
        }
        .content {
            height: 88%;
            overflow: hidden;
            overflow-y: auto;
            .right-ul {
                margin: 0;
                padding: 0;
                height: 100%;
                cursor: pointer;
                .right-li {
                    display: block;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    font-size: 15px;
                    &.on {
                        color: #fff;
                        background-image: linear-gradient(90deg, rgba(80, 213, 246, 0.00) 0%, rgba(80, 213, 246, 0.30) 52%, rgba(80, 213, 246, 0.00) 96%);
                        box-shadow: 0 2px 4px 0 rgba(12, 21, 47, 0.50);
                    }
                }
            }
        }
    }
}
</style>
<script>
import {
    getAuthSelectTableData,
    getAuthChangeTypeData,
    getAuthSransPortData,
    getTableCloumnData,
    submitResourcesAuthor,
    getListDataSourceInfo,
    listTableDataByApplyId,
    listTableDataByTableId,
    approveByprocessIdIdAndApplyId,
    listServiceDataByTableId
} from '@/assets/js/queryData';
import DcpDialog from '../common/DCPDialog'
import {
    getUserId
} from '@/assets/js/mUtils'
export default {
    data() {
            return {
                changeType: 'batch',

                textarea_msg: '请输入审核意见',
                ruleForm: {
                    change: '',
                    port: '',
                    datasource: null,
                    serviceValidityStartDate: null,
                    serviceValidityEndDate: null,
                    serviceValidityEndtype: 0,
                    serviceValidityNum: 1,
                },

                rules: {
                    change: [{
                        required: true,
                        message: '请选择交换方式',
                        trigger: 'change'
                    }],
                    port: [{
                        required: true,
                        message: '请选择传输方式',
                        trigger: 'change'
                    }],
                    datasource: [{
                        required: true,
                        type: 'number',
                        message: '请选择数据源',
                        trigger: 'change'
                    }]
                },
                userId: null,
                state: 'apply', // apply:申请,  review: 审核, detail: 详情
                ulData: [],
                sourceList: [],
                changeList: [], // 交换方式下拉数据
                portList: [], // 传输方式下拉数据
                operatorId: '',
                tableloading: false,
                columnList: [],
                allSelect: [],
                currentIndex: 0,
                allObj: {},
                allTable: [],
                cloumnList: [],
                applyId: null,
                taskId: null,
                loading: false,
                serviceType: null
            }
        },
        props: {
            title: {
                type: String,
                default: '申请'
            }
        },
        components: {
            DcpDialog
        },
        created() {
            this.userId = getUserId();
        },
        mounted() {
            this.getChangeTypeData();
        },
        methods: {
            // 交换方式下拉选中事件
            handleChangeListChange(val) {
                this.changeType = val;
                this.ruleForm.port = '';
                this.getSransPortData(val);
            },
            handlePortChange(val) {
                for (let item of this.portList) {
                    if (val === item.serviceType) {
                        this.ruleForm.exchangeServiceId = item.exchangeServiceId;
                    }
                }
                this.getDataSourceData(val);
            },
            // 获取表信息
            getRightTable() {
                getAuthSelectTableData({
                    operatorId: this.userId
                }).then(res => {
                    let {
                        code,
                        data,
                        msg
                    } = res;
                    if (code === 200) {
                        this.ulData = data.list;
                        if (data.list.length) {
                            setTimeout(() => {
                                this.handleCol(0, this.ulData[0]);
                            }, 400);
                        } else {
                            this.$message('暂无数据');
                        }
                    } else {
                        this.$message.error(msg);
                    }
                });
            },
            // 获取交换方式数据
            getChangeTypeData() {
                getAuthChangeTypeData().then(res => {
                    let {
                        code,
                        data,
                        msg
                    } = res;
                    if (code === 200) {
                        for (let item of data) {
                            if (item.exchangeType === 'batch') {
                                item.disabled = true;
                            }
                        }
                        this.changeList = data;
                    } else {
                        this.$message.error(msg);
                    }
                });
            },
            // 获取传输方式数据
            getSransPortData(data) {
                getAuthSransPortData(data).then(res => {
                    let {
                        code,
                        data,
                        msg
                    } = res;
                    if (code === 200) {
                        this.portList = data;
                    } else {
                        this.$message.error(msg);
                    }
                });
            },
            getDataSourceData(val) {
                getListDataSourceInfo(this.userId, val).then(res => {
                    let {
                        code,
                        data
                    } = res;
                    if (code === 200) {
                        this.sourceList = data.map((item) => {
                            item.id = item.id + '';
                            return item;
                        });
                    }
                });
            },
            // 获取字段信息数据
            getCloumnDataByTableId(k, tableInfo) {
                var tableId = tableInfo.tableId;
                this.selectTableId = tableId;
                getTableCloumnData({
                    operatorId: this.userId,
                    tableId: tableId
                }).then(res => {
                    let {
                        code,
                        data,
                        msg
                    } = res;
                    if (code === 200) {
                        var list = data.list;
                        if (!list.length) {
                            return;
                        }
                        this.allTable.push({
                            dataSourceOwnerId: tableInfo.dataSourceOwner,
                            tableId: tableId
                        });
                        this.cloumnList = list.map((item) => {
                            item.tableId = tableId;
                            item.dataSourceOwnerId = tableInfo.dataSourceOwner;
                            item.dataNotNull = (item.dataNotNull ? '否' : '是');
                            return item;
                        });
                    } else {
                        this.$message.error(msg);
                    }
                });
            },
            handleSelectionChange(selection) {
                this.allSelect = selection;
            },
            onOpen(obj = null) {
                if (obj) {
                    let {
                        applyId,
                        exchangeType,
                        dataSourceName,
                        taskId,
                        state,
                        serviceTypeName,
                        serviceType
                    } = obj;
                    this.changeType = exchangeType;
                    this.ruleForm.change = exchangeType;
                    this.ruleForm.port = serviceTypeName;
                    this.ruleForm.datasource = dataSourceName;
                    this.serviceType = serviceType;
                    this.taskId = taskId;
                    this.state = state;
                    if (state === 'review' || state === 'detail') {
                        this.applyId = applyId;

                        listTableDataByApplyId({
                            applyId
                        }).then(res => {
                            let {
                                code,
                                data,
                                msg
                            } = res;
                            if (code === 200) {
                                this.ulData = data.list;
                                if (data.list.length) {
                                    setTimeout(() => {
                                        this.handleCol(0, this.ulData[0]);
                                    }, 400);
                                } else {
                                    this.$message('暂无数据');
                                }
                            } else {
                                this.$message.error(msg);
                            }
                        });
                    }
                } else {
                    this.getRightTable('first');
                }
                this.$refs.dialog.open();
            },
            handleCol(k, tableInfo) {
                this.currentIndex = k;
                $('#scm').children().eq(k).addClass('on').siblings().removeClass('on');
                if (this.state === 'apply') {
                    this.getCloumnDataByTableId(k, tableInfo);
                } else if (this.state === 'review' || this.state === 'detail') {
                    listServiceDataByTableId({
                        applyId: this.applyId,
                        tableId: tableInfo.tableId
                    }).then(res => {
                        let {
                            code,
                            data,
                            msg
                        } = res;
                        if (code === 200) {
                            if (!data.length) {
                                this.ruleForm.serviceValidityStartDate = null;
                                this.ruleForm.serviceValidityEndtype = 0;
                                this.ruleForm.serviceValidityEndDate = null;
                                this.ruleForm.serviceValidityNum = 1;
                                return;
                            }
                            let serviceValStartDate = data[0].serviceValStartDate;
                            if (serviceValStartDate) {
                                serviceValStartDate = new Date(serviceValStartDate);
                            }
                            let serviceValEndDate = data[0].serviceValEndDate;
                            if (serviceValEndDate) {
                                serviceValEndDate = new Date(serviceValEndDate);
                            }
                            let serviceValEndType = data[0].serviceValEndType;
                            if (serviceValEndType) {
                                serviceValEndType = parseInt(serviceValEndType, 10);
                            }
                            let serviceValNum = data[0].serviceValNum;
                            if (serviceValNum) {
                                serviceValNum = parseInt(serviceValNum, 10)
                            }
                            this.ruleForm.serviceValidityStartDate = serviceValStartDate;
                            this.ruleForm.serviceValidityEndtype = serviceValEndType;
                            this.ruleForm.serviceValidityEndDate = serviceValEndDate;
                            this.ruleForm.serviceValidityNum = serviceValNum;
                            console.log(this.ruleForm);
                        } else {
                            this.ruleForm.serviceValidityStartDate = null;
                            this.ruleForm.serviceValidityEndtype = 0;
                            this.ruleForm.serviceValidityEndDate = null;
                            this.ruleForm.serviceValidityNum = 1;
                            this.$message.error(msg);
                        }
                    });
                    listTableDataByTableId({
                        applyId: this.applyId,
                        tableId: tableInfo.tableId
                    }).then(res => {
                        let {
                            code,
                            data,
                            msg
                        } = res;
                        if (code === 200) {
                            var list = data;
                            if (!list.length) {
                                return;
                            }
                            this.cloumnList = list.map((item) => {
                                item.dataNotNull = (item.dataNotNull ? '否' : '是');
                                return item;
                            });
                        } else {
                            this.$message.error(msg);
                        }
                    });
                }
            },
            cancel() {
                this.$refs.dialog.close();
                this.state = 'apply';
                this.tableloading = false;
                this.loading = false;
                this.allObj = {};
                this.ulData = [];
                this.columnList = [];
                this.allSelect = [];
                this.currentIndex = [];
                this.allTable = [];
                this.$refs.ruleForm.resetFields();
                this.$refs.table.clearSelection();
                this.ruleForm.serviceValidityStartDate = null;
                this.ruleForm.serviceValidityEndtype = 0;
                this.ruleForm.serviceValidityNum = 1;
                this.ruleForm.serviceValidityEndDate = null;
                this.refresh();
            },
            confirm() {
                var bool = false;
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        bool = true;
                    } else {
                        bool = false;
                    }
                });
                if (!bool) {
                    return;
                }
                this.loading = true;
                let serviceValidityStartDate = this.ruleForm.serviceValidityStartDate;
                let serviceValidityEndDate = this.ruleForm.serviceValidityEndDate;
                if (serviceValidityStartDate) {
                    serviceValidityStartDate = Date.parse(new Date(serviceValidityStartDate));
                }
                if (serviceValidityEndDate) {
                    serviceValidityEndDate = Date.parse(new Date(serviceValidityEndDate));
                }
                var finalObj = {
                    operatorId: this.userId,
                    exchangeType: this.ruleForm.change,
                    serviceType: this.ruleForm.port,
                    operatorDataSourceId: this.ruleForm.datasource,
                    dataResourcesOwnerList: [],
                    serviceValidityStartDate: serviceValidityStartDate,
                    serviceValidityEndtype: this.ruleForm.serviceValidityEndtype,
                    serviceValidityNum: this.ruleForm.serviceValidityNum,
                    serviceValidityEndDate: serviceValidityEndDate,
                    exchangeServiceId: this.ruleForm.exchangeServiceId
                };
                var data = [];
                for (var i = 0; i < this.allTable.length; i++) {
                    var table = this.allTable[i];
                    var obj = {};
                    obj[table.tableId] = [];
                    for (var j = 0; j < this.allSelect.length; j++) {
                        var select = this.allSelect[j];
                        if (table.tableId === select.tableId) {
                            var id = table.tableId.toString();
                            obj['dataSourceOwnerId'] = select.dataSourceOwnerId;
                            obj[id].push(select.id);
                            data.push(obj);
                        }
                    }
                }
                var ownerIds = data.map((item) => {
                    return item.dataSourceOwnerId;
                });
                ownerIds.sort();
                ownerIds = $.unique(ownerIds);
                var finalData = [];
                for (var k = 0; k < ownerIds.length; k++) {
                    var obj1 = {};
                    obj1.tableColumnList = [];
                    var ownerId = ownerIds[k];
                    for (var l = 0; l < data.length; l++) {
                        if (ownerId === data[l].dataSourceOwnerId) {
                            var aa = data[l];
                            delete aa.dataSourceOwnerId;
                            obj1.dataSourceOwnerId = ownerId;
                            obj1.tableColumnList = $.extend({}, obj1.tableColumnList, aa);
                        }
                    }
                    finalData.push(obj1);
                }
                finalObj.dataResourcesOwnerList = finalData;
                submitResourcesAuthor(finalObj).then(res => {
                    let {
                        code,
                        msg
                    } = res;
                    if (code === 200) {
                        this.$message({
                            type: 'success',
                            message: msg
                        });
                        this.loading = false;
                        this.cancel();
                    } else {
                        this.$message.error(msg);
                        this.loading = false;
                        this.cancel();
                    }
                });
            },
            handleCheckResult(status) {
                this.loading = true;
                var assigneeId = this.userId;
                var aproveStatus = status;
                var approveMessage = this.textarea_msg || '无';
                var taskId = this.taskId;
                var applyId = this.applyId;
                var serviceType = this.serviceType;
                var obj = {
                    assigneeId,
                    aproveStatus,
                    approveMessage,
                    taskId,
                    applyId,
                    serviceType: serviceType
                };
                approveByprocessIdIdAndApplyId(obj).then(res => {
                    let {
                        code,
                        msg
                    } = res;
                    if (code === 200) {
                        this.$message({
                            message: msg,
                            type: 'success'
                        });
                        this.loading = false;
                        this.cancel();
                    } else {
                        this.$message.error(msg);
                        //  this.loading = false;
                    }
                });
            },
            refresh() {
                this.$emit('on-refresh');
            }
        }
}
</script>

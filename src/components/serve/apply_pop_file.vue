<template>
    <div class="apply_pop_file">
        <file-dialog ref="dialog2" @on-close="clearForm" :title="title" id="apply_pop_file" :height="630">
            <template slot="dialog_body">
                <div class="file_left" v-if="!isView">
                    <div class="file_head">交换信息</div>
                    <div class="file_form">
                        <el-form :model="fileForm" :rules="rules" ref="fileForm" label-width="100px" label-position="right">
                            <el-form-item label="交换方式" prop="exchangeService">
                                <el-select v-model="fileForm.exchangeService" placeholder="请选择" @change="exchangeSelect">
                                    <el-option :label="item.exchangeTypeName" :value="item.exchangeType" v-for="item in fileForm.listExchangeType" :key="item.exchangeType"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="传输方式" prop="exchangeServiceId">
                                <el-select v-model="fileForm.exchangeServiceId" placeholder="请选择" @change="transferMethodSelect">
                                    <el-option :label="item.serviceTypeName" :value="item.exchangeServiceId" v-for="item in fileForm.transferMethodList" :key="item.exchangeServiceId"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="接收数据源" prop="operatorDataSourceId">
                                <el-select v-model="fileForm.operatorDataSourceId" placeholder="请选择">
                                    <el-option :label="item.dataSourceName" :value="item.operatorDataSourceId" v-for="item in fileForm.listDataSourceInfo" :key="item.operatorDataSourceId"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="传输周期" style="width:90%">
                                <el-radio-group v-model="fileForm.transferCycleType" size="small">
                                    <el-radio-button label="daily">按天</el-radio-button>
                                    <el-radio-button label="weekly">按周</el-radio-button>
                                    <el-radio-button label="monthly">按月</el-radio-button>
                                </el-radio-group>
                                <div class="hr"></div>
                                <div class="transMode" v-show="fileForm.transferCycleType=='daily'">
                                    <el-radio class="radio" v-model="fileForm.transferCycleDaily.transferCycleSelectType" :label="0">每
                                        <el-input v-model="fileForm.transferCycleDaily.transferCycleSelectValue" placeholder="1" type="number" min="1"></el-input>天</el-radio>
                                    <el-radio class="radio" v-model="fileForm.transferCycleDaily.transferCycleSelectType" :label="1">每个工作日</el-radio>
                                </div>
                                <div class="transMode" v-show="fileForm.transferCycleType=='weekly'">
                                    每
                                    <el-input v-model="fileForm.transferCycleWeekly.transferCycleSelectWeek" placeholder="1" type="number" min="1"></el-input>周
                                    <el-checkbox-group v-model="fileForm.transferCycleWeekly.transferCycleSelectDayList">
                                        <el-checkbox label="MON">星期一</el-checkbox>
                                        <el-checkbox label="TUE">星期二</el-checkbox>
                                        <el-checkbox label="WED">星期三</el-checkbox>
                                        <el-checkbox label="THU">星期四</el-checkbox>
                                        <el-checkbox label="FRI" style="margin-left:0;">星期五</el-checkbox>
                                        <el-checkbox label="SAT">星期六</el-checkbox>
                                        <el-checkbox label="SUN">星期日</el-checkbox>
                                    </el-checkbox-group>
                                </div>
                                <div class="transMode" v-show="fileForm.transferCycleType=='monthly'">
                                    <el-radio class="radio" v-model="fileForm.transferCycleMonthly.transferCycleSelectType" :label="0">每
                                        <el-input v-model="fileForm.transferCycleMonthly.transferCycleMonth" placeholder="1" type="number" min="1"></el-input>个月的第
                                        <el-input v-model="fileForm.transferCycleMonthly.transferCycleDay" placeholder="1" type="number" min="1" max="31"></el-input>天</el-radio>
                                    <div class="hr"></div>
                                    <el-radio class="radio" v-model="fileForm.transferCycleMonthly.transferCycleSelectType" :label="1">每
                                        <el-input v-model="fileForm.transferCycleMonthly.transferCycleMonth" placeholder="1" type="number" min="1"></el-input>个月的第
                                        <el-input v-model="fileForm.transferCycleMonthly.transferCycleOrderNumber" placeholder="1" type="number" min="1" max="31"></el-input>个
                                        <el-select v-model="fileForm.transferCycleMonthly.transferCycleWeekDay" placeholder="请选择" class="select">
                                            <el-option label="星期一" value="MON"></el-option>
                                            <el-option label="星期二" value="TUE"></el-option>
                                            <el-option label="星期三" value="WED"></el-option>
                                            <el-option label="星期四" value="THU"></el-option>
                                            <el-option label="星期五" value="FRI"></el-option>
                                            <el-option label="星期六" value="SAT"></el-option>
                                            <el-option label="星期日" value="SUN"></el-option>
                                        </el-select>
                                    </el-radio>
                                </div>
                            </el-form-item>
                            <el-form-item label="传输时段">
                                <el-time-picker is-range v-model="fileForm.pickTime" placeholder="选择时间范围">
                                </el-time-picker>
                            </el-form-item>
                            <el-form-item label="服务有效期" style="width:90%" required prop="pickPeriod">
                                <el-date-picker v-model="fileForm.serviceValidityStartDate" type="date" placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="" style="width:90%">
                                <el-radio class="radio" v-model="fileForm.serviceValidityEndtype" :label="0">永久</el-radio>
                                <el-radio class="radio" v-model="fileForm.serviceValidityEndtype" :label="1">
                                    <el-input v-model="fileForm.serviceValidityNum" placeholder="1" type="number" min="1" style="width:60px;margin-right:3px;"></el-input>次</el-radio>
                                <div class="hr"></div>
                                <el-radio class="radio" v-model="fileForm.serviceValidityEndtype" :label="2" style="margin-left:0">
                                    <el-date-picker v-model="fileForm.serviceValidityEndDate" type="date" placeholder="选择日期">
                                    </el-date-picker>
                                </el-radio>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <div class="file_left" v-else>
                    <div class="file_head">交换信息</div>
                    <div class="file_form" v-if="showState">
                        <el-form label-width="100px" label-position="right">
                            <el-form-item label="交换方式">
                                {{reviewObj.exchangeTypeName}}
                            </el-form-item>
                            <el-form-item label="传输方式">
                                {{reviewObj.serviceTypeName}}
                            </el-form-item>
                            <el-form-item label="审核状态" v-if="audited">
                                {{reviewObj.capproveStatus}}
                            </el-form-item>
                            <el-form-item label="服务状态" v-if="audited">
                                {{reviewObj.cserviceStatus}}
                            </el-form-item>
                            <el-form-item label="接收数据源">
                                {{reviewObj.operatorSourceName}}
                            </el-form-item>
                            <el-form-item label="传输周期" style="width:90%">
                                <div v-if="reviewObj.transferCycleType==='daily'">
                                    <div v-if="reviewObj.transferCycleSelectType=='0'">
                                        每 {{reviewObj.transferCycleSelectValue}} 天
                                    </div>
                                    <div v-else>每天</div>
                                </div>
                                <div v-else-if="reviewObj.transferCycleType==='weekly'">
                                    每 {{reviewObj.transferCycleSelectWeek}} 周
                                    <div class="hr"></div>
                                    {{reviewObj.transferCycleSelectDayList.map((x)=>{return formatWeek(x)}).join(' , ')}}
                                </div>
                                <div v-else="reviewObj.transferCycleType==='monthly'">
                                    <div v-if="reviewObj.transferCycleSelectType=='1'">
                                        每 {{reviewObj.transferCycleValue}} 个月的第 {{reviewObj.transferCycleOrderNumber}} 个 {{formatWeek(reviewObj.transferCycleWeekDay)}}
                                    </div>
                                    <div v-else>
                                        每 {{reviewObj.transferCycleValue}} 个月的第 {{reviewObj.transferCycleDay}} 天
                                    </div>
                                </div>
                            </el-form-item>
                            <el-form-item label="传输时段" style="width:90%">
                                {{reviewObj.transferStartTime}} ~ {{reviewObj.transferEndTime}}
                            </el-form-item>
                            <el-form-item label="服务有效期" style="width:90%">
                                {{formatTime(reviewObj.serviceValidityStartDate,true)}}
                                <div class="period">
                                    <div v-if="reviewObj.serviceValidityEndType=='0'">永久</div>
                                    <div v-else-if="reviewObj.serviceValidityEndType=='1'">{{reviewObj.serviceValidityNum}} 次</div>
                                    <div v-else>~{{reviewObj.serviceValidityNum}}</div>
                                </div>
                            </el-form-item>
                            <el-form-item label="审核意见" style="width:90%" v-if="!audited">
                                <el-input type="textarea" v-model="reviewObj.approveMessage"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <div class="file_right">
                    <div class="file_head">交换资源信息</div>
                    <div class="table">
                        <el-table :data="tableData" border tooltip-effect="dark" height="100%" style="width: 100%;height:100%" @selection-change="handleSelectionChange">
                            <el-table-column type="selection" width="55" v-if="!isView">
                            </el-table-column>
                            <el-table-column prop="businessFileName" label="文件名" width="120">
                            </el-table-column>
                            <el-table-column prop="cnName" label="中文名称" width="120">
                            </el-table-column>
                            <el-table-column prop="enName" label="英文名称" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="shortName" label="简称" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="ownerUserName" label="拥有者" show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </template>
            <template slot="dialog_footer">
                <div v-if="audited">
                    <el-button type="dcp" @click="onClose">确定</el-button>
                </div>
                <div v-else>
                    <el-button type="text" @click="onClose">关闭</el-button>
                    <el-button class="onSubmit" type="dcp" @click="onSubmit('fileForm')" v-show="!isView"><i class="el-icon-loading" v-if="sending"></i><span v-else>提交</span></el-button>
                    <el-button class="onSubmit" type="dcp" @click="goReview('refused')" v-show="isView"><i class="el-icon-loading" v-if="sending"></i><span v-else>拒绝</span></el-button>
                    <el-button class="onSubmit" type="dcp" @click="goReview('passed')" v-show="isView"><i class="el-icon-loading" v-if="sending"></i><span v-else>通过</span></el-button>
                </div>
            </template>
        </file-dialog>
    </div>
</template>
<style lang="scss">
@import '../../assets/css/colors.scss';
.apply_pop_file {
    .file_head {
        height: 50px;
        text-align: center;
        font-size: 16px;
    }
    .file_left {
        width: 500px;
        height: 100%;
        float: left;
        border-right: 1px solid $dcp--border-color;
        .file_form {
            height: calc(100% - 50px);
            .hr {
                height: 15px;
            }
            .el-form-item {
                display: inline-block;
                width: 48%;
                .transMode {
                    .el-input {
                        width: 60px;
                        margin-right: 3px;
                    }
                    .select {
                        .el-input {
                            width: 100px;
                        }
                    }
                }
                .period {
                    display: inline-block;
                    width: 100px;
                    margin-left: 20px;
                }
            }
        }
    }
    .file_right {
        width: calc(100% - 530px);
        height: 100%;
        float: left;
        .table {
            height: calc(100% - 50px);
        }
    }
    .onSubmit {
        width: 80px;
    }
    .el-textarea__inner {
        background: none!important;
    }
}
</style>
<script>
/* eslint-disable  no-unneeded-ternary */
import {
    getUserId,
    JSONer,
    formatTime
} from '@/assets/js/mUtils'
import fileDialog from '../common/DCPDialog'
export default {
    props: ['title', 'review', 'audited'],
    data() {
        return {
            showState: false,
            serviceType: '',
            fileForm: {
                listExchangeType: [],
                exchangeService: '',
                transferMethodList: [],
                exchangeServiceId: '',
                listDataSourceInfo: [],
                operatorDataSourceId: '',
                transferCycleType: 'daily',
                transferCycleDaily: {
                    transferCycleSelectType: 0,
                    transferCycleSelectValue: '1'
                },
                transferCycleWeekly: {
                    transferCycleSelectType: 0,
                    transferCycleSelectWeek: 1,
                    transferCycleSelectDayList: ['MON'],
                },
                transferCycleMonthly: {
                    transferCycleSelectType: 0,
                    transferCycleMonth: 1,
                    transferCycleDay: 1,
                    transferCycleOrderNumber: 1,
                    transferCycleWeekDay: 'MON',
                },
                serviceValidityEndtype: 0,
                serviceValidityNum: 1,
                pickTime: [new Date(2016, 9, 10, 0, 0), new Date(2016, 9, 10, 23, 59)], // 传输时段
                serviceValidityStartDate: '', // 服务开始时间
                serviceValidityEndDate: '', // 服务结束时间
            },
            rules: {
                exchangeService: [{
                    required: true,
                    message: '请选择一个交换方式',
                    trigger: 'change'
                }],
                exchangeServiceId: [{
                    type: 'number',
                    required: true,
                    message: '请选择一个传输方式',
                    trigger: 'change'
                }],
                operatorDataSourceId: [{
                    type: 'number',
                    required: true,
                    message: '请选择一个接收数据源',
                    trigger: 'change'
                }],
                serviceValidityStartDate: [{
                    type: 'data',
                    required: true,
                    message: '请选择日期',
                    trigger: 'change'
                }],
                serviceValidityEndDate: [{
                    type: 'data',
                    required: true,
                    message: '请选择日期',
                    trigger: 'change'
                }]
            },
            tableData: [],
            multipleSelection: [],
            sending: false,

            reviewObj: {},
            obj: {}
        }
    },
    computed: {
        isView() {
            return (this.review || this.audited) ? true : false;
        },
        transferStartTime() {
            return this.getTime(this.fileForm.pickTime[0]);
        },
        transferEndTime() {
            return this.getTime(this.fileForm.pickTime[1]);
        },
        // serviceValidityStartDate() {
        //     return this.getTime(this.fileForm.pickPeriod[0]);
        // },
        // serviceValidityEndDate() {
        //     return this.getTime(this.fileForm.pickPeriod[1]);
        // },
        fileSelection() {
            var data = this.multipleSelection;
            var box = [];
            for (var i = 0; i < data.length; i++) {
                var f = box.some((s) => {
                    return s.dataSourceOwnerId === data[i].dataSourceOwner
                })
                if (!f) {
                    box.push({
                        dataSourceOwnerId: data[i].dataSourceOwner,
                        fileIdList: [data[i].id]
                    })
                } else {
                    for (var j = 0; j < box.length; j++) {
                        if (box[j].dataSourceOwnerId === data[i].dataSourceOwner) {
                            box[j].fileIdList.push(data[i].id)
                        }
                    }
                }
            }
            return box;
        }
    },
    methods: {
        clearForm() {
            this.fileForm.exchangeService = '';
            this.fileForm.exchangeServiceId = '';
            this.fileForm.operatorDataSourceId = '';
            console.log('this.$refs.fileForm', this.$refs.fileForm)
                // this.$refs.fileForm.resetFields()
        },
        getT(n) {
            var d = new Date(n);
            return d.getTime();
        },
        formatWeek(n) {
            var last = '';
            switch (n) {
                case 'MON':
                    last = '星期一';
                    break;
                case 'TUE':
                    last = '星期二';
                    break;
                case 'WED':
                    last = '星期三';
                    break;
                case 'THU':
                    last = '星期四';
                    break;
                case 'FRI':
                    last = '星期五';
                    break;
                case 'SAT':
                    last = '星期六';
                    break;
                case 'SUN':
                    last = '星期日';
                    break;
            }
            return last;
        },
        formatTime(a, b) {
            return formatTime(a, b);
        },
        getServiceType(exchangeServiceId) {
            var serviceType = '';
            var arr = this.fileForm.transferMethodList
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].exchangeServiceId === exchangeServiceId) {
                    serviceType = arr[i].serviceType
                }
            }
            return serviceType;
        },
        getTime(data) {
            var d = new Date(data);
            return d.getTime();
        },
        onClose() {
            this.$refs.dialog2.close();
        },
        onOpen(obj) {
            this.$refs.dialog2.open();
            this.showState = true;
            if (obj) {
                try {
                    this.obj = JSON.parse(obj)
                } catch (e) {
                    this.obj = obj;
                }
                if (this.obj.serviceId) {
                    this.getResourcesServiceById(this.obj.serviceId)
                } else {
                    this.getListFileDataByApplyId(this.obj.applyId)
                    this.getFileServiceByApplyId(this.obj.applyId)
                }
            } else {
                this.getListExchangeType();
                this.getShowResourcesFileStored();
            }
        },
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('验证成功!');
                    this.onOk()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        onOk() {
            var that = this;

            if (that.sending) {
                that.$message.warning('请求中。。。')
            }

            if (this.fileSelection.length === 0) {
                that.$message.warning('没有选择文件！')
                return;
            }

            if (this.fileForm.serviceValidityStartDate === '' || (this.fileForm.serviceValidityEndtype === 2 && this.fileForm.serviceValidityEndDate === '')) {
                return this.$message.warning('请选择日期')
            }
            if (this.getT(this.fileForm.serviceValidityStartDate) > this.getT(this.fileForm.serviceValidityEndDate)) {
                return this.$message.warning('服务结束时间不能小于开始时间')
            }
            var data = $.extend(JSONer(this.fileForm), {
                dataResourcesOwnerList: this.fileSelection
            });
            data.operatorId = getUserId();
            data.transferStartTime = this.transferStartTime;
            data.transferEndTime = this.transferEndTime;
            // data.serviceValidityStartDate = this.serviceValidityStartDate;
            // data.serviceValidityEndDate = this.serviceValidityEndDate;
            data.serviceType = this.serviceType;
            delete data.listDataSourceInfo;
            delete data.listExchangeType;
            delete data.transferMethodList;
            delete data.pickTime;
            delete data.pickPeriod;

            if (data.transferCycleType === 1 && data.transferCycleWeekly.transferCycleSelectDayList.length === 0) {
                return this.$message.error('传输周期按周至少选择一个！')
            }
            that.sending = true;
            $.ajax({
                    url: `${this.$store.state.common.ip}/dataResourcesAuthor/v1.0/submitResourcesAuthor`,
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify(data),
                })
                .done(function(data) {
                    if (data.code === 200) {
                        that.$message.success(data.msg);
                        that.onClose()
                    } else {
                        that.$message.warning(data.msg);
                    }
                })
                .fail(function(err) {
                    that.$message.error(JSON.stringify(err));
                })
                .always(function() {
                    that.sending = false;
                    that.$emit('on-reflash');
                });
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        getListExchangeType() {
            var that = this;
            $.ajax({
                    url: `${this.$store.state.common.ip}/dataResourcesAuthor/v1.0/listExchangeType`
                })
                .done(function(data) {
                    for (var i = 0; i < data.data.length; i++) {
                        if (data.data[i].exchangeType === 'batch' && that.fileForm.listExchangeType.length === 0) {
                            that.fileForm.listExchangeType.push(data.data[i]);
                        }
                    }
                    that.exchangeSelect('batch')
                })
                .fail(function(err) {
                    that.$message.error(JSON.stringify(err));
                })
                .always(function() {
                    // console.log('complete');
                });
        },
        exchangeSelect(val) {
            var that = this;
            that.fileForm.exchangeServiceId = '';
            $.ajax({
                    url: `${this.$store.state.common.ip}/dataResourcesAuthor/v1.0/listTransPort`,
                    data: {
                        exchangeType: val
                    },
                })
                .done(function(data) {
                    that.fileForm.transferMethodList = data.data
                })
                .fail(function(err) {
                    that.$message.error(JSON.stringify(err));
                })
                .always(function() {
                    // console.log('complete');
                });
        },
        transferMethodSelect(val) {
            var that = this;
            this.serviceType = this.getServiceType(val);
            console.log()
            if (val === '') return;
            that.fileForm.operatorDataSourceId = '';
            $.ajax({
                    url: `${this.$store.state.common.ip}/dataResourcesAuthor/v1.0/listDataSourceInfo`,
                    data: {
                        operatorId: getUserId(),
                        serviceType: this.getServiceType(val),
                    },

                })
                .done(function(data) {
                    that.fileForm.listDataSourceInfo = (data.data === null) ? [] : data.data;
                })
                .fail(function(err) {
                    that.$message.error(JSON.stringify(err));
                })
                .always(function() {
                    // console.log('complete');
                });
        },
        getShowResourcesFileStored() {
            var that = this;
            var datas = {
                operatorId: getUserId()
            };

            $.ajax({
                    url: `${this.$store.state.common.ip}/dataResourcesAuthor/v1.0/showResourcesFileStored`,
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify(datas),
                })
                .done(function(data) {
                    // console.log('success```````````', data);
                    that.tableData = data.data.list;
                })
                .fail(function(err) {
                    that.$message.error(JSON.stringify(err));
                })
                .always(function() {
                    // console.log('complete');
                });
        },
        getListFileDataByApplyId(applyId) {
            var that = this;
            var datas = {
                applyId: applyId
            }

            $.ajax({
                    url: `${this.$store.state.common.ip}/dataResourcesAuthor/v1.0/listFileDataByApplyId`,
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify(datas),
                })
                .done(function(data) {
                    if (data.code === 200) {
                        that.tableData = data.data.list
                    } else {
                        console.log(data.msg)
                    }
                })
                .fail(function(err) {
                    that.$message.error(JSON.stringify(err));
                })
                .always(function() {
                    // console.log('complete');
                });
        },
        getFileServiceByApplyId(applyId) {
            var that = this;
            var datas = {
                applyId: applyId
            }

            $.ajax({
                    url: `${this.$store.state.common.ip}/dataResourcesAuthor/v1.0/fileServiceByApplyId`,
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify(datas),
                })
                .done(function(data) {
                    if (data.code === 200) {
                        that.reviewObj = $.extend({
                            approveMessage: ''
                        }, data.data[0])
                        that.reviewObj = $.extend(that.reviewObj, JSON.parse(that.reviewObj.transferCycleJsonValue), that.obj);
                        console.log(that.reviewObj)
                    } else {
                        console.log(data.msg)
                    }
                })
                .fail(function(err) {
                    that.$message.error(JSON.stringify(err));
                })
                .always(function() {
                    // console.log('complete');
                });
        },
        getResourcesServiceById(serviceId) {
            var that = this;
            var datas = {
                serviceId: serviceId
            }

            $.ajax({
                    url: `${this.$store.state.common.ip}/dataResourcesAuthor/v1.0/resourcesServiceById`,
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify(datas),
                })
                .done(function(data) {
                    if (data.code === 200) {
                        that.reviewObj = $.extend({}, data.data)
                        that.reviewObj = $.extend(that.reviewObj, JSON.parse(that.reviewObj.transferCycleJsonValue), that.obj);
                        setTimeout(() => {
                            that.tableData = that.reviewObj.serviceFileList
                        }, 10)
                        console.log(that.reviewObj)
                    } else {
                        console.log(data.msg)
                    }
                })
                .fail(function(err) {
                    that.$message.error(JSON.stringify(err));
                })
                .always(function() {
                    // console.log('complete');
                });
        },
        goReview(state) {
            var that = this;

            if (that.sending) {
                that.$message.warning('请求中。。。')
            }

            var data = {
                approveMessage: this.reviewObj.approveMessage,
                taskId: this.reviewObj.taskId,
                aproveStatus: state,
                assigneeId: getUserId(),
                applyId: this.reviewObj.applyId,
                serviceType: this.reviewObj.serviceType,
            };
            console.log(data)
            that.sending = true;
            $.ajax({
                    url: `${this.$store.state.common.ip}/dataResourcesAuthor/v1.0/approveByprocessIdIdAndApplyId`,
                    type: 'POST',
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify(data),
                })
                .done(function(data) {
                    if (data.code === 200) {
                        that.$message.success(data.msg);
                        that.onClose()
                    } else {
                        that.$message.warning(data.code + ' ' + data.msg);
                    }
                })
                .fail(function(err) {
                    that.$message.error(JSON.stringify(err));
                })
                .always(function() {
                    that.sending = false;
                    that.$emit('on-reflash');
                });
        }
    },
    mounted() {

    },
    components: {
        fileDialog
    },
    watch: {
        showState(newQuestion) {
            if (newQuestion) {

            }
        },
        fileForm(data) {
            console.log(data)
        }
    }
}
</script>

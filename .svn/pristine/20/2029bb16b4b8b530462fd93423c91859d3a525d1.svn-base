<template>
    <div class="datasource-accessapplication data-box">
        <div class="datasource-topbox">
            <datasource-top @Search='Refrashz'></datasource-top>
        </div>
        <import-export>
            <div slot="btn_group">
                <button @click="openOpera('create')">新增数据源<img class="a" src="../../assets/img/data/import/add.png" alt=""></button>
                <button @click="openImport">导入<img class="addimg" src="../../assets/img/data/import/import.png" alt=""></button>
            </div>
        </import-export>
        <div class="accessapplication-listbox">
            <div class="datasource-list">
                <el-table :data="datalistz" :resizable="true" height="100%" border empty-text="暂无数据" style="width: 100%;" v-loading="tableloading" element-loading-text="拼命加载中">
                    <el-table-column label="数据源ID" show-overflow-tooltip>
                        <template scope="scope">{{scope.row.dataSourceId}}</template>
                    </el-table-column>
                    <el-table-column label="数据源名称" show-overflow-tooltip>
                        <template scope="scope">{{scope.row.dataSourceName}}</template>
                    </el-table-column>
                    <el-table-column label="数据源种类" show-overflow-tooltip>
                        <template scope="scope">{{scope.row.dataSourceKindName }}
                        </template>
                    </el-table-column>
                    <el-table-column label="所属部门" show-overflow-tooltip>
                        <template scope="scope">{{scope.row.vestInOrganiztionName}}</template>
                    </el-table-column>
                    <el-table-column label="创建时间" width="200">
                        <template scope="scope">{{scope.row.createTime}}</template>
                    </el-table-column>
                    <el-table-column label="部署地点" show-overflow-tooltip>
                        <template scope="scope">{{scope.row.deploymentAddressName}}</template>
                    </el-table-column>
                    <el-table-column label="数据源简称" show-overflow-tooltip>
                        <template scope="scope">{{scope.row.dataSourceShortName}}</template>
                    </el-table-column>
                    <el-table-column label="物理地址" show-overflow-tooltip>
                        <template scope="scope">{{scope.row.physicalAddress}}</template>
                    </el-table-column>
                    <el-table-column label="状态" show-overflow-tooltip>
                        <template scope="scope">{{scope.row.aproveStatusName}}</template>
                    </el-table-column>
                    <el-table-column label="操作" width="250">
                        <template scope="scope">
                            <el-button class="jrshHide hand" @click="openOpera('edit',scope.row)" type="text" size="small" :class="(scope.row.aproveStatus==='normal'||scope.row.aproveStatus==='refused') ? 'show':'hide'" title="编辑">
                                <img src="../../assets/img/btn-edit.png" alt="">
                            </el-button>
                            <el-button @click="handlePop('delete', scope.row)" class="jrshHide" type="text" size="small" :class="(scope.row.aproveStatus==='normal'||scope.row.aproveStatus==='refused') ? 'show':'hide'" title="删除">
                                <img src="../../assets/img/btn-delete.png" alt="">
                            </el-button>
                            <el-button @click="handlePop('test', scope.row)" class="jrshHide hand" :class="(scope.row.aproveStatus==='normal'||scope.row.aproveStatus==='refused') ? 'show':'hide'" type="text" size="small" title="测试连接">
                                <img src="../../assets/img/btn-test.png" alt="">
                            </el-button>
                            <el-button @click='lookMag(scope.row)' class="jrshHide hand" type="text" size="small" title="查看">
                                <img src="../../assets/img/btn-detail.png" alt="">
                            </el-button>
                            <el-button @click="handlePop('apply', scope.row)" class="jrshHide hand" :class="((scope.row.aproveStatus==='normal'||scope.row.aproveStatus==='refused')) ? 'show':'hide'" type="text" size="small" title="提交审核">
                                <img src="../../assets/img/btn-submit.png" alt="">
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage3" :page-size="20" layout="total,  prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <div class="accessapplication-model">
            <!--导入组件-->
            <dcp-import ref="import" title="数据源导入" downloadAddress="/Batch/v1.0/DownDataSourceTemplateFile/数据源" serverAddress="/Batch/v1.0/uploadExcelFile"></dcp-import>
            <data-details-tree ref='Datadetailsevent'></data-details-tree>
            <datasource-link ref='Datalinkevent'></datasource-link>
            <modal-box :visible="submitmodalvisible" titlename="提交确认" btnname="" @click-close="Offsubmitmodal" class='submitbox'>
                <div slot="jdb" class="submit jz">
                    <p class="fTitle">是否提交数据源接入审核？</p>
                    <ul>
                        <li v-on:click='submitOff' class="hand">取消</li>
                        <li v-on:click='submitOk' class="hand" v-loading='loadingbtnsub'>确认</li>
                    </ul>
                </div>
            </modal-box>
            <modal-box :visible="deletemodalvisible" titlename="" btnname="" @click-close="Offdelectmodal" class='delectbox'>
                <div slot="jdb" class="delect jz">
                    <div class="delectBox jz">
                        <p>确认删除</p>
                        <ul>
                            <li v-on:click='delectOff' class="hand">取消</li>
                            <li v-on:click='delectOk' class="hand" v-loading='loadingbtndel'>确认</li>
                        </ul>
                    </div>
                </div>
            </modal-box>
        </div>
        <data-operation ref="opera" @on-refresh="onRefresh"></data-operation>
        <data-detail ref="detail"></data-detail>
        <data-pop ref="data_pop" @on-refresh="onRefresh"></data-pop>
    </div>
</template>
<script>
//  赵凯芳重构头部引入组件
import datasourceTop from './datasourceTop.vue';
//  赵凯芳引入详情和树状结构
import dataDetailsTree from './dataDetailsAndTree.vue';
//  赵凯芳引入测试链接组件
import datasourceLink from './datasourceLink.vue';
import DcpImport from '../common/DCPImport';
import addAndedit from './addAndedit';
import modalBox from '../common/ModalBox';
import DataOperation from './dataOperation'
import DataDetail from './dataDetail';
import DataPop from './dataPop';

import importExport from '../common/import_export'
import {
    getCascad,
    myToNumber,
    getSessionStore,
    formatTime
} from '../../assets/js/mUtils';
import {
    dataList,
    delectOne,
    submitOne,
} from '../../assets/js/queryData';
export default {
    data() {
            return {
                submitmodalvisible: false,
                deletemodalvisible: false,
                tableloading: false,
                datalistz: [],
                currentPage3: 1,
                total: 0,
                usermsg: {},
                datamagOne: null,
                delId: null,
                delIndex: null,
                loadingbtndel: false,
                submitId: null,
                submitUserId: null,
                submitInde: null,
                loadingbtnsub: false
            }
        },
        beforeUpdate() {},
        updated() {},
        created() {
            this.usermsg = getSessionStore('userInfo');
        },
        mounted() {
            // dataList({
            //     'pageNum': 1,
            //     'pageSize': 20,
            //     'userId': this.usermsg.id,
            //     'roleId': this.usermsg.roleId
            // }).then(res => {
            //     this.tableloading = false;
            //     if (res.code === 200) {
            //         console.log(res);
            //         this.datalistz = res.data.list;
            //         for (var i = 0; i < this.datalistz.length; i++) {
            //             this.datalistz[i].checkChild = false;
            //             this.datalistz[i].createTime = formatTime(this.datalistz[i].createTime);
            //         }
            //         this.total = res.data.total;
            //         if (this.datalistz.length === 0) this.$message.success('没有数据');
            //     } else if (res.code === 300) {
            //         this.tableloading = false;
            //         this.$message.success(res.msg);
            //     } else {
            //         this.tableloading = false;
            //         this.$message.error(res.msg);
            //     }
            // });
            this.getTableData({
                'pageNum': this.currentPage3,
                'pageSize': 20,
                'userId': this.usermsg.id,
                'roleId': this.usermsg.roleId
            });
        },
        computed: {},
        components: {
            datasourceTop,
            dataDetailsTree,
            datasourceLink,
            modalBox,
            addAndedit,
            DcpImport,
            importExport,
            DataOperation,
            DataDetail,
            DataPop
        },
        methods: {
            getTableData(obj) {
                dataList(obj).then(res => {
                    this.tableloading = false;
                    if (res.code === 200) {
                        console.log(res);
                        this.datalistz = res.data.list;
                        for (var i = 0; i < this.datalistz.length; i++) {
                            this.datalistz[i].checkChild = false;
                            this.datalistz[i].createTime = formatTime(this.datalistz[i].createTime);
                        }
                        this.total = res.data.total;
                        if (this.datalistz.length === 0) this.$message.success('没有数据');
                    } else if (res.code === 300) {
                        this.tableloading = false;
                        this.$message.success(res.msg);
                    } else {
                        this.tableloading = false;
                        this.$message.error(res.msg);
                    }
                });
            },
            onRefresh() {
                this.getTableData({
                    'pageNum': this.currentPage3,
                    'pageSize': 20,
                    'userId': this.usermsg.id,
                    'roleId': this.usermsg.roleId
                });
            },
            handlePop(state, row) {
                this.$refs.data_pop.open(state, row);
            },
            Refrashz(val) {
                dataList({
                    'pageNum': this.currentPage3,
                    'pageSize': 20,
                    'userId': this.usermsg.id,
                    'dataSourceName': val,
                    'roleId': this.usermsg.roleId
                }).then(res => {
                    console.log(res);
                    this.loading2 = false;
                    this.datalistz = res.data.list;
                    console.log(this.datalistz);
                    for (var i = 0; i < this.datalistz.length; i++) {
                        this.datalistz[i].checkChild = false;
                        this.datalistz[i].createTime = formatTime(this.datalistz[i].createTime);
                    }
                    this.total = res.data.total;
                    this.loading2 = false;
                    this.showimg1 = true;
                    this.showimg2 = false;
                    this.showimg3 = false;
                });
            },
            openImport() {
                this.$refs.import.open();
            },
            setTimeoutFunction(csfunction) {
                setTimeout(csfunction, 2000)
            },
            submitMoudle(csubmitId, csubmitUserId, cindex) {
                this.submitmodalvisible = true;
                this.submitId = csubmitId;
                this.submitUserId = csubmitUserId;
                this.submitIndex = cindex;
                this.datalistz[this.submitIndex].checkChild = true;
                console.log('&&&&&&');
                console.log(this.submitId);
                console.log(this.submitUserId);
            },
            submitOff() {
                //  $('.data-submit-modle').addClass('hide');
                this.submitmodalvisible = false;
                this.submitId = null;
                this.submitUserId = null;
                this.submitIndex = null;
                this.loadingbtnsub = false;
            },
            Offsubmitmodal() {
                this.submitmodalvisible = false;
            },
            submitOk() {
                this.loadingbtnsub = true;
                submitOne(this.submitId, this.submitUserId).then(res => {
                    console.log('res提交', res);
                    if (res.code === 200) {
                        this.datalistz[this.submitIndex].aproveStatus = 'approving';
                        // $('.data-submit-modle').addClass('hide');
                        this.submitmodalvisible = false;
                        this.loading2 = true;
                        this.datalistz = [];
                        //  当提交成功后重新刷新页面的数据
                        //  数据源申请接入页面
                        this.querydataList();
                        this.loadingbtnsub = false;
                    } else if (res.code === 300) {
                        this.submitmodalvisible = false;
                        this.loadingbtnsub = false;
                        this.$message.success(res.msg);
                    } else {
                        this.submitmodalvisible = false;
                        this.loadingbtnsub = false;
                        this.$message.error(res.msg);
                        // this.$alert('失败原因:' + res.msg, '获取数据失败！', {
                        //     confirmButtonText: '确定',
                        // });
                    }
                });
            },

            testLinkMoudle(ctestLinkId, ctestIndex) {
                $('.data-testLink-modle').removeClass('hide');
                this.$refs.Datalinkevent.ShowtestLinkMoudle(ctestLinkId, ctestIndex);
            },

            delectMoudle(cdelId, cindex) {
                // $('.data-delect-modle').removeClass('hide');
                this.deletemodalvisible = true;
                this.delId = cdelId;
                this.delIndex = cindex;
            },
            delectOff() {
                // $('.data-delect-modle').addClass('hide');
                this.deletemodalvisible = false;
                this.delId = null;
                this.delIndex = null;
            },
            delectOk() {
                delectOne(this.delId);
                this.deletemodalvisible = false;
                this.tableloading = true;
                this.querydataList();
            },
            Offdelectmodal() {
                this.deletemodalvisible = false;
                this.delId = null;
                this.delIndex = null;
            },
            lookMag(row) {
                this.$refs.detail.open({
                    dataSourceId: row.dataSourceId,
                    dataSourceKind: row.dataSourceKind
                });
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage3 = val;
                this.tableloading = true;
                console.log(`当前页: ${val}`);
                this.querydataList();
            },
            querydataList() {
                //  数据源申请接入页面
                dataList({
                    'pageNum': this.currentPage3,
                    'pageSize': 20,
                    'userId': this.usermsg.id,
                    'roleId': this.usermsg.roleId
                }).then(res => {
                    if (res.code === 200) {
                        this.datalistz = res.data.list;
                        for (var i = 0; i < this.datalistz.length; i++) {
                            this.datalistz[i].checkChild = false;
                            this.datalistz[i].createTime = formatTime(this.datalistz[i].createTime);
                        }
                        this.total = res.data.total;
                    } else if (res.code === 300) {
                        this.$message.success(res.msg);
                    } else {
                        this.$message.error(res.msg);
                        // this.$alert('失败原因:' + res.msg, '获取数据失败！', {
                        //     confirmButtonText: '确定',
                        // });
                    }
                    this.tableloading = false;
                });
            },
            openOpera(state, row) {
                if (typeof row === 'undefined') {
                    row = {};
                }
                this.$refs.opera.open(state, row);
            },

            // 注意：下面是jdb's代码，请不要再这条注释下添加代码，以免混乱
            modalDataSource(state, index) {
                // 判断是点击还是修改
                if (this.usermsg.roleId === 1) {
                    this.$refs.addedit.owershow = true;
                    this.$refs.addedit.putongshow = false;
                } else if (this.usermsg.roleId === 2) {
                    this.$refs.addedit.owershow = false;
                    this.$refs.addedit.putongshow = true;
                }
                if (state === 'create') {
                    // 如果是新增
                    this.$refs.addedit.modalType = 'create';
                    this.$store.commit('CHECK_FLAG', true);
                    this.$refs.addedit.inputstate = false;
                    this.$refs.addedit.titlename = '新增数据源(1/3)';
                    this.$refs.addedit.form = Object.assign({}, this.$refs.addedit.formtpl);
                    // 点击后显示第一页的数据
                    this.$refs.addedit.state = true;
                    this.$refs.addedit.state2 = false;
                    this.$refs.addedit.state3 = false;
                    this.$refs.addedit.state4 = false;
                    this.$refs.addedit.addFormVisible = true;
                } else {
                    // 否则就是修改,修改的话首先，把数据源给modal，然后再显示弹窗
                    this.$refs.addedit.modalType = 'edit';
                    this.$store.commit('CHECK_FLAG', false);
                    this.$refs.addedit.titlename = '修改数据源(1/3)';
                    this.datalistz[index].isConnect = false;
                    // this.datalistz[index].deploymentAddress = getCascad(this.datalistz[index].deploymentAddress);
                    // this.datalistz[index].enableDisable = myToNumber(this.datalistz[index].enableDisable);
                    this.$refs.addedit.form = Object.assign({}, this.datalistz[index]);
                    console.log('this.datalistz[index]:', this.datalistz[index]);
                    this.$refs.addedit.form.deploymentAddress = getCascad(this.$refs.addedit.form.deploymentAddress);
                    this.$refs.addedit.form.enableDisable = myToNumber(this.$refs.addedit.form.enableDisable);
                    // this.$refs.addedit.form.isConnect = false;
                    console.log('this.$refs.addedit.form:', this.$refs.addedit.form);
                    this.$refs.addedit.inputstate = true;
                    // 点击后显示第一页的数据
                    this.$refs.addedit.state = true;
                    this.$refs.addedit.state2 = false;
                    this.$refs.addedit.state3 = false;
                    this.$refs.addedit.state4 = false;
                    this.$refs.addedit.addFormVisible = true;
                }
            },
            refarshList() {
                // 重新刷新数据申请页面的表格
                this.querydataList();
            }
        }
}
</script>
<style lang="scss">
@import '../../assets/css/data/datasourceAccessapplication.scss';
@import '../../assets/css/data/dataCommon.scss';
.accessapplication-listbox {
    height: 100%;
}

.datasource-accessapplication .datasource-list {
    height: 100%;
    .el-table {
        height: 100%!important;
    }
}
</style>

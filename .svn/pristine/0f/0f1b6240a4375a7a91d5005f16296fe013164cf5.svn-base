<template>
    <div class="datasource-accessaudit data-box">
        <div class="datasource-topbox">
            <div class="search-box">
                <input type="text" id="search" placeholder="请输入关键字" @keypress="presskey">
            </div>
        </div>
        <div class="accessaudit-listbox">
            <div class="datasource-list">
                <el-table :data="datalistz" :resizable="true" border empty-text="暂无数据" height='660' style="width: 100%" v-loading="tableloading" element-loading-text="拼命加载中">
                    <el-table-column label="数据源ID" show-overflow-tooltip>
                        <template scope="scope">{{scope.row.dataSourceId}}</template>
                    </el-table-column>
                    <el-table-column label="数据源名称" show-overflow-tooltip>
                        <template scope="scope">{{scope.row.dataSourceName}}</template>
                    </el-table-column>
                    <el-table-column label="数据源种类" show-overflow-tooltip>
                        <template scope="scope">{{scope.row.dataSourceKindName}}</template>
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
                            <el-button @click='Lookaduitdetails(scope.row)' class="jrshHide2 hand" type="text" size="small" title="审核">
                                <img src="../../assets/img/btn-apply.png" alt="">
                            </el-button>
                            <el-button @click='Showauditlogging(scope.row.dataSourceId)' class="jrshHide2 hand" type="text" size="small" title="查看审核记录">
                                <img src="../../assets/img/btn-record.png" alt="">
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
        <div class="accessaudit-model">
            <audit-details-tree ref='Auditdetailsevent' @Auditdetailspass='Auditdetailspassevent' :rescode='rescodeandmsg'></audit-details-tree>
            <audit-logging ref='Auditlogging'></audit-logging>
        </div>
        <data-review ref="data_review" @on-refresh="onRefresh"></data-review>
    </div>
</template>
<script>
//  赵凯芳引入详情和树状结构
import auditDetailsTree from './auditDetailsAndTree.vue';
import auditLogging from './auditLogging.vue';
import {
    getSessionStore,
    formatTime
} from '../../assets/js/mUtils';
import {
    datasourceApproveList,
    datasourceApproveStatus,
} from '../../assets/js/queryData';
import DataReview from './dataReview';
//  import formatTime from 'formatTime';
export default {
    data() {
            return {
                tableloading: true,
                datalistz: [],
                currentPage3: 1,
                total: 0,
                usermsg: {},
                datasourceApproveStatusData: null,
                passid: null,
                datamagOne: null,
                treeparameter: {
                    threeid2: null,
                    threepassword2: null,
                    threeport2: null,
                    threedbName2: null,
                    threeip2: null,
                    threeuserName2: null,
                },
                threeTwo: [],
                threeTwotable: [],
                rescodeandmsg: {
                    code: 200,
                    msg: '',
                },
            }
        },
        beforeUpdate() {},
        updated() {},
        created() {
            // try {
            //     this.usermsg = getSessionStore('userInfo');
            // } catch (e) {

            // }
            this.usermsg = getSessionStore('userInfo');
        },
        mounted() {
            this.getTableData({
                'pageNum': this.currentPage3,
                'pageSize': 20,
                'userId': this.usermsg.id
            });
        },
        computed: {},
        components: {
            auditLogging,
            auditDetailsTree,
            DataReview
        },
        methods: {
            onRefresh() {
                this.getTableData({
                    'pageNum': this.currentPage3,
                    'pageSize': 20,
                    'userId': this.usermsg.id
                });
            },
            getTableData(obj) {
                datasourceApproveList(obj).then(res => {
                    if (res.code === 200) {
                        this.datalistz = res.data.list;
                        for (var i = 0; i < this.datalistz.length; i++) {
                            this.datalistz[i].checkChild = false;
                            this.datalistz[i].createTime = formatTime(this.datalistz[i].createTime);
                        }
                        this.total = res.data.total;
                    } else if (res.code === 300) {
                        //  300为没有数据返回，给表格数据置空
                        this.datalistz = [];
                        this.total = 0;
                    } else {
                        this.$message.error(res.msg);
                    }
                    this.tableloading = false;
                });
            },
            // 回车搜索
            presskey(e) {
                if (e.keyCode === 13) {
                    // 数据源介入审核
                    console.log('数据源接入审核');
                    this.tableloading = true;
                    //  this.querydatasourceApproveList();
                    datasourceApproveList(this.usermsg.id, e.target.value).then(res => {
                        if (res.code === 200) {
                            this.datalistz = res.data.list;
                            console.log(this.datalistz)
                            for (var i = 0; i < this.datalistz.length; i++) {
                                this.datalistz[i].checkChild = false;
                                this.datalistz[i].createTime = formatTime(this.datalistz[i].createTime);
                            }
                            this.total = res.data.total;
                            this.tableloading = false;
                            console.log(this.datalistz);
                        } else if (res.code === 300) {
                            this.tableloading = false;
                            this.$message.success(res.msg);
                        } else {
                            this.tableloading = false;
                            this.$message.error(res.msg);
                            // this.$alert('失败原因:' + res.msg, '获取数据失败！', {
                            //     confirmButtonText: '确定',
                            // });
                        }
                    });
                }
            },
            querydatasourceApproveList() {
                //  数据源介入审核
                datasourceApproveList(this.usermsg.id).then(res => {
                    console.info('res:', res);
                    if (res.code === 200) {
                        this.datalistz = res.data.list;
                        console.log(this.datalistz)
                        for (var i = 0; i < this.datalistz.length; i++) {
                            this.datalistz[i].checkChild = false;
                            this.datalistz[i].createTime = formatTime(this.datalistz[i].createTime);
                        }
                        this.total = res.data.total;
                        this.tableloading = false;
                    } else if (res.code === 300) {
                        //  300为没有数据返回，给表格数据置空
                        this.datalistz = [];
                        this.tableloading = false;
                        this.total = 0;
                        this.$message.success(res.msg);
                        // this.$alert('失败原因:' + res.msg, '获取数据失败！', {
                        //     confirmButtonText: '确定',
                        // });
                    } else {
                        this.tableloading = false;
                        this.$message.error(res.msg);
                        // this.$alert('失败原因:' + res.msg, '获取数据失败！', {
                        //     confirmButtonText: '确定',
                        // });
                    }
                });
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage3 = val;
                this.tableloading = true;
                console.log(`当前页: ${val}`);
                //  数据源介入审核
                this.querydatasourceApproveList();
            },
            Showauditlogging(cid) {
                this.$refs.Auditlogging.Showauditloggingbox();
                datasourceApproveStatus(cid, 'datasource').then(res => {
                    if (res.code === '200') {
                        this.datasourceApproveStatusData = res.list;
                        for (var m = 0; m < res.list.length; m++) {
                            this.datasourceApproveStatusData[m].ADD_DATE = formatTime(this.datasourceApproveStatusData[m].ADD_DATE);
                        }
                        console.log('Showauditlogging---res', res)
                        this.$refs.Auditlogging.Showauditloggingdata(this.datasourceApproveStatusData);
                        console.log('this.datasourceApproveStatusData', this.datasourceApproveStatusData)
                    } else if (res.code === '300') {
                        this.$message.success(res.msg);
                    } else {
                        this.$message.error(res.msg);
                        // this.$alert('失败原因:' + res.msg, '获取数据失败！', {
                        //     confirmButtonText: '确定',
                        // });
                    }
                })
            },
            Lookaduitdetails(row) {
                this.$refs.data_review.open({
                    dataSourceId: row.dataSourceId,
                    dataSourceKind: row.dataSourceKind
                }, row.taskID);
                // this.$refs.Auditdetailsevent.Showaduitdetail(ctaskId, this.usermsg, this.treeparameter);
                // this.datamagOne = this.datalistz[cIndex];
                // this.$refs.Auditdetailsevent.Aduitdetaildata(this.datamagOne);
                // this.treeparameter.threeid2 = cid;
                // this.treeparameter.threepassword2 = this.datalistz[cIndex].password;
                // this.treeparameter.threeport2 = this.datalistz[cIndex].port;
                // this.treeparameter.threedbName2 = this.datalistz[cIndex].dataBaseName;
                // this.treeparameter.threeip2 = this.datalistz[cIndex].ipAddress;
                // this.treeparameter.threeuserName2 = this.datalistz[cIndex].username;
                // this.threeTwo = [];
                // this.threeTwotable = [];
                // datasourcejrshThreez(this.treeparameter.threeid2, this.treeparameter.threepassword2, this.treeparameter.threeport2, this.treeparameter.threedbName2, this.treeparameter.threeip2, this.treeparameter.threeuserName2, this.datamagOne.dataBaseType).then(res => {
                //     this.rescodeandmsg = res;
                //     // this.rescodeandmsg.msg = res.msg;
                //     console.log('resfuzhi********', res)
                //     console.log('aduit-res', res)
                //     let fatemparr = [];
                //     if (res.code === 200) {
                //         console.log('aduittreedata', res.data)
                //         for (var i = 1; i < res.data.length; i++) {
                //             if (res.data[i].selected === 1) {} else {
                //                 console.log('res.data[i]', res.data[i])
                //                 let tempobj = {};
                //                 let temparr = [];
                //                 tempobj.id = i;
                //                 tempobj.label = res.data[i].dbName;
                //                 // tempobj.selected = res.data[i].selected;
                //                 for (let j in res.data[i].tables) {
                //                     let tempobjj = {};
                //                     tempobjj.label = res.data[i].tables[j].tableName;
                //                     tempobjj.id = res.data[i].tables[j].sourceTableId;
                //                     temparr.push(tempobjj);
                //                 }
                //                 tempobj.children = temparr;
                //                 fatemparr.push(tempobj);
                //             }
                //         }
                //         console.log('fatemparrjdbjdbjdbjdbjdbjdb:', JSON.stringify(fatemparr));
                //         //  执行ref
                //         //  this.data2 = fatemparr;
                //         //   this.$refs.Datadetailsevent.Assignmenttree(fatemparr); //   
                //         console.log('%%%%threeBtnModule2jdb%%%%%%', res)
                //         this.threeTwo = [];
                //         for (var m = 0; m < res.data.length; m++) {
                //             if (res.data[m].selected === 1) {

                //             } else {
                //                 this.threeTwo.push(res.data[m])
                //             }
                //         }
                //         var threeTwoTablecopy = [];
                //         console.log('1234567890jdb:', this.threeTwo);
                //         for (var k = 0; k < this.threeTwo.length; k++) {
                //             console.log(this.threeTwo[k].tables);
                //             for (var j = 0; j < this.threeTwo[k].tables.length; j++) {
                //                 var nameObj = this.threeTwo[k].tables[j];
                //                 threeTwoTablecopy.push(nameObj)
                //             }
                //         }
                //         this.threeTwotable = threeTwoTablecopy;
                //         this.$refs.Auditdetailsevent.Aduittreedata(this.threeTwo, this.threeTwotable, fatemparr);
                //     } else if (res.code === 300) {
                //         fatemparr = [];
                //         this.threeTwo = [];
                //         this.threeTwotable = [];
                //         this.$refs.Auditdetailsevent.Aduittreedata(this.threeTwo, this.threeTwotable, fatemparr);
                //         // 把code传过去组件点击树时会处理
                //     } else {
                //         fatemparr = [];
                //         this.threeTwo = [];
                //         this.threeTwotable = [];
                //         this.$refs.Auditdetailsevent.Aduittreedata(this.threeTwo, this.threeTwotable, fatemparr);
                //         console.log('树状结构')

                //         // 把code传过去组件点击树时会处理
                //         // this.$message.error(res.msg);
                //     }
                // })
            },
            Auditdetailspassevent() {
                this.querydatasourceApproveList();
            },
        }
}
</script>
<style lang="scss">
.datasource-accessaudit {
    @import '../../assets/css/data/datasource-topbox.scss';
    .accessaudit-listbox {
        height: 100%;
    }
    .datasource-list {
        height: 100%;
        .el-table {
            height: 100%!important;
        }
    }
}

@import "../../assets/css/data/dataCommon.scss";
//  @import '../../style/data/datasourceAccessapplication';
</style>

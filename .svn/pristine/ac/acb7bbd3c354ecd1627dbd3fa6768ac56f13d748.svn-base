<template>
    <!--  <div class="  aduit-detail-modle jz hide"> -->
    <modal-box :visible="aduitdetailemodalvisible" titlename="" btnname="" @click-close="Offaduitdetailemodal" class='aduitdetailbox'>
        <div slot="jdb" class="aduit-detail jz">
            <div class="head">
                <p class="audit-detail-btn hand" v-on:click='Showauditdetaildata'>数据详情</p>
                <p class="audit-three-btn hand" v-on:click='Showauditthree'>树状结构</p>
            </div>
            <div class="shdataxqMain" id="shdataxqMain2">
                <div class="shdataxqMainScrollBox" id="aduittreezkf">
                    <div class="sjxqBox">
                        <div class="sjxqBoxMain">
                            <!-- <el-scrollbar show="true" class="treestrcscroll" wrap-class="treestructer__wrap"> -->
                            <div class="aduit-details-scroll">
                                <data-details :detailsData="datamagOne"></data-details>
                            </div>
                            <!-- </el-scrollbar> -->
                        </div>
                    </div>
                    <div class="threebox hide">
                        <div class="treetop__wrap  aduittreetop__wrap">
                            <div class="title">数据源结构</div>
                            <el-scrollbar class="treestrcscroll" wrap-class="treestructer__wrap" show="true">
                                <div class="treestructer">
                                    <!-- 树结构 -->
                                    <el-tree class="filter-tree" :data="datatree" :props="defaultProps" ref="treedetails" @node-click="handleNodeClick" :highlight-current="true">
                                    </el-tree>
                                    <!-- 树结构 -->
                                </div>
                            </el-scrollbar>
                        </div>
                        <div class="tablestructer  aduit-tablestructer">
                            <!-- 树状结构中的表格 -->
                            <el-table :data="threeTableOne" height="270" style="width:100%;" :row-class-name="tableRowClassName">
                                <el-table-column prop="columnName" label="字段名称" width="180" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="dataType" label="字段类型" width="180" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="dataLength" label="字段长度" :formatter="formatdataLength" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="dataPrecision" label="字段精度" :formatter="formatdataPrecision" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="dataNotNull" label="是否非空" :formatter="formatdataNotNull" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="dataConstraintType" label="键类型" show-overflow-tooltip>
                                </el-table-column>
                            </el-table>
                            <!-- 树状结构中的表格 -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="shyjModule">
                <textarea name="yjtext" cols="137" rows="9" placeholder="请填写意见" v-model="shmessage" />
            </div>
            <div class="foot">
                <span class="colorred" style="margin-top:20px;margin-left:20px;" :class="redtips?' ':'hide'">*标红字段为使用方数据库未匹配项</span>
                <p v-on:click="getSh" id="getSh" class="hand" v-loading='loadingbtngetsh'>通过</p>
                <p v-on:click="notGetSh" class="hand" v-loading='loadinrejected'>驳回</p>
            </div>
            <div class="shmessageBox jz hide">
                <p class="jz"><i>请填写审核内容!!!!!</i><span v-on:click='Offauditopinion' class="hand">X</span></p>
            </div>
        </div>
    </modal-box>
    <!-- </div>
 -->
</template>
<script>
import DataDetails from './dataDetails';
import {
    // datasourceThreeTablez,
    shPass,
} from '../../assets/js/queryData';
import modalBox from '../common/ModalBox';
export default {
    props: {
        rescode: null,
    },
    data() {
        return {
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            datamagOne: null,
            passid: null,
            redtips: false,
            threeTwo: [],
            threeTwotable: [],
            loading2: false,
            shmessage: null,
            offother: true,
            showHide: true,
            threeTableOne: null,
            loadingbtngetsh: false,
            loadinrejected: false,
            usermsg: {},
            treeparameter: null,
            datatree: [{}],
            aduitdetailemodalvisible: false,
            selectidtwo: [],
        }
    },
    beforeUpdate() {
        //  console.info('beforeUpdate');
    },
    updated() {
        //  console.info('updated');
    },
    created() {},
    mounted() {

    },
    computed: {

    },
    components: {
        DataDetails,
        modalBox,
    },
    methods: {
        tableRowClassName(row, index) {
            console.log(row);
            if (row.selected === 2) {
                return 'info-row';
            }
        },
        setTimeoutFunction(csfunction) {
            setTimeout(csfunction, 2000)
        },
        getSh() {
            // var that = this;
            let tempstr = '';
            console.log('tongg')
            if (this.shmessage === '' || this.shmessage === null) {
                tempstr = '无';
            } else {
                tempstr = this.shmessage;
            }
            this.loadingbtngetsh = true;
            shPass(this.usermsg.id, this.treeparameter.threeid2, this.passid, 'passed', tempstr).then(res => {
                console.log('this.shmessage')
                console.log(res.code)
                if (res.code === 200) {
                    this.loadingbtngetsh = false;
                    this.$message.success(res.msg);
                    // this.$alert('审核成功', '提示', {
                    //     confirmButtonText: '确定',
                    // });
                    this.aduitdetailemodalvisible = false;
                    this.selectidtwo = [];
                    this.datatree = [{}];
                    $('.threebox').addClass('hide');
                    $('.sjxqBox').removeClass('hide');
                    this.redtips = false;
                    this.threeTableOne = null;
                    this.shmessage = '';
                    // $('.shmessageBox p i').html('审核成功')
                    // $('.shmessageBox').removeClass('hide')
                    //  alert('审核成功');
                    this.offother = false;
                    // 重新加载数据
                    console.log('审核成功后重新加载数据')
                    this.loading2 = true;
                    this.$emit('Auditdetailspass');
                } else if (res.code === 300) {
                    this.aduitdetailemodalvisible = false;
                    this.selectidtwo = [];
                    this.datatree = [{}];
                    $('.threebox').addClass('hide');
                    $('.sjxqBox').removeClass('hide');
                    this.redtips = false;
                    this.threeTableOne = null;
                    this.shmessage = '';
                    this.loadingbtngetsh = false;
                    this.loading2 = false;
                    $('.shmessageBox p i').html(res.msg);
                    this.$message.success(res.msg);
                } else {
                    this.aduitdetailemodalvisible = false;
                    this.selectidtwo = [];
                    this.datatree = [{}];
                    $('.threebox').addClass('hide');
                    $('.sjxqBox').removeClass('hide');
                    this.redtips = false;
                    this.threeTableOne = null;
                    this.shmessage = '';
                    this.loadingbtngetsh = false;
                    this.loading2 = false;
                    $('.shmessageBox p i').html(res.msg);
                    this.$message.error(res.msg);
                }
                var setTimeoutCs = function() {
                    $('.shmessageBox').addClass('hide')
                    $('.shmessageBox p i').html('请输入审核意见')
                        //  $('.aduit-detail-modle').addClass('hide');
                    this.aduitdetailemodalvisible = false;
                    this.selectidtwo = [];
                    this.datatree = [{}];
                    $('.threebox').addClass('hide');
                    $('.sjxqBox').removeClass('hide');
                    this.redtips = false;
                    this.threeTableOne = null;
                    this.offother = true;
                    this.shmessage = '';
                    this.loadingbtngetsh = false;
                };
                clearTimeout(this.setTimeoutFunction);
                this.setTimeoutFunction(setTimeoutCs);
            })
        },
        notGetSh() {
            // var that = this;
            let tempstr = '';
            if (this.shmessage === '' || this.shmessage === null) {
                tempstr = '无';
            } else {
                tempstr = this.shmessage;
            }
            this.loadinrejected = true;
            console.log('this.usermsg', this.usermsg)
            console.log('this.treeparameter', this.treeparameter)
            this.aduitdetailemodalvisible = false;
            this.selectidtwo = [];
            this.datatree = [{}];
            $('.threebox').addClass('hide');
            $('.sjxqBox').removeClass('hide');
            this.redtips = false;
            shPass(this.usermsg.id, this.treeparameter.threeid2, this.passid, 'refused', tempstr).then(res => {
                this.shmessage = '';
                console.log('this.shmessage')
                console.log(res.code)
                if (res.code === 200) {
                    this.loadinrejected = false;
                    this.$message.success(res.msg);
                    this.threeTableOne = null;
                    this.offother = false;
                    // 重新加载数据
                    console.log('审核成功后重新加载数据')
                    this.loading2 = true;
                    // 数据源介入审核
                    //  this.querydatasourceApproveList();
                    this.$emit('Auditdetailspass');
                } else if (res.code === 300) {
                    this.loadinrejected = false;
                    this.threeTableOne = null;
                    this.loading2 = false;
                    $('.shmessageBox p i').html(res.msg);
                    this.$message.success(res.msg);
                } else {
                    this.loadinrejected = false;
                    this.threeTableOne = null;
                    this.loading2 = false;
                    $('.shmessageBox p i').html(res.msg);
                    this.$message.error(res.msg);
                }
                var setTimeoutCs = function() {
                    $('.shmessageBox').addClass('hide')
                    $('.xhdataBox').removeClass('moBox');
                    $('.shmessageBox p i').html('请输入审核意见')
                    this.aduitdetailemodalvisible = false;
                    this.selectidtwo = [];
                    this.datatree = [{}];
                    this.loadinrejected = false;
                    this.redtips = false;
                    this.threeTableOne = null;
                    this.offother = true;
                    this.shmessage = '';
                };
                clearTimeout(this.setTimeoutFunction);
                this.setTimeoutFunction(setTimeoutCs);
            })
        },
        Showaduitdetail(ctaskId, usermsg, treeparameter) {
            this.aduitdetailemodalvisible = true;
            this.passid = ctaskId;
            this.usermsg = usermsg;
            this.treeparameter = treeparameter;
        },
        Aduitdetaildata(argumentdetail) {
            console.log('赋值datamagOne')
            this.datamagOne = argumentdetail;
            console.log('this.datamagOne', this.datamagOne)
        },
        Aduittreedata(treetwo, treetwotable, fatemparr) {
            this.threeTwo = treetwo;
            this.threeTwotable = treetwotable;
            this.datatree = fatemparr;
            // console.log('this.datatree', this.datatree)
            // 实现表名变红的函数，如果不要注释即可
            console.log('get 数据this.threeTwotable', this.threeTwotable)
            console.log('get 数据this.selectidtwo', this.selectidtwo)
            var that = this;
            for (var t = 0; t < this.threeTwotable.length; t++) {
                if (this.threeTwotable[t].selected === 2) {
                    this.selectidtwo.push(t);
                }
            }
            // $('#aduittreezkf .el-tree-node__children .el-tree-node').addClass('color-red');
            setTimeout(function() {
                var $treenodelist = $('#aduittreezkf .el-tree-node__children .el-tree-node');
                console.log('el-tree-node-length1', $treenodelist);
                console.log('that.selectidtwo', that.selectidtwo)
                for (var p = 0; p < that.selectidtwo.length; p++) {
                    $treenodelist.eq(that.selectidtwo[p]).addClass('color-red');
                }
                console.log('el-tree-node-length2', $treenodelist);
            }, 0);
        },
        Showauditthree() {
            this.redtips = true;
            console.log('展示树', this.rescode)
            $('.threebox').removeClass('hide');
            $('.sjxqBox').addClass('hide');
            if (this.rescode.code === 200) {
                console.log('树状结构200')
                    // 正常展示就行
            } else if (this.rescode.code === 300) {
                console.log('树状结构300')
                this.rescode = 300;
                this.$message.success(this.rescode.msg);
            } else {
                console.log('树状结构500')
                this.$message.error(this.rescode.msg);
            }
        },
        Showauditdetaildata() {
            this.redtips = false;
            $('.threebox').addClass('hide');
            $('.sjxqBox').removeClass('hide');
        },
        Offaduitdetailemodal() {
            // $('.aduit-detail-modle').addClass('hide');
            this.aduitdetailemodalvisible = false;
            this.selectidtwo = [];
            this.datatree = [{}];
            this.redtips = false;
            this.threeTableOne = null;
            this.datatree = [{}];
            $('.threebox').addClass('hide');
            $('.sjxqBox').removeClass('hide');
        },
        Offauditopinion() {
            if (this.offother) {
                $('.shmessageBox').addClass('hide')
                $('.xhdataBox').removeClass('moBox');
                $('.shmessageBox p i').html('请输入审核意见');
            } else {
                $('.shmessageBox').addClass('hide')
                $('.shmessageBox p i').html('请输入审核意见')
                this.aduitdetailemodalvisible = false;
                this.selectidtwo = [];
                this.datatree = [{}];
                this.redtips = false;
                this.threeTableOne = null;
                this.offother = true;
                this.shmessage = '';
            }
        },
        ChangeShowthree(event) {
            this.showHide = !this.showHide
            if (this.showHide) {
                $(event.target).next().addClass('hide')
            } else {
                $(event.target).next().removeClass('hide')
            }
        },
        handleNodeClick(data, node) {
            console.log('gettable', data, 'node', node)
            for (var l = 0; l < this.threeTwotable.length; l++) {
                if (this.threeTwotable[l].sourceTableId === data.id) {
                    this.threeTableOne = this.threeTwotable[l].columns
                }
            }
            console.log(this.threeTableOne)
            console.log('8888this.threeTableOne' + this.threeTableOne)
        },
        // 格式化字段长度
        formatdataLength(row, column) {
            if (row.dataLength === -1) {
                return '';
            } else {
                return row.dataLength;
            }
        },
        // 格式化字段精度
        formatdataPrecision(row, column) {
            if (row.dataPrecision === -1) {
                return '';
            } else {
                return row.dataPrecision;
            }
        },
        // 格式化是否非空
        formatdataNotNull(row, column) {
            if (row.dataNotNull === -1) {
                return '';
            } else if (row.dataNotNull === 1) {
                return '否';
            } else if (row.dataNotNull === 0) {
                return '是1';
            }
        },
        formatdataNotNull2(n) {
            if (n === -1) {
                return '';
            } else if (n === 1) {
                return '否';
            } else if (n === 0) {
                return '是1';
            }
        }
    }
}
</script>
<style lang="scss">
@import '../../assets/css/data/dataCommon.scss';
.aduit-detail {
    width: 980px;
    height: 600px;
    z-index: 100;
    font-size: 14px;
    color: rgba(0, 187, 236, 1);
    // padding-left: 20px;
    margin-top: -30px;
    .head {
        width: 950px;
        height: 70px;
        P {
            width: 100px;
            height: 50px;
            float: left;
            line-height: 50px;
            padding: 10px 0 0 50px;
            font-size: 18px;
        }
        P:hover {
            color: rgba(80, 213, 246, 1);
        }
        .audit-detail-btn {
            margin-left: 120px;
        }
        .audit-three-btn {
            margin-left: 330px;
        }
        .audit-off-btn {
            float: right;
            margin-right: -60px;
        }
    }
    .foot {
        width: 1000px;
        height: 50px;
        z-index: 300;
        margin-top: 30px;
        span {
            text-align: left;
            float: left;
            color: red;
        }
        P {
            color: #1FA4C9;
            background: #0C1A34;
            border-radius: 0;
            border-color: #0C1A34;
            width: 100px;
            height: 30px;
            margin-right: 10px;
            float: right;
            font-size: 14px;
            line-height: 30px;
            border: 1px solid rgba(250, 250, 250, 0);
            text-align: center;
            .el-loading-mask {
                background-color: rgba(13, 44, 77, 1)!important;
            }
            .el-loading-spinner .circular {
                width: 20px;
            }
        }
        P:hover {
            //  border-color:#036c8e;
            border-color: #05bde6;
            //  background:#036c8e;
        }
    }
    .shyjModule {
        // position: absolute;
        width: 800px;
        height: 116px;
        top: 570px;
        margin-left: 20px;
        margin-top: 10px;
        textarea {
            width: 953px;
            height: 116px;
            background: rgba(13, 43, 76, 1.00);
            color: #23e8ea;
            border: 0 solid #23e8ea;
        }
        textarea:-moz-placeholder {
            /* Mozilla Firefox 4 to 18 */
            color: rgba(36, 202, 243, 0.5);
        }
        textarea::-moz-placeholder {
            /* Mozilla Firefox 19+ */
            color: rgba(36, 202, 243, 0.5);
        }
        textarea:-ms-input-placeholder {
            color: rgba(36, 202, 243, 0.5);
        }
        textarea::-webkit-input-placeholder {
            color: rgba(36, 202, 243, 0.5);
        }
    }
    .shdataxqMain {
        width: 983px;
        height: 280px;
        margin-left: 12px;
        overflow: hidden;
        position: relative;
        background-size: 100% 100%;
    }
    .shdataxqMainScrollBox {
        width: 983px;
    }
    .sjxqBox {
        width: 980px;
        margin: 0;
        padding: 0;
        height: 280px;
        overflow-y: scroll;
        overflow-x: hidden;
        .sjxqBoxMain {
            width: 980px;
            height: 480px;
            margin: 0;
            padding: 0;
            padding-left: 20px;
        }
    }
    .threebox {
        width: 1000px;
        margin: 0;
        padding: 0;
        overflow: hidden;
        .aduittreetop__wrap {
            top: 0;
            left: 0;
            .treestructer__wrap {
                height: 230px;
            }
        }
        .aduit-tablestructer {
            top: 0;
            left: 0;
        }
    }
    .shmessageBox {
        width: 1000px;
        height: 800px;
        position: absolute;
        background-color: rgba(12, 38, 66, 0.8);
        z-index: 9999;
        text-align: center;
        p {
            width: 300px;
            height: 150px;
            border: 1px solid #0ecabb;
            line-height: 150px;
            color: #fff;
            border-radius: 5%;
            font-size: 18px;
            span {
                display: block;
                position: absolute;
                top: 10px;
                right: 10px;
                width: 30px;
                height: 30px;
                line-height: 30px;
                border-radius: 30px;
                border: 1px solid #0ecabb;
            }
        }
    }
    .el-table .info-row {
        color: red;
    }
    .color-red {
        color: red;
    }
    // .el-table .positive-row {
    //     color: #e2f0e4;
    // }
}
</style>

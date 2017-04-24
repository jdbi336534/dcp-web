<template>
	<div class="clearfix full-height">
        <div class="left-tree">
            <search-tree @new-btn="clickNewBtn" @pub-btn="clickPubBtn" :options="selectoptions" 
                :treedata="treesdata" :selectvalue="defaultvalue" @select-change="onChange"
                :highlight="highlight" :showcheckbox="checkbox" @clicked-change="checkChange"
                @clicked-node="nodeClick" :newbtn="xzbtn" :pubbtn="fbbtn" />
        </div>
        <div class="right-content">
            <div class="dir-info" :class="zwsjflag ? 'hide' : ''">
                <h4 class="title">
                    <span class="mlTitle">{{ title }}</span>
                    <img src="../../assets/img/sourcePub/wfb.png"  class="wfbimg hide">
                    <img src="../../assets/img/sourcePub/yfb2.png" class="yfbimg hide">
                </h4>
                <div class="info">
                    <directory-info ref="form" :testData="msg" :testForm="formz" :pageStatus="pageStatus" @message2="testcc2" />
                    <tag-bar ref="bqC" @bqiddataz="testcc1" :pageStatus="pageStatus" :tagList="newmlmsg.tagList" 
                        @new-catelogry="clicknewcatelogry" />
                </div>
                <div class="save-info">
                    <div class="btnfb" v-show="isEdit" @click="fvml" v-loading="loadingfb">保存</div>
                </div>
            </div>
            <div class="zwsjBox" :class="zwsjflag ? '' : 'hide'">
                <div class="zwsjImg jz">
                    <img src="../../assets/img/sourcePub/zwsj.png" />
                    <p>您还没有数据，马上去选目录</p>
                </div>
            </div>
        </div>
        <div class="modal-list">
            <dcp-dialog id="ensure_pub_all" ref="fbfg" :width="400" :height="200">
                <div slot="dialog_body">
                    <p>您确认发布{{ nodeData[0].catalogueName }} 及其所在的所有上级目录吗？</p>
                </div>
                <div slot="dialog_footer">
                    <el-button type="text" @click="fbOff">取消</el-button>
                    <el-button type="dcp" @click="fbOk">确认</el-button>
                </div>
            </dcp-dialog>
            <dcp-dialog id="add_msg" ref="saveyzfg" :width="400" :height="200">
                <div slot="dialog_body">
                    <p class="tsxxp">{{ modalAdd }}</p>
                </div>
                <div slot="dialog_footer">
                    <el-button type="dcp" @click="tsxxOk">确认</el-button>
                </div>
            </dcp-dialog>
            <dcp-dialog id="pub_msg" ref="alltskfg" :width="400" :height="200">
                <div slot="dialog_body">
                    <p class="tskp">{{ modalPub }}</p>
                </div>
                <div slot="dialog_footer">
                    <el-button type="dcp" @click="tskOk">确认</el-button>
                </div>
            </dcp-dialog>
        </div>
    </div>
</template>
<script>
import SearchTree from '../common/SearchTree';
import DirectoryInfo from '../common/DirectoryInfo';
import TagBar from '../common/TagBar';
import DcpDialog from '../common/DCPDialog';
import {
    getThemeList,
    getCatalogueInfoByParam,
    publishCatalogue,
    getbqAll,
    newCatalogue,
} from '../../assets/js/queryData'
import {
    getSessionStore
} from '../../assets/js/mUtils';

export default {
    components: {
        SearchTree,
        DirectoryInfo,
        TagBar,
        DcpDialog,
    },
    data() {
            return {
                title: '目录信息',
                isEdit: 'false',
                zwsjflag: true,
                loadingfb: false,
                usermsgTwo: {},
                pageStatus: 1,
                nodeclicked: false,
                usermsg: null,
                newmlmsg: {
                    supplyUnit: '公积金',
                    informativeAbstract: 'this is test data',
                    rootNode: 1,
                    status: 'F',
                    frontNode: 2,
                    path: '/湖北/武汉/汉口',
                    themeTypeId: 3,
                    tagList: []
                },
                datalist: ['this is a root catalogue', '社保局', null, 0, 0, '/北京', '社保数据', '北京', 3, null, 8, 'F', []],
                formz: {
                    mlmc: '',
                    xxzy: '',
                    tgdw: '',
                    sjjd: '',
                    gjd: '',
                    mlztlx: '',
                    qlj: '',
                    mlbq: '',
                    fbzt: ''
                },
                msg: {
                    mlmc: true,
                    xxzy: true,
                    tgdw: true,
                    sjjd: true,
                    gjd: true,
                    mlztlx: true,
                    qlj: true,
                    mlbq: true,
                    fbzt: true
                },
                nodeData: [{}, {}, {}],
                options: null,
                selectvalue: null,
                highlight: true,
                treesdata: null,
                selectoptions: null,
                defaultvalue: 3,
                newbqval: null,
                checkbox: false,
                xzbtn: true,
                fbbtn: true,
                bqidList: [],
                clickadd: false,
                modalAdd: '',
                modalPub: '',
            }
        },
        mounted() {
            this.usermsgTwo = getSessionStore('userInfo');

            getThemeList()
                .then(res => {
                    this.selectoptions = res.data;
                });
        },
        methods: {
            // 点击发布按钮
            clickPubBtn(isClickNode) {
                var $modal = this.$refs.alltskfg;
                // var $text = $('.tskp');

                if (this.isEdit) {
                    this.modalPub = '请先保存新增目录';
                    $modal.open();
                    return;
                }

                if (this.nodeclicked) {
                    if (isClickNode) {
                        if (this.nodeData[0].status === 'T') {
                            // $text.html('该节点已处于发布状态，不能重复发布。');
                            this.modalPub = '该节点已处于发布状态，不能重复发布。'
                            $modal.open();
                        } else {
                            this.pageStatus === 3;
                            this.msg.mlmc = false;
                            this.msg.xxzy = false;
                            // $('.btnfb').addClass('hide');
                            // $('.fbfg').removeClass('hide');
                            this.isEdit = false;
                            this.$refs.fbfg.open();
                        }
                    } else {
                        // $text.html('请重新点击');
                        this.modalPub = '请重新点击';
                        $modal.open();
                    }
                } else {
                    // $text.html('请选择您要发布的节点');
                    this.modalPub = '请选择您要发布的节点';
                    $modal.open();
                }
            },
            // 点击新增目录节点按钮
            clickNewBtn(isClickNode) {
                var $modal = this.$refs.alltskfg;
                if (this.nodeclicked) {
                    if (isClickNode) {
                        this.pageStatus = 2;
                        this.newmlmsg.tagList = [];
                        this.$refs.bqC.newclose();

                        this.title = '新增目录';

                        this.msg.mlmc = false;
                        this.msg.xxzy = false;
                        this.formz.sjjd = this.nodeData[0].catalogueName;
                        this.formz.mlmc = '';
                        this.formz.xxzy = '';
                        this.formz.fbzt = '未发布';
                        this.newmlmsg.catalogueName = '';
                        
                        // $('.btnfb').removeClass('hide');
                        this.isEdit = true;
                    } else {
                        // $('.tskp').html('请重新点击');
                        this.modalPub = '请重新点击';
                        $modal.open();
                    }
                } else {
                    // $('.tskp').text('请先选择一个目录');
                    this.modalPub = '请先选择一个目录';
                    $modal.open();
                }
            },
            // 选择树形菜单类型，"主题，组织结构，行政区域"
            onChange(val) {
                this.defaultvalue = val;
                getCatalogueInfoByParam({
                    themeTypeId: val
                })
                .then(res => {
                    this.treesdata = res.data;
                })
            },
            // 点击节点
            nodeClick(a, b, c) {
                this.zwsjflag = false;

                // 点击节点后
                this.clickadd = false;
                this.nodeclicked = true;
                this.pageStatus = 1;
                this.title = '目录信息';
                this.isEdit = false;

                this.nodeData[0] = a;
                this.nodeData[1] = b;
                this.nodeData[2] = c;
                this.$refs.bqC.clearBqiddata();

                // var gjdData = a.path.split('/').pop();

                this.newmlmsg.supplyUnit = a.supplyUnit;
                this.newmlmsg.rootNode = a.rootNode;
                this.newmlmsg.frontNode = a.id;
                this.newmlmsg.path = a.path;
                this.newmlmsg.status = a.status;
                this.newmlmsg.supplyUnit = a.supplyUnit;
                this.newmlmsg.themeTypeId = a.themeTypeId;

                this.formz.mlmc = a.catalogueName;
                this.formz.xxzy = a.informativeAbstract;
                this.formz.ztlx = a.themeTypeId;
                this.formz.tgdw = a.supplyUnit;
                this.formz.qlj = a.path;

                var t = 0;
                var len = this.treesdata.length;
                for (t; t < len; t++) {
                    if (this.treesdata[t].id === a.rootNode) {
                        this.formz.gjd = this.treesdata[t].catalogueName;
                    }
                }

                var $yfb = $('.yfbimg');
                var $wfb = $('.wfbimg');
                if (a.status === 'T') {
                    this.formz.fbzt = '发布';
                    $yfb.removeClass('hide');
                    $wfb.addClass('hide');
                } else {
                    this.formz.fbzt = '未发布';
                    $yfb.addClass('hide');
                    $wfb.removeClass('hide');
                }

                if (this.pageStatus === 1 || this.pageStatus === 3) {
                    this.msg.mlmc = true;
                    this.msg.xxzy = true;
                    this.formz.sjjd = b.parent.data.catalogueName;
                    this.newmlmsg.tagList = a.tagNameList;
                    getbqAll(a.id)
                        .then(res => {
                            this.newmlmsg.tagList = res.data.tagList;
                        })
                } else if (this.pageStatus === 2) {
                    this.msg.mlmc = false;
                    this.msg.xxzy = false;
                    this.formz.sjjd = a.catalogueName;
                    this.formz.mlmc = '';
                    this.formz.xxzy = '';
                    this.newmlmsg.tagList = [];
                }
            },
            checkChange() {

            },
            deleteRow(i, rows) {
                rows.splice(i, 1);
            },
            testcc1(val) {
                this.newmlmsg.tagList = val;
            },
            testcc2(val2) {
                this.newmlmsg.informativeAbstract = val2.xxzy;
                this.newmlmsg.catalogueName = val2.mlmc;
            },
            clicknewcatelogry() {
                this.clickadd = true;
            },
            // 确认发布目录
            fbOk() {
                var nodeData = this.nodeData[0];
                var onjcs = {
                    id: nodeData.id,
                    rootNode: nodeData.rootNode,
                    frontNode: nodeData.frontNode
                };

                publishCatalogue(onjcs)
                    .then(res => {
                        this.nodeclicked = false;
                        if (res.code === 200) {
                            $('.yfbimg').removeClass('hide');
                            $('.wfbimg').addClass('hide');
                            this.formz.fbzt = '发布';
                            nodeData.status = 'T';

                            // 发布成功后，更新树形菜单
                            getCatalogueInfoByParam({
                                themeTypeId: this.defaultvalue
                            })
                            .then(res => {
                                if (res.code === 200) {
                                    this.treesdata = res.data;
                                }
                            });
                        } else {
                            // 发布失败，联系管理员
                            // $('.tskp').html('发布失败联系管理员');
                            this.modalPub = '发布失败联系管理员';
                            this.$refs.alltskfg.open();
                        }
                    });
                
                // $('.fbfg').addClass('hide');
                this.$refs.fbfg.close();
            },
            // 取消发布目录
            fbOff() {
                // $('.fbfg').addClass('hide');
                this.$refs.fbfg.close();
            },
            tskOk() {
                // $('.alltskfg').addClass('hide');
                // $('.tskp').html('');
                this.$refs.alltskfg.close();
            },
            tsxxOk() {
                this.$refs.saveyzfg.close();
            },
            // 保存
            fvml() {
                this.loadingfb = true;
                var name = this.newmlmsg.catalogueName;
                this.newmlmsg.path = this.newmlmsg.path + '/' + name;

                if (name === null || name === '') {
                    // $('.tskp').html('请输入目录名');
                    this.modalPub = '请输入目录名';
                    this.$refs.alltskfg.open();
                    this.loadingfb = false;
                } else {
                    if (!this.clickadd) {

                    }

                    newCatalogue(this.newmlmsg)
                        .then(res => {
                            this.nodeclicked = false;
                            if (res.code === 200) {
                                this.loadingfb = false;
                                // $('.btnfb').addClass('hide');
                                this.isEdit = false;
                                this.newmlmsg.tagList = [];
                                this.$refs.bqC.clearBqiddata();
                                getThemeList()
                                    .then(res => {
                                        this.selectoptions = res.data;
                                    });

                                getCatalogueInfoByParam({
                                    themeTypeId: this.defaultvalue
                                })
                                .then(res => {
                                    this.treesdata = res.data;
                                });

                                this.pageStatus = 1;
                                this.msg.mlmc = true;
                                this.msg.xxzy = true;
                                this.title = '目录信息';

                                this.formz.mlmc = '';
                                this.formz.xxzy = '';
                                this.formz.tgdw = '';
                                this.formz.sjjd = '';
                                this.formz.gjd = '';
                                this.formz.mlztlx = '';
                                this.formz.qlj = '';
                                this.formz.mlbq = '';
                                this.formz.fbzt = '';
                            } else if (res.code === 300) {
                                this.newmlmsg.tagList = [];
                                this.loadingfb = false;
                                this.$refs.bqC.clearBqiddata();
                                // $('.tsxxp').html('目录名称已存在！');
                                this.modalAdd = '目录名称已存在！';
                                // $('.saveyzfg').removeClass('hide');
                                this.$refs.saveyzfg.open();
                            } else if (res.code === 500) {
                                this.newmlmsg.tagList = [];
                                this.loadingfb = false;
                                this.$refs.bqC.clearBqiddata();
                                // $('.tsxxp').html('服务器内部出错~');
                                // $('.saveyzfg').removeClass('hide');
                                this.modalAdd = '服务器内部出错~';
                                this.$refs.saveyzfg.open();

                                this.$refs.form.clearForm();
                            }
                        });
                }
            }
        }

}
</script>
<style lang="scss">
.clearfix:after {
    content: '';
    display: table;
    clear: both;
}
.left-tree {
    float: left;
    height: 100%;
    width: 300px;
}
.right-content {
    float: right;
    width: calc(100% - 300px);
    height: 100%;
    box-sizing: border-box;
    padding: 0 15px 0 35px;
    overflow: auto;
    position: relative;
}
.full-height {
    height: 100%;
    .hide {
        display: none !important;
    }
}

h4 {
    padding: 0;
    margin: 0;
}
.dir-info {
    .title {
        font-size: 14px;
        padding: 10px 0;
        text-align: center;
        img {
            vertical-align: text-bottom;
            margin: 0 0 0 5px;
        }
    }
}

.right-content {
    .zwsjBox {
        width: 100%;
        height: 100%;
        display: table;
    }
    .zwsjImg {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
    }

    .info {
        width: 100%;
        height: 380px;
        padding: 20px;
        box-shadow: inset 0 0 38px rgba(53, 215, 255, 0.3);
        text-align: left;
        box-sizing: border-box;
    }

    .save-info {
        position: absolute;
        right: 20px;
        bottom: 20px;

        .btnfb {
            width: 120px;
            height: 30px;
            background: rgba(15,38,66,1);
            border: 1px solid #01172F;
            font-size: 16px;
            color: rgba(0, 186, 236, 0.90);
            text-align: center;
            line-height: 30px;
            cursor: pointer;

            &:hover {
                border-color: #087193;
                box-shadow: inset 0 0 10px 0 rgba(98, 208, 248, 0.42);
                border-radius: 1px;
            }

            .el-loading-mask {
                background-color: rgba(13,44,77,1)!important;
            }
            .el-loading-spinner .circular {
                width: 20px;
            }
        }
    }
}

.fgczBox {
    background: rgba(13, 21, 47, 0.7);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
}


.fgczBox {
    .fb, .tsxx, .tsk  {
        width: 400px;
        height: 200px;
        text-align: center;
        background: rgba(12, 38, 66, .5) url('../../assets/img/modal/tcbgzz.png') no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -100px 0 0 -200px;
        
        p {
            padding: 20px 30px 30px;
            font-size: 16px;
            line-height: 40px;
        }

        ul {
            color: #fff;

            li {
                list-style: none;
                display: inline-block;
                width: 60px;
                height: 25px;
                background: #0C1A34;
                line-height: 24px;
                border: 1px solid #0C1A34;
                cursor: pointer;

                &:hover {
                    border-color: #05bde6;
                    box-shadow: inset 0 0 10px 0 rgba(98, 208, 248, 0.42);
                }

                & + li {
                    margin: 0 0 0 70px;
                }
            }
        }
    }
}

.modal-list {
    p {
        font-size: 16px;
        line-height: 40px;
        margin: 0;
        text-align: center;
    }
    ul {
        color: #fff;
        text-align: center;

        li {
            list-style: none;
            display: inline-block;
            width: 60px;
            height: 25px;
            background: #0C1A34;
            line-height: 24px;
            border: 1px solid #0C1A34;
            cursor: pointer;

            &:hover {
                border-color: #05bde6;
                box-shadow: inset 0 0 10px 0 rgba(98, 208, 248, 0.42);
            }

            & + li {
                margin: 0 0 0 70px;
            }
        }
    }
}
</style>

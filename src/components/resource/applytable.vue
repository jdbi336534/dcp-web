<template>
    <div class="box2">
        <!-- 以下为锁部分锁定 -->
        <div class="right1">
            <ul class="tall" v-if="locktable">
                <div class="top">表信息</div>
                <li>
                    <div class="lf">表名</div>
                    <el-input :value="tartable.tableName" readonly></el-input>
                </li>
                <li>
                    <div class="lf">中文名称</div>
                    <el-input :value="tartable.cnName" readonly></el-input>
                </li>
                <li>
                    <div class="lf">英文名称</div>
                    <el-input :value="tartable.enName" readonly></el-input>
                </li>
                <div class="lf"></div>
                <li class="cls">
                    <div class="lf">短名</div>
                    <el-input :value="tartable.shortName" readonly></el-input>
                </li>
                <li>
                    <div class="lf">业务表名称</div>
                    <el-input :value="tartable.businessTableName" readonly></el-input>
                </li>
                <li>
                    <div class="lf">是否关键表</div>
                    <el-input :value="tartable.isKeyTable?'是':'否'" readonly></el-input>
                </li>
                <li class="cls">
                    <div class="lf">表路径</div>
                    <el-input :value="tartable.path" readonly></el-input>
                </li>
                <li>
                    <div class="lf">经办人</div>
                    <el-input :value="tartable.realName" readonly></el-input>
                </li>
                <li class="end">
                    <div class="lf">标签</div>
                </li>
                <div class="tagbox">
                    <el-tooltip placement="top" v-for="(item,k) in tartable.tagList" :key="item.tagName">
                        <div slot="content" style="max-width:100px">{{item.tagDescription}}</div>
                        <el-tag :type="gettype(k)" close-transition>{{item.tagName}}</el-tag>
                    </el-tooltip>
                </div>
            </ul>
            <ul class="tall" v-else>
                <div class="top">表信息</div>
                <li>
                    <div class="lf">表名</div>
                    <el-input v-model="tartable.tableName" placeholder="请输入内容"></el-input>
                </li>
                <li>
                    <div class="lf">中文名称</div>
                    <el-input v-model="tartable.cnName" placeholder="请输入内容"></el-input>
                </li>
                <li>
                    <div class="lf">英文名称</div>
                    <el-input v-model="tartable.enName" placeholder="请输入内容"></el-input>
                </li>
                <div class="lf"></div>
                <li class="cls">
                    <div class="lf">短名</div>
                    <el-input v-model="tartable.shortName" placeholder="请输入内容"></el-input>
                </li>
                <li>
                    <div class="lf">业务表名称</div>
                    <el-input v-model="tartable.businessTableName" placeholder="必填"></el-input>
                </li>
                <li>
                    <div class="lf">是否关键表</div>
                    <el-select v-model="tartable.isKeyTable" placeholder="请选择">
                        <el-option v-for="item in [{a:'是',b:1},{a:'否',b:0}]" :label="item.a" :value="item.b" :key="item.b">
                        </el-option>
                    </el-select>
                </li>
                <li class="cls">
                    <div class="lf">表路径</div>
                    <el-input v-model="tartable.path" readonly></el-input>
                </li>
                <li>
                    <div class="lf">经办人</div>
                    <el-input v-model="tartable.realName" readonly></el-input>
                </li>
                <li class="end">
                    <div class="lf">标签</div>
                    <el-button type="text" @click="tableDialog(tartable.tagList)" title="编辑标签"><i class="el-icon-edit"></i></el-button>
                </li>
                <div class="tagbox">
                    <el-tooltip placement="top" v-for="(item,k) in tartable.tagList" :key="item.tagName">
                        <div slot="content" style="max-width:100px">{{item.tagDescription}}</div>
                        <el-tag :type="gettype(k)" close-transition>{{item.tagName}}</el-tag>
                    </el-tooltip>
                </div>
            </ul>
            <div class="col">
                <div class="my_table">
                    <el-table :data="columnList" border height="100%" style="width: 100%;height:100%;" empty-text="暂无数据" v-loading="tableloading" element-loading-text="拼命加载中">
                        <el-table-column label="字段名称" width="200">
                            <template scope="scope">
                                <el-input v-model="scope.row.columnName" placeholder="请输入内容" readonly v-if="islockC(scope.row)"></el-input>
                                <el-input v-model="scope.row.columnName" placeholder="请输入内容" readonly v-else></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="业务字段名称">
                            <template scope="scope">
                                <el-input v-model="scope.row.businessColumnName" placeholder="请输入内容" readonly v-if="islockC(scope.row)"></el-input>
                                <el-input v-model="scope.row.businessColumnName" placeholder="请输入内容" v-else></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="是否关键字段">
                            <template scope="scope">
                                <el-select v-model="scope.row.isKeyColumn" placeholder="请选择" disabled v-if="islockC(scope.row)">
                                    <el-option v-for="item in [{a:'是',b:1},{a:'否',b:0}]" :label="item.a" :value="item.b" :key="item.b">
                                    </el-option>
                                </el-select>
                                <el-select v-model="scope.row.isKeyColumn" placeholder="请选择" v-else>
                                    <el-option v-for="item in [{a:'是',b:1},{a:'否',b:0}]" :label="item.a" :value="item.b" :key="item.b">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="业务计算规则">
                            <template scope="scope">
                                <el-input v-model="scope.row.businessComputationRule" placeholder="请输入内容" readonly v-if="islockC(scope.row)"></el-input>
                                <el-input v-model="scope.row.businessComputationRule" placeholder="请输入内容" v-else></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="IT计算规则">
                            <template scope="scope">
                                <el-input v-model="scope.row.itComputationRule" placeholder="请输入内容" readonly v-if="islockC(scope.row)"></el-input>
                                <el-input v-model="scope.row.itComputationRule" placeholder="请输入内容" v-else></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="路径">
                            <template scope="scope">
                                <el-input v-model="scope.row.path" readonly></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="审核状态">
                            <template scope="scope">
                                <el-input :value="scope.row.approveStatus==null?'未编辑':scope.row.approveStatus" readonly></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="标签">
                            <template scope="scope">
                                <el-tooltip placement="top" v-for="(item,k) in scope.row.tagList" :key="item.tagName">
                                    <div slot="content" style="max-width:100px">{{item.tagDescription}}</div>
                                    <span class="sontag"> <el-tag :type="gettype(k)" close-transition>{{item.tagName}}</el-tag></span>
                                </el-tooltip>
                                <el-button type="text" @click="tableDialog(scope.row.tagList)" v-if="!islockC(scope.row)" title="编辑标签"><i class="el-icon-edit"></i></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="opera" v-if="locksave">
                    <el-button type="text" @click="goBack2">返回</el-button>
                </div>
                <div class="opera" v-else>
                    <el-button type="text" @click="goBack2">返回</el-button>
                    <el-button type="dcp" class="commitbtn" @click="columnCommit" v-if="!ask_commit_on">保存</el-button>
                    <el-button type="dcp" class="commitbtn" v-else><i class="el-icon-loading"></i></el-button>
                </div>
            </div>
        </div>
        <!-- 添加标签 -->
        <tag-box :width="500" :height="310" ref="tagBox" title="添加标签">
            <div class="tags" slot="dialog_body">
                <div class="addtag">
                    <el-tooltip placement="top" v-for="(tag,k) in dialogTagList" :key="k">
                        <div slot="content" style="max-width:100px">{{tag.tagDescription}}</div>
                        <el-tag :closable="true" :type="gettype(k)" @close="toClose(tag)">
                            {{tag.tagName}}
                        </el-tag>
                    </el-tooltip>
                </div>
                <div class="addtag">
                    <el-input v-model="addtag" placeholder="添加tag" @blur="checktag" @change="changetag"></el-input>
                </div>
                <div class="addtag">
                    <el-input type="textarea" :rows="3" placeholder="添加备注" :disabled="isArea" v-model="addtextarea">
                    </el-input>
                </div>
            </div>
            <div slot="dialog_footer">
                <div class="addtag l">
                    <el-button type="dpc" @click="toAdd" v-if="!ask_tag_on">添加tag</el-button>
                    <el-button type="dpc" v-else>&nbsp;&nbsp;&nbsp;&nbsp;<i class="el-icon-loading"></i>&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
                </div>
            </div>
        </tag-box>
    </div>
</template>
<style lang="scss">
.box2 {
    width: 100%;
    height: 100%;
    font-size: 14px;
    position: relative;
    * {
        margin: 0;
        padding: 0;
    }
    .tags {
        height: auto;
        padding-bottom: 10px;
        overflow: hidden;
        p {
            line-height: 30px;
            padding: 0 20px;
        }
        .addtag {
            margin: 10px;
            &.l {
                text-align: right;
            }
            .el-tag {
                margin: 2px;
            }
            input,
            textarea {
                border: 1px solid #24CAF3;
                border-radius: 5px;
                background: none;
                color: #01ABDA;
                font-size: 14px;
                font-family: "微软雅黑"
            }
        }
    }
    .right1 {
        height: 100%;
        width: 100%;
        .tall {
            width: 300px;
            height: 100%;
            float: left;
            color: #01ABDA;
            box-sizing: border-box;
            border-right: 1px solid #124562;
            .top {
                height: 50px;
                line-height: 50px;
                text-align: center;
                background-color: #0A3553;
                margin-bottom: 70px;
                font-size: 16px;
            }
            li {
                height: 40px;
                line-height: 40px;
                width: 300px;
                margin-left: 10px;
                overflow: hidden;
                text-align: left;
                &.cls {
                    clear: left;
                }
                .lf {
                    height: 100%;
                    width: 100px;
                    margin-right: 10px;
                    text-align: right;
                    float: left;
                    font-size: 16px;
                }
                .el-input {
                    display: block;
                    width: 125px;
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
                    }
                }
                &.end {
                    min-height: 40px;
                    span {
                        margin: 0 2px;
                        padding: 0 2px;
                    }
                }
            }
            .tagbox {
                margin: 0 20px 20px;
                min-height: 200px;
                span {
                    padding: 0 3px;
                    margin: 2px;
                }
            }
        }
        .col {
            width: calc(100% - 300px);
            height: 100%;
            float: left;
            .my_table {
                height: calc(100% - 50px);
                .el-input__inner {
                    border: 0;
                }
                .sontag {
                    span {
                        margin: 2px;
                        padding: 0 2px;
                    }
                }
                .edit {
                    border-radius: 3px;
                    outline: none;
                    box-sizing: border-box;
                    border: 1px solid rgba(0, 0, 0, 0);
                    &:focus {
                        border-color: #20a0ff;
                    }
                }
            }
            .opera {
                height: 30px;
                line-height: 30px;
                text-align: right;
                padding-right: 10px;
                margin-top: 10px;
                .commitbtn {
                    width: 80px;
                }
            }
        }
    }
}
</style>
<script>
import {
    getSessionStore,
    getUserId
} from '../../assets/js/mUtils'
import tagBox from '../common/DCPDialog'
export default {
    data() {
            return {
                tartable: {}, // table info
                tableid: 0, // table info
                tableTagId: [],
                dialogVisible: false, // 编辑标签的弹框
                dialogTagList: [], // 标签列表
                addtag: '', // 标签名
                addtextarea: '', // 标签备注
                columnList: [], // 表字段列表
                columnDataEdit: [], // 修改状态
                tagIdList: [],
                ask_tag_on: false,
                ask_commit_on: false,
                isArea: true,
                alreadytag: {},
                locktable: false, // 锁定表信息
                locksave: false,
                userInfo: {},
                tableloading: true,
            }
        },
        computed: {},
        components: {
            tagBox,
        },
        methods: {
            changetag() {
                this.addtextarea = '';
                this.isArea = true;
            },
            // 检查标签是否存在
            checktag() {
                var that = this;
                if ($.trim(that.addtag) === '') {
                    this.$message.warning('标签名称不能为空');
                    return
                };
                var datas = {
                    'tagName': this.addtag
                };
                $.ajax({
                    url: `${this.$store.state.common.ip}/tag/v1.0/verificationTagInfo`,
                    type: 'POST',
                    dataType: 'json',
                    data: JSON.stringify(datas),
                    contentType: 'application/json',
                    success: function(data) {
                        if (data.code === 300) {
                            that.$message({
                                type: 'warning',
                                message: data.msg + '可直接添加使用'
                            });
                            that.addtextarea = data.data.tagDescription;
                            that.isArea = false;
                            that.alreadytag = data.data;
                        } else if (data.code === 200) {
                            console.log(data)
                        }
                    }
                }).always(function() {
                    console.log('complete');
                });
            },
            goBack2() {
                var resourceid = getSessionStore('applyedit').resourceId
                console.log('aaaa', getSessionStore('applyedit'))

                this.$router.push({
                    path: '/dcp/resource/applyedit/' + resourceid,
                    query: {
                        flag: 1,
                    }
                })
            },
            getPath(x) {
                var path = getSessionStore('applyedit').lastPath;
                return path.schema + '/' + path.table + (x ? ('/' + x) : '')
            },
            // 删除标签
            toClose(tag) {
                this.dialogTagList.splice(this.dialogTagList.indexOf(tag), 1);
                this.tagIdList.splice(this.tagIdList.indexOf(tag.id), 1);
            },
            gettype(i) {
                //  var color = [null, 'gray', 'primary', 'success', 'warning', 'danger'];
                //  return color[i % 6];
                return 'success'
            },
            // 添加标签
            toAdd() {
                var that = this;
                // 将库中已有标签保存到队列
                if (!this.isArea) {
                    that.dialogTagList.push(that.alreadytag);
                    that.addtag = '';
                    that.addtextarea = '';
                    this.isArea = true;
                    return;
                }
                if (this.ask_tag_on) {
                    that.$message({
                        type: 'warning',
                        message: '请等待请求返回'
                    });
                    return;
                }
                if ($.trim(that.addtag) === '') {
                    that.$message({
                        type: 'warning',
                        message: '标签名称不能为空'
                    });
                    return;
                }
                this.ask_tag_on = true;
                var data = {
                    'tagName': this.addtag,
                    'tagDescription': this.addtextarea,
                    'userId': this.userInfo.id ? this.userInfo.id : '',
                }
                $.ajax({
                        url: `${this.$store.state.common.ip}/tag/v1.0/saveTagInfo`,
                        type: 'POST',
                        dataType: 'json',
                        data: JSON.stringify(data),
                        contentType: 'application/json',
                        success: function(data) {
                            console.log('333333333333', data)

                            if (data.code === 200) {
                                that.$message({
                                    type: 'success',
                                    message: data.msg
                                });
                                that.dialogTagList.push({
                                    tagName: that.addtag,
                                    tagDescription: that.addtextarea,
                                    id: data.data,
                                });
                                that.tagIdList.push(data.data);
                            } else {
                                that.$message({
                                    type: 'warning',
                                    message: data.msg
                                });
                            }
                            that.addtag = '';
                            that.addtextarea = '';
                        }
                    })
                    .always(function() {
                        that.ask_tag_on = false;
                    });
            },
            // 标签对话框
            tableDialog(arg) {
                this.$refs.tagBox.isShow = true;
                this.dialogTagList = arg;
            },
            // commit
            columnCommit() {
                var that = this;
                if (this.tartable.businessTableName === null) {
                    this.$message({
                        type: 'warning',
                        message: '业务表名称必填！'
                    });
                    return;
                }
                if (this.ask_commit_on) {
                    that.$message({
                        type: 'warning',
                        message: '请等待请求返回'
                    });
                    return;
                }
                this.ask_commit_on = true;

                var operatorId = getUserId();

                for (var i = 0; i < that.columnList.length; i++) {
                    that.columnList[i].operatorId = operatorId;
                };
                var datas = $.extend(that.tartable, {
                    columnList: that.columnList,
                    operatorId: getUserId()
                })
                $.ajax({
                    url: `${this.$store.state.common.ip}/dataResources/v1.0/saveDataResourcesTable`,
                    type: 'POST',
                    dataType: 'json',
                    data: JSON.stringify(datas),
                    contentType: 'application/json',
                    success: function(data) {
                        if (data.code === 200) {
                            that.$message({
                                type: 'success',
                                message: data.msg
                            });
                            that.$router.push({
                                path: '/dcp/resource/applyedit/' + getSessionStore('applyedit').resourceId,
                                query: {
                                    flag: 1,
                                }
                            })
                        } else {
                            that.$message({
                                type: 'warning',
                                message: data.msg
                            });
                        }
                    }
                }).always(function() {
                    that.ask_commit_on = false;
                });
            },
            // show column list
            initColumn() {
                let id = this.tableid;
                var that = this;
                var realName;
                console.log(id)
                if (!id) return;
                realName = this.userInfo.realName;
                $.ajax({
                    url: `${this.$store.state.common.ip}/dataResources/v1.0/findDataSourceColumnList/${id}`,
                    type: 'GET',
                    dataType: 'json',
                    success: function(data) {
                        if (data.code === 200) {
                            that.tartable = data.data;
                            that.columnList = data.data.columnList;
                            var num = 0;
                            for (var i = 0; i < that.columnList.length; i++) {
                                that.columnList[i].path = that.getPath(that.columnList[i].columnName);
                                if (that.columnList[i].approveStatus === '审批中' || that.columnList[i].approveStatus === '审批通过') {
                                    that.locktable = true;
                                    num += 1
                                }
                            }
                            if (num === that.columnList.length) {
                                that.locksave = true;
                            }
                            that.tartable.path = that.getPath();
                            that.tartable.realName = that.tartable.realName ? that.tartable.realName : realName;
                        }
                    }
                }).always(function() {
                    that.tableloading = false;
                });
            },
            // listen the dialog open
            watchDialog(news, olds) {
                if (news) {
                    this.initColumn();
                }
            },
            islockC(row) {
                if (row.approveStatus === '审批中' || row.approveStatus === '审批通过') {
                    return true;
                } else {
                    return false;
                }
            }
        },
        mounted() {
            this.userInfo = getSessionStore('userInfo');
            this.tableid = this.$route.params.id;
            this.initColumn();
        },
}
</script>

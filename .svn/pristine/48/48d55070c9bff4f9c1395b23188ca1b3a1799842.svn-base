<template>
    <div class="box">
        <div class="left">
            <div class="header">
                表名
            </div>
            <ul id="scm">
                <li v-for="(item,k) in alltable" :key="k" class="woitem" :data-index="k" @click="handleCol(k)">{{item.businessTableName}}</li>
            </ul>
        </div>
        <div class="right">
            <div class="tables" :data-index="k" v-for="(item,k) in alltable" :key="k">
                <div class="tbl">
                    <el-table :data="item.columnList" border style="width: 100%;height:100%;" height="100%" @selection-change="handleSelectionChange">
                        <el-table-column type="selection">
                        </el-table-column>
                        <el-table-column label="字段名称" show-overflow-tooltip>
                            <template scope="scope">
                                {{scope.row.columnName}}
                            </template>
                        </el-table-column>
                        <el-table-column label="业务字段名称" show-overflow-tooltip>
                            <template scope="scope">
                                {{scope.row.businessColumnName}}
                            </template>
                        </el-table-column>
                        <el-table-column label="是否关键字段" show-overflow-tooltip>
                            <template scope="scope">
                                {{scope.row.isKeyColumn?'是':(scope.row.isKeyColumn==0?'否':'')}}
                            </template>
                        </el-table-column>
                        <el-table-column label="业务计算规则" show-overflow-tooltip>
                            <template scope="scope">
                                {{scope.row.businessComputationRule}}
                            </template>
                        </el-table-column>
                        <el-table-column label="IT计算规则" show-overflow-tooltip>
                            <template scope="scope">
                                {{scope.row.itComputationRule}}
                            </template>
                        </el-table-column>
                        <el-table-column label="路径" width="250" show-overflow-tooltip>
                            <template scope="scope">
                                {{scope.row.path}}
                            </template>
                        </el-table-column>
                        <el-table-column label="经办人" show-overflow-tooltip>
                            <template scope="scope">
                                {{scope.row.realName}}
                            </template>
                        </el-table-column>
                        <el-table-column label="标签">
                            <template scope="scope">
                                <el-tooltip placement="top" v-for="(item,k) in scope.row.tagList" :key="k">
                                    <div slot="content" style="max-width:100px">{{item.tagDescription}}</div>
                                    <span class="sontag"> <el-tag :type="gettype(k)" close-transition>{{item.tagName}}</el-tag></span>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="tbr">
                    <div class="top">表信息</div>
                    <ul class="con">
                        <li>
                            <div class="lf">表名</div>
                            <el-input v-model="item.tableName" readonly></el-input>
                        </li>
                        <li>
                            <div class="lf">中文名称</div>
                            <el-input v-model="item.cnName" readonly></el-input>
                        </li>
                        <li>
                            <div class="lf">英文名称</div>
                            <el-input v-model="item.enName" readonly></el-input>
                        </li>
                        <div class="lf"></div>
                        <li class="cls">
                            <div class="lf">短名</div>
                            <el-input v-model="item.shortName" readonly></el-input>
                        </li>
                        <li>
                            <div class="lf">业务表名称</div>
                            <el-input v-model="item.businessTableName" readonly placeholder="必填"></el-input>
                        </li>
                        <li>
                            <div class="lf">是否关键表</div>
                            <el-input :value="item.isKeyTable==1?'是':(item.isKeyTable==0?'否':'')" readonly></el-input>
                        </li>
                        <li class="cls">
                            <div class="lf">表路径</div>
                            <el-input v-model="item.path" readonly></el-input>
                        </li>
                        <li>
                            <div class="lf">经办人</div>
                            <el-input v-model="item.realName" readonly></el-input>
                        </li>
                        <li class="end">
                            <div class="lf">标签</div>
                        </li>
                        <div class="tagbox">
                            <el-tooltip placement="top" v-for="(item1,k) in item.tagList" :key="k">
                                <div slot="content" style="max-width:100px">{{item1.tagDescription}}</div>
                                <el-tag :type="gettype(k)" close-transition>{{item1.tagName}}</el-tag>
                            </el-tooltip>
                        </div>
                        <div class="goback">
                            <el-button type="text" class="backbtn" @click="backFuc">返回</el-button>
                            <el-button class="commitbtn" @click="commitFuc" v-if="!sending">确认提交</el-button>
                            <el-button class="commitbtn" v-else><i class="el-icon-loading"></i></el-button>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.box {
    width: 100%;
    height: 100%;
    font-size: 14px;
    position: relative;
    background: #0d152f;
    * {
        margin: 0;
        padding: 0;
    }
    .left {
        position: absolute;
        top: 0;
        left: 0;
        width: 200px;
        height: 100%;
        background: rgb(13, 21, 47);
        box-sizing: border-box;
        border-right: 1px solid #176A8A;
        overflow-y: auto;
        .header {
            height: 50px;
            line-height: 50px;
            text-align: center;
            color: #24CAF3;
            background-color: #0C2642;
            font-size: 16px;
        }
        ul {
            li {
                text-align: center;
                cursor: pointer;
                font-size: 16px;
                color: #24CAF3;
                height: 50px;
                line-height: 50px;
                &.on {
                    box-shadow: inset 0 0 17px 0 rgba(73, 210, 247, 0.26);
                }
            }
        }
    }
    .right {
        height: 100%;
        width: calc(100% - 200px);
        margin-left: 200px;
        position: relative;
        .tables {
            display: none;
            width: 100%;
            height: 100%;
            &.on {
                display: block;
            }
            .tbl {
                width: calc(100% - 300px);
                height: 100%;
                float: left;
            }
            .tbr {
                width: 300px;
                height: 100%;
                float: right;
                font-size: 14px;
                color: #01ABDA;
                box-sizing: border-box;
                border-left: 1px solid #124562;
                position: relative;
                .top {
                    width: 100%;
                    height: 50px;
                    line-height: 50px;
                    text-align: center;
                    background-color: #0A3553;
                    font-size: 16px;
                }
                .con {
                    height: calc(100% - 50px);
                    width: 100%;
                    overflow: auto;
                    box-sizing: border-box;
                    padding-top: 50px;
                    li {
                        height: 40px;
                        line-height: 40px;
                        margin-left: 10px;
                        overflow: hidden;
                        &.cls {
                            clear: left;
                        }
                        .lf {
                            height: 100%;
                            width: 100px;
                            margin-right: 10px;
                            text-align: right;
                            float: left;
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
                        height: 190px;
                        span {
                            padding: 0 3px;
                            margin: 2px;
                        }
                    }
                    .goback {
                        height: 30px;
                        text-align: center;
                        margin-bottom: 20px;
                        .el-button {
                            height: 100%;
                            margin: 0;
                            &.commitbtn {
                                background: #01172F!important;
                                border: 1px solid #087193;
                                box-shadow: inset 0 0 10px 0 rgba(98, 208, 248, 0.42);
                                border-radius: 1px;
                                color: #01ABDA;
                                width: 100px;
                                padding: 0;
                            }
                            &.backbtn {
                                width: 100px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
<script>
import {
    getUserId
} from '../../assets/js/mUtils'
export default {
    data() {
            return {
                tableIndex: 0,
                alltable: [],
                selectbox: [],
                sending: false,
            }
        },
        computed: {},

        methods: {
            gettype(i) {
                return 'success';
            },
            handleCol(k) {
                $('.tables[data-index=' + k + ']').addClass('on').siblings().removeClass('on');
                $('.woitem[data-index=' + k + ']').addClass('on').siblings().removeClass('on');
                this.tableIndex = k;
            },
            selectFuc(sele, row) {
                // var r = this.selectbox.some(function(x) {
                //     return x === row.id;
                // });
                // if (r) {
                //     this.selectbox.splice(this.selectbox.indexOf(row.id), 1);
                // } else {
                //     this.selectbox.push(row.id);
                // }
            },
            selectAll(selection) {
                // console.log('selection----------',selection)
                for (var i = 0; i < selection.length; i++) {
                    this.selectFuc('', selection[i]);
                }
            },
            handleSelectionChange(val) {
                //  this.multipleSelection = val;
                //  console.log(val)
                var box = [];
                for (var i = 0; i < val.length; i++) {
                    box.push(val[i].id)
                }
                this.selectbox[this.tableIndex] = box;
            },
            backFuc() {
                this.$router.go(-1)
            },
            commitFuc() {
                var that = this;
                var resourceIdList = [];
                if (that.selectbox.length === 0) {
                    that.$message({
                        type: 'warning',
                        message: '未选择'
                    });
                    return;
                }
                if (this.sending) {
                    that.$message({
                        type: 'warning',
                        message: '提交中'
                    });
                    return;
                }
                this.sending = true;
                for (var i = 0; i < that.selectbox.length; i++) {
                    resourceIdList = resourceIdList.concat(that.selectbox[i])
                }
                var datas = {
                    'resourceIdList': resourceIdList,
                    'operatorId': getUserId(),
                    'dataSourceKind': 'db',
                };
                $.ajax({
                    url: `${this.$store.state.common.ip}/dataResources/v1.0/submitResources`,
                    type: 'POST',
                    dataType: 'json',
                    data: JSON.stringify(datas),
                    contentType: 'application/json',
                    success: function(data) {
                        that.sending = false;
                        if (data.code === 200) {
                            that.$message({
                                type: 'success',
                                message: data.msg
                            });
                            that.$router.push({
                                path: '/dcp/resource/apply'
                            });
                        } else {
                            that.$message({
                                type: 'warning',
                                message: '提交审核失败'
                            });
                        }
                    }
                });
            },
            getData(k) {
                var id = this.$route.params.id;
                var that = this;
                $.ajax({
                    url: `${this.$store.state.common.ip}/dataResources/v1.0/findUnSubmitTable/${id}`,
                    type: 'GET',
                    dataType: 'json',
                    success: function(data) {
                        if (data.code === 200) {
                            that.alltable = data.data;
                            if (data.data.length === 0) {
                                that.$router.go(-1);
                                that.$message({
                                    type: 'warning',
                                    message: '待审核列表为空'
                                });
                                return;
                            }
                            for (var i = 0; i < data.data.length; i++) {
                                that.selectbox[i] = [];
                            }
                            if (k) {
                                setTimeout(function() {
                                    $('.tables[data-index=0]').addClass('on');
                                    $('.woitem[data-index=0]').addClass('on');
                                }, 100)
                            };
                        };
                    },
                    error: function(err) {
                        console.log(err)
                    }
                });
            },

        },
        mounted() {
            this.getData(1);
        },
}
</script>

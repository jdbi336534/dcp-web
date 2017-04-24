<template>
    <div class="applyfiles">
        <div class="tablebox">
            <el-table :data="tableData" border height="100%" style="width: 100%;height:100%" v-loading="tableloading" element-loading-text="拼命加载中">
                <el-table-column label="文件名" prop="fileName"></el-table-column>
                <el-table-column label="中文名">
                    <template scope="scope">
                        <el-input v-model="scope.row.cnName" :disabled="isLock(scope.row)"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="英文名">
                    <template scope="scope">
                        <el-input v-model="scope.row.enName" :disabled="isLock(scope.row)"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="短名">
                    <template scope="scope">
                        <el-input v-model="scope.row.shortName" :disabled="isLock(scope.row)"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="业务名">
                    <template scope="scope">
                        <el-input v-model="scope.row.businessFileName" :disabled="isLock(scope.row)"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="审核状态" prop="approveState" :formatter="formatterState"></el-table-column>
                <el-table-column label="文件路径" prop="path"></el-table-column>
                <el-table-column label="标签">
                    <template scope="scope">
                        <el-tooltip placement="top" v-for="(item,k) in scope.row.tagList" :key="item.tagName">
                            <div slot="content" style="max-width:100px">{{item.tagDescription}}</div>
                            <span class="sontag"> <el-tag :type="gettype(k)" close-transition>{{item.tagName}}</el-tag></span>
                        </el-tooltip>
                        <el-button type="text" @click="editTags(scope.row.tagList)" title="编辑标签" v-if="!isLock(scope.row)"><i class="el-icon-edit"></i></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="footer">
            <el-button type="text" class="btn" @click="onBack">返回</el-button>
            <el-button type="dcp" class="btn ok" @click="onSubmit"><i class="el-icon-loading" v-if="sendding"></i><span v-else>确认</span></i>
            </el-button>
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
.applyfiles {
    height: 100%;
    width: 100%;
    .tablebox {
        height: calc(100% - 50px);
    }
    .footer {
        height: 50px;
        line-height: 50px;
        text-align: right;
        .btn {
            &.ok {
                width: 80px;
                margin-right: 10px;
                margin-left: 20px;
            }
        }
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
}
</style>
<script>
import tagBox from '../common/DCPDialog'
import {
    // getSessionStore,
    getUserId
} from '../../assets/js/mUtils'
export default {
    data() {
            return {
                tableData: [],
                dialogTagList: [],
                pageSize: 20,
                pageNum: 1,
                total: 0,
                tableloading: true,
                addtextarea: '',
                isArea: false,
                addtag: '', // 添加的标签名
                ask_tag_on: false,
                alreadytag: {},
                tagIdList: [],
                sendding: false,
            }
        },
        methods: {
            isLock(row) {
                if (row.approveState === 'passed' || row.approveState === 'approving') {
                    return true
                } else {
                    return false
                }
            },
            editTags(list) {
                this.$refs.tagBox.isShow = true;
                this.dialogTagList = list;
            },
            toClose(tag) {
                this.dialogTagList.splice(this.dialogTagList.indexOf(tag), 1);
                this.tagIdList.splice(this.tagIdList.indexOf(tag.id), 1);
            },
            changetag() {
                this.addtextarea = '';
                this.isArea = false;
            },
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
                            that.isArea = true;
                            that.alreadytag = data.data;
                        } else if (data.code === 200) {
                            console.log(data)
                        }
                    }
                }).always(function() {
                    console.log('complete');
                });
            },
            toAdd() {
                var that = this;
                // 将库中已有标签保存到队列
                if (this.isArea) {
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
                    'userId': getUserId(),
                }
                $.ajax({
                        url: `${this.$store.state.common.ip}/tag/v1.0/saveTagInfo`,
                        type: 'POST',
                        dataType: 'json',
                        data: JSON.stringify(data),
                        contentType: 'application/json',
                        success: function(data) {
                            if (data.code === 200) {
                                that.$message({
                                    type: 'success',
                                    message: data.msg
                                });
                                console.log(9, that.dialogTagList)
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
            onSubmit() {
                var that = this
                for (var i = 0; i < that.tableData.length; i++) {
                    delete that.tableData[i].fileName
                    delete that.tableData[i].fileType
                    delete that.tableData[i].fileSize
                    delete that.tableData[i].approveState
                    delete that.tableData[i].createTime
                    delete that.tableData[i].delState
                    delete that.tableData[i].realName
                    that.tableData[i].operatorId = getUserId();
                }
                var datas = JSON.stringify(that.tableData)
                $.ajax({
                        url: `${this.$store.state.common.ip}/dataResources/v1.0/saveDataResourcesFile`,
                        type: 'POST',
                        dataType: 'json',
                        contentType: 'application/json',
                        data: datas,
                    })
                    .done(function(data) {
                        console.log('success', data);
                        that.$message.success('提交成功！')
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
                this.$router.push({
                    path: '/dcp/resource/apply'
                })
            },
            handleCurrentChange() {
                console.log('handleCurrentChange')
            },
            gettype(i) {
                //  var color = [null, 'gray', 'primary', 'success', 'warning', 'danger'];
                //  return color[i % 6];
                return 'success'
            },
            getDataList(id) {
                var that = this;
                $.ajax({
                    url: `${this.$store.state.common.ip}/dataResources/v1.0/findDataSourceFileList/${id}/${this.pageNum}/${this.pageSize}`,
                    type: 'GET',
                    dataType: 'json',
                    success: function(data) {
                        // body...
                        for (var i = 0; i < data.data.list.length; i++) {
                            data.data.list[i].tagList
                            if (data.data.list[i].tagList === null) {
                                data.data.list[i].tagList = []
                            }
                        }
                        that.tableData = data.data.list;
                    }
                }).always(function() {
                    that.tableloading = false;
                });
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
            }
        },
        mounted() {
            var id = this.$route.params.id;
            this.getDataList(id);
        },
        components: {
            tagBox,
        }
}
</script>

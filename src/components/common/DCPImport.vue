<template>
    <div class="dcp-import">
        <dcp-dialog :title="title" ref="import" :width="960" :height="602" @on-close="onClose" id="import">
            <template slot="dialog_body">
                <div v-show="step1" class="step1" v-if="isStep">
                    <div class="btn-box" @click="handleDataBaseClick('数据库')">
                        <i class="data_base-btn"></i>
                        <span>数据库</span>
                    </div>
                    <div class="btn-box left2" @click="handleFileClick('文件')">
                        <i class="file-btn"></i>
                        <span>文件</span>
                    </div>
                </div>
                <div v-show="step2" class="step2">
                    <div class="step2-header">
                        <div class="left-back" @click="handlePreviousStep" v-if="isStep">
                            <i class="back-arrow"></i>
                        </div>
                    </div>
                    <div class="step2-body">
                        <div class="body-left">
                            <div class="body-left-header">
                                <div class="body-left-title">
                                    <i class="body-left-title-icon"></i>
                                    <span>{{ step2Title }}</span>
                                </div>
                            </div>
                            <div class="body-left-body">
                                <el-scrollbar wrap-class="upload-demo" show="true">
                                    <el-upload ref="upload" :action="serverPath" :file-list="fileList" :multiple="false" :auto-upload="false" :data="uploadExcelParameter" accept="application/vnd.ms-excel" :on-success="onUploadSuccess">
                                        <div class="select-file">+</div>
                                    </el-upload>
                                </el-scrollbar>
                            </div>
                        </div>
                        <div class="body-right">
                            <div class="body-right-header">
                                <div class="body-right-title">
                                    <i class="body-right-title-icon"></i>
                                    <span>导入结果</span>
                                </div>
                            </div>
                            <div class="body-right-body">
                                <div class="report-list">
                                    <el-scrollbar wrap-class="report-list_item" show="true">
                                        <ul class="report-list_ul">
                                            <li class="report-list_li" v-for="com in coms" v-html="com">
                                                {{com}}
                                            </li>
                                        </ul>
                                    </el-scrollbar>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template slot="dialog_footer">
                <div v-show="step2" slot="footer" class="dialog-footer">
                    <div class="footer_left">
                        <a class="down-template" :href="downloadTemplateAddress" v-show="isTemplate">
                            <i class="down-template-image"></i> 下载模板
                        </a>
                        <el-checkbox v-model="checked" v-show="isTest" :class="isTemplate ? '' : 'checkbox-left'">是否测试连接</el-checkbox>
                    </div>
                    <div class="footer_right">
                        <a class="a-close" type="text" @click="onClose">关 闭</a>
                        <el-button @click="onSubmitUpload">确认上传</el-button>
                    </div>
                </div>
            </template>
        </dcp-dialog>
    </div>
</template>
<script>
import DcpDialog from './DCPDialog'
export default {
    data() {
            return {
                step1: true,
                step2: !this.$props.isStep,
                checked: false,
                step2Title: this.$props.importTitle,
                downloadTemplateAddress: this.$store.state.common.ip + this.$props.downloadAddress,
                serverPath: this.$store.state.common.ip + this.$props.serverAddress,
                fileList: [],
                coms: [],
                uploadExcelParameter: {},
                onUploadSuccess: (response, file, fileList) => {
                    var url = this.$store.state.common.ip + '/Batch/v1.0/DownExcelFile?path=';
                    var none = 'display:none';
                    let {
                        code,
                        msg
                    } = response;
                    if (code === 200) {
                        url += msg;
                        none = '';
                    } else {
                        this.$message.error(msg);
                        return;
                    }
                    this.$data.coms.push(
                        '<a class="report-list_li_a" href="' + url + '" style="' + none + '"><i class="el-icon-document"></i>' + file.name + '</a>'
                    );
                }
            }
        },
        props: {
            title: {
                type: String,
                default: ''
            },
            isStep: { // 是否有步骤
                type: Boolean,
                default: true
            },
            importTitle: { // 导入标题
                type: String,
                default: ''
            },
            downloadAddress: { // 模板下载地址
                type: String,
                default: ''
            },
            serverAddress: { // 上传地址
                type: String,
                default: ''
            },
            isTest: { // 是否显示测试连接
                type: Boolean,
                default: true
            },
            isTemplate: {
                type: Boolean,
                default: true
            }
        },
        components: {
            DcpDialog
        },
        methods: {
            open() {
                this.$refs.import.open();
            },
            handleDataBaseClick(title) {
                this.step1 = false;
                this.step2 = !this.step1;
                this.step2Title = title;
            },
            handleFileClick(title) {
                this.step1 = false;
                this.step2 = !this.step1;
                this.step2Title = title;
            },
            handlePreviousStep() {
                this.step1 = true;
                this.step2 = !this.step1;
                this.checked = false;
                this.fileList = [];
                this.coms = [];
                this.uploadExcelParameter = {};
            },
            onSubmitUpload() {
                let checked = this.checked;
                if (this.isTest) {
                    this.uploadExcelParameter['needTest'] = checked;
                }
                console.log(this.serverPath);
                this.$refs.upload.submit(this.uploadExcelParameter);
            },
            onClose() {
                this.step1 = true;
                this.step2 = !this.$props.isStep;
                this.step2Title = this.$props.importTitle;
                this.downloadTemplateAddress = this.$props.downloadTemplateAddress;
                this.serverPath = this.$store.state.common.ip + this.$props.serverAddress;
                this.checked = false;
                this.fileList = [];
                this.coms = [];
                this.uploadExcelParameter = {};
                this.$refs.import.close();
                this.refresh();
            },
            refresh() {
                this.$emit('on-refresh');
            },
        }
}
</script>
<style lang="scss">
.dcp-import {
    .step1 {
        padding: 0;
        overflow: hidden;
        margin-left: 140px;
        margin-top: 120px;
        .btn-box {
            width: 240px;
            height: 300px;
            cursor: pointer;
            float: left;
            text-align: center;
            color: rgba(0, 186, 236, 0.90);
            font-size: 18px;
            span {
                display: block;
                margin-top: 50px;
            }
            .data_base-btn {
                width: 240px;
                height: 210px;
                display: block;
                background: url(../../assets/img/data/import/bomb.png);
                background-size: 100% 100%;
            }
            .file-btn {
                width: 240px;
                height: 210px;
                display: block;
                background: url(../../assets/img/data/import/file.png);
                background-size: 100% 100%;
            }
            &:hover {
                span {
                    color: #00C1DE;
                }
                .data_base-btn {
                    background: url(../../assets/img/data/import/bomb_highlight.png);
                    background-size: 100% 100%;
                }
                .file-btn {
                    background: url(../../assets/img/data/import/file_highlight.png);
                    background-size: 100% 100%;
                }
            }
            &.left2 {
                margin-left: 200px
            }
            &.on {
                span {
                    color: #00C1DE;
                }
                .data_base-btn {
                    background: url(../../assets/img/data/import/bomb_highlight.png);
                    background-size: 100% 100%;
                }
                .file-btn {
                    background: url(../../assets/img/data/import/file_highlight.png);
                    background-size: 100% 100%;
                }
            }
        }
    }
    .step2 {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
        float: left;
        .step2-header {
            float: left;
            position: absolute;
            margin-top: -10px;
            top: 30px;
            left: 20px;
            .left-back {
                float: left;
                .back-arrow {
                    display: block;
                    cursor: pointer;
                    width: 20px;
                    height: 17px;
                    background: url(../../assets/img/data/import/back.png);
                    background-size: 100% 100%;
                }
            }
        }
        .step2-body {
            width: 99%;
            height: 450px;
            float: left;
            .body-left {
                float: left;
                width: 400px;
                height: 420px;
                margin-top: 10px;
                padding-left: 50px;
                .body-left-header {
                    .body-left-title {
                        width: 100%;
                        line-height: 55px;
                        .body-left-title-icon {
                            float: left;
                            width: 48px;
                            height: 48px;
                            display: block;
                            background: url(../../assets/img/data/import/category-highlight.png);
                            background-size: 100% 100%;
                        }
                        span {
                            color: #00BBEC;
                            letter-spacing: 5px;
                            font-size: 20px;
                            float: left;
                            margin-left: 10px;
                        }
                    }
                }
                .body-left-body {
                    width: 100%;
                    margin-bottom: 40px;
                    height: 360px;
                    overflow: hidden;
                    .upload-demo {
                        height: 350px;
                        .el-upload {
                            .select-file {
                                width: 300px;
                                height: 35px;
                                line-height: 35px;
                                color: #00BBEC;
                                font-size: 40px;
                                background: #0C1A34;
                                border-radius: 0;
                                text-align: center;
                                line-height: 30px;
                                margin-left: 60px;
                                &:hover {
                                    border-color: #20a0ff
                                }
                            }
                        }
                        .el-upload-list {
                            margin: 0;
                            padding: 0;
                            float: left;
                            list-style: none;
                            margin-left: 60px;
                            height: 350px;
                            .el-upload-list__item {
                                width: 300px;
                                cursor: pointer;
                                &:hover {
                                    background: none;
                                    box-shadow: inset 0 0 17px 0 rgba(73, 210, 247, 0.26);
                                    border-radius: 1px;
                                }
                                .el-upload-list__item-status-label {
                                    color: #51E58C;
                                    line-height: 70px;
                                    .el-icon-close {
                                        color: #00BBEC;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .body-right {
                float: right;
                width: 400px;
                height: 420px;
                margin-top: 10px;
                .body-right-header {
                    height: 50px;
                    .body-right-title {
                        width: 100%;
                        height: 48px;
                        line-height: 55px;
                        .body-right-title-icon {
                            float: left;
                            width: 48px;
                            height: 48px;
                            display: block;
                            background: url(../../assets/img/data/import/category-highlight.png);
                            background-size: 100% 100%;
                        }
                        span {
                            color: #00BBEC;
                            letter-spacing: 5px;
                            font-size: 20px;
                            float: left;
                            margin-left: 10px;
                        }
                    }
                }
            }
        }
    }
    .el-upload-list {
        .el-upload-list__item-name {
            color: rgba(0, 186, 236, 0.90);
            margin-left: 5px;
            font-size: 14px;
            .el-icon-document {
                font-size: 35px;
                background: url(../../assets/img/data/import/excel.png) no-repeat center;
                background-size: 80% 50%;
                color: rgba(151, 168, 190, 0);
            }
        }
    }
    .report-text {
        font-size: 14px;
        color: rgba(0, 186, 236, 0.90);
        margin: 5px 10px;
    }
    .report-list {
        margin-top: 58px;
        width: 400px;
        height: 300px;
        overflow: hidden;
        .report-list_item {
            height: 300px;
            .report-list_ul {
                height: 300px;
                margin: 0;
                padding: 0;
                list-style: none;
                float: left;
                margin-left: 50px;
                .report-list_li {
                    font-size: 14px;
                    color: #48576a;
                    line-height: 1.8;
                    cursor: pointer;
                    width: 240px;
                    margin-bottom: 10px;
                    padding: 10px;
                    &:hover {
                        background: none;
                        box-shadow: inset 0 0 17px 0 rgba(73, 210, 247, 0.26);
                        border-radius: 1px;
                    }
                    .report-list_li_a {
                        display: block;
                        margin-right: 40px;
                        overflow: hidden;
                        padding-left: 4px;
                        text-overflow: ellipsis;
                        transition: color .3s;
                        white-space: nowrap;
                        color: rgba(0, 186, 236, 0.9);
                        font-size: 14px;
                        text-decoration: none;
                        .el-icon-document {
                            font-size: 35px;
                            background: url(../../assets/img/data/import/excel.png) no-repeat center;
                            background-size: 80% 90%;
                            color: rgba(151, 168, 190, 0);
                        }
                    }
                }
            }
        }
    }
    .dialog-footer {
        .footer_left {
            font-size: 14px;
            float: left;
            margin-left: 50px;
            width: 250px;
            .down-template {
                float: left;
                color: #06bfe7;
                cursor: pointer;
                text-decoration: none;
                .down-template-image {
                    float: left;
                    display: block;
                    width: 20px;
                    height: 20px;
                    background: url(../../assets/img/data/import/down.png);
                    background-size: 100% 100%;
                }
            }
            .el-checkbox {
                color: #06bfe7;
                .el-checkbox__input {
                    .el-checkbox__inner {
                        border-radius: 1px;
                        width: 16px;
                        height: 16px;
                    }
                }
            }
            .checkbox-left {
                float: left;
            }
        }
        .footer_right {
            float: right;
            .a-close {
                font-size: 14px;
                margin-right: 20px;
                cursor: pointer;
            }
        }
    }
}
</style>

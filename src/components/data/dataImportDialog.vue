<template>
    <div class="import_dialog">
        <el-dialog class="cty-dialog" :title="title" v-model="isShow" size="small" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="isClose">
            <div v-show="show1" class="step1">
                <div class="btn-box" @click="handleDataBaseClick">
                    <i class="data_base-btn"></i>
                    <span>数据库</span>
                </div>
                <div class="btn-box left2" @click="handleFileClick">
                    <i class="file-btn"></i>
                    <span>文件</span>
                </div>
            </div>
            <div v-show="show2" class="step2">
                <div class="step2-header">
                    <div class="left-back" @click="handlePreviousStep">
                        <i class="back-arrow"></i>
                    </div>
                    <div class="right-close" @click="isShow=false">
                        <i class="el-icon-close"></i>
                    </div>
                </div>
                <div class="step2-body">
                    <div class="body-left">
                        <div class="body-left-header">
                            <div class="body-left-title">
                                <i class="body-left-title-icon"></i>
                                <span>{{step2Title}}</span>
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
                                <!-- <div id="report_item_id" class="report-list_item">
                                    
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="show2" slot="footer" class="dialog-footer">
                <div class="footer_left">
                    <a class="down-template" :href="downloadTemplateAddress">
                        <i class="down-template-image"></i> 下载模板
                    </a>
                    <el-checkbox v-model="checked">是否测试连接</el-checkbox>
                </div>
                <div class="footer_right">
                    <el-button type="text" @click="isShow=false">关 闭</el-button>
                    <el-button @click="onSubmitUpload">确认上传</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
            return {
                loading2: false,
                isShow: false, //  Dialog 默认不显示
                title: '数据源导入',
                step2Title: '',
                show1: true,
                show2: false,
                isClose: true,
                downloadTemplateAddress: this.$store.state.UPLOAD_IP + '/Batch/v1.0/DownDataSourceTemplateFile',
                checked: false, //  多选框默认不选中
                fileList: [],
                coms: [],
                serverPath: this.$store.state.UPLOAD_IP + '/Batch/v1.0/uploadExcelFile',
                uploadExcelParameter: {

                },
                onUploadSuccess: (response, file, fileList) => {
                    var url = '/Batch/v1.0/DownExcelFile?path=';
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
        mounted() {},

        watch: {
            isShow: function() {
                if (!this.isShow) {
                    this.loading2 = false;
                    this.checked = false;
                    this.fileList = [];
                    this.coms = [];
                    this.downloadTemplateAddress = this.$store.state.UPLOAD_IP + '/Batch/v1.0/DownDataSourceTemplateFile';
                    this.show1 = true;
                    this.show2 = false;
                    this.title = '数据源导入';
                    this.isClose = true;
                    $('.btn-box').removeClass('on');
                }
            }
        },

        methods: {
            //  打开dialog方法
            onOpen() {
                this.$data.isShow = true;
            },

            //  上传方法
            onSubmitUpload() {
                let checked = this.$data.checked;
                this.$data.uploadExcelParameter['needTest'] = checked;
                this.$refs.upload.submit(this.$data.uploadExcelParameter);
            },

            handleDataBaseClick() {
                console.log($(this));
                $('.btn-box:first').addClass('on');
                $('.btn-box:eq(1)').removeClass('on');
                this.downloadTemplateAddress = this.$store.state.UPLOAD_IP + '/Batch/v1.0/DownDataSourceTemplateFile';
                this.show1 = false;
                this.show2 = true;
                this.title = '';
                this.isClose = false;
                this.step2Title = '数据库';
            },
            handleFileClick() {
                $('.btn-box:first').removeClass('on');
                $('.btn-box:eq(1)').addClass('on');
                //  TODO: 没有文件模板下载地址，先用数据库模板下载地址，后期替换下载地址
                this.downloadTemplateAddress = this.$store.state.UPLOAD_IP + '/Batch/v1.0/DownDataSourceTemplateFile';
                this.show1 = false;
                this.show2 = true;
                this.title = '';
                this.isClose = false;
                this.step2Title = '文件';
            },
            handlePreviousStep() {
                this.show1 = true;
                this.show2 = false;
                this.title = '数据源导入';
                this.isClose = true;
            }
        }
}
</script>
<style lang="scss">
.import_dialog {
    width: 100%;
    height: 100%;
    .cty-dialog {
        .el-dialog {
            background: url(../../assets/img/data/modal/modal.png) #0c2642;
            background-size: 100% 100%;
            padding: 0.1rem;
        }
        .el-dialog__header {
            font-size: 0.16rem;
            text-align: center;
            .el-dialog__title {
                color: #00BBEC;
                font-size: 0.18rem;
                font-weight: 100;
            }
        }
        .el-dialog__close {
            color: #06bfe7;
            text-shadow: 0 0 0.2em #06bfe7,
        }
        .el-dialog__headerbtn {
            padding-right: 0.11rem;
            padding-top: 0.06rem;
        }
        .el-radio-group {
            width: 100%;
            text-align: center;
            .el-radio-button__inner {
                width: 300px;
            }
        }
        .step1 {
            width: 100%;
            height: 100%;
            padding: 0;
            overflow: hidden;
            float: left;
            margin: 1rem;
            .btn-box {
                width: 2.4rem;
                height: 3rem;
                cursor: pointer;
                float: left;
                text-align: center;
                color: rgba(0, 186, 236, 0.90);
                font-size: 0.18rem;
                span {
                    display: block;
                    margin-top: 0.5rem;
                }
                .data_base-btn {
                    width: 2.4rem;
                    height: 2.1rem;
                    display: block;
                    background: url(../../assets/img/data/import/bomb.png);
                    background-size: 100% 100%;
                }
                .file-btn {
                    width: 2.4rem;
                    height: 2.1rem;
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
                    margin-left: 2rem
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
                width: 100%;
                height: 0.3rem;
                float: left;
                .left-back {
                    float: left;
                    .back-arrow {
                        display: block;
                        cursor: pointer;
                        width: 0.2rem;
                        height: 0.17rem;
                        background: url(../../assets/img/data/import/back.png);
                        background-size: 100% 100%;
                    }
                }
                .right-close {
                    float: right;
                    margin-right: 0.1rem;
                    color: #06bfe7;
                    font-size: 0.16rem;
                    cursor: pointer;
                }
            }
            .step2-body {
                width: 99%;
                height: 4.5rem;
                float: left;
                .body-left {
                    float: left;
                    width: 4rem;
                    height: 4.2rem;
                    margin-top: 0.1rem;
                    padding-left: 0.5rem;
                    .body-left-header {
                        .body-left-title {
                            width: 100%;
                            line-height: 0.55rem;
                            .body-left-title-icon {
                                float: left;
                                width: 0.48rem;
                                height: 0.48rem;
                                display: block;
                                background: url(../../assets/img/data/import/category-highlight.png);
                                background-size: 100% 100%;
                            }
                            span {
                                color: #00BBEC;
                                letter-spacing: 0.05rem;
                                font-size: 0.2rem;
                                float: left;
                                margin-left: 0.1rem;
                            }
                        }
                    }
                    .body-left-body {
                        width: 100%;
                        margin-bottom: 0.4rem;
                        height: 3.6rem;
                        overflow: hidden;
                        .upload-demo {
                            height: 3.5rem;
                            .el-upload {
                                .select-file {
                                    width: 3rem;
                                    height: 0.35rem;
                                    line-height: 0.35rem;
                                    color: #00BBEC;
                                    font-size: 0.4rem;
                                    background: #0C1A34;
                                    border-radius: 0.01rem;
                                    text-align: center;
                                    line-height: 0.3rem;
                                    margin-left: 0.6rem;
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
                                margin-left: 0.6rem;
                                height: 3.5rem;
                                .el-upload-list__item {
                                    width: 3rem;
                                    cursor: pointer;
                                    &:hover {
                                        background: none;
                                        box-shadow: inset 0 0 17px 0 rgba(73, 210, 247, 0.26);
                                        border-radius: 1px;
                                    }
                                    .el-upload-list__item-status-label {
                                        color: #51E58C;
                                        line-height: 0.7rem;
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
                    width: 4rem;
                    height: 4.2rem;
                    margin-top: 0.1rem;
                    .body-right-header {
                        height: 0.5rem;
                        .body-right-title {
                            width: 100%;
                            height: 0.48rem;
                            line-height: 0.55rem;
                            .body-right-title-icon {
                                float: left;
                                width: 0.48rem;
                                height: 0.48rem;
                                display: block;
                                background: url(../../assets/img/data/import/category-highlight.png);
                                background-size: 100% 100%;
                            }
                            span {
                                color: #00BBEC;
                                letter-spacing: 0.05rem;
                                font-size: 0.2rem;
                                float: left;
                                margin-left: 0.1rem;
                            }
                        }
                    }
                }
            }
        }
    }
    .el-upload-list {
        .el-upload-list__item-name {
            color: rgba(0, 186, 236, 0.90);
            margin-left: 0.05rem;
            font-size: 0.14rem;
            .el-icon-document {
                font-size: 0.35rem;
                background: url(../../assets/img/data/import/excel.png) no-repeat center;
                background-size: 80% 50%;
                color: rgba(151, 168, 190, 0);
            }
        }
    }
    .report-text {
        font-size: 0.14rem;
        color: rgba(0, 186, 236, 0.90);
        margin: 0.05rem 0.1rem;
    }
    .report-list {
        margin-top: 0.58rem;
        width: 4rem;
        height: 3rem;
        overflow: hidden;
        .report-list_item {
            height: 3rem;
            .report-list_ul {
                height: 3rem;
                margin: 0;
                padding: 0;
                list-style: none;
                float: left;
                margin-left: 0.5rem;
                .report-list_li {
                    font-size: 0.14rem;
                    color: #48576a;
                    line-height: 1.8;
                    cursor: pointer;
                    width: 2.4rem;
                    margin-bottom: 0.1rem;
                    padding: 0.1rem;
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
                        font-size: 0.14rem;
                        text-decoration: none;
                        .el-icon-document {
                            font-size: 0.35rem;
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
            font-size: 0.14rem;
            float: left;
            margin-left: 0.5rem;
            width: 2.5rem;
            .down-template {
                height: 0.25rem;
                float: left;
                color: #06bfe7;
                cursor: pointer;
                line-height: 0.22rem;
                text-decoration: none;
                .down-template-image {
                    float: left;
                    display: block;
                    width: 0.2rem;
                    height: 0.2rem;
                    background: url(../../assets/img/data/import/down.png);
                    background-size: 100% 100%;
                }
            }
            .el-checkbox {
                color: #06bfe7;
                .el-checkbox__input {
                    .el-checkbox__inner {
                        border-radius: 1px;
                        width: 0.16rem;
                        height: 0.16rem;
                    }
                }
            }
        }
        .footer_right {
            float: right;
            font-size: 0.14rem;
            margin-bottom: 0.3rem;
            .el-button {
                font-size: 0.14rem;
                border-radius: 0.01rem;
                margin-right: 0.5rem;
                line-height: 0;
                color: rgba(0, 186, 236, 0.90);
                background: #0C1A34;
                border: 0.01rem solid #0C1A34;
            }
        }
    }
}
</style>

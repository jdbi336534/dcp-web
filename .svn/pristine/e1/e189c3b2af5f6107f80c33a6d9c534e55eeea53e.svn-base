<template>
    <div class="bqBoxComponent">
        <div class="labelbq">
            <p class="labelText">
                标签
                <span class="addBtn hand" @click="addbq"
                    :class="(pageStatus === 1 || pageStatus === 3) ? 'hide' : ''"><i class="el-icon-plus"></i></span>
            </p>
        </div>
        <div class="bqmain">
            <div class="bqmainBox" v-if="pageStatus === 1 || pageStatus === 3">
                <el-tooltip :key="i" class="item" effect="dark" v-for="(tag, i) in tagList" :content="tag.tagDescription">
                    <el-tag type="success" :closable="isclose" :close-transition="false" @close="handleClose(tag)">
                        {{ tag.tagName }}
                    </el-tag>
                </el-tooltip>
            </div>
            <div class="bqmainBox" v-else="pageStatus === 2">
                <el-tooltip :key="i" class="item" effect="dark" v-for="(tag, i) in dynamicTags" :content="tag.tagDescription">
                    <el-tag type="success" :closable="isclose" :close-transition="false" @close="handleClose(tag)">
                        {{ tag.tagName }}    
                    </el-tag>
                </el-tooltip>
            </div>
        </div>

        <div class="newbqBox" :class="showhide.showaddbq ? 'show' : 'hide'">
            <div class="bd">
                <dl>
                    <dt>标签</dt>
                    <dd class="inputBox">
                        <input type="text" class="input" v-model="bq.tagName" placeholder="请输入1-10个字符" @blur="yzsfcz" minlength="0" maxlength="10" />
                    </dd>
                    <p class="p1 hide">请输入1-10个字符</p>
                </dl>
                <dl style="padding:10px 0;">
                    <dt>备注</dt>
                    <dd class="textareaBox">
                        <div class="textarea">
                            <textarea class="newbqbztext" v-model="bq.tagDescription" cols="32" rows="2"></textarea>
                        </div>
                    </dd>
                </dl>
                <dl class="btnDl clearfix">
                    <dt class="qxBtn"><a class="hand" @click="qxbq">取消</a></dt>
                    <dd class="bcBtn">
                        <a class="hand" @click="savebq" v-loading="loadingsavebq">保存</a>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        yzbq,
        newbq
    } from '../../assets/js/queryData';
    import {
        getSessionStore
    } from '../../assets/js/mUtils';
    export default {
        props: {
            pageStatus: null,
            tagList: null
        },
        data() {
            return {
                loadingsavebq: false,
                isclose: true,
                pageStatusChild: this.pageStatus,
                usermsgBq: {},
                bqiddata: [],
                bq: {
                    tagName: '',
                    tagDescription: '',
                    id: ''
                },
                yzbqFlag: false,
                showhide: {
                    showaddbq: false,
                },
                labelPosition: 'top',
                dynamicTags: [],
                inputVisible: false,
                ruleForm: {
                    name: '',
                    desc: ''
                },
                rules: {
                    name: [
                        {
                            required: true,
                            message: '请输入活动名称',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 5,
                            message: '长度在3到5个字符',
                            trigger: 'blur'
                        }
                    ],
                    desc: [
                        {
                            required: true,
                            message: '请填写活动形式',
                            trigger: 'blur'
                        },
                        {
                            min: 0,
                            max: 200,
                            trigger: 'blur'
                        }
                    ]
                }
            };
        },
        mounted() {
            this.usermsgBq = getSessionStore('userInfo');
        },
        beforeUpdate() {
            // this.bqiddata = [];
        },
        methods: {
            newclose() {
                this.isclose = true;
            },
            clearBqiddata() {
                this.bqiddata = [];
                this.dynamicTags = [];
                this.showhide.showaddbq = false;
                this.isclose = false;
                this.bq = {
                    tagName: '',
                    tagDescription: '',
                    id: ''
                };
            },
            qxbq() {
                this.bq = {
                    tagName: '',
                    tagDescription: '',
                    id: ''
                };
                this.showhide.showaddbq = false;
                this.loadingsavebq = false;
            },
            yzsfcz() {
                var len = this.bq.tagName.length;
                if (len <= 10 && len > 0) {
                    $('.p1').addClass('hide');
                    yzbq(this.bq.tagName)
                        .then(res => {
                            if (res.code === 200) {
                                this.yzbqFlag = true;       // 标签名是否存在， true: 不存在
                            } else if (res.code === 300) {
                                this.yzbqFlag = false;
                                this.bq = res.data;
                            }
                        });
                } else {
                    // $('.p1').removeClass('hide');
                }
            },
            savebq() {
                var len = this.bq.tagName.length;

                if (len === 0 || len > 10) {
                    // $('.p1').removeClass('hide');
                    return;
                }

                this.loadingsavebq = true;
                if (this.yzbqFlag) {
                    newbq(this.bq.tagName, this.bq.tagDescription, this.usermsgBq.id)
                        .then(res => {
                            if (res.code === 200) {
                                this.loadingsavebq = false;
                                this.bq.id = res.data;
                                this.bqiddata.push(this.bq);
                                var flagsfcz = true;

                                for (var r = 0; r < this.dynamicTags.length; r++) {
                                    flagsfcz = this.dynamicTags[r].tagName !== this.bq.tagName
                                }

                                if (flagsfcz) {
                                    this.dynamicTags.push(this.bq);
                                }

                                this.$emit('bqiddataz', this.bqiddata);
                                this.showhide.showaddbq = false;
                                this.bq = {
                                    tagName: '',
                                    tagDescription: '',
                                    id: ''
                                };
                            }
                        })
                } else {
                    var flagsfcz = true;
                    for (var r = 0; r < this.dynamicTags.length; r++) {
                        flagsfcz = this.dynamicTags[r].tagName !== this.bq.tagName;
                    }
                    
                    if (flagsfcz) {
                        this.dynamicTags.push(this.bq);
                        this.bqiddata.push(this.bq);
                    }

                    this.$emit('bqiddataz', this.bqiddata);
                    this.loadingsavebq = false;
                    this.showhide.showaddbq = false;
                }
            },
            addbq() {
                this.showhide.showaddbq = true;
                this.bq = {
                    tagName: '',
                    tagDescription: '',
                    id: ''
                };
            },
            handleClose(tag) {
                if (this.pageStatus === 2) {
                    for (var y = 0; y < this.dynamicTags.length; y++) {
                        if (this.dynamicTags[y].id === tag.id) {
                            this.dynamicTags.splice(y, 1);
                            this.bqiddata.splice(y, 1);
                            this.$emit('bqiddataz', this.bqiddata);
                        }
                    }
                }
            },
            submitForm(formName) {
                this.$emit('message', this.ruleForm);
            }
        }
    }
</script>
<style lang="scss">
    .bqBoxComponent {
        width: 100%;
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        font-size: 14px;
        
        .labelbq {
            width: 100px;
            margin: 0 0 0 39px;
        },
        .bqmain {
            flex: 1;
            padding: 13px 0 0;
        }
        .hide {
            display: none;
        }
        .hand {
            cursor: pointer;
        }
        .newbqBox {
            width: 300px;
            height: 220px;
            overflow: hidden;
            position: absolute;
            z-index: 100;
            margin: 35px 0 0;
            background: url('../../assets/img/sourcePub/xlk.png') no-repeat;
            background-size: 100% 100%;
        }
        .bqmainBox {
            text-align: left;

            & > span {
                cursor: default;
            }

            & > span + span {
                margin: 0 0 0 4px;
            }
        }
        .bd {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            padding: 30px 30px 20px 25px;
            text-align: left;

            input, textarea {
                background: transparent;
                width: 100%;
                border: 1px solid rgba(36,202,243,1);
                outline: none;
                color: rgba(57,190,243,1);
                padding: 3px 6px;
            }
            p {
                margin: 5px;
            }

            .qxBtn, .bcBtn {
                float: left;
            }

            .bcBtn {
                float: right;
            }

            .btnDl {
                padding: 10px 0 0;
                a {
                    display: block;
                    width: 76px;
                    height: 25px;
                    line-height: 25px;
                    overflow: hidden;
                    text-decoration: none;
                    color: rgba(57,190,243,1);
                    text-align: center;

                    
                }
                .bcBtn a {
                    border-radius: 1px;
                    border: 1px solid #01172F;
                    background: #01172F;
                    &:hover {
                        color: #fff;
                        border-color: rgba(36,202,243,1);
                        box-shadow: inset 0 0 10px 0 rgba(98, 208, 248, 0.42);
                    }
                }
                .el-loading-mask {
                    background: #0d2c4d !important;
                }
                .el-loading-spinner .circular {
                    width: 22px;
                    height: 22px;
                    margin: 10px 0 0;
                }
            }
        }
    }
</style>

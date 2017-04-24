<template>
    <div class="info-wrapper">
        <el-form ref="ruleForm2" :model="ruleForm2" :rules="rules2" label-width="80px">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="目录名称">
                        <el-input v-model="ruleForm2.mlmc" :disabled="testData.mlmc" @change="saveForm"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-form-item label="信息摘要">
                        <el-input type="textarea" v-model="ruleForm2.xxzy" :disabled="testData.xxzy" 
                            :autosize="{minRows: 0, maxRows: 2}" @change="saveForm"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="主题类型">
                        <el-select v-model="testForm.ztlx" :disabled="testData.mlztlx">
                            <el-option
                                v-for="item in options"
                                :label="item.label"
                                :value="item.value"
                                :key="item.value">    
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="11" :offset="2">
                    <el-form-item label="上级节点">
                        <el-select v-model="testForm.sjjd" :disabled="testData.sjjd">
                            <el-option-group
                                v-for="group in options3" :label="group.label" :key="group.label">
                                <el-option
                                    v-for="item in group.options" :label="item.label" :value="item.value" :key="item.value">
                                </el-option>
                            </el-option-group>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="提供单位">
                        <el-input v-model="testForm.tgdw" :disabled="testData.tgdw"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11" :offset="2">
                    <el-form-item label="全路径">
                        <el-input v-model="testForm.qlj" :disabled="testData.qlj"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
                <el-col :span="11">
                    <el-form-item label="根节点">
                        <el-input v-model="testForm.gjd" :disabled="testData.gjd"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="发布状态">
                        <el-input v-model="testForm.fbzt" :disabled="testData.fbzt"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            var checkAge = (rule, value, callback) => {

            };
            var validatePass = (rule, value, callback) => {

            };
            var validatePass2 = (rule, value, callback) => {

            };
            return {
                options: [
                    {
                        value: 1,
                        label: '主题'
                    },
                    {
                        value: 2,
                        label: '组织机构'
                    },
                    {
                        value: 3,
                        label: '行政区域'
                    }
                ],
                options3: [
                    {
                        label: '热门城市',
                        options: [
                            {
                                value: 'Shanghai',
                                label: '上海'
                            },
                            {
                                value: 'Beijing',
                                label: '北京'
                            }
                        ]
                    },
                    {
                        label: '城市名',
                        options: [
                            {
                                value: 'Chengdu',
                                label: '成都'
                            },
                            {
                                value: 'Shenzhen',
                                label: '深圳'
                            },
                            {
                                value: 'Guangzhou',
                                label: '广州'
                            },
                            {
                                value: 'Dalian',
                                label: '大连'
                            }
                        ]
                    }
                ],
                value7: '',
                ruleForm2: {
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
                showForm2: {
                    mlmc: false,
                    xxzy: false,
                    tgdw: true,
                    sjjd: true,
                    gjd: true,
                    mlztlx: true,
                    qlj: true,
                    mlbq: true,
                    fbzt: true
                },
                rules2: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    age: [
                        { validator: checkAge, trigger: 'blur' }
                    ],
                    xxzy: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 0, max: 200, message: '长度在3到5个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        props: {
            testData: {
                type: Object,
                default: {
                    mlmc: false,
                    xxzy: false,
                    tgdw: true,
                    sjjd: true,
                    gjd: true,
                    mlztlx: true,
                    qlj: true,
                    mlbq: true,
                    fbzt: true
                }
            },
            testForm: {},
            pageStatus: null
        },
        mounted() {
            this.ruleForm2 = this.testForm;
        },
        beforeUpdate() {
            this.ruleForm2 = this.testForm;
        },
        methods: {
            saveForm() {
                this.$emit('message2', this.ruleForm2);
            },
            submitForm(formName) {
                this.$emit('message2', this.ruleForm2);
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style lang="scss">
    .info-wrapper {
        width: 100%;
        height: 280px;
        
        .el-form-item__label {
            color: #05bde6;
        }

        .el-select {
            width: 100%;
        }

        .el-input__inner, .el-textarea__inner {
            border: none;
            border-bottom: solid 1px #075174;
            background: transparent;
            color: #05bde6;
            border-radius: 0;

            &:hover {
                border-bottom-color: #075174;
            }
        }
        i.el-input__icon {
            color: #20AFD5 !important;
        }
        .is-disabled {
            input.el-input__inner, textarea.el-textarea__inner {
                background: transparent;
                border: none;
                border-bottom: solid 1px #075174;
                color: #05bde6;
                border-radius: 0;
            }
        }
        .el-select .el-input.is-disabled .el-input__inner:hover {
            border-color: #075174;
            border-radius: 0;
        }
    }
</style>

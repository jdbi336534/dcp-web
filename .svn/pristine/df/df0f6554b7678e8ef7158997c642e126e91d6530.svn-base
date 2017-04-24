<template>
    <div class="jdbFormbox">
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="80px" class="jdbform">
            <el-row justify="center" class='cesmlmc'>
                <el-col :span="24">
                    <el-form-item label-position="right" label="目录名称" prop="">
                        <el-input v-model="ruleForm2.mlmc" :disabled="testData.mlmc" @change='saveForm'></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row justify="space-around">
                <el-col :span="24">
                    <el-form-item label="信息摘要" prop="xxzzy">
                        <el-input type="textarea" @change='saveForm' :autosize="{ minRows: 0, maxRows: 3}" placeholder="" v-model="ruleForm2.xxzy" :disabled="testData.xxzy">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="主题类型" prop="">
                        <el-select v-model="testForm.ztlx" placeholder="" :disabled="testData.mlztlx">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="11" :offset="2">
                    <el-form-item label="上级节点" prop="">
                        <el-select v-model="testForm.sjjd" placeholder="" :disabled="testData.sjjd">
                            <el-option-group v-for="group in options3" :key="group.label" :label="group.label">
                                <el-option v-for="item in group.options" :key="item.label" :label="item.label" :value="item.value">
                                </el-option>
                            </el-option-group>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="提供单位" prop="">
                        <el-input v-model="testForm.tgdw" :disabled="testData.tgdw"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11" :offset="2">
                    <el-form-item label="全路径" prop="">
                        <el-input v-model="testForm.qlj" :disabled="testData.qlj"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="根节点" prop="">
                        <el-input v-model="testForm.gjd" :disabled="testData.gjd"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="11" :offset="2">
                    <el-form-item label="发布状态 " prop="">
                        <el-input v-model="testForm.fbzt" :disabled="testData.fbzt"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
// import {
//  dataRegisterData // } from '../../../service/queryData';
export default {
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
                fbzt: true,
            },
        },
        testForm: {},
        pageStatus: null,
    },
    data() {
        var checkAge = (rule, value, callback) => {

        };
        var validatePass = (rule, value, callback) => {

        };
        var validatePass2 = (rule, value, callback) => {

        };
        return {
            options: [{
                value: 1,
                label: '主题'
            }, {
                value: 2,
                label: '组织机构'
            }, {
                value: 3,
                label: '行政区域'
            }],
            options3: [{
                label: '热门城市',
                options: [{
                    value: 'Shanghai',
                    label: '上海'
                }, {
                    value: 'Beijing',
                    label: '北京'
                }]
            }, {
                label: '城市名',
                options: [{
                    value: 'Chengdu',
                    label: '成都'
                }, {
                    value: 'Shenzhen',
                    label: '深圳'
                }, {
                    value: 'Guangzhou',
                    label: '广州'
                }, {
                    value: 'Dalian',
                    label: '大连'
                }]
            }],
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
                fbzt: '',
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
                fbzt: true,
            },
            rules2: {
                pass: [{
                    validator: validatePass,
                    trigger: 'blur'
                }],
                checkPass: [{
                    validator: validatePass2,
                    trigger: 'blur'
                }],
                age: [{
                    validator: checkAge,
                    trigger: 'blur'
                }],
                xxzy: [{
                    required: true,
                    message: '请输入活动名称',
                    trigger: 'blur'
                }, {
                    min: 0,
                    max: 200,
                    message: '长度在 3 到 5 个字符',
                    trigger: 'blur'
                }],
            }
        };
    },
    mounted() {
        this.ruleForm2 = this.testForm;
        console.log('this.testForm')
        console.log(this.testForm)
        console.log(this.ruleForm2)
    },
    beforeUpdata() {
        this.ruleForm2 = this.testForm;
        console.log('beforeUpdatathis.testForm')
        console.log(this.testForm)
        console.log(this.ruleForm2)
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
};
</script>
<style lang="scss">
.jdbFormbox {
    .jdbform {
        padding: 0 25px 0 25px;
        .el-select {
            display: block;
        }
        .el-form-item__label {
            color: rgba(36, 202, 243, 0.9);
        }
        .el-textarea.is-disabled {
            .el-textarea__inner {
                height: 36px!important;
            }
        }
        // input输入框样式重写&textarea样式重写
        .el-input__inner,
        .el-input.is-disabled .el-input__inner,
        .el-textarea__inner,
        .el-textarea.is-disabled .el-textarea__inner,
        textarea:disabled {
            background: transparent;
            border-radius: 0;
            border: 0;
            border-bottom: 1px solid #1C8EB2;
        }
        .el-select .el-input .el-input__icon {
            color: #20AFD5;
        }
        .el-form-item {
            margin-bottom: 14px;
        }
        .el-input.is-disabled .el-input__inner,
        .el-textarea.is-disabled .el-textarea__inner {
            color: #1dadd4;
        }
    }
}
</style>

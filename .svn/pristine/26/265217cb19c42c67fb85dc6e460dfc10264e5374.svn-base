<template>
    <div class="newBoxz">
        <dcp-dialog id="user_detail_dialog" ref="detailDialog" :title="titlename" :width="900" :height="500">
            <div slot="dialog_body" style="padding:40px;">
                <el-form :model="form" class="user-form">
                    <el-row>
                        <el-col :span="11" :pull="1">
                            <el-form-item label="用户ID" :label-width="formLabelWidth" prop="id">
                                <el-input size="small" v-model="form.id" auto-complete="off" :disabled="inputstate" class="el-input-style"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="备注" :label-width="formLabelWidth" prop="describeText">
                                <el-input size="small" v-model="form.describeText" auto-complete="off" :disabled="inputstate" class="el-input-style"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11" :pull="1">
                            <el-form-item label="用户名" :label-width="formLabelWidth" prop="userName">
                                <el-input size="small" v-model="form.userName" auto-complete="off" :disabled="inputstate" class="el-input-style"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="所属部门" :label-width="formLabelWidth" prop="departmentName">
                                <el-input size="small" v-model="form.departmentName" auto-complete="off" :disabled="inputstate" class="el-input-style"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11" :pull="1">
                            <el-form-item label="手机号" :label-width="formLabelWidth" prop="phoneNumber">
                                <el-input size="small" v-model="form.phoneNumber" auto-complete="off" :disabled="inputstate" class="el-input-style"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="所属机构" :label-width="formLabelWidth" prop="organizationName">
                                <el-input size="small" v-model="form.organizationName" auto-complete="off" :disabled="inputstate" class="el-input-style"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11" :pull="1">
                            <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                                <el-input size="small" v-model="form.email" auto-complete="off" :disabled="inputstate" class="el-input-style"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="角色" :label-width="formLabelWidth" prop="roleName">
                                <el-input size="small" v-model="form.roleName" auto-complete="off" :disabled="inputstate" class="el-input-style"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11" :pull="1">
                            <el-form-item label="真实姓名" :label-width="formLabelWidth" prop="realName">
                                <el-input size="small" v-model="form.realName" auto-complete="off" :disabled="inputstate" class="el-input-style"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="添加时间" :label-width="formLabelWidth" prop="addDate">
                                <el-input size="small" v-model="form.addDate" auto-complete="off" :disabled="inputstate" class="el-input-style"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div slot="dialog_footer">
                <el-button type="text" @click="cancelDetail">关闭</el-button>
            </div>
        </dcp-dialog>
    </div>
</template>
<script>
import DcpDialog from '../common/DCPDialog'
export default {
    components: {
        DcpDialog
    },
    props: ['form', 'titlename'],
    data() {
        return {
            formLabelWidth: '170px',
            inputstate: true
        }
    },
    methods: {
        cancelDetail() {
            this.$refs.detailDialog.close();
        },
        open() {
            this.$refs.detailDialog.open();
        }
    }

}
</script>
<style lang="scss">
.form-inner {
    padding: 40px;
}

.newBoxz {
    .user-form {
        .el-form-item__label {
            color: #24caf3;
        }
        .el-input__inner {
            border-radius: 0;
            background: transparent;
        }
        .el-input.is-disabled .el-input__inner {
            color: #24caf3;
            background: transparent;
        }
    }
}
</style>

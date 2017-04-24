<template>
    <div class="newdataSourcemodal_jdb">
        <el-dialog v-if="owershow" :title="titlename" v-model="addFormVisible" :close-on-click-modal="false">
            <div style="position:absolute;right:2px;top:-30px;width:30px;height:30px;cursor:pointer" @click="closeModal"></div>
            <div v-show="state" class="margin_top">
                <el-form :model="form" :rules="rules" ref="form">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="数据源名称" :label-width="formLabelWidth" prop="dataSourceName">
                                <el-input size="small" v-model="form.dataSourceName" auto-complete="off" :disabled="inputstate"></el-input>
                            </el-form-item>
                            <el-form-item label="数据源类型" :label-width="formLabelWidth" prop="dataSourceKind">
                                <el-select v-model="form.dataSourceKind" filterable placeholder="" size="small">
                                    <el-option v-for="item in dataSourceKind" :label="item.label" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="业务系统名称" :label-width="formLabelWidth" prop="businessSysName">
                                <el-input size="small" v-model="form.businessSysName" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="数据源分类" :label-width="formLabelWidth" prop="dataSourceType">
                                <el-select v-model="form.dataSourceType" filterable placeholder="" size="small">
                                    <el-option v-for="item in dataSourceType" :label="item.label" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <!--  <el-form-item label="历史数据量" :label-width="formLabelWidth" prop="historyDataSize">
                                        <el-input size="small" v-model="form.historyDataSize" auto-complete="off"></el-input>
                                    </el-form-item> -->
                            <el-form-item label="版本号" :label-width="formLabelWidth">
                                <el-input size="small" v-model="form.version" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="前置机节点" :label-width="formLabelWidth">
                                <el-input size="small" v-model="form.frontEndNode" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="物理地址" :label-width="formLabelWidth">
                                <el-input size="small" v-model="form.physicalAddress" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="数据源说明" :label-width="formLabelWidth">
                                <el-input size="small" type="textarea" v-model="form.description" auto-complete="off"></el-input>
                            </el-form-item>
                            <!--     <el-form-item label="数据源拥有者" :label-width="formLabelWidth" prop="dataSourceOwner">
                                        <el-select v-model="form.dataSourceOwner" filterable placeholder="" size="small">
                                        <el-option
                                        v-for="item in options"
                                        :label="item.label"
                                        :value="item.value">
                                      </el-option>
                                    </el-select>
                                  </el-form-item> -->
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="数据源简称" :label-width="formLabelWidth">
                                <el-input size="small" v-model="form.dataSourceShortName" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="拼音缩写" :label-width="formLabelWidth">
                                <el-input size="small" v-model="form.renPing" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="所属机构" :label-width="formLabelWidth">
                                <el-select v-model="organizationId" clearable filterable placeholder="" size="small" @change="changeOrganization">
                                    <el-option v-for="item in organizationdataSource" :label="item.orgName" :value="item.id" :key="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item v-if="showchoose" label="所属部门" :label-width="formLabelWidth" prop="vestInOrganization">
                                <el-select v-model="form.vestInOrganization" filterable placeholder="" size="small" @change="changeDepartment">
                                    <el-option v-for="item in departmentdataSource" :label="item.depName" :value="item.id" :key="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item v-if="showchoose" label="所属用户" :label-width="formLabelWidth" prop="dataSourceOwner">
                                <el-select v-model="form.dataSourceOwner" filterable placeholder="" size="small">
                                    <el-option v-for="item in ownerdataSource" :label="item.realName" :value="item.id" :key="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="部署地点" :label-width="formLabelWidth">
                                <el-cascader :options="casoptions" change-on-select v-model="form.deploymentAddress" placeholder=""></el-cascader>
                            </el-form-item>
                            <el-form-item label="启用禁用状态" :label-width="formLabelWidth">
                                <el-radio-group v-model="form.enableDisable">
                                    <el-radio :label="1">启用</el-radio>
                                    <el-radio :label="2">禁用</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <!-- <el-form-item label="数据保存周期" :label-width="formLabelWidth">
                                        <el-input size="small" v-model="form.dataSourceRetentionCycle" auto-complete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="数据增长率" :label-width="formLabelWidth" prop="dataSourceGrowthRate">
                                        <el-input size="small" v-model="form.dataSourceGrowthRate" auto-complete="off"></el-input>
                                    </el-form-item> -->
                        </el-col>
                    </el-row>
                    <el-form-item class="first_step">
                        <el-button class="databtn" @click="submitForm('form')">下一步</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div v-show="state2" class="margin_top">
                <el-form :model="form" :rules="rules" ref="form2">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="数据库类型" :label-width="formLabelWidth" prop="dataBaseType">
                                <el-select v-model="form.dataBaseType" filterable placeholder="" size="small" @change="dataBaseTypechange">
                                    <el-option v-for="item in dataBaseType" :label="item.label" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="协议类型" :label-width="formLabelWidth" prop="protocol">
                                <el-select v-model="form.protocol" filterable placeholder="" size="small">
                                    <el-option v-for="item in protocol" :label="item.label" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="数据库开发商" :label-width="formLabelWidth">
                                <el-input size="small" v-model="form.dataBastDevelopers" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="设备型号" :label-width="formLabelWidth">
                                <el-input size="small" v-model="form.equipmentModel" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="历史数据量" :label-width="formLabelWidth" prop="historyDataSize">
                                <el-input size="small" v-model="form.historyDataSize" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="硬件配置" :label-width="formLabelWidth">
                                <el-input size="small" v-model="form.hardwareConfiguration" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="操作系统" :label-width="formLabelWidth">
                                <el-input size="small" v-model="form.os" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="操作系统位数" :label-width="formLabelWidth">
                                <el-input size="small" v-model="form.osBit" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="数据保存周期" :label-width="formLabelWidth">
                                <el-input size="small" v-model="form.dataSourceRetentionCycle" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="数据增长率" :label-width="formLabelWidth" prop="dataSourceGrowthRate">
                                <el-input size="small" v-model="form.dataSourceGrowthRate" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item class="first_step">
                        <el-button class="databtn laststep" @click="lastform('form2')">上一步</el-button>
                        <el-button class="databtn" @click="submitForm('form2')">下一步</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div v-show="state3" class="margin_top">
                <el-form :model="form" :rules="rules" ref="form3">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="JDBC类型" :label-width="formLabelWidth" prop="linkString">
                                <el-select v-model="form.linkString" filterable placeholder="" size="small">
                                    <el-option v-for="item in jdbcoptions" :label="item.label" :value="item.value" :disabled="item.disabled" :key="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="IP地址" :label-width="formLabelWidth" prop="ipAddress">
                                <el-input size="small" v-model="form.ipAddress" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="端口" :label-width="formLabelWidth" prop="port">
                                <el-input size="small" v-model="form.port" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="数据库用户名" :label-width="formLabelWidth" prop="username">
                                <el-input size="small" v-model="form.username" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="数据库密码" :label-width="formLabelWidth" prop="password">
                                <el-input size="small" type="password" v-model="form.password" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="数据库名称" :label-width="formLabelWidth" prop="dataBaseName">
                                <el-input size="small" v-model="form.dataBaseName" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="数据库版本" :label-width="formLabelWidth">
                                <el-input size="small" v-model="form.dataBaseVersion" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="数据库位数" :label-width="formLabelWidth">
                                <el-input size="small" v-model="form.dataBaseBit" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="字符集" :label-width="formLabelWidth">
                                <el-input size="small" v-model="form.characterSet" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="是否测试连接" :label-width="formLabelWidth">
                                <el-checkbox v-model="form.isConnect"></el-checkbox>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item class="first_step">
                        <el-button class="databtn laststep" @click="lastform('form3')">上一步</el-button>
                        <el-button class="databtn" :loading="btnloading" @click="submitForm('form3')">完成</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div v-if="state4" class="margin_top">
                <data-tree-add :add-data="treedata" v-on:send-data="listenToMyBoy" :type="modalType"></data-tree-add>
                <div class="first_step position">
                    <el-button class="databtn" :loading="commitloading" :disabled="disabled" @click="commitselect">保存</el-button>
                </div>
            </div>
        </el-dialog>
        <!-- 普通用户 -->
        <el-dialog v-if="putongshow" :title="titlename" v-model="addFormVisible" :close-on-click-modal="false">
            <div style="position:absolute;right:2px;top:-30px;width:30px;height:30px;cursor:pointer" @click="closeModal"></div>
            <div v-show="state" class="margin_top">
                <el-form :model="form" :rules="rules" ref="form">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="数据源名称" :label-width="formLabelWidth" prop="dataSourceName">
                                <el-input size="small" v-model="form.dataSourceName" auto-complete="off" :disabled="inputstate"></el-input>
                            </el-form-item>
                            <el-form-item label="数据源类型" :label-width="formLabelWidth" prop="dataSourceKind">
                                <el-select v-model="form.dataSourceKind" filterable placeholder="" size="small">
                                    <el-option v-for="item in dataSourceKind" :label="item.label" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="业务系统名称" :label-width="formLabelWidth" prop="businessSysName">
                                <el-input size="small" v-model="form.businessSysName" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="数据源分类" :label-width="formLabelWidth" prop="dataSourceType">
                                <el-select v-model="form.dataSourceType" filterable placeholder="" size="small">
                                    <el-option v-for="item in dataSourceType" :label="item.label" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="版本号" :label-width="formLabelWidth">
                                <el-input size="small" v-model="form.version" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="数据源说明" :label-width="formLabelWidth">
                                <el-input size="small" type="textarea" v-model="form.description" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="数据源简称" :label-width="formLabelWidth">
                                <el-input size="small" v-model="form.dataSourceShortName" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="拼音缩写" :label-width="formLabelWidth">
                                <el-input size="small" v-model="form.renPing" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="部署地点" :label-width="formLabelWidth">
                                <el-cascader :options="casoptions" change-on-select v-model="form.deploymentAddress" placeholder=""></el-cascader>
                            </el-form-item>
                            <el-form-item label="物理地址" :label-width="formLabelWidth">
                                <el-input size="small" v-model="form.physicalAddress" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="前置机节点" :label-width="formLabelWidth">
                                <el-input size="small" v-model="form.frontEndNode" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="启用禁用状态" :label-width="formLabelWidth">
                                <el-radio-group v-model="form.enableDisable">
                                    <el-radio :label="1">启用</el-radio>
                                    <el-radio :label="2">禁用</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item class="first_step">
                        <el-button class="databtn" @click="submitForm('form')">下一步</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div v-show="state2" class="margin_top">
                <el-form :model="form" :rules="rules" ref="form2">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="数据库类型" :label-width="formLabelWidth" prop="dataBaseType">
                                <el-select v-model="form.dataBaseType" filterable placeholder="" size="small" @change="dataBaseTypechange">
                                    <el-option v-for="item in dataBaseType" :label="item.label" :value="item.value" :key="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="协议类型" :label-width="formLabelWidth" prop="protocol">
                                <el-select v-model="form.protocol" filterable placeholder="" size="small">
                                    <el-option v-for="item in protocol" :label="item.label" :value="item.value" :key="item.protocol">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="数据库开发商" :label-width="formLabelWidth">
                                <el-input size="small" v-model="form.dataBastDevelopers" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="设备型号" :label-width="formLabelWidth">
                                <el-input size="small" v-model="form.equipmentModel" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="历史数据量" :label-width="formLabelWidth" prop="historyDataSize">
                                <el-input size="small" v-model="form.historyDataSize" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="硬件配置" :label-width="formLabelWidth">
                                <el-input size="small" v-model="form.hardwareConfiguration" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="操作系统" :label-width="formLabelWidth">
                                <el-input size="small" v-model="form.os" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="操作系统位数" :label-width="formLabelWidth">
                                <el-input size="small" v-model="form.osBit" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="数据保存周期" :label-width="formLabelWidth">
                                <el-input size="small" v-model="form.dataSourceRetentionCycle" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="数据增长率" :label-width="formLabelWidth" prop="dataSourceGrowthRate">
                                <el-input size="small" v-model="form.dataSourceGrowthRate" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item class="first_step">
                        <el-button class="databtn laststep" @click="lastform('form2')">上一步</el-button>
                        <el-button class="databtn" @click="submitForm('form2')">下一步</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div v-show="state3" class="margin_top">
                <el-form :model="form" :rules="rules" ref="form3">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="JDBC类型" :label-width="formLabelWidth" prop="linkString">
                                <el-select v-model="form.linkString" filterable placeholder="" size="small">
                                    <el-option v-for="item in jdbcoptions" :label="item.label" :value="item.value" :disabled="item.disabled" :key="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="IP地址" :label-width="formLabelWidth" prop="ipAddress">
                                <el-input size="small" v-model="form.ipAddress" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="端口" :label-width="formLabelWidth" prop="port">
                                <el-input size="small" v-model="form.port" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="数据库用户名" :label-width="formLabelWidth" prop="username">
                                <el-input size="small" v-model="form.username" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="数据库密码" :label-width="formLabelWidth" prop="password">
                                <el-input size="small" type="password" v-model="form.password" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="数据库名称" :label-width="formLabelWidth" prop="dataBaseName">
                                <el-input size="small" v-model="form.dataBaseName" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="数据库版本" :label-width="formLabelWidth">
                                <el-input size="small" v-model="form.dataBaseVersion" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="数据库位数" :label-width="formLabelWidth">
                                <el-input size="small" v-model="form.dataBaseBit" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="字符集" :label-width="formLabelWidth">
                                <el-input size="small" v-model="form.characterSet" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="是否测试连接" :label-width="formLabelWidth">
                                <el-checkbox v-model="form.isConnect"></el-checkbox>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item class="first_step">
                        <el-button class="databtn laststep" @click="lastform('form3')">上一步</el-button>
                        <el-button class="databtn" :loading="btnloading" @click="submitForm('form3')">完成</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div v-if="state4" class="margin_top">
                <data-tree-add :add-data="treedata" v-on:send-data="listenToMyBoy" :type="modalType"></data-tree-add>
                <div class="first_step position">
                    <el-button class="databtn" :loading="commitloading" :disabled="disabled" @click="commitselect">保存</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {
    Objtrim,
    Getcity,
    getSessionStore,
    ArrtoString
} from '../../assets/js/mUtils';
import {
    saveDataSourceInfo,
    showSchemasInUpdate,
    getDepartment,
    getUser,
    saveSourceTableColumnInfo,
    modifyDataSourceInfo,
    initDataSourceInfo,
    isDataSourceNameExist,
} from '../../assets/js/queryData';
import dataTreeAdd from './dataTreeAdd';
import modalBox from '../common/ModalBox';
export default {
    props: ['AddData'],
    data() {
        var validatedataSourceName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入数据源名称'));
            } else {
                let temp = value.replace(/(^\s*)|(\s*$)/g, '');
                if (temp.length === 0) {
                    callback(new Error('请输入正确的数据源名称!'));
                } else {
                    // 在这里做失去焦点的验证
                    // console.log('this.$store.state.inputdisable:', this.$store.state.common.inputdisable);
                    if (this.$store.state.common.inputdisable) {
                        // 如果是新增
                        isDataSourceNameExist(value).then(res => {
                            if (!res.data) {
                                callback();
                            } else {
                                callback(new Error('输入的数据源名称已存在!'));
                            }
                        });
                    } else {
                        // 如果是修改
                        callback();
                    }
                }
            }
        };
        var validateipAddress = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入IP地址'));
            } else {
                let temp = value.replace(/(^\s*)|(\s*$)/g, '');
                if (temp.length === 0) {
                    callback(new Error('请输入正确的IP地址!'));
                } else if (/^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/.test(value) !== true) {
                    callback(new Error('请输入正确的IP地址!'));
                } else {
                    callback();
                }
            }
        };
        var validateport = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入端口号'));
            } else {
                let temp = value.replace(/(^\s*)|(\s*$)/g, '');
                if (temp.length === 0) {
                    callback(new Error('请输入正确的端口号!'));
                } else if (/^\d{2,5}$/.test(value) !== true) {
                    callback(new Error('请输入正确的端口号!'));
                } else {
                    callback();
                }
            }
        };
        var validdataSourceGrowthRate = (rule, value, callback) => {
            if (value === '' || value === null) {
                callback();
            } else {
                // let temp=value.replace(/(^\s*)|(\s*$)/g, '');
                // console.log('validdataSourceGrowthRate:', value);
                if (value.length === 0) {
                    callback(new Error('请输入正确的数据增长率!'));
                } else {
                    callback();
                }
            }
        };

        var validhistoryDataSize = (rule, value, callback) => {
            if (value === '' || value === null) {
                callback();
            } else {
                // console.log('validhistoryDataSize:', value);
                // let temp=value.replace(/(^\s*)|(\s*$)/g, '');
                if (value.length === 0) {
                    callback(new Error('请输入正确的历史数据量!'));
                } else if (/^[0-9]*$/.test(value) !== true) {
                    callback(new Error('历史数据量只能为数字!'));
                } else {
                    callback();
                }
            }
        };
        return {
            treedata: {},
            usermsg: {}, // 从sessionstorage读取用户信息
            owershow: false,
            putongshow: false,
            state: false,
            state2: false,
            state3: false,
            state4: false,
            btnloading: false,
            commitloading: false,
            position: 'left',
            titlename: '新增数据源',
            modalType: 'create',
            commitdata: {},
            // dialogFormVisible: false,
            addFormVisible: false,
            inputstate: false,
            disabled: false,
            form: {},
            organizationdataSource: [], // 机构下拉选框数据源
            organizationId: '', // 选择的机构id
            departmentdataSource: [], // 部门下拉选框数据源
            ownerdataSource: [], // 用户下拉选框的数据
            showchoose: false, // 默认让所属部门所属用户不显示
            formtpl: {
                dataSourceName: '',
                dataSourceKind: '',
                renPing: '',
                vestInOrganization: '', // 部门
                dataSourceOwner: '', // 用户
                creator: '',
                deploymentAddress: [],
                dataSourceShortName: '',
                physicalAddress: '',

                dataBaseType: '',
                protocol: '',
                dataBastDevelopers: '',
                equipmentModel: '',
                hardwareConfiguration: '',
                os: '',
                osBit: '',

                businessSysName: '',
                description: '',
                historyDataSize: '',
                version: '',
                dataSourceRetentionCycle: '',
                dataSourceGrowthRate: '',
                dataSourceType: '',
                dataSourceStatus: '',
                enableDisable: 1,
                frontEndNode: '',

                linkString: '',
                ipAddress: '',
                port: '',
                username: '',
                password: '',
                dataBaseName: '',
                dataBaseVersion: '',
                dataBaseBit: '',
                characterSet: '',
                isConnect: true

            },
            rules: {
                dataSourceName: [{
                    required: true,
                    validator: validatedataSourceName,
                    trigger: 'blur'
                }],
                dataSourceKind: [{
                    required: true,
                    message: '请选择数据源种类',
                    trigger: 'change'
                }],
                vestInOrganization: [{
                    required: true,
                    message: '请选择所属部门',
                    trigger: 'change'
                }],
                dataSourceOwner: [{
                    required: true,
                    message: '请选择所属用户',
                    trigger: 'change'
                }],
                dataBaseType: [{
                    required: true,
                    message: '请选择数据库类型',
                    trigger: 'change'
                }],
                protocol: [{
                    required: true,
                    message: '请选择协议类型',
                    trigger: 'change'
                }],
                businessSysName: [{
                    required: true,
                    message: '请选输入业务系统名称',
                    trigger: 'blur'
                }],
                linkString: [{
                    required: true,
                    message: '请输入JDBC链接字符串',
                    trigger: 'blur'
                }],
                ipAddress: [{
                    required: true,
                    validator: validateipAddress,
                    trigger: 'blur'
                }],
                port: [{
                    required: true,
                    validator: validateport,
                    trigger: 'blur'
                }],
                username: [{
                    required: true,
                    message: '请输入数据库用户名',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '请输入数据库密码',
                    trigger: 'blur'
                }],
                dataBaseName: [{
                    required: true,
                    message: '请输入数据库名称',
                    trigger: 'blur'
                }],
                historyDataSize: [{
                    validator: validhistoryDataSize,
                    trigger: 'blur'
                }],
                dataSourceGrowthRate: [{
                    validator: validdataSourceGrowthRate,
                    trigger: 'blur'
                }],
                dataSourceType: [{
                    required: true,
                    message: '请选择数据源分类',
                    trigger: 'change'
                }]
            },
            formLabelWidth: '170px',
            casoptions: [],
            protocol: [],
            userInfo: [],
            dataBaseType: [],
            vestInOrganization: [],
            dataSourceType: [],
            dataSourceKind: [{
                value: 'db',
                label: '数据库'
            }],
            jdbcoptions: [{
                'label': 'MySQL Driver',
                'value': 'com.mysql.jdbc.driver',
                'disabled': false,
                'search': 'mysql'
            }, {
                'label': 'Oracle Thin Driver',
                'value': 'oracle.jdbc.driver.OracleDriver',
                'disabled': false,
                'search': 'oracle'
            }, {
                'label': 'Microsoft MSSQL Server JDBC Driver',
                'value': 'com.microsoft.jdbc.sqlserver.SQLServerDriver',
                'disabled': true,
                'search': 'sqlServer'
            }, {
                'label': 'IBM DB2 Net Driver',
                'value': 'com.ibm.db2.jcc.DB2Driver',
                'disabled': true,
                'search': 'db2'
            }]
        };
    },
    components: {
        dataTreeAdd,
        modalBox,
    },

    computed: {},
    methods: {
        // 新增页面的方法
        lastform(formName) {
            if (formName === 'form2') {
                this.state = true;
                this.state2 = false;
            } else if (formName === 'form3') {
                this.state2 = true;
                this.state3 = false;
            }
        },
        refarshList() {
            // 数据源申请接入页面
            this.$emit('refrash');
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // console.log('submit!');
                    // 档表单验证成功后，再执行下一步操作
                    if (formName === 'form') {
                        this.state2 = true;
                        this.state = false;

                        if (this.modalType === 'edit') {
                            this.titlename = '修改数据源(2/3)';
                        } else {
                            this.titlename = '新增数据源(2/3)';
                        }
                    } else if (formName === 'form2') {
                        this.state3 = true;
                        this.state2 = false;
                        if (this.modalType === 'edit') {
                            this.titlename = '修改数据源(3/3)';
                        } else {
                            this.titlename = '新增数据源(3/3)';
                        }
                    } else if (formName === 'form3') {
                        // 点击完成后的按钮出现加载状态
                        this.btnloading = true;
                        // 只有在点击了form3的完成按钮后才可以提交表单
                        // 级联选择不是必填，若填写了就执行以下代码
                        // 判断用户是否选择所属用户，如果选择，则取选择的值，否则取sessionstory的值
                        var formdata;
                        if (this.form.dataSourceOwner === '') {
                            // 没有选择，取sessionstory的值
                            console.log('没有选择，取sessionstory的值');
                            formdata = {
                                ...Objtrim(this.form),
                                deploymentAddress: Getcity(this.form.deploymentAddress),
                                vestInOrganization: this.usermsg.departmentId,
                                dataSourceOwner: this.usermsg.id,
                                creator: this.usermsg.id,
                                roleId: this.usermsg.roleId
                            };
                        } else {
                            // 选择了，取选择的值
                            console.log('选择了，取选择的值');
                            formdata = {
                                ...Objtrim(this.form),
                                deploymentAddress: Getcity(this.form.deploymentAddress),
                                //  vestInOrganization: departmentId,
                                creator: this.usermsg.id,
                                roleId: this.usermsg.roleId
                            };
                        }
                        console.info('form:新增：', formdata);
                        if (this.modalType === 'create') {
                            // 新增提交的接口
                            //  console.info('form:新增：', data);
                            saveDataSourceInfo(formdata).then(res => {
                                console.log('新增数据的状态码：', res.code);
                                // 获取到新增后的数据
                                console.log('res.data:', res.data);
                                //  this.treedata = res.data;
                                if (res.code === 200) {
                                    // code=200的时候，选择schame树,选择完schema树后再刷新页面
                                    // 新增成功的时候
                                    this.treedata = res.data;
                                    this.titlename = '新增数据源';
                                    this.state4 = true;
                                    this.state3 = false;
                                    this.btnloading = false;
                                } else if (res.code === 300) {
                                    // code=300时候，提示成功，关窗口
                                    this.closeModal();
                                    this.refarshList();
                                    this.$message.success(res.msg);
                                } else {
                                    this.btnloading = false;
                                    this.$message.error(res.msg);
                                    // 新增失败的时候,弹窗提示
                                    // this.$alert(res.msg, '提示', {
                                    //     confirmButtonText: '确定'
                                    // });
                                }
                            });
                        } else {
                            console.log('修改提交的接口');
                            // 修改提交的接口

                            showSchemasInUpdate(formdata).then(res => {
                                if (res.code === 200) {
                                    this.refarshList();
                                    //  当为200的时候继续执行修改schema树
                                    //  this.closeModal();
                                    this.titlename = '修改数据源';
                                    this.btnloading = false;
                                    // 给res.data.schemaList[i]里面的添加schema字段。
                                    for (let i in res.data.schemaList) {
                                        res.data.schemaList[i].schema = res.data.schemaList[i].dbName;
                                    }
                                    //  console.log('res.data:',res.data);

                                    this.treedata = res.data;
                                    this.state3 = false;
                                    this.state4 = true;
                                } else if (res.code === 300) {
                                    this.closeModal();
                                    this.refarshList();
                                    this.$message.success(res.msg);
                                } else {
                                    this.btnloading = false;
                                    this.$message.error(res.msg);
                                }
                                // console.log(res);
                            })
                        }
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        changeOrganization(val) {
            // 当机构的选择发生变化的时候，根据所选机构去请求所选部门的下拉选框数据
            console.info('清楚选项val：', val);
            if (val === '' || val === null) {
                this.form.vestInOrganization = ''; // 清空部门
                this.form.dataSourceOwner = ''; // 清空用户
                this.ownerdataSource = []; // 清空用户选择数据源
                this.showchoose = false;
            } else {
                this.showchoose = true;
                getDepartment(val).then(res => {
                    this.form.vestInOrganization = ''; // 清空部门
                    this.form.dataSourceOwner = ''; // 清空用户
                    this.ownerdataSource = []; // 清空用户选择数据源
                    if (res.code === 200) {
                        this.departmentdataSource = ArrtoString(res.data);
                    }
                });
            }
        },
        changeDepartment(val) {
            // 当部门的选择发生变化的时候，根据机构和部门的id去请求用户的数据
            getUser(this.organizationId, val).then(res => {
                //  console.info(res);
                if (res.code === 200) {
                    this.ownerdataSource = ArrtoString(res.data);
                }
            });
        },
        getcheckednode(data) {
            console.log('getnode', data);
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        closeModal() {
            // $('.dataBox').removeClass('filter');
            this.resetForm('form');
            this.resetForm('form2');
            this.resetForm('form3');
            this.addFormVisible = false;
            this.state = true;
            this.state2 = false;
            this.state3 = false;
            this.state4 = false;
            this.btnloading = false;
            this.titlename = '新增数据源(1/3)';
        },
        commitselect() {
            // 从这里来提交数据
            this.commitloading = true;
            console.log('commit');
            if (this.modalType === 'create') {
                saveSourceTableColumnInfo(this.commitdata).then(res => {
                    console.log(res);
                    if (res.code !== 200) {
                        // 新增数据源提交失败
                        this.commitloading = false;
                        // 新增数据源失败的时候,弹窗提示
                        this.$message.error(res.msg);
                        // this.$alert(res.msg, '提示', {
                        //     confirmButtonText: '确定'
                        // });
                    } else {
                        // 新增数据源提交成功
                        // 先关闭弹窗在关闭数据页面
                        this.refarshList();
                        this.closeModal();
                        this.commitloading = false;
                        this.$message.success('新增数据源成功！');
                    }
                });
            } else if (this.modalType === 'edit') {
                modifyDataSourceInfo(this.commitdata).then(res => {
                    if (res.code !== 200) {
                        // 修改数据源提交失败
                        this.commitloading = false;
                        // 修改数据源失败的时候,弹窗提示
                        this.$message.error(res.msg);
                        // this.$alert(res.msg, '提示', {
                        //     confirmButtonText: '确定'
                        // });
                    } else {
                        // 修改数据源提交成功
                        // 先关闭弹窗在关闭数据页面
                        this.refarshList();
                        this.closeModal();
                        this.commitloading = false;
                        this.$message.success('修改数据源成功！');
                    }
                });
            }
        },
        listenToMyBoy(data) {
            // 这里将子组件里选中的数据传递到父组件中，从父组件中提交
            this.commitdata = data;
            // console.info('data:', data);
            // if (this.commitdata.dataSourceTableInfo.length > 0) {
            //     this.disabled = false;
            // } else {
            //     this.disabled = true;
            // }
        },

        dataBaseTypechange(val) {
            if (val !== 'sqlServer' && val !== 'db2') {
                for (let i in this.jdbcoptions) {
                    if (this.jdbcoptions[i].search === val) {
                        // console.log(this.jdbcoptions[i]);
                        this.form.linkString = this.jdbcoptions[i].value;
                        //  console.log(this.form.linkString);
                    } else {
                        this.jdbcoptions[i].disabled = true;
                    }
                }
            }
        },
    },
    mounted() {
        //  获取当前城市
        initDataSourceInfo().then(res => {
            if (res.code === 200) {
                this.protocol = res.data.protocol;
                this.dataBaseType = res.data.dataBaseType;
                // 将number类型的数字转换为字符串类型的数字
                //  this.vestInOrganization = ObjtoString(res.data.vestInOrganization);
                this.organizationdataSource = ArrtoString(res.data.orgs);
                //  console.info('organizationdataSource:',this.organizationdataSource);
                // 在这里获取userInfo信息
                this.userInfo = res.data.userInfo;
                // 在这里根据roleId来判断数据源分类的选项
                if (this.usermsg.roleId === 2) {
                    for (let i in res.data.dataSourceType) {
                        if (res.data.dataSourceType[i].value === '1') {
                            this.dataSourceType.push(res.data.dataSourceType[i]);
                        } else if (res.data.dataSourceType[i].value === '4') {
                            this.dataSourceType.push(res.data.dataSourceType[i]);
                        }
                    }
                    // console.log('this.dataSourceType:', this.dataSourceType);
                } else {
                    this.dataSourceType = res.data.dataSourceType;
                }
                this.casoptions = JSON.parse(res.data.deploymentAddress);
            }
        });
    },
    created() {
        // 读取sessionstro
        this.usermsg = getSessionStore('userInfo');
    }
};
</script>
<style lang="scss">
.newdataSourcemodal_jdb {
    .el-radio__input.is-checked .el-radio__inner {
        border-color: #02a6d4;
        background: transparent;
    }
    .el-radio__inner,
    .el-radio__input.is-disabled.is-checked .el-radio__inner::after {
        background-color: transparent;
    }
    .el-radio__inner {
        border-color: #02a6d4;
    }
    .el-radio__inner::after {
        background-color: #02a6d4;
    }
    .el-dialog__body {
        color: rgba(0, 187, 236, 0.9);
    }
    .el-select-dropdown {
        top: 356px;
    }
    .el-form-item__content {
        line-height: 29px;
        text-align: left;
    }
    .el-form-item__label {
        line-height: 9px;
        font-size: 14px;
    }
    .el-radio {
        color: #00bbec;
    }
    .margin_top {
        margin-top: 10px;
    }
    .first_step {
        position: absolute;
        bottom: 0;
        right: 54px;
    }
    .laststep {
        margin-right: 776px;
    }
    .margindiv {
        height: 46px;
    }
    .el-dialog {
        margin-bottom: 0px;
    }
    .el-dialog__header {
        font-size: 16px;
        padding: 0;
        margin: 0;
        text-align: center;
    }
    .el-dialog__title {
        font-size: 20px;
        line-height: 36px;
        font-family: '微软雅黑';
        color: #00bbec;
    }
    .el-dialog__close {
        color: #06bfe7;
        text-shadow: 0 0 0.2em #06bfe7,
    }
    .el-dialog__headerbtn {
        padding-right: 11px;
        padding-top: 6px;
    }
    .dialog-footer {
        font-size: 0px;
        padding-right: 60px;
    }
    .databtn {
        color: #fff;
        width: 60px;
        height: 25px;
        background: #0C1A34;
        border-radius: 0px;
        border-color: #0C1A34;
    }
    .position {
        margin-bottom: 22px;
    }
    .databtn:hover {
        border-color: #05bde6;
        color: #fff;
        box-shadow: inset 0 0 10px 0 rgba(98, 208, 248, 0.42);
    }
    .el-dialog {
        width: 1034px;
        height: 630px;
        background: url(../../assets/img/modal/border.png);
        background-size: 100% 100%;
        padding: 10px;
        background-color: #0C2642!important;
    }
    .el-input.is-disabled .el-input__inner {
        background-color: rgb(13, 64, 94);
        border-color: rgb(13, 64, 94);
        color: #f0f1ee;
    }
    .el-dialog__body {
        padding: 26px 15px 10px;
        height: 536px;
        position: relative;
    }
    .el-input--small .el-input__inner {
        height: 32px;
        border-color: #0d405e;
        background: #0d405e;
        opacity: 9;
        color: #fbfeff;
    }
    .el-input {
        width: 240px;
    }
    .el-cascader {
        border-radius: 4px;
        background-color: rgb(13, 64, 94);
        border-color: rgb(13, 64, 94);
    }
    .el-radio-group {
        padding-right: 190px;
    }
    .el-button {
        padding: 0;
    }
    .el-form-item__label {
        color: #00bbec;
    }
    .el-textarea__inner {
        background-color: #0d405e;
        border: 1px solid #0d405e;
        color: #fbfeff;
    }
    .el-cascader .el-input,
    .el-cascader .el-input__inner {
        height: 32px;
    }
    .el-input__icon,
    .el-select .el-input .el-input__icon {
        color: rgb(2, 166, 212);
    }
    .el-select .el-input__inner:focus {
        border-color: #0d405e;
    }
    .el-input__inner:focus {
        border-color: #0d405e;
    }
    .el-cascader-menus {
        border-color: #0f2642;
    }
    .el-table--border th {
        border-right: 1px solid rgba(7, 81, 116, 0);
    }
    .el-table__header-wrapper thead div {
        background-color: rgba(11, 37, 66, 0);
    }
    .el-table th {
        background-color: rgba(11, 37, 66, 0);
    }
    //当屏幕高度小于749px的时候，改变弹框的top值
    @media screen and (max-height: 749px) {
        .el-dialog {
            top: 2%!important;
        }
    }
}

.v-modal {
    opacity: 0.7 !important;
    background: rgba(13, 21, 47, 1) !important;
}
</style>

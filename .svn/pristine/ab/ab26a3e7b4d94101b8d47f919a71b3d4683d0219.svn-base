<template>
    <div class="data-opera">
        <dcp-dialog ref="data_opera" id="data_opera" @on-close="close" :width="1034" :height="630" :title="title">
            <template slot="dialog_body">
                <div class="back-header">
                    <div class="left-back" @click="handlePreviousStepClick" v-if="step !== 1 && step !== 4">
                        <i class="back-arrow"></i>
                    </div>
                </div>
                <div v-if="step === 1">
                    <el-form label-width="170px" :model="dataForm" :rules="rules" ref="step1_form" class="data-form">
                        <el-row :gutter="20" style="margin: 0; padding: 20px 0 0;">
                            <el-col :span="11">
                                <el-form-item label="数据源名称" prop="dataSourceName">
                                    <el-input size="small" v-model="dataForm.dataSourceName"></el-input>
                                </el-form-item>
                                <el-form-item label="数据源类型" prop="dataSourceKind">
                                    <el-select class="data-select" v-model="dataForm.dataSourceKind" filterable placeholder="" size="small" @change="handleDataSourceKindChange">
                                        <el-option v-for="item in dataSourceKind" :label="item.label" :value="item.value" :key="item.value" :disabled="item.disabled">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="业务系统名称" prop="businessSysName">
                                    <el-input size="small" v-model="dataForm.businessSysName"></el-input>
                                </el-form-item>
                                <el-form-item label="数据源分类" prop="dataSourceType">
                                    <el-select class="data-select" v-model="dataForm.dataSourceType" filterable placeholder="" size="small">
                                        <el-option v-for="item in dataSourceType" :label="item.label" :value="item.value" :key="item.value" :disabled="item.disabled">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="版本号" prop="version">
                                    <el-input size="small" v-model="dataForm.version"></el-input>
                                </el-form-item>
                                <el-form-item label="前置机节点" prop="frontEndNode">
                                    <el-input size="small" v-model="dataForm.frontEndNode"></el-input>
                                </el-form-item>
                                <el-form-item label="物理地址" prop="physicalAddress">
                                    <el-input size="small" v-model="dataForm.physicalAddress"></el-input>
                                </el-form-item>
                                <el-form-item label="数据源说明" prop="description">
                                    <el-input size="small" type="textarea" v-model="dataForm.description"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11">
                                <el-form-item label="数据源简称" prop="dataSourceShortName">
                                    <el-input size="small" v-model="dataForm.dataSourceShortName"></el-input>
                                </el-form-item>
                                <el-form-item label="拼音缩写" prop="renPing">
                                    <el-input size="small" v-model="dataForm.renPing"></el-input>
                                </el-form-item>
                                <el-form-item label="所属机构" prop="organizationId" v-if="this.usermsg.roleId === 1">
                                    <el-select class="data-select" v-model="dataForm.organizationId" clearable filterable placeholder="" size="small" @change="changeOrganization">
                                        <el-option v-for="item in organizationdataSource" :label="item.orgName" :value="item.id" :key="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="所属部门" prop="vestInOrganization" v-if="!!dataForm.organizationId">
                                    <el-select class="data-select" v-model="dataForm.vestInOrganization" filterable placeholder="" size="small" @change="changeDepartment">
                                        <el-option v-for="item in departmentdataSource" :label="item.depName" :value="item.id" :key="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="所属用户" prop="dataSourceOwner" v-if="!!dataForm.organizationId">
                                    <el-select class="data-select" v-model="dataForm.dataSourceOwner" filterable placeholder="" size="small" @change="handleDataSourceOwnerChange">
                                        <el-option v-for="item in ownerdataSource" :label="item.realName" :value="item.userId" :key="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="部署地点" prop="deploymentAddress">
                                    <el-cascader class="data-select" :options="casoptions" change-on-select v-model="deploymentAddress" placeholder="" @change="handleDeploymentAddressChange"></el-cascader>
                                </el-form-item>
                                <el-form-item label="启用禁用状态" prop="enableDisable">
                                    <el-radio-group v-model="dataForm.enableDisable">
                                        <el-radio label="1">启用</el-radio>
                                        <el-radio label="2">禁用</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <div v-if="step === 2">
                    <el-form label-width="170px" :model="dataForm" :rules="rules" ref="step2_form" class="data-form">
                        <el-row :gutter="20" style="margin: 0; padding: 20px 0 0;">
                            <el-col :span="11">
                                <el-form-item label="文件传输类型" prop="dataBaseType" v-if="type !== 'db'">
                                    <el-select v-model="dataForm.dataBaseType" filterable placeholder="" size="small" class="data-select" @change="dataBaseTypechange">
                                        <el-option v-for="item in newDataBaseType" :label="item.label" :value="item.value" :key="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="数据库类型" prop="dataBaseType" v-if="type === 'db'">
                                    <el-select v-model="dataForm.dataBaseType" filterable placeholder="" size="small" class="data-select" @change="dataBaseTypechange">
                                        <el-option v-for="item in newDataBaseType" :label="item.label" :value="item.value" :key="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="数据库开发商" prop="dataBastDevelopers" v-if="type === 'db'">
                                    <el-input size="small" v-model="dataForm.dataBastDevelopers"></el-input>
                                </el-form-item>
                                <el-form-item :label="type === 'db' ? '数据增长率' : '文件增长率'" prop="dataSourceGrowthRate">
                                    <el-input size="small" v-model="dataForm.dataSourceGrowthRate"></el-input>
                                </el-form-item>
                                <el-form-item :label="type === 'db' ? '历史数据量' : '历史文件量'" prop="historyDataSize">
                                    <el-input size="small" v-model="dataForm.historyDataSize"></el-input>
                                </el-form-item>
                                <el-form-item label="操作系统" prop="os">
                                    <el-input size="small" v-model="dataForm.os"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11">
                                <el-form-item label="协议类型" prop="protocol" v-if="type === 'db'">
                                    <el-select v-model="dataForm.protocol" filterable placeholder="" size="small" class="data-select">
                                        <el-option v-for="item in protocol" :label="item.label" :value="item.value" :key="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="数据保存周期" prop="dataSourceRetentionCycle" v-if="type === 'db'">
                                    <el-input size="small" v-model="dataForm.dataSourceRetentionCycle"></el-input>
                                </el-form-item>
                                <el-form-item label="设备型号" prop="equipmentModel">
                                    <el-input size="small" v-model="dataForm.equipmentModel"></el-input>
                                </el-form-item>
                                <el-form-item label="硬件配置" prop="hardwareConfiguration">
                                    <el-input size="small" v-model="dataForm.hardwareConfiguration"></el-input>
                                </el-form-item>
                                <el-form-item label="操作系统位数" prop="osBit">
                                    <el-input size="small" v-model="dataForm.osBit"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <div v-if="step === 3">
                    <el-form label-width="170px" :model="dataForm" :rules="rules" ref="step3_form" class="data-form">
                        <el-row :gutter="20" style="margin: 0; padding: 20px 0 0;">
                            <el-col :span="11">
                                <el-form-item label="JDBC类型" prop="linkString" v-if="type === 'db'">
                                    <el-select v-model="dataForm.linkString" filterable placeholder="" size="small" class="data-select">
                                        <el-option v-for="item in jdbcoptions" :label="item.label" :value="item.value" :disabled="item.disabled" :key="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="数据库版本" v-if="type === 'db'" prop="dataBaseVersion">
                                    <el-input size="small" v-model="dataForm.dataBaseVersion"></el-input>
                                </el-form-item>
                                <el-form-item label="IP地址" prop="ipAddress">
                                    <el-input size="small" v-model="dataForm.ipAddress"></el-input>
                                </el-form-item>
                                <el-form-item label="数据库用户名" prop="username">
                                    <el-input size="small" v-model="dataForm.username"></el-input>
                                </el-form-item>
                                <el-form-item label="字符集" prop="characterSet">
                                    <el-input size="small" v-model="dataForm.characterSet"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="11">
                                <el-form-item label="数据库名称" prop="dataBaseName" v-if="type === 'db'">
                                    <el-input size="small" v-model="dataForm.dataBaseName"></el-input>
                                </el-form-item>
                                <el-form-item label="数据库位数" v-if="type === 'db'" prop="dataBaseBit">
                                    <el-input size="small" v-model="dataForm.dataBaseBit"></el-input>
                                </el-form-item>
                                <el-form-item label="端口" prop="port">
                                    <el-input size="small" v-model="dataForm.port"></el-input>
                                </el-form-item>
                                <el-form-item label="数据库密码" prop="password">
                                    <el-input size="small" type="password" v-model="dataForm.password"></el-input>
                                </el-form-item>
                                <el-form-item label="是否测试连接" prop="isConnect">
                                    <el-checkbox v-model="dataForm.isConnect"></el-checkbox>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <div v-if="step === 4">
                    <data-tree ref="tree" :dataType="type" :treeJSON="treeJSON" :data="treeData"></data-tree>
                </div>
            </template>
            <template slot="dialog_footer">
                <el-button type="text" class="left-btn" v-if="step !== 1 && step !== 4" @click="handlePreviousStepClick">上一步</el-button>
                <el-button type="dcp" v-if="step !== 3 && step !== 4" @click="handleNextStepClick">下一步</el-button>
                <el-button type="dcp" v-if="step === 3" @click="handleCompleteClick">完成</el-button>
                <el-button type="dcp" v-if="step === 4" @click="handleSaveClick">保存</el-button>
            </template>
        </dcp-dialog>
    </div>
</template>
<script>
import DcpDialog from '@/components/common/DCPDialog'
import DataTree from './dataTree'
import {
    saveDataSourceInfo,
    initDataSourceInfo,
    isDataSourceNameExist,
    getDepartment,
    saveTableColumnOrFile,
    getDataSourceInfo,
    updateDataSourceInfo,
} from '../../assets/js/queryData';
import {
    getSessionStore
} from '../../assets/js/mUtils';
export default {
    data() {
            var validatedataSourceName1 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入数据源名称'));
                } else {
                    let temp = value.replace(/(^\s*)|(\s*$)/g, '');
                    if (!temp.length) {
                        callback(new Error('请输入正确的数据源名称!'));
                    } else {
                        if (this.state === 'create') {
                            // 如果是新增
                            isDataSourceNameExist(value).then(res => {
                                if (res.data) {
                                    callback(new Error('输入的数据源名称已存在!'));
                                } else {
                                    callback();
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
                    if (!temp.length) {
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
                    if (!temp.length) {
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
                    if (!value.length) {
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
                    if (!value.length) {
                        callback(new Error('请输入正确的历史数据量!'));
                    } else if (/^[0-9]*$/.test(value) !== true) {
                        callback(new Error('历史数据量只能为数字!'));
                    } else {
                        callback();
                    }
                }
            };
            return {
                step: 1,
                state: 'create',
                type: 'db',
                title: null,
                deploymentAddress: [],
                treeData: [],
                treeJSON: {},
                dataForm: {
                    dataSourceName: '', // 数据源名称
                    dataSourceKind: '', // 数据源类型
                    businessSysName: '', // 业务系统名称
                    dataSourceType: '', // 数据源分类
                    version: '', // 版本号
                    frontEndNode: '', // 前置机节点
                    physicalAddress: '', // 物理地址
                    description: '', // 数据源说明
                    dataSourceShortName: '', // 数据源简称
                    renPing: '', // 拼音缩写
                    organizationId: '', // 所属机构
                    vestInOrganization: '', // 所属部门
                    dataSourceOwner: '', // 所属用户
                    creator: '', // 创建者
                    roleId: '', // 角色ID
                    deploymentAddress: '', // 部署地点
                    enableDisable: '1', // 启用禁用状态

                    dataBaseType: '', // 数据库类型
                    dataBastDevelopers: '', // 数据库开发商
                    dataSourceGrowthRate: '', // 数据增长率
                    historyDataSize: '', // 历史数据量
                    os: '', // 操作系统
                    protocol: '', // 协议类型
                    dataSourceRetentionCycle: '', // 数据保存周期
                    equipmentModel: '', // 设备型号
                    hardwareConfiguration: '', // 硬件配置
                    osBit: '', // 操作系统位数

                    linkString: '', // JDBC类型
                    dataBaseVersion: '', // 数据库版本
                    ipAddress: '', // IP地址
                    username: '', // 数据库用户名
                    characterSet: '', // 字符集
                    dataBaseName: '', // 数据库名称
                    dataBaseBit: '', // 数据库位数
                    port: '', // 端口
                    password: '', // 数据库密码
                    isConnect: true // 是否测试连接
                },
                casoptions: [], // 部署地点集合
                ownerdataSource: [], // 所属用户集合
                departmentdataSource: [], // 所属部门集合
                organizationdataSource: [], // 所属机构集合
                newDataBaseType: [],
                dataSourceType: [], // 数据源分类集合
                dataSourceKind: [], // 数据源类型集合
                usermsg: null,
                rules: {
                    dataSourceName: [{
                        validator: validatedataSourceName1,
                        required: true,
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
                        message: this.type === 'db' ? '请选择数据库类型' : '请选择文件传输类型',
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
            }
        },
        props: {},
        components: {
            DcpDialog,
            DataTree
        },
        created() {
            // 读取sessionstro
            this.usermsg = getSessionStore('userInfo');
            // 初始化数据
            let obj = {
                vestInOrganization: this.usermsg.departmentId,
                dataSourceOwner: this.usermsg.id,
                creator: this.usermsg.id,
                roleId: this.usermsg.roleId
            }
            this.dataForm = $.extend(this.dataForm, obj);
        },
        mounted() {
            this.getBaseData();
        },
        methods: {
            refresh() {
                this.$emit('on-refresh');
            },
            getBaseData() { // 获取基础数据
                initDataSourceInfo().then(res => {
                    let {
                        code,
                        data,
                        msg
                    } = res;
                    if (code === 200) {
                        let {
                            dataBaseType, // 数据库类型
                            dataSourceKind, // 数据源类型
                            dataSourceType, // 数据源分类
                            deploymentAddress, // 部署地点
                            protocol, // 协议类型
                            userInfo, // 所属用户
                            orgs
                        } = data;
                        userInfo = userInfo.map(item => {
                            item.userId = item.userId + '';
                            return item;
                        });
                        // 项目后期删除该方法
                        dataSourceKind = dataSourceKind.map(item => {
                            if (item.value === 'file' || item.value === 'db') {
                                item.disabled = false;
                            } else {
                                item.disabled = true;
                            }
                            return item;
                        });

                        dataSourceType = dataSourceType.map(item => {
                            if (this.usermsg.roleId !== 1 && (item.value === '2' || item.value === '3')) {
                                item.disabled = true;
                            } else {
                                item.disabled = false;
                            }
                            return item;
                        });
                        console.log(dataSourceType);
                        this.dataSourceKind = dataSourceKind;
                        this.dataBaseType = dataBaseType;
                        this.newDataBaseType = dataBaseType;
                        this.dataSourceType = dataSourceType;
                        this.casoptions = deploymentAddress;
                        this.organizationdataSource = orgs;
                        this.protocol = protocol;
                        this.ownerdataSource = userInfo;
                    } else {
                        this.$message.error(msg);
                    }
                })
            },
            handleDataSourceKindChange(val) {
                this.type = val;
                let dataBaseType = this.dataBaseType;

                let newDataBaseType = [];
                if (val === 'db') {
                    for (let item of dataBaseType) {
                        if (item.dicDescription === 'dbType') {
                            newDataBaseType.push(item)
                        }
                    }
                } else if (val === 'file') {
                    for (let item of dataBaseType) {
                        if (item.dicDescription === 'fileType') {
                            newDataBaseType.push(item)
                        }
                    }
                }
                this.newDataBaseType = newDataBaseType;
            },
            handleDataSourceOwnerChange(val) {},
            dataBaseTypechange(val) {

            },
            handleDeploymentAddressChange(item) {
                this.dataForm.deploymentAddress = item[item.length - 1];
            },
            changeOrganization(val) { // 所属机构change事件
                getDepartment(val).then(res => {
                    let {
                        code,
                        data
                    } = res;
                    if (code === 200) {
                        if (!data.length) {
                            this.dataForm.vestInOrganization = '';
                            this.departmentdataSource = [];
                            return;
                        }
                        this.departmentdataSource = data = data.map(item => {
                            item.id = item.id + '';
                            return item;
                        });
                    } else {
                        this.dataForm.vestInOrganization = '';
                        this.departmentdataSource = [];
                    }
                });
            },
            changeDepartment() { // 所属部门change事件

            },
            handlePreviousStepClick() {
                this.step -= 1;
                this.getTitle();
            },
            handleNextStepClick() {
                this.$refs['step' + this.step + '_form'].validate((valid) => {
                    if (!valid) {
                        return;
                    }
                    this.step += 1;
                    this.getTitle();
                });
            },
            handleCompleteClick() {
                this.$refs['step' + this.step + '_form'].validate((valid) => {
                    if (!valid) {
                        return;
                    }
                    if (this.type === 'file') {
                        // 数据类型选择文件给默认值
                        this.dataForm.protocol = 'tcp';
                    }
                    if (this.state === 'create') {
                        saveDataSourceInfo(this.dataForm).then(res => {
                            let {
                                code,
                                data,
                                msg
                            } = res;
                            if (code === 200) {
                                if (this.dataForm.isConnect) {
                                    this.title = '新增数据源';
                                    this.step += 1;
                                    let {
                                        dataSourceKind,
                                        dataBaseType,
                                        linkString,
                                        ipAddress,
                                        port,
                                        username,
                                        password,
                                        dataBaseName
                                    } = this.dataForm;
                                    this.treeJSON = {
                                        dataSourceKind,
                                        dataBaseType,
                                        linkString,
                                        ipAddress,
                                        port,
                                        username,
                                        password,
                                        dataBaseName,
                                        dataSourceId: ''
                                    };
                                    if (this.type === 'db') {
                                        this.treeData = data.schemaList;
                                        this.treeJSON.dataSourceId = data.dbInfo.dataSourceId;
                                    } else if (this.type === 'file') {
                                        this.treeData = data.fileList;
                                    } else {
                                        this.treeData = [];
                                    }
                                } else {
                                    this.close();
                                }
                            } else if (res.code === 300) {
                                this.$message({
                                    type: 'success',
                                    message: msg
                                });
                                this.close();
                            } else {
                                this.$message.error(msg);
                                this.close();
                            }
                        });
                    } else if (this.state === 'edit') {
                        updateDataSourceInfo(this.dataForm).then(res => {
                            let {
                                msg,
                                code
                            } = res;
                            if (code !== 200) {
                                this.$message.error(msg);
                            }
                            this.close();
                        });
                    }
                });
            },
            handleSaveClick() {
                let data = this.$refs.tree.getSelectedData();
                saveTableColumnOrFile(data).then(res => {
                    let {
                        code,
                        msg
                    } = res;
                    if (code === 200) {
                        this.$message({
                            type: 'success',
                            message: msg
                        });
                    } else {
                        this.$message.error(msg);
                    }
                    this.close();
                });
            },
            open(state, row) {
                this.state = state;
                this.getTitle();
                this.$refs.data_opera.open();
                if ($.isEmptyObject(row)) {
                    return;
                }
                getDataSourceInfo({
                    dataSourceId: row.dataSourceId,
                    dataSourceKind: row.dataSourceKind
                }).then(res => {
                    let {
                        code,
                        data,
                        msg
                    } = res;
                    if (code === 200) {
                        this.dataForm = data;
                    } else {
                        this.$message.error(msg);
                    }
                });
            },
            close() {
                if (this.step < 4) {
                    this.$refs['step' + this.step + '_form'].resetFields();
                }
                this.step = 1;
                this.dataForm = {
                    dataSourceName: '', // 数据源名称
                    dataSourceKind: '', // 数据源类型
                    businessSysName: '', // 业务系统名称
                    dataSourceType: '', // 数据源分类
                    version: '', // 版本号
                    frontEndNode: '', // 前置机节点
                    physicalAddress: '', // 物理地址
                    description: '', // 数据源说明
                    dataSourceShortName: '', // 数据源简称
                    renPing: '', // 拼音缩写
                    organizationId: '', // 所属机构
                    vestInOrganization: '', // 所属部门
                    dataSourceOwner: '', // 所属用户
                    deploymentAddress: [], // 部署地点
                    enableDisable: '1', // 启用禁用状态

                    dataBaseType: '', // 数据库类型
                    dataBastDevelopers: '', // 数据库开发商
                    dataSourceGrowthRate: '', // 数据增长率
                    historyDataSize: '', // 历史数据量
                    os: '', // 操作系统
                    protocol: '', // 协议类型
                    dataSourceRetentionCycle: '', // 数据保存周期
                    equipmentModel: '', // 设备型号
                    hardwareConfiguration: '', // 硬件配置
                    osBit: '', // 操作系统位数

                    linkString: '', // JDBC类型
                    dataBaseVersion: '', // 数据库版本
                    ipAddress: '', // IP地址
                    username: '', // 数据库用户名
                    characterSet: '', // 字符集
                    dataBaseName: '', // 数据库名称
                    dataBaseBit: '', // 数据库位数
                    port: '', // 端口
                    password: '', // 数据库密码
                    isConnect: true // 是否测试连接
                }
                this.$refs.data_opera.close();
                this.refresh();
            },
            getTitle() {
                if (this.state === 'create') {
                    this.title = '新增数据源(' + this.step + '/3)';
                } else if (this.state === 'edit') {
                    this.title = '编辑数据源(' + this.step + '/3)';
                }
            }
        }
}
</script>
<style lang="scss">
.data-opera {
    .el-dialog__body {
        .data-form {
            .el-form-item__label {
                color: #24caf3;
            }
            .el-input__inner {
                border-radius: 0;
            }
            .el-input.is-disabled .el-input__inner {
                color: #24caf3;
                background: transparent;
                border-color: #075174;
            }
            .el-cascader {
                background: transparent;
            }
            .el-cascader.is-disabled .el-cascader__label {
                z-index: 2;
                color: #24caf3;
            }
            .data-select {
                width: 100%;
            }
            .el-radio__label {
                color: #02a6d4;
            }
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
            .el-textarea__inner {
                background: transparent;
            }
        }
        .back-header {
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
    }
    .dialog-footer {
        .left-btn {
            float: left;
            margin-left: 20px;
        }
    }
}
</style>

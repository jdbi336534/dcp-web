<template>
    <div class="data_details">
        <el-row :gutter="4">
            <el-col :span="13">
                <el-col :span="6">
                    <div class="column">业务系统名称</div>
                    <div class="column">部署地点</div>
                    <div class="column">数据库类型</div>
                    <div class="column">历史数据量</div>
                    <div class="column">协议</div>
                    <div class="column">数据源名称</div>
                    <div class="column">数据源种类</div>
                    <div class="column">所属部门</div>
                    <div class="column">数据源简称</div>
                    <div class="column">物理地址</div>
                    <div class="column">数据库开发商</div>
                    <div class="column">数据源类型</div>
                    <div class="column">数据源状态</div>
                    <div class="column">链接字符串</div>
                    <!--   <div class="column">数据增长率</div> -->
                </el-col>
                <el-col :span="18">
                    <div class="column" :class=" detailsData.businessSysName===null ||detailsData.businessSysName===''?'colorEq0':' '">
                        {{detailsData.businessSysName===null||detailsData.businessSysName===''?'暂无数据':detailsData.businessSysName}}
                    </div>
                    <div class="column" :class=" detailsData.deploymentAddressName===null ||detailsData.deploymentAddressName===''?'colorEq0':' '">
                        {{detailsData.deploymentAddressName===null||detailsData.deploymentAddressName===''?'暂无数据':detailsData.deploymentAddressName}}
                    </div>
                    <div class="column" :class=" detailsData.dataBaseType===null ||detailsData.dataBaseType===''?'colorEq0':' '">
                        {{detailsData.dataBaseType===null||detailsData.dataBaseType===''?'暂无数据':detailsData.dataBaseType}}
                    </div>
                    <div class="column" :class=" detailsData.historyDataSize===null ||detailsData.historyDataSize===''?'colorEq0':' '">
                        {{detailsData.historyDataSize===null||detailsData.historyDataSize===''?'暂无数据':detailsData.historyDataSize}}
                    </div>
                    <div class="column" :class=" detailsData.protocol===null ||detailsData.protocol===''?'colorEq0':' '">
                        {{detailsData.protocol===null||detailsData.protocol===''?'暂无数据':detailsData.protocol}}
                    </div>
                    <div class="column" :class=" detailsData.dataSourceName===null ||detailsData.dataSourceName===''?'colorEq0':' '">
                        {{detailsData.dataSourceName===null||detailsData.dataSourceName===''?'暂无数据':detailsData.dataSourceName}}
                    </div>
                    <div class="column" :class=" detailsData.dataSourceKindName===null ||detailsData.dataSourceKindName===''?'colorEq0':' '">
                        {{detailsData.dataSourceKindName===null||detailsData.dataSourceKindName===''?'暂无数据':detailsData.dataSourceKindName}}
                    </div>
                    <div class="column" :class=" detailsData.vestInOrganiztionName===null ||detailsData.vestInOrganiztionName===''?'colorEq0':' '">
                        {{detailsData.vestInOrganiztionName===null||detailsData.vestInOrganiztionName===''?'暂无数据':detailsData.vestInOrganiztionName}}
                    </div>
                    <div class="column" :class=" detailsData.dataSourceShortName===null ||detailsData.dataSourceShortName===''?'colorEq0':' '">
                        {{detailsData.dataSourceShortName===null||detailsData.dataSourceShortName===''?'暂无数据':detailsData.dataSourceShortName}}
                    </div>
                    <div class="column" :class=" detailsData.physicalAddress===null ||detailsData.physicalAddress===''?'colorEq0':' '">
                        {{detailsData.physicalAddress===null||detailsData.physicalAddress===''?'暂无数据':detailsData.physicalAddress}}
                    </div>
                    <div class="column" :class=" detailsData.dataBastDevelopers===null ||detailsData.dataBastDevelopers===''?'colorEq0':' '">
                        {{detailsData.dataBastDevelopers===null||detailsData.dataBastDevelopers===''?'暂无数据':detailsData.dataBastDevelopers}}
                    </div>
                    <div class="column" :class=" detailsData.dataSourceTypeName===null ||detailsData.dataSourceTypeName===''?'colorEq0':' '">
                        {{detailsData.dataSourceTypeName===null||detailsData.dataSourceTypeName===''?'暂无数据':detailsData.dataSourceTypeName}}
                    </div>
                    <div class="column" :class=" detailsData.dataSourceStatusName===null ||detailsData.dataSourceStatusName===''?'colorEq0':' '">
                        {{detailsData.dataSourceStatusName===null||detailsData.dataSourceStatusName===''?'暂无数据':detailsData.dataSourceStatusName}}
                    </div>
                    <div class="column" :class=" detailsData.linkString===null ||detailsData.linkString===''?'colorEq0':' '">
                        {{detailsData.linkString===null||detailsData.linkString===''?'暂无数据':detailsData.linkString}}
                    </div>
                </el-col>
            </el-col>
            <el-col :span="11">
                <el-col :span="6">
                    <div class="column_r">数据拥有者</div>
                    <div class="column_r">IP地址</div>
                    <div class="column_r">端口</div>
                    <div class="column_r">版本</div>
                    <div class="column_r">用户名</div>
                    <!--   <div class="column_r">密码</div> -->
                    <div class="column">设备型号</div>
                    <div class="column">硬件配置</div>
                    <div class="column">操作系统</div>
                    <div class="column">操作系统位数</div>
                    <div class="column">创建时间</div>
                    <div class="column">创建人</div>
                    <div class="column">数据审批状态</div>
                    <div class="column">数据保存周期</div>
                    <div class="column">数据增长率</div>
                </el-col>
                <el-col :span="18">
                    <div class="column_r" :class="detailsData.dataSourceOwnerName===null ||detailsData.dataSourceOwnerName===''?'colorEq0':' '">
                        {{detailsData.dataSourceOwnerName===null||detailsData.dataSourceOwnerName===''?'暂无数据':detailsData.dataSourceOwnerName}}
                    </div>
                    <div class="column_r" :class=" detailsData.ipAddress===null ||detailsData.ipAddress===''?'colorEq0':' '">
                        {{detailsData.ipAddress===null||detailsData.ipAddress===''?'暂无数据':detailsData.ipAddress}}
                    </div>
                    <div class="column_r" :class=" detailsData.port===null ||detailsData.port===''?'colorEq0':' '">
                        {{detailsData.port===null||detailsData.port===''?'暂无数据':detailsData.port}}
                    </div>
                    <div class="column_r" :class=" detailsData.dataBaseVersion===null ||detailsData.dataBaseVersion===''?'colorEq0':' '">
                        {{detailsData.dataBaseVersion===null||detailsData.dataBaseVersion===''?'暂无数据':detailsData.dataBaseVersion}}
                    </div>
                    <div class="column_r" :class=" detailsData.username===null ||detailsData.username===''?'colorEq0':' '">
                        {{detailsData.username===null||detailsData.username===''?'暂无数据':detailsData.username}}
                    </div>
                    <div class="column_r" :class="detailsData.equipmentModel===null ||detailsData.equipmentModel===''?'colorEq0':' '">
                        {{detailsData.equipmentModel==null||detailsData.equipmentModel===''?'暂无数据':detailsData.equipmentModel}}
                    </div>
                    <div class="column_r" :class=" detailsData.hardwareConfiguration===null ||detailsData.hardwareConfiguration===''?'colorEq0':' '">
                        {{detailsData.hardwareConfiguration===null||detailsData.hardwareConfiguration===''?'暂无数据':detailsData.hardwareConfiguration}}
                    </div>
                    <div class="column_r" :class=" detailsData.os===null ||detailsData.os===''?'colorEq0':' '">
                        {{detailsData.os===null||detailsData.os===''?'暂无数据':detailsData.os}}
                    </div>
                    <div class="column_r" :class=" detailsData.osBit===null ||detailsData.osBit===''?'colorEq0':' '">
                        {{detailsData.osBit===null||detailsData.osBit===''?'暂无数据':detailsData.osBit}}
                    </div>
                    <div class="column_r" :class=" detailsData.createTime===null ||detailsData.createTime===''?'colorEq0':' '">
                        {{detailsData.createTime===null||detailsData.createTime===''?'暂无数据':detailsData.createTime}}
                    </div>
                    <div class="column_r" :class=" detailsData.creatorName===null ||detailsData.creatorName===''?'colorEq0':' '">
                        {{detailsData.creatorName===null||detailsData.creatorName===''?'暂无数据':detailsData.creatorName}}
                    </div>
                    <div class="column_r" :class="detailsData.aproveStatusName===null ||detailsData.aproveStatusName===''?'colorEq0':' '">
                        {{detailsData.aproveStatusName===null||detailsData.aproveStatusName===''?'暂无数据':detailsData.aproveStatusName}}
                    </div>
                    <div class="column_r" :class=" detailsData.dataSourceRetentionCycle===null ||detailsData.dataSourceRetentionCycle===''?'colorEq0':' '">
                        {{detailsData.dataSourceRetentionCycle===null||detailsData.dataSourceRetentionCycle===''?'暂无数据':detailsData.dataSourceRetentionCycle}}
                    </div>
                    <div class="column_r" :class=" detailsData.dataSourceGrowthRate===null ||detailsData.dataSourceGrowthRate===''?'colorEq0':' '">
                        {{detailsData.dataSourceGrowthRate===null||detailsData.dataSourceGrowthRate===''?'暂无数据':detailsData.dataSourceGrowthRate}}
                    </div>
                    <!-- <div class="column_r">{{detailsData.dataSourceOwner}}</div>
            <div class="column_r">{{detailsData.ipAddress}}</div>
            <div class="column_r">{{detailsData.port}}</div>
            <div class="column_r">{{detailsData.version}}</div>
            <div class="column_r">{{detailsData.username}}</div>
            <div class="column_r">{{detailsData.password}}</div> -->
                </el-col>
            </el-col>
        </el-row>
        <el-row :gutter="4">
        </el-row>
    </div>
</template>
<script>
export default {
    data() {
            return {}
        },
        props: {
            detailsData: {
                type: Object,
                default: {}
            }
        }
}
</script>
<style lang="scss">
.data_details {
    .column {
        font-size: 16px;
        color: #18d3fd;
        margin-top: 10px;
        text-align: left;
    }
    .column_r {
        ffont-size: 16px;
        color: #18d3fd;
        margin-top: 10px;
        text-align: left;
    }
}
</style>

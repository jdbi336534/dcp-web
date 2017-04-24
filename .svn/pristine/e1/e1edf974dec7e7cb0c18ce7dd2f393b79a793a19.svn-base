import fetch from './fetch'

// 编译环境使用真实数据
//  if (process.env.NODE_ENV == 'development') {
//      // 开发环境可以使用假数据
//  }else{

// 这里写需要请求的接口
var PROXY = '/api';
var initDataSourceInfo = () => fetch('GET', `${PROXY}/dataSource/v1.0/initDataSourceInfo`);
var isDataSourceNameExist = (name) => fetch('POST', `${PROXY}/dataSource/v1.0/isDataSourceNameExist`, {
    dataSourceName: name
});
var saveDataSourceInfo = (data) => fetch('POST', `${PROXY}/dataSource/v1.0/saveDataSourceInfo`, data);

// 数据源申请
var dataList = (data) => fetch('POST', `${PROXY}/dataSource/v1.0/listDataSourceInfo`, data);
// 数据源审核
var datasourceApproveList = (data) => fetch('POST', `${PROXY}/dataSource/v1.0/datasourceApproveList`, data);
// 数据源已申请
var CompletedApprovedList = (data) => fetch('POST', `${PROXY}/dataSource/v1.0/datasourceCompletedApprovedList`, data);
var pageOne = (pageNum) => fetch('POST', `${PROXY}/dataSource/v1.0/listDataSourceInfo`, {
    'pageNum': pageNum,
    'pageSize': 20
});
var dataListAll = () => fetch('POST', `${PROXY}/dataSource/v1.0/listDataSourceInfo`, {
    'pageNum': 1,
    'pageSize': 0,
    'userId': 1
});
//  var dataListOne = (cdataSourceId) => fetch('GET', '/dataSource/v1.0/showDataSourceInfo/1',{
//   'dataSourceId':cdataSourceId,
//  });
var delectOne = (id) => fetch('PUT', `${PROXY}/dataSource/v1.0/removeDataSourceInfo/${id}`);
var testLink = (id) => fetch('GET', `${PROXY}/dataSource/v1.0/linkDataSource/${id}`);
var submitOne = (id, userId) => fetch('PUT', `${PROXY}/dataSource/v1.0/datasourceSubmit/${userId}/${id}`);

var datasourceApproveStatus = (id, type) => fetch('GET', `${PROXY}/dataSource/v1.0/datasourceAproveRecordList/${id}/${type}`);
var datasourceThreez = (id) => fetch('GET', `${PROXY}/dataSource/v1.0/showDataSourceInfo/${id}`);
var datasourceThreeTablez = (id) => fetch('GET', `${PROXY}/dataSource/v1.0/showColumnsInfo/${id}`);
var shPass = (userId, id, taskId, aproveStatus, aproveMessage) => fetch('PUT', `${PROXY}/dataSource/v1.0/datasourceAprove/${userId}/${id}/${taskId}/${aproveStatus}/${aproveMessage}`);
var datasourcejrshTablez = () => fetch('POST', `${PROXY}/dataSource/v1.0/listSchemasAndTable`, {
    'dataSourceId': 1039,
    'password': 'root',
    'port': 3306,
    'dbName': 'dcp',
    'ip': '172.16.1.216',
    'userName': 'root'
});
var datasourcejrshThreez = (id, password, port, dbName, ip, userName, dbType) => fetch('POST', `${PROXY}/dataSource/v1.0/listSchemasAndTable`, {
    'dataSourceId': id,
    'password': password,
    'port': port,
    'dbName': dbName,
    'ip': ip,
    'userName': userName,
    'dbType': dbType,

});

var loginDataSourceInfo = (userName, password) => fetch('POST', `${PROXY}/sys/v1.0/login`, {
    userName: userName,
    password: password
});
var showSchemasInUpdate = (data) => fetch('POST', `${PROXY}/dataSource/v1.0/showSchemasInUpdate`, data);
var getTablesBySchema = (data) => fetch('POST', `${PROXY}/dataSource/v1.0/getTablesBySchema`, data);
var getFieldsByTable = (data) => fetch('POST', `${PROXY}/dataSource/v1.0/getFieldsByTable`, data);
var saveSourceTableColumnInfo = (data) => fetch('POST', `${PROXY}/dataSource/v1.0/saveSourceTableColumnInfo`, data);

var findDatasourceList = (data) => fetch('POST', `${PROXY}/dataResources/v1.0/findDatasourceList`, data);
var getResourcesSchemaData = (datasourceId) => fetch('GET', `${PROXY}/dataResources/v1.0/findSchemaList/${datasourceId}`);
var getResourcesTableList = (dataSourceId, schemaName) => fetch('GET', `${PROXY}/dataResources/v1.0/findDatasourceTableList/${dataSourceId}/${schemaName}/1/1000`);
var getDatasourceColumnList = (sourceTableId) => fetch('GET', `${PROXY}/dataResources/v1.0/findDatasourceColumnList/${sourceTableId}`);
var getResourcesReviewData = (pageNum, pageSize, userId) => fetch('GET', `${PROXY}/dataResources/v1.0/findApproveList/${userId}/${pageNum}/${pageSize}`);

/** *****************************************蒋东兵***************************************************/
var getThemeList = () => fetch('GET', `${PROXY}/theme/v1.0/getThemeList`);
var getCatalogueInfoByParam = (data) => fetch('POST', `${PROXY}/catalogue/v1.0/getCatalogueInfoByParam`, data);
// 查询已发布的资源
var publishedResourcesList = (data) => fetch('POST', `${PROXY}/catalogue/v1.0/findPublishDataResourceList`, data);
// 查询未发布的资源
var unPublishResourcesList = (data) => fetch('POST', `${PROXY}/catalogue/v1.0/findUnpublishDataResourceList`, data);
// 发布资源
var batchSave = (data) => fetch('POST', `${PROXY}/catalogue/v1.0/batchSaveCatalogueResourceRelation`, data);
// 查询已发布文件资源
var pubFileResourcesList = data => fetch('POST', `${PROXY}/catalogue/v1.0/findPublishFile`, data);
// 查询未发布文件资源
var unpubFileResourcesList = data => fetch('POST', `${PROXY}/catalogue/v1.0/findUnPublishFile`, data);
// 发布文件资源
var batchSaveFile = data => fetch('POST', `${PROXY}/catalogue/v1.0/batchSaveCatalogueResourceRelation`, data);
// 点击获取修改schema
var showTablesBySchema = (data) => fetch('POST', `${PROXY}/dataSource/v1.0/showTablesBySchema`, data);
// 通过shaema获取修改表格数据
var showFieldsByTable = (data) => fetch('POST', `${PROXY}/dataSource/v1.0/showFieldsByTable`, data);
// 修改schema接口
var modifyDataSourceInfo = (data) => fetch('POST', `${PROXY}/dataSource/v1.0/modifyDataSourceInfo`, data);
// 当机构的选择发生变化的时候，根据所选机构去请求所选部门的下拉选框数据
var getDepartment = (organization) => fetch('GET', `${PROXY}/department/v1.0/listDepartmentInfo/${organization}`);
// 当部门的选择发生变化的时候，根据机构和部门的id去请求用户的数据
var getUser = (organization, department) => fetch('GET', `${PROXY}/user/v1.0/listUserInfo/${organization}/${department}`);
/** *****************************************蒋东兵***************************************************/
/** *****************************************赵凯芳***************************************************/

// 目录管理
// 新增目录
// var newCatalogue = (csdataList) => fetch('POST', '/catalogue/v1.0/saveCatalogueInfo', {
//   typeDescription: csdataList[0],
//   supplyUnit: csdataList[1], // 提供单位
//   informativeAbstract: csdataList[2], // 信息再要
//   rootNode: csdataList[3], // 根
//   frontNode: csdataList[4], // 上级节点
//   path: csdataList[5],
//   // "supplyType":csdataList[6],提供类型先不传
//   catalogueName: csdataList[7], // 目录名称
//   themeTypeId: csdataList[8], // 主题类型
//   // "catalogueCode":csdataList[9],// 目录编码先不传
//   // "catalogueTypeId":csdataList[10],// 目录类型id先不传
//   status: csdataList[11], // 发布状态,
//   tagIdList: csdataList[12], // 提交便签返回值
// });
var newCatalogue = (csdataList) => fetch('POST', `${PROXY}/catalogue/v1.0/saveCatalogueInfo`, csdataList);

// 新增标签
var newbq = (name, description, userId) => fetch('POST', `${PROXY}/tag/v1.0/saveTagInfo`, {
    tagName: name,
    tagDescription: description,
    userId: userId
});
// 验证标签是否存在
var yzbq = (name) => fetch('POST', `${PROXY}/tag/v1.0/verificationTagInfo`, {
    tagName: name,
});
// 显示标签
var getbqAll = (id) => fetch('GET', `${PROXY}/catalogue/v1.0/getCatalogueInfoById/${id}`);
// 目录发布
var publishCatalogue = (obj) => fetch('PUT', `${PROXY}/catalogue/v1.0/publishCatalogue`, obj);
// var publishCatalogue = (obj) => fetch('PUT',
// `/catalogue/v1.0/publishCatalogue/$(obj)`
// );

// 新增用户
// 获得所属机构
// var getistOrganizationInfo=()=>fetch('')

// 获得所属部门
// 保存新增数据
var saveneewuser = (userObj) => fetch('POST', `${PROXY}/user/v1.0/saveUserInfo`, userObj);

/** *****************************************赵凯芳***************************************************/
/** *****************************************陈伟***************************************************/
var getResourcesReviewedData = (userId, pageNum, pageSize) => fetch('GET', `${PROXY}/dataResources/v1.0/completedApproveList/${userId}/${pageNum}/${pageSize}`);
var getResourcesReviewedRecordData = (batchId) => fetch('GET', `${PROXY}/dataResources/v1.0/findApporveProcess/${batchId}`);
// 数据资源管理
var findApproveTableList = (batchId) => fetch('GET', `${PROXY}/dataResources/v1.0/findApproveTableList/${batchId}/1/0`);
var findApproveColumnList = (batchId, tableId) => fetch('GET', `${PROXY}/dataResources/v1.0/findApproveColumnList/${batchId}/${tableId}`);
var approveResources = (userId, datasourcekind, batchId, taskId, result, msg) => fetch('PUT', `${PROXY}/dataResources/v1.0/approveResources/${userId}/${datasourcekind}/${batchId}/${taskId}/${result}/${msg}`);

//  授权
//  提交审核
var getAuthSelectTableData = (data) => fetch('POST', `${PROXY}/dataResourcesAuthor/v1.0/showResourcesAuthorStored`, data);
var getAuthChangeTypeData = () => fetch('GET', `${PROXY}/dataResourcesAuthor/v1.0/listExchangeType`);
var getAuthSransPortData = () => fetch('GET', `${PROXY}/dataResourcesAuthor/v1.0/listTransPort`);
var getTableCloumnData = (data) => fetch('POST', `${PROXY}/dataResourcesAuthor/v1.0/showResourcesAuthorByTableId`, data);
var getListDataSourceInfo = (userId) => fetch('GET', `${PROXY}/dataResourcesAuthor/v1.0/listDataSourceInfo?operatorId=${userId}/`);
var submitResourcesAuthor = (data) => fetch('POST', `${PROXY}/dataResourcesAuthor/v1.0/submitResourcesAuthor`, data);

//  审核
var waitApproveResourcesByUerId = (data) => fetch('POST', `${PROXY}/dataResourcesAuthor/v1.0/waitApproveResourcesByUerId`, data);
var listTableDataByApplyId = (data) => fetch('POST', `${PROXY}/dataResourcesAuthor/v1.0/listTableDataByApplyId`, data);
var listTableDataByTableId = (data) => fetch('POST', `${PROXY}/dataResourcesAuthor/v1.0/listTableDataByTableId`, data);
var approveByprocessIdIdAndApplyId = (data) => fetch('POST', `${PROXY}/dataResourcesAuthor/v1.0/approveByprocessIdIdAndApplyId`, data);

//  已审核
var completedApprovedList = (data) => fetch('POST', `${PROXY}/dataResourcesAuthor/v1.0/completedApprovedList`, data);
var approveHistory = (data) => fetch('POST', `${PROXY}/dataResourcesAuthor/v1.0/approveHistory`, data);

// 部门管理接口
// 所属机构
var listOrganizationInfo = () => fetch('GET', `${PROXY}/organization/v1.0/listOrganizationInfo`);

//  上级部门接口
var listDepartmentInfo = (organId) => fetch('GET', `${PROXY}/department/v1.0/listDepartmentInfo/${organId}`);

//  保存部门接口
var saveDepartmentInfo = (data) => fetch('POST', `${PROXY}/department/v1.0/saveDepartmentInfo/`, data);
var modifyDepartmentInfo = (data) => fetch('PUT', `${PROXY}/department/v1.0/modifyDepartmentInfo/`, data);

// 标签管理
var getDataTagList = (data) => fetch('POST', `${PROXY}/tag/v1.0/getDataTagList`, data);
var saveTagInfo = (data) => fetch('POST', `${PROXY}/tag/v1.0/saveTagInfo`, data);
var updateTagInfo = (data) => fetch('PUT', `${PROXY}/tag/v1.0/updateTagInfo`, data);
var deleteTagInfo = (data) => fetch('PUT', `${PROXY}/tag/v1.0/deleteTagInfo/${data}`);

// 区域管理
var listAreaDictionary = (data) => fetch('POST', `${PROXY}/areadictionary/v1.0/listAreaDictionary`, data);
var removeAreaInfo = (data) => fetch('GET', `${PROXY}/areadictionary/v1.0/removeAreaInfo/${data}`);
var listAreaDictionaryInfo = () => fetch('GET', `${PROXY}/areadictionary/v1.0/listAreaDictionaryInfo`);
var saveAreaInfo = (data) => fetch('POST', `${PROXY}/areadictionary/v1.0/saveAreaInfo`, data);
var modifyAreaInfo = (data) => fetch('POST', `${PROXY}/areadictionary/v1.0/modifyAreaInfo`, data);

// 机构管理
var getOrganInfoList = (data) => fetch('POST', `${PROXY}/organization/v1.0/listOrganizationInfo`, data);
var removeOrganizationInfo = (data) => fetch('PUT', `${PROXY}/organization/v1.0/removeOrganizationInfo/${data}`);
var saveOrganizationInfo = (data) => fetch('POST', `${PROXY}/organization/v1.0/saveOrganizationInfo`, data);
var modifyOrganizationInfo = (data) => fetch('PUT', `${PROXY}/organization/v1.0/modifyOrganizationInfo`, data);

// 数据源
var getTablesOrFiles = (data) => fetch('POST', `${PROXY}/dataSource/v1.0/getTablesOrFiles`, data);
var getColumnsOrFiles = (data) => fetch('POST', `${PROXY}/dataSource/v1.0/getColumnsOrFiles`, data);
var saveTableColumnOrFile = (data) => fetch('POST', `${PROXY}/dataSource/v1.0/saveTableColumnOrFile`, data);
var getDataSourceInfo = (data) => fetch('POST', `${PROXY}/dataSource/v1.0/getDataSourceInfo`, data);
var listDBInfoOrFile = (data) => fetch('POST', `${PROXY}/dataSource/v1.0/listDBInfoOrFile`, data);
var updateDataSourceInfo = (data) => fetch('POST', `${PROXY}/dataSource/v1.0/updateDataSourceInfo`, data);
var removeDataSourceInfo = (data) => fetch('PUT', `${PROXY}/dataSource/v1.0/removeDataSourceInfo`, data);
var submitDataSource = (data) => fetch('PUT', `${PROXY}/dataSource/v1.0/submitDataSource`, data);
var showDBInfoOrFile = (data) => fetch('POST', `${PROXY}/dataSource/v1.0/showDBInfoOrFile`, data);
var checkDataSource = (data) => fetch('PUT', `${PROXY}/dataSource/v1.0/checkDataSource`, data);
/** *****************************************陈伟***************************************************/
/** *****************************************朱海亮***************************************************/
// 数据资源 
var submitResources = (data) => fetch('POST', `
        $ { PROXY }
        /dataResources/v
        1.0 / submitResources `, data);
var findNonApproveList = (id) => fetch('GET', `
        $ { PROXY }
        /dataResources/v
        1.0 / findNonApproveList / $ { id }
        `);
/** *****************************************朱海亮***************************************************/

/** *****************************************李前坤***************************************************/
// 请在此处编写代码
var listUserInfo = (user) => fetch('POST', `
        $ { PROXY }
        /user/v
        1.0 / listUserInfo / `, user);
var getUserInfo = (id) => fetch('GET', `
        $ { PROXY }
        /user/v
        1.0 / getUserInfo / ` + id);
/** *****************************************李前坤***************************************************/

/** *****************************************代建民***************************************************/
// 请在此处编写代码
/** *****************************************代建民***************************************************/

/** *****************************************王天欣***************************************************/
// 请在此处编写代码
/** *****************************************王天欣***************************************************/

/** *****************************************丁豪亮***************************************************/
// 请在此处编写代码
var getOrganizationInfoList = () => fetch('GET', `
        $ { PROXY }
        /organization/v
        1.0 / listOrganizationInfo `);
var getDepartmentInfoList = () => fetch('GET', `
        $ { PROXY }
        /department/v
        1.0 / listDepartmentInfo `);
/** *****************************************丁豪亮***************************************************/

/** *****************************************people2***************************************************/
// 请在此处编写代码
/** *****************************************people2***************************************************/
//  }
export {
    getTablesBySchema,
    getFieldsByTable,
    saveSourceTableColumnInfo,
    initDataSourceInfo,
    saveDataSourceInfo,
    dataList,
    loginDataSourceInfo,
    isDataSourceNameExist,
    delectOne,
    showSchemasInUpdate,
    submitOne,
    testLink,
    datasourceApproveList,
    dataListAll,
    pageOne,
    datasourceThreez,
    datasourceThreeTablez,
    datasourceApproveStatus,
    datasourcejrshThreez,
    shPass,
    datasourcejrshTablez,
    CompletedApprovedList,
    findDatasourceList,
    getResourcesSchemaData,
    getResourcesTableList,
    getDatasourceColumnList,
    getResourcesReviewData,
    /** *******蒋东兵*********/
    getThemeList,
    getCatalogueInfoByParam,
    publishedResourcesList,
    unPublishResourcesList,
    batchSave,
    // 文件资源发布
    pubFileResourcesList,
    unpubFileResourcesList,
    batchSaveFile,
    // 点击获取修改schema
    showTablesBySchema,
    // 通过shaema获取修改表格数据
    showFieldsByTable,
    // 修改schema接口
    modifyDataSourceInfo,
    getDepartment,
    getUser,
    /** *******蒋东兵*********/
    /** *******赵凯芳********/
    newCatalogue,
    newbq,
    yzbq,
    getbqAll,
    publishCatalogue,
    saveneewuser,
    /** *******赵凯芳********/
    /** *******陈伟**********/
    getResourcesReviewedData,
    getResourcesReviewedRecordData,
    findApproveTableList,
    findApproveColumnList,
    approveResources,
    getAuthSelectTableData, //    use
    getAuthChangeTypeData, //     use
    getAuthSransPortData, //  use
    getTableCloumnData, //    use
    submitResourcesAuthor, //  use
    getListDataSourceInfo, //  use
    waitApproveResourcesByUerId,
    listTableDataByApplyId, //  use
    listTableDataByTableId,
    approveByprocessIdIdAndApplyId, //  use
    completedApprovedList,
    approveHistory,
    listOrganizationInfo,
    listDepartmentInfo,
    saveDepartmentInfo,
    modifyDepartmentInfo,
    getDataTagList,
    saveTagInfo,
    updateTagInfo,
    deleteTagInfo,
    listAreaDictionary,
    removeAreaInfo,
    listAreaDictionaryInfo,
    saveAreaInfo,
    modifyAreaInfo,
    getOrganInfoList,
    removeOrganizationInfo,
    saveOrganizationInfo,
    modifyOrganizationInfo,
    getTablesOrFiles,
    getColumnsOrFiles,
    saveTableColumnOrFile,
    getDataSourceInfo,
    listDBInfoOrFile,
    updateDataSourceInfo,
    removeDataSourceInfo,
    submitDataSource,
    showDBInfoOrFile,
    checkDataSource,
    /** *******陈伟**********/
    /** *******朱海亮********/
    submitResources,
    findNonApproveList,
    /** *******朱海亮********/

    /** *******李前坤********/
    // 请在此处编写代码
    listUserInfo,
    getUserInfo,
    /** *******李前坤********/

    /** *******代建民********/
    // 请在此处编写代码
    /** *******代建民********/

    /** *******王天欣********/
    // 请在此处编写代码
    /** *******王天欣********/

    /** *******丁豪亮********/
    // 请在此处编写代码
    getOrganizationInfoList,
    getDepartmentInfoList,
    /** *******丁豪亮********/

    /** *******people2********/
    // 请在此处编写代码
    /** *******people2********/
}

<template>
    <div class="data-tree">
        <div class="data-tree-left">
            <el-tree class="data-tree-tree" :data="data_tree" :load="loadNode" :highlight-current="true" ref="tree" node-key="id" lazy :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </div>
        <div class="data-tree-right">
            <el-table ref="table" v-if="dataType === 'db'" :data="tableData" :resizable="true" border empty-text=" " style="width: 100%; height: 100%;" v-loading="tableloading" element-loading-text="拼命加载中" @selection-change="handleSelectionChange" row-key="id">
                <el-table-column type="selection" :reserve-selection="true">
                </el-table-column>
                <el-table-column prop="fieldName" label="字段名称" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="originalColumnTypeName" label="字段类型" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="length" label="字段长度" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="precision" label="字段精度" show-overflow-tooltip>
                    <template scope="scope">
                        {{!scope.row.precision ? scope.row.precision : ' '}}
                    </template>
                </el-table-column>
                <el-table-column prop="notNull" label="是否非空" show-overflow-tooltip>
                    <template scope="scope">
                        {{!scope.row.notNull ? '否' : '是'}}
                    </template>
                </el-table-column>
                <el-table-column prop="constraintType" label="键类型" show-overflow-tooltip>
                </el-table-column>
            </el-table>
            <el-table ref="table" v-if="dataType !== 'db'" :data="tableData" :resizable="true" border empty-text=" " style="width: 100%; height: 100%;" v-loading="tableloading" element-loading-text="拼命加载中" @selection-change="handleSelectionChange" row-key="name">
                <el-table-column type="selection" :reserve-selection="true">
                </el-table-column>
                <el-table-column label="名称" prop="name" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="类型" prop="type" show-overflow-tooltip>
                    <template scope="scope">
                        {{scope.row.type === 1 ? '文件夹' : '文件'}}
                    </template>
                </el-table-column>
                <el-table-column label="修改日期" prop="date" show-overflow-tooltip>
                    <template scope="scope">
                        {{formatTime(scope.row.date)}}
                    </template>
                </el-table-column>
                <el-table-column label="大小" prop="size" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="路径" prop="path" show-overflow-tooltip>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import {
    getTablesOrFiles,
    getColumnsOrFiles
} from '@/assets/js/queryData'
import {
    formatTime
} from '../../assets/js/mUtils';
export default {
    data() {
            return {
                data_tree: [],
                tableData: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                tableloading: false,
                fullPath: '',
                schemaName: '',
                selected: []
            };
        },
        props: {
            dataType: {
                type: String,
                default: 'db'
            },
            data: {
                type: Array,
                default: []
            },
            treeJSON: {
                type: Object,
                default: {}
            }
        },
        created() {
            console.log(this.treeJSON);
        },
        methods: {
            formatTime(t) {
                return formatTime(t);
            },
            handleSelectionChange(selection) {
                this.selected = selection;
            },
            handleNodeClick(data, node, self) {
                if (this.dataType === 'db') {
                    let obj = $.extend(true, {}, this.treeJSON);
                    obj.tableName = node.data.label;
                    obj.schemaName = this.schemaName;
                    getColumnsOrFiles(obj).then(res => {
                        let {
                            code,
                            data,
                            msg
                        } = res;
                        if (code === 200) {
                            if (!data.schemaTableList.length) {
                                this.tableData = [];
                                return;
                            } else {
                                let schema = data.schemaTableList[0];
                                let {
                                    tableList
                                } = schema;
                                if (!tableList.length) {
                                    this.tableData = [];
                                    return;
                                } else {
                                    let {
                                        columnMetaList
                                    } = tableList[0];
                                    for (let item of columnMetaList) {
                                        item.tableName = node.data.label;
                                        item.schemaName = this.schemaName;
                                        item.id = node.data.label + '/' + item.fieldName;
                                    }
                                    this.tableData = columnMetaList;
                                }
                            }
                        } else {
                            this.$message.error(msg);
                            this.tableData = [];
                        }
                    });
                } else if (this.dataType === 'file') {
                    let obj = $.extend(true, {}, this.treeJSON);
                    this.fullPath = '';
                    this.getFullPath(node);
                    obj.tableName = this.fullPath;
                    getColumnsOrFiles(obj).then(res => {
                        let {
                            code,
                            data,
                            msg
                        } = res;
                        if (code === 200) {
                            if (!data.fileList.length) {
                                this.tableData = [];
                                return;
                            }
                            for (let item of data.fileList) {
                                item.path = this.fullPath;
                            }
                            this.tableData = data.fileList;
                        } else {
                            this.tableData = [];
                            this.$message.error(msg);
                        }
                    });
                }
                for (let data1 of this.tableData) {
                    for (let data2 of this.selected) {
                        if (this.dataType === 'db') {
                            if (data2.filedName === data1.filedName) {
                                this.$refs.table.toggleRowSelection(data2, true);
                            }
                        } else if (this.dataType === 'file') {
                            if (data2.name === data1.name) {
                                this.$refs.table.toggleRowSelection(data2, true);
                            }
                        }
                    }
                }
            },
            loadNode(node, resolve) {
                if (node.level === 0) {
                    // 首先获取初始值
                    if (this.dataType === 'db') {
                        for (let item of this.data) {
                            let obj = {
                                label: item.schema,
                                id: item.schema
                            };
                            this.data_tree.push(obj);
                        }
                    } else if (this.dataType === 'file') {
                        for (let item of this.data) {
                            let obj = {
                                label: item.name,
                                id: item.name
                            };
                            this.data_tree.push(obj);
                        }
                    }
                } else {
                    this.getData(node, resolve);
                }
            },
            getFullPath(node) {
                if (node.parent && typeof node.data === 'object' && node.data.constructor === Object) {
                    this.fullPath += node.data.label + '/';
                    this.getFullPath(node.parent);
                    return;
                }
                this.fullPath = this.fullPath.split('/').reverse().join('/');
            },
            getData(node, resolve) {
                if (node.level === 1) {
                    this.schemaName = node.data.label;
                    let obj = $.extend(true, {}, this.treeJSON);
                    if (this.dataType === 'db') {
                        obj.schemaName = node.data.label;
                    } else if (this.dataType === 'file') {
                        obj.schemaName = '/' + node.data.label;
                    }
                    getTablesOrFiles(obj).then(res => {
                        this.tranceData(res, resolve);
                    });
                } else {
                    if (this.dataType === 'db') {
                        resolve([]);
                        return;
                    }
                    let obj = $.extend(true, {}, this.treeJSON);
                    this.fullPath = '';
                    this.getFullPath(node);
                    obj.tableName = this.fullPath;
                    getColumnsOrFiles(obj).then(res => {
                        this.tranceData(res, resolve);
                    });
                }
            },
            tranceData(res, resolve) {
                let {
                    code,
                    data
                } = res;
                let leftArr = [];
                if (code === 200) {
                    let {
                        fileList,
                        schemaTableList
                    } = data;
                    if (this.dataType === 'db') {
                        if (schemaTableList[0] && !$.isEmptyObject(schemaTableList[0])) {
                            let {
                                tableList
                            } = schemaTableList[0];
                            let treeData = [];
                            for (let item of tableList) {
                                let obj = {
                                    label: item.tableName,
                                    id: item.tableName
                                };
                                treeData.push(obj);
                            }
                            resolve(treeData);
                        } else {
                            resolve([]);
                        }
                    } else if (this.dataType === 'file') {
                        if (!fileList.length) {
                            resolve([]);
                            return;
                        }
                        for (let item of fileList) {
                            if (!item.file) {
                                let obj = {
                                    label: item.name,
                                    id: item.name
                                };
                                leftArr.push(obj);
                            }
                        }
                        resolve(leftArr);
                    }
                }
            },
            getSelectedData() {
                let selected = this.selected;
                if (this.dataType === 'db') {
                    let arr1 = [];
                    for (let item of selected) {
                        let obj = {
                            dataSourceId: this.treeJSON.dataSourceId,
                            tableName: item.tableName,
                            schemaName: item.schemaName
                        };
                        arr1.push(obj);
                    }
                    var hash = {};
                    for (var i = 0, len = arr1.length; i < len; i++) {
                        var elem = arr1[i];
                        hash[JSON.stringify(elem)] = elem;
                    }
                    let arr2 = [];
                    let j = 0;
                    for (var item1 in hash) {
                        arr2[j++] = hash[item1];
                    }
                    for (let item2 of arr2) {
                        item2.dataSourceColumnInfo = [];
                        for (let item3 of selected) {
                            if (item2.tableName === item3.tableName) {
                                item2.dataSourceColumnInfo.push({
                                    columnName: item3.fieldName,
                                    dataType: item3.originalColumnTypeName,
                                    dataLength: item3.length,
                                    dataPrecision: item3.precision,
                                    dataNotNull: item3.notNull,
                                    dataConstraintType: item3.constraintType
                                });
                            }
                        }
                    }
                    return {
                        dataSourceKind: 'db',
                        dataSourceTableInfo: arr2
                    };
                } else if (this.dataType === 'file') {
                    let arr = [];
                    for (let item of selected) {
                        let {
                            name,
                            size,
                            path
                        } = item;
                        let obj = {
                            fileName: name,
                            fileType: 'file',
                            fileSize: size,
                            path: path + '/' + name
                        };
                        arr.push(obj);
                    }
                    return {
                        dataSourceKind: 'file',
                        dataSourceFileInfo: arr
                    };
                }
            }
        }
}
</script>
<style lang="scss">
.data-tree {
    margin: 20px 20px 0 20px;
    height: 500px;
    position: relative;
    .data-tree-left {
        height: 100%;
        float: left;
        width: 20%;
        overflow: auto;
        .el-tree-node > .el-tree-node__children {
            overflow: visible;
        }
    }
    .data-tree-right {
        height: 100%;
        float: left;
        width: calc(100% - 20% - 2px);
        .el-table th.is-leaf {
            text-align: left;
        }
        .el-table__body-wrapper {
            height: calc(100% - 40px);
        }
    }
}
</style>

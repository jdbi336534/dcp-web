<template>
    <div class="addtree">
        <div class="left">
            <el-scrollbar wrap-class="jdb__wrap" view-class="jdb__list" show="true">
                <el-tree :data="treedata" :load="loadNode" :highlight-current="true" ref="tree" node-key="id" lazy :props="defaultProps" @node-click="nodeClick">
                </el-tree>
            </el-scrollbar>
        </div>
        <div class="right" id="ops">
            <el-table :data="tableData3" border height="460" ref="table" row-key="id" v-loading="loading" @select-all="allselect" @select="handleSelect" @selection-change="handleSelectionChange" :row-class-name="tableRowClassName">
                <el-table-column type="selection" :reserve-selection="true">
                </el-table-column>
                <el-table-column prop="columnName" label="字段名称" width="160">
                </el-table-column>
                <el-table-column prop="dataType" label="字段类型" width="130">
                </el-table-column>
                <el-table-column prop="dataLength" label="字段长度" width="98">
                </el-table-column>
                <el-table-column prop="dataPrecision" label="字段精度" width="98">
                </el-table-column>
                <el-table-column prop="dataNull" label="是否为空" :formatter="formatdataNotNull" width="98">
                </el-table-column>
                <el-table-column prop="dataConstraintType" label="键类型" width="89">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import {
    getTablesBySchema,
    getFieldsByTable,
    showTablesBySchema,
    showFieldsByTable,
} from '../../assets/js/queryData';
export default {
    props: ['AddData', 'type'],
    data() {
        return {
            sonlist: {
                sonlist: true,
                on: false
            },
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            treedata: [],
            schema: [],
            dbInfo: {},
            tableData3: [],
            Iscroll: {},
            dataSourceTableInfo: [{
                dataSourceColumnInfo: [{}]
            }],
            selected: {},
            onchangeselection: {},
            lastdata: {},
            sendInfo: [],
            clickednode: {},
            loading: false,
            changeflag: false,
            fathernode: {},
        };
    },
    computed: {},
    methods: {
        nodeClick(data, node, self) {
            if (node.level === 1) {} else if (node.level === 2) {
                this.loading = true;
                // 将当前点击的树记录下来
                this.clickednode.schemaName = node.parent.data.label;
                this.clickednode.tableName = node.data.label;
                this.clickednode.id = node.data.id;
                // 初始化的时候去掉所有的选择clearSelection(这样会触发事件，会出问题),
                // 初始化前设置标志状态避免selectionchange事件导致
                this.changeflag = false;
                this.tableData3.forEach(item => {
                    this.$refs.table.toggleRowSelection(item, false);
                });
                // 清除完所有选中状态后，设置flag为true
                this.changeflag = true;
                // 然后进行新的数据的请求
                this.tableData3 = [];
                // let temparr = [];
                // 组装tablelist
                let tableListarr = [];
                tableListarr.push({
                    tableName: this.clickednode.tableName
                });
                // 组装schemaTableList
                let tempobj = {
                    schemaInfo: {
                        schema: this.clickednode.schemaName
                    },
                    tableList: tableListarr
                };
                let schemaTableListarr = [];
                schemaTableListarr.push(tempobj);
                // 组装data
                let data = {
                    dataSourceId: this.AddData.dbInfo.dataSourceId,
                    dbInfo: this.dbInfo,
                    schemaTableList: schemaTableListarr
                };
                // 使用组装后的json去请求数据
                if (this.type === 'create') {
                    getFieldsByTable(data).then(res => {
                        if (res.code === 200) {
                            //  console.log('res.data[0].tableList[0].columnMetaList:',res.data.schemaTableList[0].tableList[0].columnMetaList);
                            for (let index in res.data.schemaTableList[0].tableList[0].columnMetaList) {
                                let tempobj = {};
                                tempobj.columnName = res.data.schemaTableList[0].tableList[0].columnMetaList[index].fieldName;
                                tempobj.dataType = res.data.schemaTableList[0].tableList[0].columnMetaList[index].originalColumnTypeName;
                                //  tempobj.dataLength=res.data.schemaTableList[0].tableList[0].columnMetaList[index].length;
                                // 字段长度判断
                                if (res.data.schemaTableList[0].tableList[0].columnMetaList[index].length === -1) {
                                    tempobj.dataLength = '';
                                } else {
                                    tempobj.dataLength = res.data.schemaTableList[0].tableList[0].columnMetaList[index].length;
                                }
                                // 字段精度判断
                                if (res.data.schemaTableList[0].tableList[0].columnMetaList[index].precision === -1) {
                                    tempobj.dataPrecision = '';
                                } else {
                                    tempobj.dataPrecision = res.data.schemaTableList[0].tableList[0].columnMetaList[index].precision;
                                }
                                tempobj.dataConstraintType = res.data.schemaTableList[0].tableList[0].columnMetaList[index].constraintType;
                                // 是否为空判断
                                if (res.data.schemaTableList[0].tableList[0].columnMetaList[index].notNull === 0) {
                                    tempobj.dataNotNull = 0;
                                    tempobj.dataNull = '否';
                                } else {
                                    tempobj.dataNotNull = 1;
                                    tempobj.dataNull = '是';
                                }
                                tempobj.id = index;
                                //  tempobj.node=node.data.label;
                                //  console.log(tempobj);
                                this.tableData3.push(tempobj);
                                this.loading = false;
                            }
                            // 遍历整个数据，将报存下来的要回选的数据存起来
                            // 当回选的时候避免出发selectionchange事件
                            this.changeflag = false;
                            //  console.log('this.selected[this.clickednode.tableName]:', this.selected[this.clickednode.tableName]);
                            //  this.onchangeselection[this.clickednode.tableName]
                            this.tableData3.forEach(item => {
                                for (let i in this.selected[this.clickednode.tableName]) {
                                    if (this.selected[this.clickednode.tableName][i].id === item.id) {
                                        this.$refs.table.toggleRowSelection(item, true);
                                    }
                                }
                            });
                            // 回选完毕重置状态
                            this.changeflag = true;
                        }
                    });
                } else if (this.type === 'edit') {
                    showFieldsByTable(data).then(res => {
                        if (res.code === 200) {
                            // console.log('edittablename:', res);
                            for (let index in res.data.columnMetaList) {
                                let tempobj = {};
                                tempobj.columnName = res.data.columnMetaList[index].columnName;
                                tempobj.dataType = res.data.columnMetaList[index].dataType;
                                tempobj.selected = res.data.columnMetaList[index].selected;
                                // 字段长度判断
                                if (res.data.columnMetaList[index].dataLength === -1) {
                                    tempobj.dataLength = '';
                                } else {
                                    tempobj.dataLength = res.data.columnMetaList[index].dataLength;
                                }
                                // 字段精度判断
                                if (res.data.columnMetaList[index].dataPrecision === -1) {
                                    tempobj.dataPrecision = '';
                                } else {
                                    tempobj.dataPrecision = res.data.columnMetaList[index].dataPrecision;
                                }
                                tempobj.dataConstraintType = res.data.columnMetaList[index].dataConstraintType;
                                // 是否为空判断
                                if (res.data.columnMetaList[index].dataNotNull === 0) {
                                    tempobj.dataNotNull = 0;
                                    tempobj.dataNull = '否';
                                } else {
                                    tempobj.dataNotNull = 1;
                                    tempobj.dataNull = '是';
                                }
                                tempobj.id = index;
                                //  tempobj.node=node.data.label;
                                //  console.log(tempobj);
                                this.tableData3.push(tempobj);
                                this.loading = false;
                            }
                            // 遍历整个数据，将报存下来的要回选的数据存起来
                            // 当回选的时候避免出发selectionchange事件
                            this.changeflag = false;
                            //  console.log('this.selected[this.clickednode.tableName]:', this.selected[this.clickednode.tableName]);
                            //  this.onchangeselection[this.clickednode.tableName]
                            this.tableData3.forEach(item => {
                                // console.log(item.selected);
                                if (item.selected !== 1) {
                                    this.$refs.table.toggleRowSelection(item, true);
                                }
                            });
                            // 回选完毕重置状态
                            this.changeflag = true;
                        }
                    });
                }
            }
        },
        loadNode(node, resolve) {
            // console.info('node:', this.AddData.dbInfo);
            if (node.level === 0) {
                // 首先获取初始值
                for (let i in this.AddData.schemaList) {
                    let tempobj = {};
                    tempobj.label = this.AddData.schemaList[i].schema;
                    tempobj.selected = this.AddData.schemaList[i].selected;
                    tempobj.id = i;
                    this.treedata.push(tempobj);
                    // console.info('this.treedata:', this.treedata);
                }
                // 组装dbInfo，以后会用到
                this.dbInfo = {
                    dataSourceId: this.AddData.dbInfo.dataSourceId,
                    password: this.AddData.dbInfo.password,
                    port: this.AddData.dbInfo.port,
                    dbName: this.AddData.dbInfo.dbName,
                    ip: this.AddData.dbInfo.ip,
                    userName: this.AddData.dbInfo.userName,
                    dbType: this.AddData.dbInfo.dbType,
                };
                let that = this;
                setTimeout(function() {
                    let $treefirstnodelist = $('.addtree .el-tree-node');
                    for (let t in that.treedata) {
                        if (that.treedata[t].selected === 0) {
                            $treefirstnodelist.eq(t).css('color', 'red');
                        }
                    }
                }, 0);
            }
            if (node.level === 1) {
                // 组装要请求的json,修改和新增通用
                let schemaarr = [];
                schemaarr.push({
                    schema: node.data.label
                });
                let data = {
                    dbInfo: this.dbInfo,
                    schemaList: schemaarr
                };
                if (this.type === 'create') {
                    // 新增时候点击一级树请求二级树
                    getTablesBySchema(data).then(res => {
                        if (res.code === 200) {
                            //  console.info('res.data[0].tableList:',res.data.schemaTableList[0].tableList);
                            let temparr = [];
                            for (let index in res.data.schemaTableList[0].tableList) {
                                let tempobj = {};
                                tempobj.label = res.data.schemaTableList[0].tableList[index].tableName;
                                tempobj.id = index;
                                temparr.push(tempobj);
                            }
                            resolve(temparr);
                        } else {}
                    });
                } else if (this.type === 'edit') {
                    // 修改时候点击一级树请求二级树
                    showTablesBySchema(data).then(res => {
                        if (res.code === 200) {
                            // console.info('edit:', res);
                            let temparr = [];
                            for (let index in res.data.tableList) {
                                let tempobj = {};
                                tempobj.label = res.data.tableList[index].tableName;
                                tempobj.selected = res.data.tableList[index].selected;
                                tempobj.sourceTableId = res.data.tableList[index].sourceTableId;
                                // console.log('sourceTableId:', res.data.tableList[index].sourceTableId);
                                tempobj.id = index;
                                temparr.push(tempobj);
                            }
                            this.schema = temparr;
                            resolve(temparr);
                            let that = this;
                            setTimeout(function() {
                                let $treesecondnodelist = $('.addtree .is-current .el-tree-node__children .el-tree-node');
                                for (let t in that.schema) {
                                    if (that.schema[t].selected === 0) {
                                        console.log(that.schema[t], t);
                                        $treesecondnodelist.eq(t).css('color', 'red');
                                    } else {
                                        $treesecondnodelist.eq(t).css('color', 'rgba(0, 187, 236, 0.9)');
                                    }
                                }
                            }, 0);
                        } else {}
                    });
                }
            }
            if (node.level === 2) {
                resolve([]);
            }
        },
        tableRowClassName(row, index) {
            // 给表格添加颜色
            if (row.selected === 1) {
                return 'green-row';
            } else if (row.selected === 2) {
                return 'red-row';
            }
            return '';
        },
        allselect(val) {
            //  console.log(val);
        },
        handleSelectionChange(selection) {
            // handleSelectionChange返回的是一个对象集合
            if (this.changeflag) {
                // this.selected主要用于记录被选中的表格中的数据，用于回选使用
                this.selected[this.clickednode.tableName] = selection.concat();
                if (this.type === 'edit') {
                    // 修改数据源
                    // 这里对之前已经选择过得进行检查，如果存在sourceTableId，说明曾经被选择过
                    for (let i in this.schema) {
                        if (this.schema[i].label === this.clickednode.tableName) {
                            // 如果sourceTableId存在的话，曾被选择过
                            if (this.schema[i].sourceTableId) {
                                // 这里组装修改之前已经选择的数据
                                this.onchangeselection[this.clickednode.tableName] = {
                                    dataSourceId: this.AddData.dbInfo.dataSourceId,
                                    schemaName: this.clickednode.schemaName,
                                    tableName: this.clickednode.tableName,
                                    sourceTableId: this.schema[i].sourceTableId,
                                    dataSourceColumnInfo: selection.concat()
                                }
                            } else {
                                // 开始组装对象（这里组装新的对象，也就是之前没有选择过得）
                                this.onchangeselection[this.clickednode.tableName] = {
                                    dataSourceId: this.AddData.dbInfo.dataSourceId,
                                    schemaName: this.clickednode.schemaName,
                                    tableName: this.clickednode.tableName,
                                    dataSourceColumnInfo: selection.concat()
                                }
                            }
                        }
                    }
                } else {
                    // 新增数据源走这里
                    this.onchangeselection[this.clickednode.tableName] = {
                        dataSourceId: this.AddData.dbInfo.dataSourceId,
                        schemaName: this.clickednode.schemaName,
                        tableName: this.clickednode.tableName,
                        dataSourceColumnInfo: selection.concat()
                    }
                }
                // console.info(' this.onchangeselection:', this.onchangeselection);
                let temparr = [];
                for (let key of Object.keys(this.onchangeselection)) {
                    temparr.push(this.onchangeselection[key]);
                }
                let tempobj = {
                    dataSourceTableInfo: temparr
                };
                // 组装对象结束
                // 将组装够的表格传递给父组件，并发送给后台
                // console.info('tempobj:', tempobj);
                this.$emit('send-data', tempobj);
            }
        },
        handleSelect(val) {},
        handleNodeClick(data) {
            this.$emit('checke-node', data);
        },
    },
    mounted() {}
};
</script>
<style lang="scss">
.addtree {
    width: 100%;
    height: 460px;
    position: relative;
    font-size: 14px;
    .left {
        height: 460px;
        width: 242px;
        position: absolute;
        top: 0;
        left: 0;
        .jdb__wrap {
            height: 460px;
        }
        .jdb__list {
            width: 239px;
        }
        .el-checkbox__inner {
            border-color: #62D0F8;
        }
        .el-tree {
            width: 100%;
            background-color: transparent;
            border-color: transparent;
        }
        .el-tree-node__children .el-tree-node__content .el-tree-node__expand-icon {
            border-left-color: rgba(12, 38, 66, 0);
        }
        .el-tree-node__content {
            text-align: left;
        }
        .el-tree-node__content:hover {
            background: transparent;
        }
        .el-tree-node__label:hover {
            color: #91E7FE;
        }
        .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
            background-color: rgba(98, 208, 248, 0.3);
        }
        .el-scrollbar__thumb {
            background-color: rgb(3, 128, 165);
        }
    }
    .right {
        margin-left: 246px;
        height: 460px;
        .el-table {
            background-color: transparent;
            border: 0;
            color: #00BBEC;
            //  表格要设置的背景色
            .red-row {
                color: #ff4949;
            }
            .green-row {
                color: #13ce66;
            }
        }
        .el-table__empty-text {
            color: #0c2642;
        }
        // .el-table::after, // .el-table::before { // background-color: transparent; // } // .el-table__header-wrapper thead div { // color: rgba(0, 187, 236, 0.9); // } // .el-table__fixed-header-wrapper thead div, // .el-table__header-wrapper thead div { // background-color: #0c2642; // } // .el-table tr { // background-color: rgba(12, 38, 66, 0); // } // .el-table th { // background-color: #0c2642; // } // .el-table--border td, // .el-table--border th { // border-right: 0px solid rgba(12, 38, 66, 0); // } // .el-table--border th, // .el-table__fixed-right-patch { // border-bottom: 0px; // } // .el-table td { // border-bottom: 0px; // } // .el-table--enable-row-hover tr:hover>td { // background-color: #0c2642; // color: #91E7FE; // cursor: default; // } // .el-loading-mask { // background-color: rgba(7, 22, 38, 0.24) !important; // }
    }
}

.color-red {
    color: red;
}
</style>

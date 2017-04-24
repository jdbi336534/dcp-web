<template>
    <div class="zybfwrap">
        <div class="zyfb">
            <div class="left">
                <!-- 
            options:为下拉框的数据源
            treedata：为树的数据源
            selectvalue：下拉框默认选择的选项
            select-change：下拉框发生变化的函数
            highlight:点击是否高亮
            showcheckbox:是否显示checkbox
            checked-change：选中树前的选框是发生的变化
            clicked-node：点击当前节点时触发的事件
              -->
                <!-- 左边的树 -->
                <search-tree :options="selectoptions" :treedata="treesdata" :selectvalue="defaultvalue" @select-change="onchange" :highlight="highlight" :showcheckbox="checkbox" @checked-change="checkChange" @clicked-node="nodeclick" :newbtn="xzbtn" :pubbtn="fbbtn"></search-tree>
                <!-- 左边的树 -->
            </div>
            <div class="right">
                <div class="top">
                    <p style="text-align: center;font-size:16px;color:#00BBEC;margin: 12px 0 0 0;">目录信息</p>
                    <div class="inputdiv">
                        <!-- input输入框 -->
                        <input-box :testData="msg" :testForm='formz'></input-box>
                        <!-- input输入框 -->
                    </div>
                    <div class="tagclass">
                        <span class="tagname">标签：</span>
                        <el-tooltip class="item" v-for="item in tagList" :key="item.id" effect="dark" :content="item.tagDescription" placement="top">
                            <el-tag type="success" style="margin-right:2px;">{{item.tagName}}</el-tag>
                        </el-tooltip>
                    </div>
                </div>
                <div class="bottom">
                    <div class="title tabs">
                        <p @click="changeResource(1, $event)" :class="resourceMode === 1 ? 'active' : 'tab-left'">已发布数据库资源</p>
                        <p @click="changeResource(2, $event)" :class="resourceMode === 2 ? 'active' : 'tab-right' ">已发布文件资源</p>
                    </div>
                    <!-- 页面中已发布资源列表展示 -->
                    <div class="tab-pane" v-show="resourceMode === 1">
                        <el-table :data="tableDatapub" height="260" class="tablestyle" @expand="expandtable" element-loading-text="数据加载中...">
                            <el-table-column type="expand" prop="tableColumnInfoList">
                                <!-- 列表下拉展开的列表 -->
                                <template scope="props">
                                    <el-table :data="props.row.tableColumnInfoList">
                                        <el-table-column prop="businessColumnName" label="业务字段名称">
                                        </el-table-column>
                                        <el-table-column prop="businessComputationRule" label="业务计算规则">
                                        </el-table-column>
                                        <el-table-column prop="itComputationRule" label="IT计算规则">
                                        </el-table-column>
                                        <el-table-column prop="columnTagList" label="字段标签名称" show-overflow-tooltip>
                                            <template scope="scope">
                                                <el-tooltip class="item" v-for="item in scope.row.columnTagList" :key="item.tagColumnId" effect="dark" :content="item.tagColumnDescription" placement="top">
                                                    <el-tag style="margin-right:2px" :key="item.tagColumnId" type="success" close-transition>
                                                        {{item.tagColumnName}}
                                                    </el-tag>
                                                </el-tooltip>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </template>
                                <!-- 列表下拉展开的列表 -->
                            </el-table-column>
                            <el-table-column prop="businessTableName" label="业务表名称" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="cnName" label="表中文名" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="enName" label="表英文名" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="shortName" label="表短名" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="tableTagList" label="表标签名称" show-overflow-tooltip>
                                <template scope="scope">
                                    <el-tooltip class="item" v-for="item in scope.row.tableTagList" :key="item.tagTableId" effect="dark" 
                                        :content="item.tagTableDescription" placement="top">
                                        <el-tag style="margin-right:2px" :key="item.tagTableId" type="success" close-transition>
                                            {{item.tagTableName}}
                                        </el-tag>
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!-- 页面中已发布资源列表展示 -->
                        <div class="pageangbtn page_wrap">
                            <!-- 分页按钮 -->
                            <el-pagination class="pagination" @size-change="handelSizeChange" @current-change="handelCurrentChange" layout="total, prev, pager, next" :page-sizes="[5, 10, 20, 30]" :total="Pubtotal">
                            </el-pagination>
                            <!-- 分页按钮 -->
                            <!-- 发布新资源 -->
                            <el-button type="text" icon="d-arrow-right" class="newsourcebtn" @click="addnewsource" :disabled="!treeClicked">发布数据库资源</el-button>
                            <!-- 发布新资源 -->
                        </div>
                    </div>
                    <div class="tab-pane" v-show="resourceMode === 2">
                        <!--已发布文件资源-->
                        <el-table :data="fileDataPub" class="tablestyle" height="260" element-loading-text="数据加载中...">
                            <el-table-column prop="fileName" label="业务文件名" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="cnName" label="文件中文名" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="enName" label="文件英文名" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="shortName" label="文件短名" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="tagList" label="文件标签名称" show-overflow-tooltip>
                                <template scope="scope">
                                    <el-tooltip class="item" v-for="item in scope.row.tagList" :key="item.tagTableId"
                                        effect="dark" :content="scope.row.tagCategoryDescription" placement="top">
                                        <el-tag type="success" close-transition>{{ item.tagName }}</el-tag>    
                                    </el-tooltip>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="pageangbtn page_wrap">
                            <el-pagination class="pagination" @size-change="changePubFileSize" :page-sizes="[5, 10, 20, 30]"
                                @current-change="changePubFileNum" layout="total, prev, pager, next" :total="filePageTotal">
                            </el-pagination>
                            <el-button type="text" icon="d-arrow-right" class="newsourcebtn" @click="addnewsource"
                                :disabled="!treeClicked">发布文件资源</el-button>
                        </div>
                        <!--已发布文件资源 end-->
                    </div>
                </div>
            </div>
        </div>
        <!-- 资源发布弹框 -->
        <Dcp-dialog id="issue_resource" ref="issueDialog" :title="title" :width="1000" :height="630" @on-close="closebtn">
            <div class="issue-body" slot="dialog_body">
                <!--未发布数据库资源-->
                <div v-show="resourceMode === 1">
                    <!-- 弹窗中的输入框 -->
                    <el-input placeholder="请输入内容" v-model="input5">
                        <el-select v-model="select" slot="prepend" placeholder="请选择">
                            <el-option v-for="item in source" :label="item.label" :value="item.value" :key="item.id">
                            </el-option>
                        </el-select>
                        <el-button slot="append" icon="search" @click="search"></el-button>
                    </el-input>
                    <!-- 弹窗中的输入框 -->
                    <!-- 弹窗中未发布数据库资源列表 -->
                    <el-table class="tablestyle" :data="tableDataUnpub" @expand="expandtable" v-loading="loadingModal" 
                        element-loading-text="数据加载中..." height="420" ref="untable" :row-key="getRowKey"
                        @select="tableSelect" @select-all="tableSelectAll" :expand-row-keys="currentExpandId">
                        <el-table-column type="selection" :reserve-selection="true" width="55">
                        </el-table-column>
                        <el-table-column type="expand" prop="tableColumnInfoList">
                            <!-- 列表下拉展开的列表 -->
                            <template scope="props">
                                <el-table :data="props.row.tableColumnInfoList" style="width:100%" @select-all="subTableSelectAll"
                                    :ref="props.row.resourcesId" @select="subTableSelect" :row-key="getSubrowKey">
                                    <el-table-column type="selection" :reserve-selection="true" width="55">
                                    </el-table-column>
                                    <el-table-column prop="businessColumnName" label="业务字段名称" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="businessComputationRule" label="业务计算规则" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="itComputationRule" label="IT计算规则" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column prop="columnTagList" label="字段签名称" show-overflow-tooltip>
                                        <template scope="scope">
                                            <el-tooltip class="item" v-for="item in scope.row.columnTagList" :key="item.tagColumnId" effect="dark" :content="item.tagColumnDescription" placement="top">
                                                <el-tag style="margin-right:2px" :key="item.tagColumnId" type="success" close-transition>
                                                    {{item.tagColumnName}}
                                                </el-tag>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </template>
                            <!-- 列表下拉展开的列表 -->
                        </el-table-column>
                        <el-table-column prop="businessTableName" label="业务表名称" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="cnName" label="表中文名" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="enName" label="表英文名" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="shortName" label="表短名" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="tableTagList" label="表标签名称" show-overflow-tooltip>
                            <template scope="scope">
                                <el-tooltip class="item" v-for="item in scope.row.tableTagList" :key="item.tagTableId" effect="dark" 
                                    :content="item.tagTableDescription" placement="top">
                                    <el-tag style="margin-right:2px" :key="item.tagTableId" type="success" close-transition>
                                        {{item.tagTableName}}
                                    </el-tag>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 弹窗中未发布的列表 -->
                    <!-- 分页按钮 -->
                    <div class="jdbpagination">
                        <el-pagination class="pagination" @size-change="modalSizeChange" @current-change="modalCurrentChange" 
                            layout="total,  prev, pager, next" :page-sizes="[5, 10, 20, 30]" :total="Unpubtotal">
                        </el-pagination>
                    </div>
                    <!-- 分页按钮 -->
                </div>
                <!--未发布文件资源-->
                <div v-show="resourceMode === 2">
                    <!-- 弹窗中的输入框 -->
                    <el-input placeholder="请输入内容" v-model="filterKey">
                        <el-select v-model="fileFilterVal" slot="prepend" placeholder="请选择">
                            <el-option v-for="item in fileFilterType" :label="item.label" :value="item.value" :key="item.id">
                            </el-option>
                        </el-select>
                        <el-button slot="append" icon="search" @click="filterUnpubFile"></el-button>
                    </el-input>
                    <!-- 弹窗中的输入框 -->
                    <!--未发布文件资源弹框-->
                    <el-table class="tablestyle" :data="fileDataUnpub" ref="fileUnpub" v-loading="loadingModal" height="420"
                        element-loading-text="数据加载中..." @selection-change="selectUnpubFile" :row-key="getFileRowKey">
                        <el-table-column type="selection" :reverse-selection="true" width="55"></el-table-column>
                        <el-table-column prop="fileName" label="业务文件名" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="cnName" label="文件中文名" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="enName" label="文件英文名" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="shortName" label="文件短名" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="tagList" label="文件标签名称" show-overflow-tooltip>
                            <template scope="scope">
                                <el-tooltip v-for="item in scope.row.tagList" :key="item.id" effect="dark"
                                    :content="item.tagCategoryDescription" placement="top">
                                    <el-tag style="margin-right:5px;" type="success" close-transition>
                                        {{ item.tagName }}
                                    </el-tag>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="jdbpagination">
                        <el-pagination class="pagination" @size-change="chgUnpubFileSize" @current-change="chgUnpubFileNum" 
                            layout="total,  prev, pager, next" :page-sizes="[5, 10, 20, 30]" :total="fileUnPageTotal">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div slot="dialog_footer">
                <el-button type="dcp" @click="okbtn">发布</el-button>
            </div>
        </Dcp-dialog>
    </div>
</template>
<script>
import {
    getThemeList,
    getCatalogueInfoByParam,
    unPublishResourcesList,
    publishedResourcesList,
    batchSave,
    getbqAll,
    pubFileResourcesList,
    unpubFileResourcesList,
    batchSaveFile,
} from '../../assets/js/queryData';
import {
    getSessionStore
} from '../../assets/js/mUtils';
import searchTree from '../common/SearchTree';
import inputBox from '../common/InputBox';
import modalBox from '../common/ModalBox';
import DcpDialog from '../common/DCPDialog';

const titles = ['发布数据库资源', '发布文件资源'];

export default {
    data() {
        return {
            selectoptions: [{}],
            treesdata: [{}],
            defaultvalue: 3,
            loadingModal: false,
            modalvisible: false,
            highlight: true,
            checkbox: false,
            xzbtn: false,
            fbbtn: false,
            resourceMode: 1,            // 用于标识当前标签类型1：已发布数据库资源，2：已发布文件资源
            source: [{
                value: 'businessTableName',
                id: 1,
                label: '表'
            }, {
                value: 'businessColumnName',
                id: 2,
                label: '字段'
            }],
            fileFilterType: [{
                value: 'fileName',
                id: 1,
                label: '文件名'
            }],
            fileFilterVal: 'fileName',
            filterKey: '',
            pubFileIds: [],
            formz: {
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
            msg: {
                mlmc: true,
                xxzy: true,
                tgdw: true,
                sjjd: true,
                gjd: true,
                mlztlx: true,
                qlj: true,
                mlbq: true,
                fbzt: true,
            },
            input5: '',
            select: '',
            tagList: [],
            tableDatapub: [],           // 已发布数据库资源表格数据
            tableDataUnpub: [],         // 弹框中未发布数据库资源表格数据
            fileDataPub: [],            // 已发布文件资源表格数据
            fileDataUnpub: [],          // 弹框中未发布文件资源表格数据
            treenodedata: null,
            disabled: true,
            treeClicked: false,         // 树节点是否选中
            unpubpageNum: 1,
            unpubpageSize: 10,
            Unpubtotal: 0,
            pubpageNum: 1,
            pubpageSize: 10,
            Pubtotal: 0,                // 已发布db,pagetotal
            filePageTotal: 0,           // 已发布file,pagetotal
            filePageSize: 10,
            filePageNum: 1,
            fileUnPageTotal: 0,         // 未发布文件资源总数
            fileUnPageSize: 10,
            fileUnPageNum: 1, 
            btnloading: false,
            tips: false,
            modalText: '',
            chosed: [],
            userInfo: {},
            title: '发布数据库资源',
            checkedIds: {},             // 外层表格行选中id
            currentExpandId: [],        // 当前展开行的id
        }
    },
    watch: {
        modalvisible(val) {
            if (val) {
                this.$refs.issueDialog.open();
                return;
            }

            this.$refs.issueDialog.close();
        }
    },
    components: {
        searchTree,
        modalBox,
        inputBox,
        DcpDialog,
    },
    methods: {
        getRowKey(row) {
            return row.resourcesId;
        },
        getSubrowKey(subrow) {
            return subrow.columId;
        },
        getFileRowKey(row) {
            return row.id;
        },
        toggleChecked(id, checked) {
            // 根据行id,寻找子表数据
            this.tableDataUnpub.forEach(row => {
                if (row.resourcesId !== id) {
                    return;
                }

                row.tableColumnInfoList.forEach(subrow => {
                    this.$refs[id].toggleRowSelection(subrow, checked);
                });
            });
        },
        // 表格全选
        tableSelectAll(rows) {
            let len = rows.length;
            let checkedIds = this.checkedIds;
            let expandId = this.currentExpandId[0];

            // 全不选, 清空选中id;
            if (len === 0) {
                // 有展开行，并且是选中状态，则取消选中
                if (expandId && 
                    Array.isArray(checkedIds[expandId]) && 
                    checkedIds[expandId].length > 0) {
                    // 取消选中
                    
                    this.toggleChecked(expandId, false);
                }

                this.checkedIds = {};
                return;
            }

            if (expandId) {
                this.toggleChecked(expandId, true);
            }
            
            // 获取选中id，及子表id
            rows.forEach(row => {
                let id = row.resourcesId;
                checkedIds[id] = 
                    row.tableColumnInfoList.map(subrow => {
                        return subrow.columId;
                    });
            });
        },
        // 表格单选
        tableSelect(rows, row) {
            let len = rows.length;
            let id = row.resourcesId;
            let checkedIds = this.checkedIds;
            let expandId = this.currentExpandId[0];

            // 全不选
            if (len === 0) {
                // 当前行为展开行
                if (expandId === id) {
                    this.toggleChecked(id, false);
                }
                this.checkedIds = {};
                return;
            }

            // 选中
            if (!(id in checkedIds) || checkedIds[id].length === 0) {
                // 选中行是展开行
                if (expandId === id) {
                    this.toggleChecked(id, true);
                }
                checkedIds[id] = 
                    row.tableColumnInfoList.map(subrow => {
                        return subrow.columId;
                    });
                return;
            }

            if (expandId === id) {
                this.toggleChecked(id, false);
            }

            // 取消选中
            delete checkedIds[id];
        },
        // 子表全选
        subTableSelectAll(rows) {
            let len = rows.length;
            let unpubDBList = this.tableDataUnpub;
            // 全不选
            if (len === 0) {
                // 获取当前展开行id (resourcesId)
                let id = this.currentExpandId[0];
                unpubDBList.forEach(row => {
                    if (id === row.resourcesId) {
                        this.$refs.untable.toggleRowSelection(row, false);
                    }
                });
                delete this.checkedIds[id];
                return;
            }

            // 全选
            let subId = rows[0].columId;
            let checkedIds = this.checkedIds;     
            let rowId = 0;
            let rowData = null;

            // 找到所属行id，和数据
            unpubDBList.forEach(row => {
                let id = row.resourcesId;
                row.tableColumnInfoList.forEach(subrow => {
                    if (subId === subrow.columId) {
                        rowId = id;
                        rowData = row;
                    }
                });
            });

            // 添加选中子表行id
            if (!Array.isArray(checkedIds[rowId])) {
                checkedIds[rowId] = [];
            }
            rows.forEach(subrow => {
                let id = subrow.columId;
                if (!checkedIds[rowId].includes(id)) {
                    checkedIds[rowId].push(id);
                }
            });
            
            this.$refs.untable.toggleRowSelection(rowData, true);
        },
        // 子表单选
        subTableSelect(rows, row) {
            let len = rows.length;
            let subId = row.columId;
            let unpubDBList = this.tableDataUnpub;
            let checkedIds = this.checkedIds;
            let rowId = 0;
            let rowData = null;

            unpubDBList.forEach(row => {
                row.tableColumnInfoList.forEach(subrow => {
                    if (subId === subrow.columId) {
                        rowId = row.resourcesId;
                        rowData = row;
                    }
                });
            });
            // 通过子表id，找所属行的id
            let subIds = checkedIds[rowId];

            // 全不选
            if (len === 0) {
                delete this.checkedIds[rowId];
                this.$refs.untable.toggleRowSelection(rowData, false);
                return;
            }

            if (!subIds) {
                subIds = checkedIds[rowId] = [];
            }

            // 在所选id中，则为取消选择
            let pos = subIds.indexOf(subId);
            if (pos !== -1) {
                subIds.splice(pos, 1);
            } else {
                subIds.push(subId);
                this.$refs.untable.toggleRowSelection(rowData, true);
            }
        },
        /**
         * 选择未发布文件
         */ 
        selectUnpubFile(rows) {
            this.pubFileIds = rows.map(row => {
                return row.id;
            });
        },
        // 获取发布文件列表
        getPublishedFile() {
            let id = this.treenodedata.id;
            let pageNum = this.filePageNum;
            let pageSize = this.filePageSize;
            pubFileResourcesList({id, pageNum, pageSize})
                .then(res => {
                    let { code, msg } = res;
                    if (code === 200) {
                        let { list, total } = res.data;
                        this.fileDataPub = list;
                        this.filePageTotal = total;
                        return;
                    }

                    this.$message({
                        message: msg,
                        type: 'warning'
                    });
                })
                .catch(() => {
                    this.$message.error('网络错误，请重试！');
                });
        },
        /**
         * 获取未发布文件资源
         */
        getUnpubFile(filter) {
            let { fileUnPageSize, fileUnPageNum, treenodedata: { id } } = this;

            let param = {
                pageNum: fileUnPageNum,
                pageSize: fileUnPageSize,
                id: id,
                creator: this.userInfo.id
            };

            if (filter) {
                Object.assign(param, filter);
            }

            unpubFileResourcesList(param)
            .then(res => {
                let { code, msg } = res;
                if (code === 200) {
                    // 更新未发布文件资源表格数据,数据总条数
                    let { list, total } = res.data;
                    this.fileDataUnpub = list;
                    this.fileUnPageTotal = total;
                    return;
                }

                // 内部异常返回
                this.$message({
                    message: msg,
                    type: 'warning'
                });
            })
            .catch(() => {
                // 未成功返回
                this.$message.error('请求未发布文件资源失败!');
            });
        },
        // 标签切换
        changeResource(mode, ev) {
            // 已发布(数据库|文件)资源切换
            // 请求数据
            let { treeClicked, tableDatapub, fileDataPub, resourceMode, 
                  pubpageNum, pubpageSize } = this;
            // 未选中节点，重复点击当前标签选项
            if (!treeClicked || resourceMode === mode) {
                return;
            }

            this.resourceMode = mode;

            // 标签切换请求数据,节点未变,则标签页只请求一次数据,
            // 是否请求数据根据当前标签页类型数据长度是否为0判断。
            // 在节点变换时，将当前未显示标签页数据清空
            let id = this.treenodedata.id;
            if (mode === 1 && tableDatapub.length === 0) {
                // 标签切换到数据库资源
                publishedResourcesList({
                    pageNum: pubpageNum,
                    pageSize: pubpageSize,
                    id: id
                })
                .then(res => {
                    let { code, data } = res;
                    if (code === 200) {
                        this.tableDatapub = data.list;
                        this.Pubtotal = data.total;
                    }
                })
                .catch((err) => {
                    this.$message.error(err.message);
                });
            }

            if (mode === 2 && fileDataPub.length === 0) {
                // 请求已发布文件资源数据
                this.getPublishedFile();
            }
        },
        /**
         * 当下拉选框发生变化的时候，会去接口请求相应的数据
         */
        onchange(val) {
            // 设置默认值后，打开第一次会执行
            this.defaultvalue = val;
            this.treeClicked = false;

            // 请求树的数据
            getCatalogueInfoByParam({
                'themeTypeId': val
            }).then(res => {
                if (res.code === 200) {
                    this.treesdata = res.data;
                }
            });
        },
        /**
         * 当点击弹窗右上角关闭按钮的时候
         */
        closebtn() {
            this.modalvisible = false;
            // 点击关闭按钮后，也需要清楚之前所选的数据
            this.filterKey = '';                // 文件搜索
            this.pubFileIds = [];               // 需要发布的文件id
            this.fileUnPageNum = 1;             // 未发布文件当前页码

            this.input5 = '';                   // 数据库资源搜索       
            this.unpubPageNum = 1;              // 当前页
            this.currentExpandId = [];          // 当前展开行id
            this.checkedIds = {};               // 需要发布的数据库资源id

            if (this.resourceMode === 1) {
                this.tableDataUnpub.forEach(row => {
                    this.$refs.untable.toggleRowSelection(row, false);
                });
            } else {
                this.fileDataUnpub.forEach(row => {
                    this.$refs.fileUnpub.toggleRowSelection(row, false);
                });
            }

            this.fileDataUnpub = [];            // 未发布文件列表
            this.tableDataUnpub = [];           // 未发布数据库资源列表
        },
        /**
         * 当弹框未发布资源页码发生变化的时候
         */
        modalCurrentChange(val) {
            this.unpubpageNum = val;

            // 未发布资源
            unPublishResourcesList({
                pageNum: this.unpubpageNum,
                pageSize: this.unpubpageSize,
                id: this.treenodedata.id,
                creator: this.userInfo.id
            }).then(res => {
                if (res.code === 200) {
                    this.tableDataUnpub = res.data.list;
                    this.loadingModal = false;
                }
            });
        },
        /**
         * 当弹框未发布资源每页显示条数发生变化的时候
         */
        modalSizeChange(val) {
            this.unpubpageSize = val;
            // 清除已选id
            this.checkedIds = {};       // 清除已选id
            this.currentExpandId = [];
            
            // 未发布资源
            unPublishResourcesList({
                pageNum: this.unpubpageNum,
                pageSize: this.unpubpageSize,
                id: this.treenodedata.id,
                creator: this.userInfo.id
            }).then(res => {
                if (res.code === 200) {
                    this.tableDataUnpub = res.data.list;
                    this.loadingModal = false;
                }
            });
        },
        /**
         * 当页面每页显示条数发生变化的时候
         */
        handelSizeChange(val) {
            this.pubpageSize = val;
            // 已发布资源
            publishedResourcesList({
                pageNum: this.pubpageNum,
                pageSize: this.pubpageSize,
                id: this.treenodedata.id
            }).then(res => {
                if (res.code === 200) {
                    this.tableDatapub = res.data.list;
                    this.Pubtotal = res.data.total;
                }
            });
        },
        /**
         * 当页面页码发生变化的时候
         */
        handelCurrentChange(val) {
            this.pubpageNum = val;
            // 已发布资源
            publishedResourcesList({
                pageNum: this.pubpageNum,
                pageSize: this.pubpageSize,
                id: this.treenodedata.id
            }).then(res => {
                if (res.code === 200) {
                    this.tableDatapub = res.data.list;
                    this.Pubtotal = res.data.total;
                }
            });
        },
        /**
         * 发布文件页码改变
         */
        changePubFileNum(num) {
            this.filePageNum = num;
            this.getPublishedFile();
        },
        /**
         * 发布文件pageSize改变
         */
        changePubFileSize(size) {
            this.filePageSize = size;
            this.getPublishedFile();
        },
        /**
         * 未发布文件页面改变
         */
        chgUnpubFileNum(num) {
            this.fileUnPageNum = num;
            this.checkedIds = {};       // 清除已选id
            this.currentExpandId = [];
            this.getUnpubFile();
        },
        /**
         *
         */
        chgUnpubFileSize(size) {
            this.fileUnPageSize = size;
            this.getUnpubFile();
        },
        // 当下拉选框选中状态发生变化的时候
        handleSelectionChange(val) {
            // console.log(val)
        },
        // 当树选择状态发生变化的时候
        checkChange(data, state, child) {
            // console.log('handelchange:', data, state, child);
        },
        // 当树的节点被点击的时候
        nodeclick(data, state, child) {
            let { treenodedata } = this;
            
            // 重复点击相同节点
            if (treenodedata !== null && treenodedata.id === data.id) {
                return;
            }

            // 标识是否选中节点
            this.treeClicked = true;
            // 获取所有的标签
            getbqAll(data.id).then(res => {
                if (res.code === 200) {
                    this.tagList = res.data.tagList;
                } else {
                    this.tagList = [];
                }
            });
            // 获取所有的标签
            for (var t = 0; t < this.treesdata.length; t++) {
                if (this.treesdata[t].id === data.rootNode) {
                    this.formz.gjd = this.treesdata[t].catalogueName;
                }
            }

            // 获取所有的标签
            if (data.status === 'T') {
                this.formz.fbzt = '已发布';
            } else if (data.status === 'F') {
                this.formz.fbzt = '未发布';
            }
            // 将所有的值传递给组件
            this.formz.mlmc = data.catalogueName;
            this.formz.xxzy = data.informativeAbstract;
            this.formz.ztlx = data.themeTypeId;
            this.formz.sjjd = state.parent.data.catalogueName;
            this.formz.tgdw = data.supplyUnit;
            this.formz.qlj = data.path;
            this.treenodedata = data;
            /**
             * 点击之后判断节点时否被点中，点中后让新增按钮高亮，判断是否发布，已发布，发布按钮不高亮,此功能暂时不用
             * 判断当前是请求数据库资源还是文件资源
             */
            this.disabled = false;
            if (this.resourceMode === 1) {
                // 将另一标签页数据清空
                this.fileDataPub = [];
                this.filePageNum = 1;
                
                this.pubpageNum = 1;

                // 请求已发布数据库资源
                publishedResourcesList({
                    pageNum: this.pubpageNum,
                    pageSize: this.pubpageSize,
                    id: this.treenodedata.id
                }).then(res => {
                    if (res.code === 200) {
                        this.tableDatapub = res.data.list;
                        this.Pubtotal = res.data.total;
                    }
                });
            } else {
                // 将另一标签页数据清空
                this.tableDatapub = [];
                this.pubpageNum = 1;

                // 请求已发布文件资源
                this.filePageNum = 1;
                this.getPublishedFile();
            }
        },
        /**
         * 当表格展开时候的事件
         * 此时需要判断内部是否有选中，判断依据id是否在this.checkedIds[resourcesId]中
         */
        expandtable(row, expanded) {
            let id = row.resourcesId;

            // 添加展开行的id
            if (!expanded) {
                this.currentExpandId = [];
                return;
            } else {
                this.currentExpandId = [id];
            }
                
            // 展开判断是否需要选中子表
            let ids = this.checkedIds;
            // 没有选中id
            if (!(id in ids) || !ids[id] || ids[id].length === 0) {
                return;
            }

            // 有选中id,获取子表实例,遍历ids[id],选中当前行
            let unpubTableData = this.tableDataUnpub;

            // 延迟获取子表实例,等子表挂载到DOM后.
            setTimeout(() => {
                let vSubtable = this.$refs[id];
                // 获取当前行下的子表数据
                unpubTableData.forEach(row => {
                    if (id !== row.resourcesId) {
                        return;
                    }

                    // 循环子表数据
                    row.tableColumnInfoList.forEach(subRow => {
                        if (ids[id].includes(subRow.columId)) {
                            vSubtable.toggleRowSelection(subRow, true);
                        }
                    });
                });
            }, 0);
        },
        /**
         * 当点击发布按钮的时候
         */
        okbtn() {
            let catalogueId = this.treenodedata.id;

            // 发布文件资源
            if (this.resourceMode === 2) {
                let ids = this.pubFileIds;
                if (ids.length === 0) {
                    this.$alert('请选择需要发布的内容', '提示', {
                        confirmButtonText: '确定'
                    });
                    return;
                }

                let param = this.pubFileIds.map(resourcesFileId => {
                    return { catalogueId, resourcesFileId };
                });

                this.btnloading = true;
                batchSaveFile(param)
                    .then(res => {
                        this.btnloading = false;
                        if (res.code === 200) {
                            this.modalvisible = false;
                            this.getPublishedFile();
                            return;
                        }

                        this.$message({
                            type: 'warning',
                            message: res.msg
                        });
                    })
                    .catch(() => {
                        this.$message.error('保存文件资源失败，请重试。');
                    });
                return;
            }

            let checkedIds = this.checkedIds;
            let params = [];
            let keys = Object.keys(checkedIds);
            // 没有选择发布内容
            if (keys.length === 0 || checkedIds[keys[0]].length === 0) {
                this.$alert('请选择需要发布的内容', '提示', {
                    confirmButtonText: '确定'
                });
                return;
            }

            keys.forEach(resourcesId => {
                checkedIds[resourcesId].forEach(resourcesColumnId => {
                    let item = {
                        catalogueId,
                        resourcesId,
                        resourcesColumnId
                    };

                    params.push(item);
                });
            });

            this.btnloading = true;
            batchSave(params)
                .then(res => {
                    this.btnloading = false;
                    if (res.code === 200) {
                        this.modalvisible = false;

                        return publishedResourcesList({
                            pageNum: this.pubpageNum,
                            pageSize: this.pubpageSize,
                            id: this.treenodedata.id
                        });
                    }

                    return res;
                })
                .then(res => {
                    if (res.code === 200) {
                        this.tableDatapub = res.data.list;
                        this.Pubtotal = res.data.total;
                    }
                })
                .catch(() => {
                    this.$message.error('保存数据库资源失败，请重试。');
                });
        },
        /**
         * 当发布新资源的时候
         */
        addnewsource() {
            let userId = this.userInfo.id;

            if (this.resourceMode === 1) {
                this.title = titles[0];
                // 请求未发布数据库资源
                unPublishResourcesList({
                    pageNum: this.unpubpageNum,
                    pageSize: this.unpubpageSize,
                    id: this.treenodedata.id,
                    creator: userId
                }).then(res => {
                    if (res.code === 200) {
                        this.tableDataUnpub = res.data.list;
                        this.loadingModal = false;
                        this.Unpubtotal = res.data.total;
                    }
                });
            } else {
                this.title = titles[1];
                this.getUnpubFile();
            }
            
            this.modalvisible = true;
        },
        // 当点击弹框中的搜索按钮的时候
        search() {
            if (this.select === '') {
                // 这里使用eleme-alert
                this.$alert('请选择要查询项！', '提示', {
                    confirmButtonText: '确定',
                });

                return;
            }

            let param = {
                pageNum: this.unpubpageNum,
                pageSize: this.unpubpageSize,
                id: this.treenodedata.id,
                creator: this.userInfo.id
            };

            if (this.select === 'businessTableName') {
                param.businessTableName = this.input5;
            } else {
                param.businessColumnName = this.input5;
            }

            this.loadingModal = true;
            // 过滤数据库资源
            unPublishResourcesList(param)
                .then(res => {
                    this.loadingModal = false;
                    if (res.code === 200) {
                        this.tableDataUnpub = res.data.list;
                        this.Unpubtotal = res.data.total;
                        this.unpubpageNum = 1;
                    }
                });
        },
        filterUnpubFile() {
            let businessFileName = this.filterKey;
            if (!businessFileName) {
                return;
            }

            this.getUnpubFile({businessFileName});
        },
        clicktips() {
            this.tips = false;
        }
    },
    mounted() {
        // 首先从sessionstory里读取用户信息
        this.userInfo = getSessionStore('userInfo');
        // 获取下拉框数据
        getThemeList().then(res => {
            this.selectoptions = res.data;
        });
    },
}
</script>
<style lang="scss">
.zybfwrap {
    height: 100%;
    .zyfb {
        // 需要的时候设置最小宽度
        // min-width: 1030px;
        height: 100%;
        overflow: hidden;
        .left {
            float: left;
            width: 300px;
            height: 99%;
        }
        .right {
            float: left;
            width: -moz-calc(100% - 300px);
            width: -webkit-calc(100% - 300px);
            width: calc(100% - 300px);
            height: 100%;
            overflow: auto;
            .top {
                margin-top: 28px;
                margin-left: 3%;
                width: 94%;
                height: 360px;
                box-sizing: border-box;
                -moz-box-sizing: border-box;
                /* Firefox */
                -webkit-box-sizing: border-box;
                /* Safari */
                border: 1px solid #0d152f;
                -webkit-box-shadow: inset 0 0 38px rgba(53, 215, 255, 0.3);
                -moz-box-shadow: inset 0 0 38px rgba(53, 215, 255, 0.3);
                box-shadow: inset 0 0 38px rgba(53, 215, 255, 0.3);
                .el-select .el-input.is-disabled .el-input__inner:hover {
                    border-color: #1C8EB2;
                }
                .tagclass {
                    padding: 0 18px;
                    float: left;
                    font-size: 14px;
                    margin-left: 40px;
                }
            }
        }
        .bottom {
            margin-top: 48px;
            margin-bottom: 26px;
            margin-left: 3%;
            height: 360px;
            width: 94%;
            padding: 30px 20px 0;
            box-sizing: border-box;
            -moz-box-sizing: border-box;
            /* Firefox */
            -webkit-box-sizing: border-box;
            /* Safari */
            border: 1px solid #0d152f;
            -webkit-box-shadow: inset 0 0 38px rgba(53, 215, 255, 0.3);
            -moz-box-shadow: inset 0 0 38px rgba(53, 215, 255, 0.3);
            box-shadow: inset 0 0 38px rgba(53, 215, 255, 0.3);

            .tab-pane {
                padding: 20px 0 0;
            }

            .tabs {
                margin: -68px 0 0 -20px;
                p {
                    width: 163px;
                    height: 33px;
                    line-height: 33px;
                    display: inline-block;
                    text-align: center;
                    font-size:16px;
                    color:#00BBEC;
                    margin: 5px 0;
                    cursor: pointer;
                    background: center center no-repeat;
                    background-size: 100% 100%;
                    
                    &.tab-left {
                        background-image: url('../../assets/img/sourcePub/tab_left.png');
                    }

                    &.tab-right {
                        background-image: url('../../assets/img/sourcePub/tab_right.png');
                    }
                    &.active {
                        background-image: url('../../assets/img/sourcePub/tab_bg.png');
                    }

                    & + p {
                        margin-left: -17px;
                    }
                }
            }
        }
    }
    .issue-body {
        padding: 20px 20px 0;

        .el-input__inner::-webkit-input-placeholder {
            color: #24caf3;
        }
        .el-input__inner:-ms-input-placeholder {
            color: #24caf3;
        }
        .el-input__inner::placeholder {
            color: #24caf3;
        }
        .tablestyle {
            width: 100%;
            height: calc(100% - 90px);
            height: -moz-calc(100% - 90px);
            height: -webkit-calc(100% - 90px);
            margin: 10px 0 0;
            .el-table__expand-icon {
                color: #20AFD5;
            }
            .el-table__expanded-cell:hover {
                border: 0px;
                border-bottom: 1px dashed #0E2A45;
                background-color: rgba(73, 210, 247, 0)!important;
            }
            .el-table__expanded-cell {
                background-color: transparent;
                box-shadow: inset 0 0 0 #0E2A45;
            }
            .el-table__body-wrapper {
                .el-table__header-wrapper {
                    .el-table__header {
                        th {
                            height: 40px;
                            background-color: #171f3b;
                            > div {
                                background-color: #171f3b;
                            }
                        }
                    }
                }
                .el-table__body-wrapper {
                    td {
                        height: 40px;
                    }
                }
            }
        }
        .el-table--enable-row-hover .el-table__body tr:hover {
            box-shadow: inset 0 0 17px 0 rgba(73, 210, 247, 0);
        }
        .el-input-group__append,
        .el-input-group__prepend {
            background-color: transparent;
            color: rgb(36, 202, 243);
        }
        .el-select .el-input .el-input__icon {
            color: rgb(0, 187, 236);
        }
        .el-input-group__prepend .el-select .el-input__inner {
            color: #24caf3;
        }
        .jdbpagination {
            margin-top: 10px;
            .el-pagination {
                text-align: center;
            }
            .el-pager li.active {
                background-color: #075174;
            }
        }
    }
    .tablestyle {
        width: 100%;
        height: calc(100% - 90px);
        height: -moz-calc(100% - 90px);
        height: -webkit-calc(100% - 90px);
        .el-table__expand-icon {
            color: #20AFD5;
        }
        .el-table__expanded-cell:hover {
            border: 0px;
            border-bottom: 1px dashed #0E2A45;
            background-color: rgba(73, 210, 247, 0)!important;
        }
        .el-table__expanded-cell {
            background-color: transparent;
            box-shadow: inset 0 0 0 #0E2A45;
        }
        > .el-table__body-wrapper {
            > .el-table__body {
                width: calc(100% - 10px)!important;
            }
        }
        .el-table__body-wrapper {
            .el-table__header-wrapper {
                .el-table__header {
                    th {
                        height: 40px;
                        background-color: #171f3b;
                        > div {
                            background-color: #171f3b;
                        }
                    }
                }
            }
            .el-table__body-wrapper {
                td {
                    height: 40px;
                }
            }
        }
    }
    .el-table--enable-row-hover .el-table__body tr:hover {
        box-shadow: inset 0 0 17px 0 rgba(73, 210, 247, 0);
    }
    .pageangbtn.page_wrap {
        margin-top: 8px;
        position: relative;
        text-align: center;
        .pagination {
            text-align: center;
            display: inline-block;
        }
        .newsourcebtn {
            color: #2FC0EA;
            position: absolute;
            right: 0;
            bottom: 0;
        }
    }
}

/*给弹出框设置全局样式*/

.el-message-box__wrapper {
    .el-message-box {
        background: url(../../assets/img/modal/tcbgzz.png);
        background-size: 100% 100%;
        background-color: rgba(12, 38, 66, 0.96);
        // width: 354px;
        .el-button {
            color: #fff;
            padding: 0;
            width: 60px;
            height: 25px;
            background: #0C1A34;
            border-radius: 0px;
            border-color: #0C1A34;
        }
        .el-button:hover {
            border-color: #05bde6;
            color: #fff;
            box-shadow: inset 0 0 10px 0 rgba(98, 208, 248, 0.42);
        }
        .el-message-box__title {
            color: #24caf3;
        }
        .el-message-box__content {
            color: #02a6d4;
        }
        .el-message-box__close {
            color: #24caf3;
        }
    }
}
</style>

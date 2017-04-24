<template>
    <div class="tree-wrapper">
        <div class="top-select clearfix">
            <el-select v-model="value" style="width:150px;float:left;" placeholder="请选择" @change="selectChange">
                <el-option v-for="item in options" :label="item.themeName" :value="item.id" :key="item.id"></el-option>
            </el-select>
            <div class="btn-modal-group btn-icons">
                <a :class="newbtn ? 'xzactive' : 'xz'" href="javascript:;" title="增加" @click="newBtns">增加</a>
                <a :class="pubbtn ? 'fbactive' : 'fb'" href="javascript:;" title="发布" @click="pubBtns">发布</a>
            </div>
        </div>
        <div class="search-bar">
            <el-input type="text" placeholder="请输入内容" v-model="filterText">
                <el-select slot="prepend" v-model="selectType" placeholder="请选择">
                    <el-option v-for="item in selectTypes" :label="item.label" :value="item.id" :key="item.id">
                    </el-option>
                </el-select>
                <el-button slot="append" icon="search" @click="goSearch"></el-button>
            </el-input>
        </div>
        <div class="tree-inner">
            <el-tree
                :data="treedata"
                node-key="id"
                :props="defaultProps"
                default-expand-all
                ref="tree2"
                :filter-node-method="filterNode"
                :show-checkbox="showcheckbox"
                :highlight-current="highlight"
                :expand-on-click-node="false"
                @check-change="handleChange"
                @node-click="clickNode"></el-tree>
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {
                defaultProps: {
                    children: 'childList',
                    label: 'catalogueName'
                },
                filterText: '',
                value: '',
                catalogueCon: '',
                selectType: 0,
                disabled: false,
                selectTypes: [{
                    label: '目录',
                    id: 0
                }, {
                    label: '标签',
                    id: 1
                }]
            }
        },
        props: ['options', 'treedata', 'selectvalue', 'highlight', 'showcheckbox', 'newbtn', 'pubbtn'],
        methods: {
            selectChange(val) {
                this.$emit('select-change', val);
            },
            filterNode(value, data) {
                if (!value) {
                    return true;
                }

                return data.catalogueName.indexOf(value) !== -1;
            },
            handleChange(data, state, jie) {
                this.$emit('checked-change', data, state, jie);
            },
            clickNode(propOfData, selfOfNodes, selfComponent) {
                this.$emit('clicked-node', propOfData, selfOfNodes, selfComponent);
            },
            newBtns() {
                this.$emit('new-btn', true);
            },
            pubBtns() {
                this.$emit('pub-btn', true);
            },
            goSearch() {
                this.$refs.tree2.filter(this.filterText);
            }
        },
        mounted() {
            this.value = this.selectvalue;
        }
}
</script>
<style lang="scss">
::-webkit-input-placeholder { 
    color: #05bde6 !important; 
} 
.tree-wrapper {
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;   

    /*input reset start */
    .el-input i.el-input__icon {
        color: #20AFD5;
        &:hover + input.el-input__inner {
            border-color: #05bde6;
        }
    }
    input.el-input__inner {
        background: transparent;
        border-color: #05bde6;
        color: #05bde6 !important;

        &:hover {
            border-color: #05bde6;
        }
    }

    /*input reset end */
    /* select reset start*/
    .el-input-group__prepend,
    .el-input-group__append {
        background: transparent;
        border-color: #05bde6;
    }
    .el-input-group__append {
        color: #05bde6;
    }
    .el-input-group__prepend .el-input {
        .el-icon-caret-top {
            width: 20px;
        }
        .el-input__inner {
            width: 60px;
            padding-right: 15px;
        }
    }
    /* select reset end*/
    .tree-inner {
        overflow: auto;
        height: calc(100% - 86px);
    }
    .el-tree {
        background: transparent;
        border-color: transparent;
        text-align: left;
        .el-tree-node__expand-icon {
            border-left-color: #20AFD5;
        }
        .el-tree-node__content:hover {
            background: transparent;
        }
    }
    .el-tree-node.is-current > .el-tree-node__content {
        background: rgba(98, 208, 248, 0.3);
    }
    .el-tree-node > .el-tree-node__children {
        overflow: initial;
    }
    .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
        width: 100%;
        background: rgba(98, 208, 248, 0.3);
    }
}

.el-select-dropdown {
    background: #0d405e !important;
    border-color: #0d405e !important;
    li.selected {
        background: rgba(12, 38, 66, 0.8) !important;
    }
    li.hover,
    li.selected.hover {
        background: rgba(98, 208, 248, 0.3) !important;
    }
}

.top-select {
    text-align: left;
}

.search-bar,
.top-select {
    margin: 0 0 10px;
}

.btn-modal-group {
    vertical-align: bottom;
    float: right;
    a {
        text-indent: -99px;
        overflow: hidden;
        display: inline-block;
        background-repeat: no-repeat;
        width: 24px;
        height: 24px;
        margin-top: 8px;
    }
    .xz {
        background: url('../../assets/img/sourcePub/xzfalse.png');
        margin-right: 5px;
    }
    .xzactive {
        background: url('../../assets/img/sourcePub/xztrue.png');
        margin-right: 5px;
    }
    .fb {
        background: url('../../assets/img/sourcePub/fbfalse.png');
    }
    .fbactive {
        background: url('../../assets/img/sourcePub/fbtrue.png');
    }
}
</style>

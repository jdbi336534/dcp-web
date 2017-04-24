<template>
    <div class="dcp-dialog" :id="id">
        <el-dialog v-model="isShow" :title="title" :close-on-press-escape="false" :close-on-click-modal="false" custom-class="dialog-custom" :show-close="true">
            <slot name="dialog_body"></slot>
            <img class="corner c1" src="../../assets/img/corner.png" alt="" />
            <img class="corner c2" src="../../assets/img/corner.png" alt="" />
            <img class="corner c3" src="../../assets/img/corner.png" alt="" />
            <img class="corner c4" src="../../assets/img/corner.png" alt="" />
            <span slot="footer" class="dialog-footer">
            <slot name="dialog_footer"></slot>
        </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
            return {
                isShow: false,
            }
        },
        mounted() {
            $('#' + this.id).find('.dialog-custom').css({
                'width': this.width,
                'height': this.height < 200 ? 200 : this.height,
                'top': '50%',
                'margin-top': -(this.height / 2),
            });
        },
        props: {
            id: {
                type: String,
                default: 'dialog_' + (new Date()).getTime()
            },
            title: {
                type: String,
                default: ''
            },
            width: {
                type: Number,
                default: 1300
            },
            height: {
                type: Number,
                default: 600
            }
        },
        watch: {
            isShow(val) {
                if (!val) {
                    this.clear();
                }
            }
        },
        methods: {
            open() {
                this.isShow = true;
            },
            close() {
                this.isShow = false;
            },
            clear() {
                this.$emit('on-close');
            }
        }
}
</script>
<style lang="scss">
.dcp-dialog {
    .dialog-custom {
        font-size: 18px;
        position: relative;
        background: #0d152f;
        box-shadow: none;
        border: 1px solid #127a9e;
        width: 1300px;
        height: 600px;
        .el-dialog__header {
            height: 20px;
            text-align: center;
            padding: 10px 10px;
            .el-dialog__title {
                color: #01ABDA;
            }
            .el-dialog__headerbtn {
                .el-dialog__close {
                    color: #01ABDA;
                }
            }
        }
        .el-dialog__body {
            margin-top: 10px;
            padding: 0;
            color: #01ABDA;
            height: calc(100% - 20px - 20px - 35px - 25px);
            overflow-x: auto;
        }
        .el-dialog__footer {
            padding: 0 20px;
            text-align: right;
            height: 35px;
            box-sizing: content-box;
        }
        .corner {
            position: absolute;
            &.c1 {
                top: -8px;
                left: -8px;
                transform: rotate(-90deg);
            }
            &.c2 {
                top: -8px;
                right: -8px;
            }
            &.c3 {
                left: -8px;
                bottom: -8px;
                transform: rotate(180deg);
            }
            &.c4 {
                right: -8px;
                bottom: -8px;
                transform: rotate(90deg);
            }
        }
    }
}
</style>

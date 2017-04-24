<template>
    <!--  <div class="modleBox jz auditlogging-box hide"> -->
    <modal-box :visible="auditloggingmodalvisible" titlename="审核记录" btnname="" @click-close="Offauditloggingmodal" class='auditloggingbox'>
        <div slot="jdb" class="auditlogging jz">
            <div class="titleshStatus">
                <ul>
                    <li>经办人</li>
                    <li>审核状态</li>
                    <li>审核时间</li>
                    <li>审核意见</li>
                </ul>
            </div>
            <div class="audit-status-box" id="shStatusBoxz">
                <div class="datasourceApproveStatuslist">
                    <div class="xhzt" v-for="(item,index) in datasourceApproveStatusData">
                        <dl>
                            <dd>{{item.realName}}</dd>
                        </dl>
                        <dl>
                            <dd>{{item.OPERATION_AUDIT_STATE}}</dd>
                        </dl>
                        <dl>
                            <dd>{{item.ADD_DATE}}</dd>
                        </dl>
                        <dl class="shyj">
                            <dd>{{item.OPINION_AUDIT}}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </modal-box>
    <!--  </div> -->
</template>
<script>
import modalBox from '../common/ModalBox';
export default {
    data() {
            return {
                datasourceApproveStatusData: null,
                auditloggingmodalvisible: false,
            }
        },
        beforeUpdate() {
            //  console.info('beforeUpdate');
        },
        updated() {
            //  console.info('updated');
        },
        created() {

        },
        mounted() {

        },

        computed: {

        },
        components: {
            modalBox,
        },
        methods: {
            Showauditloggingbox() {
                // $('.auditlogging-box').removeClass('hide');
                this.auditloggingmodalvisible = true;
            },
            Showauditloggingdata(argStatusData) {
                this.datasourceApproveStatusData = argStatusData;
            },
            OffStatus() {
                // $('.auditlogging-box').addClass('hide');
                this.auditloggingmodalvisible = false;
            },
            Offauditloggingmodal() {
                this.auditloggingmodalvisible = false;
            },
        }
}
</script>
<style lang="scss">
.hide {
    display: none;
}

.auditlogging {
    width: 1000px;
    height: 580px;
    font-size: 14px;
    background-size: 100% 100%;
    background-color: rgba(12, 38, 66, 1);
    color: rgba(80, 213, 246, 1);
    overflow: hidden;
    .offshStatus {
        position: absolute;
        width: 20px;
        height: 20px;
        top: 20px;
        right: 20px;
        text-align: center;
    }
    .msgStatus {
        position: absolute;
        width: 100px;
        height: 20px;
        top: 20px;
        right: 450px;
        text-align: center;
        font-size: 18px;
    }
    .titleshStatus {
        color: rgba(0, 187, 236, 1);
        padding-left: 10px;
        width: 902px;
        height: 30px;
        background: #00172F;
        border-radius: 1px;
        margin: 10px 0 0 47px;
        ul {
            margin: 0;
            padding: 0;
            width: 902px;
            height: 30px;
            li {
                float: left;
                width: 147px;
                line-height: 30px;
                margin: 0;
                padding: 0;
                text-indent: 1em;
            }
            li:nth-child(4) {
                width: 461px;
            }
        }
    }
    .audit-status-box {
        position: relative;
        width: 912px;
        height: 408px;
        overflow: hidden;
        color: rgba(0, 187, 236, 1);
        margin-left: 47px;
    }
    .datasourceApproveStatuslist {
        width: 902px;
        height: 600px;
        padding-left: 10px;
        margin: 0;
    }
    .xhzt {
        width: 902px;
        height: 30px;
        float: left;
        padding: 0;
        margin: 0;
        border-bottom: 1px dashed rgba(28, 142, 178, .18);
    }
    dl {
        width: 147px;
        height: 30px;
        float: left;
        margin-top: 0;
        dt,
        dd {
            padding: 0;
            margin: 0;
            height: 30px;
            font-size: 12px;
            line-height: 30px;
            width: 147px;
            // border: 1px solid red;
            text-indent: 1em;
        }
    }
    .shyj {
        height: 30px;
        width: 461px;
        dt,
        dd {
            height: 30px;
            width: 461px;
            // border: 1px solid red;
        }
    }
}
</style>

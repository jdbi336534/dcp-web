<template>
    <div class="data-link-box">
        <!-- <div class="modleBox  data-testLink-modle jz hide"> -->
        <modal-box :visible="testLinkmodalvisible" titlename="" btnname="" @click-close="OfftestLinkmodal" class='testLinkbox'>
            <div slot="jdb" class="testLink jz">
                <p>是否测试连接</p>
                <ul>
                    <li v-on:click='testLinkOff' class="hand">取消</li>
                    <li v-on:click='testLinkOk' class="hand" v-loading='loadingbtntest'>确认</li>
                </ul>
            </div>
        </modal-box>
        <!-- </div> -->
        <!-- <div class="modleBox  LinkOkfg jz hide"> -->
        <modal-box :visible="linkokmodalvisible" titlename="" btnname="" @click-close="Offlinkokmodal" class='linkokbox'>
            <div slot="jdb" class="LinkOk jz">
                <p class="jz linkokp">{{linkok}}</p>
                <!--  <ul>
                    <li v-on:click='LinkOkOk' :class="csShow ? 'hide':'show'" class="hand" v-loading='loadingbtnLinkOk'>确认</li>
                </ul> -->
            </div>
        </modal-box>
        <!-- </div> -->
    </div>
</template>
<script>
import modalBox from '../common/ModalBox';
import {
    testLink,
} from '../../assets/js/queryData';
export default {
    data() {
            return {
                testLinkmodalvisible: false,
                linkokmodalvisible: false,
                testLinkId: null,
                testLinkIndex: null,
                loadingbtntest: false,
                linkok: '测试中....',
                loadingbtnLinkOk: false,
                csShow: true,
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
            setTimeoutFunction(csfunction) {
                setTimeout(csfunction, 2000)
            },
            ShowtestLinkMoudle(linkId, LinkIndex) {
                // $('.data-testLink-modle').removeClass('hide');
                this.testLinkmodalvisible = true;
                this.testLinkId = linkId;
                this.testLinkIndex = LinkIndex;
            },
            testLinkOff() {
                // $('.data-testLink-modle').addClass('hide');
                this.testLinkmodalvisible = false;
                $('.data-testLink-modle p').html('是否测试连接')
                this.loadingbtntest = false;
            },
            OfftestLinkmodal() {
                this.testLinkmodalvisible = false;
                $('.data-testLink-modle p').html('是否测试连接')
                this.loadingbtntest = false;
            },
            testLinkOk() {
                var that = this;
                $('.data-testLink-modle').addClass('hide');
                $('.data-testLink-modle p').html('是否测试连接')
                this.linkokmodalvisible = true;
                // $('.LinkOkfg').removeClass('hide');
                this.loadingbtntest = true;
                testLink(this.testLinkId).then(res => {
                    console.log(res)
                    if (res.code === 200) {
                        this.csShow = false;
                        this.linkok = '连接成功';
                        this.loadingbtntest = false;
                    } else if (res.code === 300) {
                        $('.linkokp').addClass('morep');
                        this.linkok = res.data.msg;
                        this.$message.success(res.msg);
                    } else {
                        $('.linkokp').addClass('morep');
                        this.linkok = res.data.msg;
                        this.loadingbtntest = false;
                        // this.$alert('失败原因:' + res.msg, '获取数据失败！', {
                        //     confirmButtonText: '确定',
                        // });
                    }
                    // 延时自动消失
                    var setTimeoutCs = function() {
                        this.linkok = '测试中....';
                        this.csShow = true;
                        // $('.LinkOkfg').addClass('hide');
                        this.linkokmodalvisible = false;
                        this.loadingbtntest = false;
                    };
                    clearTimeout(that.setTimeoutFunction);
                    that.setTimeoutFunction(setTimeoutCs);
                });
            },
            // LinkOkOk() {
            //     this.linkok = '测试中....';
            //     this.csShow = true;
            //     // $('.LinkOkfg').addClass('hide');
            //     this.linkokmodalvisible = false;
            //     this.testLinkmodalvisible = false;
            //     $('.data-testLink-modle p').html('是否测试连接')
            //     this.loadingbtntest = false;
            // },
            Offlinkokmodal() {
                this.linkok = '测试中....';
                this.csShow = true;
                // $('.LinkOkfg').addClass('hide');
                this.linkokmodalvisible = false;
                this.testLinkmodalvisible = false;
                $('.data-testLink-modle p').html('是否测试连接')
                this.loadingbtntest = false;
            },
        }
}
</script>
<style lang="scss">
</style>

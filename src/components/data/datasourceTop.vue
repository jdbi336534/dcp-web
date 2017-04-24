<template>
    <div class="datasource-top">
        <div class="search-box">
            <input type="text" id="search" placeholder="请输入关键字" @keypress="presskey">
        </div>
    </div>
</template>
<script>
export default {
    data() {
            return {

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

        },
        methods: {
            openImport() {
                this.$emit('Importopen');
            },
            modalDataSource(val) {
                // 触发新增数据源事件
                this.$emit('openmodal', val);
            },
            presskey(e) {
                if (e.keyCode === 13) {
                    this.$emit('Search', e.target.value);
                }
            },
        }
}
</script>
<style lang="scss">
@import '../../assets/css/data/datasource-topbox.scss';
//当屏幕高度小于1366px的时候，改变top字体值
@media screen and (max-width: 1366px) {
    .datasource-top {
        .btn-group li {
            font-size: 12px;
        }
    }
}
</style>

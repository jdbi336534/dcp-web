<template>
    <div class="import_export">
        <ul class="btn-group-z">
            <slot name="btn_group"></slot>
        </ul>
    </div>
</template>
<style lang="scss" scoped>
.import_export {
    position: absolute;
    top: -7.4%;
    left: 8%;
    height: 6%;
    width: 30%;
    min-width: 300px;
    z-index: 999;
    .btn-group-z {
        height: 100%;
        width: 100%;
        &>div {
            height: 100%;
            button {
                outline: none;
                cursor: pointer;
                margin: 0 5px;
                color: rgba(0, 187, 236, 0.8);
                background: url("../../assets/img/btn-bg.png") no-repeat center center;
                background-size: 90% 100%;
                float: left;
                width: 40%;
                height: 100%;
                line-height: 1;
                border: 0;
                padding: 0;
                font-size: 16px;
                &:hover {
                    background-image: url("../../assets/img/btn-bg-on.png");
                }
                img {
                    display: inline-block;
                    vertical-align: middle;
                    width: 24px;
                    height: 22px;
                    margin-left: 5px;
                    &.a {
                        width: 37px;
                        height: 37px;
                        margin: 0;
                    }
                }
            }
        }
    }
}
</style>
<script>
</script>

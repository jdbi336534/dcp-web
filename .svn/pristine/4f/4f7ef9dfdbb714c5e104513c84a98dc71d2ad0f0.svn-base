<template>
    <div class="test-box">
        <div class="block">
            <span class="demonstration">默认</span>
            <el-date-picker v-model="value1" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
            </el-date-picker>
        </div>
    </div>
</template>
<style lang="scss">
.test-box {
    width: 100%;
    height: 100%;
}
</style>
<script>
export default {
    data() {
            return {
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                value1: '',
            }
        },
        methods: {

        }
}
</script>

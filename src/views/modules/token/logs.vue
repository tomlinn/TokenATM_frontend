<template>
    <div>
        <el-table :data="tableData" border style="width: 100%">
            <template slot="empty">
                <el-empty description="empty">
                    <span>empty~</span>
                </el-empty>
            </template>
            <el-table-column prop="id" label="Log id">
            </el-table-column>
            <el-table-column prop="userId" label="Student id">
            </el-table-column>
            <el-table-column prop="user_name" label="Student name">
            </el-table-column>
            <el-table-column label="operation name" prop="type">
            </el-table-column>
            <el-table-column prop="source" label="assignment id">
            </el-table-column>
            <el-table-column prop="timestamp" label="timestamp">
            </el-table-column>
            <el-table-column prop="tokenCount" label="used token">
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
        return {
            tableData: []
        };
    },
    computed: {},
    watch: {},
    methods: {
        getLogs() {
            this.$http({
                url: this.$http.adornUrl('/token/logs'),
                method: 'get',
            }).then(({ data }) => {
                this.tableData = data
            })
        }
    },
    created() { },
    mounted() { this.getLogs() },
    beforeCreated() { },
    beforeMounted() { },
    beforeUpdate() { },
    updated() { },
    beforeDestory() { },
    destoryed() { },
    actived() { }
}
</script>
<style lang='css' scoped>

</style>
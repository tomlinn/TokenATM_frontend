<template>
    <div>
        <el-input v-model="dataForm.student_id" placeholder="student id">
        </el-input>
        <el-button @click="getLogsById()">search</el-button>
        <el-table :data="tableData" border style="width: 100%">
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
            dataForm: {
                student_id: 0
            },
            tableData:[]
        };
    },
    computed: {},
    watch: {},
    methods: {  
        getLogsById() {
            this.$http({
                url: this.$http.adornUrl('/token/logs/'+this.dataForm.student_id),
                method: 'get',
            }).then(({ data }) => {
                this.tableData = data
            })
        }
    },
    created() { },
    mounted() { },
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
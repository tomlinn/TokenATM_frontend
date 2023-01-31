<template>
    <div>
        <div style="display:flex;padding-bottom: 10px;">
            <el-input v-model="dataForm.student_name" placeholder="Studnet Name ex. Bonald Dren" >
            </el-input>
            <el-button @click="getLogsById()" style="margin-left:10px">search</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%">
            <template slot="empty">
                <el-empty description="empty">
                    <span>empty~</span>
                </el-empty>
            </template>
            <el-table-column prop="id" label="Log id" width="80">
            </el-table-column>
            <el-table-column prop="userId" label="Student id" width="100">
            </el-table-column>
            <el-table-column prop="user_name" label="Student name" >
            </el-table-column>
            <el-table-column label="operation name" prop="type" width="130">
            </el-table-column>
            <el-table-column prop="source" label="assignment id" width= "280">
            </el-table-column>
            <el-table-column prop="timestamp" label="timestamp" width= "200">
            </el-table-column>
            <el-table-column prop="tokenCount" label="used token" width="120">
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
                student_name: "Bonald Dren"
            },
            tableData:[]
        };
    },
    computed: {},
    watch: {},
    methods: {  
        getLogsById() {
            this.$http({
                url: this.$http.adornUrl('/token/logs/'),
                method: 'post',
                data: this.$http.adornData({
                    'name': this.dataForm.student_name
              })
            }).then(({ data }) => {
                this.tableData = data.map(d => {
                    d.timestamp = new Date(d.timestamp).toLocaleString();
                    return d;
                });
            })
        },
        getLogs() {
            this.$http({
                url: this.$http.adornUrl('/token/logs'),
                method: 'get',
            }).then(({ data }) => {
                this.tableData = data.map(d => {
                    d.timestamp = new Date(d.timestamp).toLocaleString();
                    return d;
                });
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
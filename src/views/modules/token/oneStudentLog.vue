<template>
    <div>
        <el-button @click="getLogs()">Fresh </el-button> 
        <el-table :data="tableData" border style="width: 100%" >
            <template slot="empty">
                <el-empty description="empty">
                    <span>empty~</span>
                </el-empty>
            </template>

            <!-- <el-table-column prop="id" label="Log id">
            </el-table-column>
            <el-table-column prop="userId" label="Student id">
            </el-table-column>
            <el-table-column prop="user_name" label="Student name">
            </el-table-column> -->
            <el-table-column label="operation" prop="type" sortable  width="110">
            </el-table-column>
            <el-table-column prop="tokenCount" label="token count" sortable>
            </el-table-column>
            <el-table-column prop="source" label="assignment" sortable>
            </el-table-column>
            <el-table-column prop="timestamp" label="timestamp" sortable>
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
                url: this.$http.adornUrl('/token/logs/' +  this.$store.state.user.studentID),
                method: 'get',
            }).then(({ data }) => {
                console.log(data)
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
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
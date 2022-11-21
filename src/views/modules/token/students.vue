<template>
    <div>
        <el-button @click="sync()">manually sync</el-button>
        <el-table :data="tableData" border style="width: 100%">
            <template slot="empty">
                <el-empty description="empty">
                    <span>empty~</span>
                </el-empty>
            </template>
            <el-table-column prop="user_id" label="Student id" width="180">
            </el-table-column>
            <el-table-column prop="user_name" label="Student name" width="180">
            </el-table-column>
            <el-table-column prop="token_count" label="Student tokens" width="180">
            </el-table-column>
            <el-table-column prop="user_email" label="Student Email" width="180">
            </el-table-column>
            <el-table-column header-align="center" align="center" label="operation">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="updateToken(scope.row.user_id)">update token</el-button>
                    <el-dialog :visible.sync="dialogVisible">
                        set token ammount
                        <el-input v-model="dataForm.tokenNum" placeholder="token"></el-input>
                        <el-button @click="submit()">confirm
                        </el-button>
                    </el-dialog>
                </template>
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
            //            tableData: [{'user_id':"123", 'token_count':123, 'user_email':'123@gmail'},{'user_id':'345','token_count':123,user_email:'446@gmail.com'}],
            tableData: [],
            dialogVisible: false,
            dataForm: {
                tokenNum: 0,
                user_id: 0
            }
        };
    },
    computed: {},
    watch: {},
    methods: {
        getCourses() {
            this.$http({
                url: this.$http.adornUrl('/token/students'),
                method: 'get',

            }).then(({ data }) => {
                this.tableData = data
            })
        },
        submit() {
            this.$http({
                url: this.$http.adornUrl('/token/update'),
                method: 'post',
                params: this.$http.adornParams({
                    'studentId': this.dataForm.user_id,
                    'tokenNum': this.dataForm.tokenNum
                })
            }).then(({ data }) => {
                // if (data && data.code === 0) {
                //     this.$message({
                //         message: 'success',
                //         type: 'success',
                //         duration: 1500,
                //         onClose: () => {
                //             this.dialogVisible = false
                //             this.$emit('refreshDataList')
                //         }
                //     })
                // } else {
                //     this.$message.error(data.msg)
                // }
                this.dialogVisible=false
                this.getCourses()
            })
        },
        updateToken(student_id) {
            this.dialogVisible = true
            this.dataForm.user_id = student_id
        },
        sync() {
            this.$http({
                url: this.$http.adornUrl('/token/sync'),
                method: 'get'
            }).then(({ data }) => {
                alert("sync successfully")
            })
        }
    },
    created() { },
    mounted() {
        this.getCourses()
    },
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
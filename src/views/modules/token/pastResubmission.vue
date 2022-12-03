<template>
  <div>
    <el-button @click="getAssignmentStatus()">Fresh </el-button>  
    <el-table
      :data="tableData|forStatus"
      style="width: 100%">
      <template slot="empty">
                <el-empty description="empty">
                    <span>empty~</span>
                </el-empty>
            </template>
      <el-table-column
        prop="name"
        label="Assignment Name"
        width="150">
      </el-table-column>
      <el-table-column
        prop="grade"
        label="Grade"
        width="150">
      </el-table-column>
      <el-table-column
        prop="maxGrade"
        label="Max Grade"
        width="150">
      </el-table-column>
      <el-table-column
        prop="status"
        label="status"
        width="150">
      </el-table-column>
      <el-table-column
        prop="token_required"
        label="Token Required"
        width="150">
      </el-table-column>
    </el-table>
  </div>
  </template>

  <script>
    export default {
      data() {
        return {
          tableData: []
        }
      },
      filters: {
		    forStatus(listData){
		        return listData.filter(function (item) {
		            if(item.status == "requested"){
		                return item;
		            }
		        })
		    }
		},
      methods: {
      getAssignmentStatus() {
        this.$http({
          url: this.$http.adornUrl('/token/assignment_status/' + this.$store.state.user.studentID),
          method: 'get',
  
        }).then(({ data }) => {
          console.log(data)
          this.tableData = data
        })
      }
    },
    mounted() { this.getAssignmentStatus()
    },
    }
  </script>
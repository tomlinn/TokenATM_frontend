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
      <el-table-column header-align="center" align="left" width="150" label="Undo">
            <template slot-scope="scope">
            <el-button  type="text" size="small" @click="cancel(scope.row, scope.$index)"
              >Undo resubmission</el-button>
            </template>
          </el-table-column>
    </el-table>
  </div>
  </template>

  <script>
    export default {
      data() {
        return {
          tableData: [],
          userId: this.$store.state.user.studentID,
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
      cancel(data, index) {
          this.$confirm('Do you want a resubmission?', 'Alert', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'warning'
        }).then(() => {
        //to do 
          console.log('studentid', this.userId, 'assignment_id', data.assignment_id,
                'token_count', data.token_required,)
          this.$http({
          url: this.$http.adornUrl('/token/cancel_token/' + this.userId ),
          method: 'delete',
          data: this.$http.adornData({
                'assignment_id': data.assignment_id,
                'token_count': data.token_required,
              })
        }).then((response)=>{
          // console.log(response.data)
          if (response.data.assignment_id != "failed")
          {
            data.status = "submitted"
          // this.$set(this.tableData,index,row)
          // console.log(data.token_required)
           this.tokenNumber = this.tokenNumber - data.token_required,
           window.open('https:\\canvas.instructure.com/courses/3737737/assignments/'+ data.resubmission_id, '_blank'),
           this.$message({
            type: 'success',
            message: 'get a resubmission link!'
          })
          }
          else{
            this.$message({
            type: 'info',
            message: response.data.message
          });     
          }
        })
      }).catch((e) => {
          console.log(e)
          this.$message({
            type: 'info',
            message: 'Cancel'
          });          
        });
    },
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
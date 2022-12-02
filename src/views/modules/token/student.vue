<template> 
    <div>
      <el-row>
      <el-button size="medium">Total Token: {{ tokenNumber }}</el-button>
       <!-- <el-button type="warning" @click:this.$router.push()> check details</el-button> -->
      <el-button type="info" icon="el-icon-message" circle @click="contact"></el-button>
    </el-row>  
        <div class="form-group">
      <el-table :data="tableData | forStatus" style="width: 100%">
        <template slot="empty">
                <el-empty description="empty">
                    <span>empty~</span>
                </el-empty>
            </template>
        <el-table-column prop="name" label="Assignment Name" width="150">
      </el-table-column>
        <el-table-column prop="grade" label="Grade" width="150">
      </el-table-column>
        <el-table-column prop="maxGrade" label="Max Grade" width="150">
      </el-table-column>
        <el-table-column prop="status" label="status" width="150">
      </el-table-column>
        <el-table-column prop="token_required" label="Token Required" width="150">
      </el-table-column>
        <el-table-column prop="deadline" label="Deadline" width="150">
      </el-table-column>
        <el-table-column header-align="center" align="left" width="150" label="Resubmit">
            <template slot-scope="scope">
            <el-button  type="text" size="small" @click="open(scope.row, scope.$index)"
              :disabled="scope.row.token_required > tokenNumber ||  scope.row.grade == scope.row.maxGrade ||scope.row.status == 'overdue' ">request resubmission</el-button>
            </template>
          </el-table-column>
    </el-table>
        </div>
    
    </div>
    
      </template>
    
      <script>
import { watch } from 'fs';

        export default {
          data() {
            return {
              tableData: [],
              tokenNumber: 0,
              userId: this.$store.state.user.studentID,
            }
          },
        filters: {
      forStatus(tableData) {
              return tableData.filter(function (item) {
          if (item.status == "none" || item.status == "overdue") {
                    return item;
                  }
              })
          }
		},
          methods: {
    getTokenNumber() {
              this.$http({
        url: this.$http.adornUrl('/token/tokens/' + this.userId),
            method: 'get',
          }).then(({ data }) => {
            console.log("total number", data)
            this.tokenNumber = data.token_count
          }).catch((e) => {
          console.log(e)        
        });
            },
           contact() {
        this.$alert('If you have 3 tokens, contact teaching assistants teachingAssistant@uci.edu', 'Message', {
          confirmButtonText: 'Done',
          callback: action => {
            this.$message({
              type: 'info',
            message: `action: ${action}`
            });
          }
        });
      },
        getAssignmentStatus() {
        this.$http({
        url: this.$http.adornUrl('/token/assignment_status/'+ this.userId),
          method: 'get',
        }).then(({ data }) => {
          console.log(data)
          this.tableData = data
        })
      },
    OverideAssignment() {
        log.console("hello")
       },
    open(data, index) {
          this.$confirm('Do you want a resubmission?', 'Alert', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'warning'
        }).then(() => {
          var assignment_id = 33741790
        //to do 
          this.$http({
          url: this.$http.adornUrl('/token/use_token/' + this.userId ),
          method: 'post',
          data: this.$http.adornData({
                'assignment_id': data.assignment_id,
                'token_count': data.token_required,
              })
        })
      }).then(() => {
          data.status = "submitted"
          // this.$set(this.tableData,index,row)
          console.log(data.token_required)
           this.tokenNumber = this.tokenNumber - data.token_required,
           window.open('https:\\canvas.instructure.com/courses/3737733/assignments/'+ data.resubmission_id, '_blank'),
           this.$message({
            type: 'success',
            message: 'get a resubmission link!'
          })
      }
        ).catch((e) => {
          console.log(e)
          this.$message({
            type: 'info',
            message: 'Cancel'
          });          
        });
      }
      },
      computed: {
      },
  watch: {

        },
  mounted() {
    this.getAssignmentStatus(),
    this.getTokenNumber()
    },
    }
    </script>
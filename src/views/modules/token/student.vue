<template> 
    <div>
    
    <el-row :gutter="20">
      <el-col :span="10"><div class="grid-content bg-purple">Total Token: {{tokenNumber}}</div></el-col>
    
      <el-row>
       <el-button type="warning"> check details</el-button>
      <el-button type="info" icon="el-icon-message" circle></el-button>
    </el-row>  
    </el-row>
    
        <div class="form-group">
            <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="assignment_id"
            label="Assignment Id"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="Name"
            width="150">
          </el-table-column>
          <el-table-column
            prop="token_required"
            label="Token Required"
            width="90">
          </el-table-column>
          <el-table-column
            prop="assignment_grade"
            label="Grades"
            width="90">
        </el-table-column>
          <el-table-column
            prop="status"
            label="Status"
            width="90">
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            width="150"
            label="Resubmit">
            <template slot-scope="scope">
              <el-button v-if="isAuth('sys:user:update')" type="text" size="small" @click="open(scope.row.userId)">request resubmission</el-button>
            </template>
          </el-table-column>
        </el-table>
        </div>
    
    </div>
    
      </template>
    
      <script>
        export default {
          data() {
            return {
              tableData: [{
                assignment_id: '20160502',
                name: 'Assignment1',
                token_required: '2'
              }, {
                assignment_id: '20160504',
                name: 'Assignment2',
                token_required: '2'
              }, {
                assignment_id: '20160501',
                name: 'Assignment3',
                token_required: '1'
              }, {
                assignment_id: '20160503',
                name: 'Assignment4',
                token_required: '2'
              }]
            }
          },
          methods: {
            open() {
                this.$confirm('Do you want a resubmission?', 'Alert', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: 'get a resubmission link!'
          });
          window.open('https:\\google.com', '_blank');
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Cancel'
          });          
        });
            }
            },

        computed: {
        tokenNumber() {
            return 8
        }
        }
    }
      </script>
      <style>
      .el-row {
        margin-bottom: 20px;
        &:last-child {
          margin-bottom: 0;
        }
      }
      .el-col {
        border-radius: 4px;
      }
      .bg-purple-dark {
        background: #99a9bf;
      }
      .bg-purple {
        height: 48;
        background: #d3dce6;
      }
      .bg-purple-light {
        background: #e5e9f2;
      }
      .grid-content {
        border-radius: 4px;
        min-height: 36px;
      }
      .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
      }
    </style>
<template> 
    <div>
      <el-row>
        <el-button size="medium" v-model="tokenNumber">Total Token: {{tokenNumber}}</el-button>
       <el-button type="warning"> check details</el-button>
      <el-button type="info" icon="el-icon-message" circle></el-button>
    </el-row>  
        <div class="form-group">
          <el-table
      :data="tableData | forStatus"
      style="width: 100%">
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
      <el-table-column
            header-align="center"
            align="left"
            width="150"
            label="Resubmit">
            <template slot-scope="scope">
              <el-button v-if="isAuth('sys:user:update')" type="text" size="small" @click="open(scope.row.name)" :disabled="scope.row.token_required >= 1 ">request resubmission</el-button>
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
            }
          },
          filters: {
		    forStatus(listData){
		        return listData.filter(function (item) {
		            if(item.status == "none" ){
		                return item;
		            }
		        })
		    }
		},
          methods: {
          getAssignmentStatus() {
        this.$http({
          url: this.$http.adornUrl('/token/assignment_status/32718659'),
          method: 'get',
  
        }).then(({ data }) => {
          console.log(data)
          this.tableData = data
        })
      },
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
            return 0
        }},
        watch:{

        },
    mounted() { this.getAssignmentStatus()
    },
    }
    </script>
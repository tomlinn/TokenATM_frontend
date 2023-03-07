<template>
  <div>
    <div style="margin-bottom : 10px">
      <el-button type="primary" @click="getPendingRequests()">Refresh</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" v-loading="dataListLoading" border>
      <template slot="empty">
        <el-empty description="empty">
          <span>No pending requests</span>
        </el-empty>
      </template>
      <el-table-column prop="id" label="ID" :min-width="10">
      </el-table-column>
      <el-table-column prop="assignmentId" label="Assignment ID" :min-width="10">
      </el-table-column>
      <el-table-column prop="studentId" label="Student ID" :min-width="10">
      </el-table-column>
      <el-table-column prop="tokenCount" label="Token Count" :min-width="10">
      </el-table-column>
      <el-table-column prop="status" label="Status" :min-width="10">
      </el-table-column>
      <el-table-column label="Action" :min-width="20">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 'Pending'" type="primary" size="small" @click="approveRequest(scope.row)">
            Approve
          </el-button>
          <el-button v-if="scope.row.status === 'Pending'" type="danger" size="small" @click="rejectRequest(scope.row)">
            Reject
          </el-button>
          <el-tag v-else-if="scope.row.status === 'Approved'" @click="cancel(scope.row, scope.$index)" type="danger">
            Revoke
          </el-tag>
          <el-tag v-else-if="scope.row.status === 'rejected'" type="danger">
            Rejected
          </el-tag>
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
      dataListLoading: false,
    };
  },
  methods: {
    getPendingRequests() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl('/token/requests/pending/'),
        method: 'get',
      }).then(({ data }) => {
        this.tableData = data;
        this.dataListLoading = false;
      });
    },
    approveRequest(request) {
      this.$confirm(`Do you want to approve ${request.student_name}'s request for ${request.token_count} tokens for the assignment ${request.assignment_name}?`, 'Alert', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning',
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl(`/token/requests/approve/${request.id}`),
          method: 'post',
        }).then((response) => {
          console.log(response);
          if (response.data.assignment_id != "failed") {
            request.status = 'Approved';
            this.$message({
              type: 'success',
              message: 'Request approved',
            });
          } else {
            this.$message({
              type: 'info',
              message: response.data.message
            })
          }
        }).catch((error) => {
          console.log(error.response);
          this.$message({
            type: 'warning',
            message: 'Error: ' + error.response.data,
          });
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Approval canceled',
        });
      });
    },
    rejectRequest(request) {
      this.loading = true;
      this.$http({
        url: this.$http.adornUrl(`/token/requests/reject/${request.id}`),
        method: 'post',
        data: {
          request_id: request.id,
        },
      }).then(() => {
        this.tableData.splice(this.tableData.indexOf(request), 1);
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    },
    cancel(data, index) {
      this.dataListLoading = true
      this.$confirm('Do you want cancel a resubmission?', 'Alert', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning'
      }).then(() => {
        //to do 
        console.log(data)
        this.$http({
          url: this.$http.adornUrl('/token/cancel/'),
          method: 'delete',
          data: this.$http.adornData({
            'user_id': data.studentId,
            'assignment_id': data.assignmentId,
            'token_count': data.tokenCount,
          })
        }).then((response) => {
          // console.log(response.data)
          if (response.data.assignmentId != "failed") {
            data.status = "Cancelled"
            // this.$set(this.tableData,index,row)
            // console.log(data.token_required)
            // auto-open
            // window.open('https:\\canvas.instructure.com/courses/3737737/assignments/'+ data.resubmission_id, '_blank'),
            this.$message({
              type: 'success',
              message: 'Resubmission has been canceled'
            })
          }
          else {
            this.$message({
              type: 'info',
              message: response.data.message
            });
          }
          this.dataListLoading = false
        })
      }).catch((e) => {
        console.log(e)
        this.$message({
          type: 'info',
          message: 'Cancel'
        });
        this.dataListLoading = false
      });
    },
  },
  mounted() {
    this.getPendingRequests();
  },
}
</script>

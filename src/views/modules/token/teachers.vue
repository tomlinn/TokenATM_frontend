<template>
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="date"
        label="Date"
        width="180">
      </el-table-column>
      <el-table-column
        prop="user_id"
        label="User ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="Assginment">
      </el-table-column>
      <el-table-column
        prop="token_ccount"
        label="Token Count">
      </el-table-column>
      <el-table-column
        prop="Source"
        label="source">
      </el-table-column>
      <el-table-column
        prop="type"
        label="Type">
      </el-table-column>
    </el-table>
  </template>
  
  <style>
    .el-table .warning-row {
      background: oldlace;
    }
  
    .el-table .success-row {
      background: #f0f9eb;
    }
  </style>
  
  <script>
    export default {
      methods: {
        tableRowClassName({row, rowIndex}) {
          if (rowIndex === 1) {
            return 'warning-row'
          } else if (rowIndex === 3) {
            return 'success-row'
          }
          return ''
        }
      },
      data() {
        return {
          tableData: [{
            date: '2016-05-02',
            name: 'Amy',
            address: 'Assignment1',
            token_count: '2'
          }, {
            date: '2016-05-04',
            name: 'Bob',
            address: 'Assignment2',
            token_count: '2'
          }, {
            date: '2016-05-01',
            name: 'Cindy',
            address: 'Assignment3',
            token_count: '2'
          }, {
            date: '2016-05-03',
            name: 'David',
            address: 'Assignment1',
            token_count: '2'
          }]
        }
      }
    }
  </script>
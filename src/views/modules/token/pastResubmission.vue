<template>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="Date"
        width="180">
      </el-table-column>
      <el-table-column
        prop="assignment_id"
        label="Assignment ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="Name"
        width="180">
      </el-table-column>
      <el-table-column
        prop="number"
        label="token"
        width="180">
      </el-table-column>
    </el-table>
  </template>

  <script>
    export default {
      data() {
        return {
          tableData: [{
            date: '2016-05-02',
            name: 'Assignment1',
            number: '2'
          }, {
            date: '2016-05-04',
            name: 'Assignment2',
            number: '2'
          }, {
            date: '2016-05-01',
            name: 'Assignment3',
            number: '1'
          }, {
            date: '2016-05-03',
            name: 'Assignment4',
            number: '2'
          }]
        }
      }
    }
  </script>
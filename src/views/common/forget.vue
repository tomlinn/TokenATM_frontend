<!--基本html代码区域-->
<template>
  <div class="firstdemo">
    <el-form ref="form" :model="form" label-width="96px">
      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-form-item label-width="55px">
            <span>
              <font color="pink" size="3">Find your account</font>
            </span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-form-item label="Email:" prop="Please enter your email or mobile number to search for your account.">
            <el-input v-model="form.email" size="small"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-form-item label="New password:">
            <el-input type="password" v-model="form.newpassword" size="small"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-form-item label="Verification:">
            <el-input v-model="form.verification" size="small"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-form-item>
            <el-button @click="requestCode">Request code</el-button>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-form-item>
            <el-button @click="requestForget">Reset</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item>
            <router-link to="/login">Back to Login</router-link>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>


  </div>
</template>
   
   
  <!--数据存贮交互，事件控制地区-->
<script>
export default {
  name: 'firstdemo',
  data() {
    return {
      form: {
        name: '',
        password: '',
        email: '',
      },

    }
  },
  methods: {
    requestCode: function () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (!this.form.email.endsWith("@uci.edu")) {
            this.$message({
              type: 'error',
              message: 'Invalid email address, please use an UCI email address'
            })
          } else {
            this.$http({
              url: this.$http.adornUrl('/token/request_verification'),
              method: 'post',
              data: this.$http.adornData({
                'email': this.form.email
              })
            }).then(({ data }) => {
              if (data && data.status == "success") {
                this.$message({
                  type: 'success',
                  message: 'Verification code sent, please check your email'
                })
              }
            })
          }
        }
      })
    },

    requestForget: function () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl('/token/verify'),
            method: 'post',
            data: this.$http.adornData({
              'email': this.form.email,
              'verification': this.form.verification
            })
          }).then(({ data }) => {
            if (data && data.status == "success") {
              //new save request
              this.$http({
                url: this.$http.adornUrl('/sys/user/save'),
                method: 'post',
                data: this.$http.adornData({
                  'username': this.form.email,
                  'password': this.form.newpassword,
                  'email': this.form.email,
                  'mobile': "00000000000",
                  'status': 1,
                  'roleIdList': [],
                  'salt': ""
                })
              }).then(({ data }) => {
                if (data && data.code === 0) {
                  this.$router.replace({ name: 'home' })
                  console.log(data)
                } else {
                  console.log(data)
                  this.$message.error(data.msg)
                }
              })
              this.$message({
                type: 'success',
                message: 'Password reset success'
              })
            } else {
              console.log(data)
              this.$message.error(data.msg)
            }
          })
        }

      })
  },
  // {
  // // console.log("hello")
  //     var item ={};
  //   //获取到用户名
  //   item.username=this.name;
  //   //获取到密码
  //   item.password=this.password;
  //   item.password=this.email;
  //   //存储到用户列表
  //   alert('Register Successfully!');
  //   console.log(item)
  //   this.$router.push({ name: 'home' })
  // }
},
}
</script>
   
  <!-- 写样式的地方 -->
<style scoped>

</style>
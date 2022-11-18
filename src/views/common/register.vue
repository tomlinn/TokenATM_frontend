<!--基本html代码区域-->
<template>
    <div class="firstdemo">
        <el-form ref="form" :model="form" label-width="100px">
            <el-row type="flex" justify="center">
                <el-col :span="5">
                    <el-form-item label-width="70px">
                      <span><font color="pink" size="3">Register Page</font></span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="5">
                    <el-form-item label="Your Name:" prop="name">
                        <el-input v-model="form.name" size="small"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="5">
                    <el-form-item label="Email:" prop="email">
                        <el-input v-model="form.email" size="small"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="5">
                    <el-form-item label="Password:" prop="password">
                        <el-input v-model="form.password" size="small"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row type="flex" justify="center">
                <el-col :span="5">
                    <el-form-item>
                        <el-button @click="register">register</el-button>
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
    data () {
      return {
          form:{
              name:'',
              password:'',
              email:'',
          },
        
      }
    },
    methods:{
        /*提交进行判断的函数 */
        register:function()
        {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl('/sys/login'),
              method: 'post',
              data: this.$http.adornData({
                'username': this.form.userName,
                'password': this.form.password,
                'email': this.form.email
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$router.replace({ name: 'home' })
                console.log(data)
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
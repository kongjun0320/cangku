<template>
  <div class="login w">
    <h1 class="title">建材厂材料管理系统</h1>
    <section class="login-box">
      <h1>用户登录</h1>
      <section class="input-box">
        <el-input placeholder="请输入内容" v-model="username" clearable></el-input>
      </section>
      <section class="input-box">
        <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
      </section>
      <el-button type="primary" @click="loginHandle">登录</el-button>
    </section>
    <footer class="ff">
      <p>包头师范学院</p>
      <p>Copyright 2019 优仓网ycang.cn 保留所有权利 内蒙古ICP备160440246号-1</p>
    </footer>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    loginHandle() {
      let { username, password } = this;
      this.$axios({
        url: "http://lghcode.cn:8083/user/login",
        method: "post",
        data: {
          username,
          password
        },
        transformRequest: [
          function(data) {
            let ret = "";
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                "=" +
                encodeURIComponent(data[it]) +
                "&";
            }
            return ret;
          }
        ],
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(result => {
        if (result.data.status == 200) {
          let user = result.data.data.user;
          localStorage.setItem("loginUser", JSON.stringify(user));
          this.$router.push("/home");
        } else if (result.data.status == 500) {
          let msg = result.data.msg;
          this.$message({
            showClose: true,
            message: msg,
            type: "error"
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-button {
  padding: 12px 136px !important;
}
.login {
  position: relative;
  height: 100vh;
  background: url("../../public/images/login.png") no-repeat center;
  .title {
    width: 100%;
    position: absolute;
    top: 115px;
    text-align: center;
    font-size: 30px;
  }
  .login-box {
    padding-top: 30px;
    position: absolute;
    top: 200px;
    left: 50%;
    transform: translate(-50%);
    .input-box {
      width: 300px;
      margin-bottom: 30px;
    }
    h1 {
      font-size: 24px;
      color: #333;
      padding-bottom: 30px;
    }
  }
  .ff {
    font-size: 14px;
    text-align: center;
    position: absolute;
    bottom: 50px;
    color: #c2c2c2;
    left: 0;
    right: 0;
    p {
      margin: 20px 0px;
    }
  }
}
</style>
<template>
  <div class="home">
    <section class="left-nav">
      <section class="logo">
        <section class="logo-box">
          <span class="iconfont">&#xe6a0;</span>
        </section>
        <p>仓库管理系统</p>
      </section>
      <section class="nav-box">
        <ul>
          <li :class="{active:currentIndex==1}" @click="togglePage('/home/page1',1)">
            <span class="iconfont">&#xe615;</span>
            <span>首页</span>
          </li>
          <li :class="{active:currentIndex==2}" @click="togglePage('/home/page2',2)">
            <span class="iconfont">&#xe608;</span>
            <span>库存管理</span>
          </li>
          <li :class="{active:currentIndex==3}" @click="togglePage('/home/page3',3)">
            <span class="iconfont">&#xe606;</span>
            <span>入库管理</span>
          </li>
          <li :class="{active:currentIndex==4}" @click="togglePage('/home/page4',4)">
            <span class="iconfont">&#xe601;</span>
            <span>出库管理</span>
          </li>

          <li :class="{active:currentIndex==6}" @click="togglePage('/home/page6',6)">
            <span class="iconfont">&#xe609;</span>
            <span>库位管理</span>
          </li>
          <li :class="{active:currentIndex==7}" @click="togglePage('/home/page7',7)">
            <span class="iconfont">&#xe67b;</span>
            <span>产品管理</span>
          </li>
          <li :class="{active:currentIndex==8}" @click="togglePage('/home/page8',8)">
            <span class="iconfont">&#xe60a;</span>
            <span>分类管理</span>
          </li>
          <li :class="{active:currentIndex==9}" @click="togglePage('/home/page9',9)">
            <span class="iconfont">&#xe625;</span>
            <span>客户管理</span>
          </li>
          <li :class="{active:currentIndex==5}" @click="togglePage('/home/page5',5)">
            <span class="iconfont">&#xe609;</span>
            <span>系统设置</span>
          </li>
        </ul>
      </section>
    </section>
    <section class="right-con">
      <header class="hh" v-if="user">
        <section class="logout">
          <el-button type="danger" size="mini" @click="loginOut">退出</el-button>
        </section>
        <span>{{ user.realName }}{{ user.userType == '0'?'管理员':'员工' }}</span>
      </header>
      <section class="content-box">
        <router-view></router-view>
      </section>
    </section>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      currentIndex: "1",
      user: null
    };
  },
  mounted() {
    this.currentIndex = this.$route.meta;
    this.user = JSON.parse(localStorage.getItem("loginUser"));
  },
  methods: {
    loginOut() {
      localStorage.removeItem("loginUser");
      this.$router.push("/");
    },
    togglePage(path, index) {
      this.currentIndex = index;
      this.$router.push(path);
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  .left-nav {
    width: 150px;
    height: 100vh;
    color: #fff;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      display: none;
    }
    .logo {
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: #333;
      .logo-box {
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background: #69aff0;
        border-radius: 50%;
        .iconfont {
          color: #fff;
          font-size: 30px;
        }
      }
      p {
        font-size: 12px;
        color: #909090;
        padding-top: 10px;
      }
    }
    .nav-box {
      background: #434a7e;
      height: calc(100vh - 112px);
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      width: 150px;
      ul {
        li {
          color: #b7bce2;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px;
          &.active {
            background: #2c3463;
          }
          span {
            &:nth-of-type(1) {
              font-size: 30px;
              padding-bottom: 10px;
            }
            &:nth-of-type(2) {
              font-size: 14px;
            }
          }
        }
      }
    }
  }
  .right-con {
    height: 100vh;
    flex: 1;
    overflow: hidden;
    .hh {
      height: 50px;
      line-height: 50px;
      background: #f5fafe;
      padding-right: 20px;
      span {
        float: right;
        padding-right: 30px;
      }
      .logout {
        float: right;
      }
    }
  }
}
</style>
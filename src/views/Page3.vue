<template>
  <div class="page3">
    <section class="top-title">入库管理</section>
    <section class="search-box">
      <h1>条件搜索（产品名称）</h1>
      <section class="inner-box">
        <el-input v-model="inputValue" placeholder="请输入内容"></el-input>
        <el-button type="primary" @click="searchListHandle">查询</el-button>
      </section>
    </section>
    <section class="list-box">
      <section class="hh">
      </section>
      <section class="table-con">
        <el-table
          v-loading="loading"
          border
          :cell-style="{'border-right':'none'}"
          :header-cell-style="{'border-right':'none',color:'#000','fontWeight':'800'}"
          :data="myList"
          style="width: 100%"
        >
          <el-table-column prop="putNo" label="入库单号"></el-table-column>
          <el-table-column prop="putUser" label="入库处理人"></el-table-column>
          <el-table-column prop="putCount" label="入库数量"></el-table-column>
          <el-table-column prop="areaNo" label="库位区域编号"></el-table-column>
          <el-table-column prop="productName" label="	产品名字"></el-table-column>
        </el-table>
      </section>
       <section class="pagination w">
        <el-pagination
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :page-count="totalPage"
        ></el-pagination>
      </section>
    </section>
  </div>
</template>
<script>
export default {
  name: "Page3",
  data() {
    return {
      loading: true,
      inputValue: "",
      list: [],
      productNo: "",
      pageNum: 1,
      pageSize: 7,
      list: [],
      myList:[],
      totalPage: 0
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    searchListHandle(){
      if(!this.inputValue.trim()){
        this.myList = this.list
        return;
      }
      this.myList = this.list.filter(item=>(item.productName == this.inputValue))
    },  
      handleCurrentChange(index) {
      this.pageNum = index;
      this.getList();
    },
    getList() {
      let { productNo, pageNum, pageSize } = this;
      this.loading = true;
      this.$axios({
        url: "http://lghcode.cn:8083/putStorage/findList",
        method: "post",
        data: {
          productNo,
          pageSize,
          pageNum
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
        this.loading = false;
        if (result.data.status == 200) {
          this.list = result.data.data.rows;
          this.myList = this.list;
          this.totalPage = result.data.data.totalPage;
        } else {
          let msg = result.msg;
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
.page3 {
  padding: 10px;
   .el-button{
    margin-left: 10px;
  }
  .top-title{
    padding: 10px 0px;
    text-align: center;
    font-size: 20px;
    font-weight: 800;
    border-bottom: 1px solid #e5e5e5;
  }
  .search-box {
    h1 {
      color: #000;
      font-size: 20px;
      padding: 20px 0px;
    }
    .inner-box {
      padding-bottom: 10px;
      border-bottom: 1px solid #e5e5e5;
      .el-input {
        width: 220px;
      }
    }
  }
  .list-box {
    .hh {
      padding: 20px 0px;
      .iconfont {
        padding-right: 5px;
      }
      span {
        cursor: pointer;
      }
    }
    .table-con{
      min-height: 440px;
    }
    .pagination {
      position: absolute;
      bottom: 10px;
      right: 40px;
      .el-pagination {
        text-align: right;
      }
    }
  }
}
</style>
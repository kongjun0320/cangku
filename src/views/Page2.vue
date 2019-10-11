<template>
  <div class="page2">
    <section class="top-title">库存管理</section>
    <section class="search-box">
      <h1>条件搜索(产品编号)</h1>
      <section class="inner-box">
        <el-input v-model="inputValue" placeholder="请输入内容"></el-input>
        <el-button type="primary" @click="searchListHandle">查询</el-button>
      </section>
    </section>
    <section class="list-box">
      <!-- 出库开始 -->
      <el-dialog title="出库" :visible.sync="dialogFormVisible2" width="80%">
        <el-form :model="form2">
          <el-form-item label="出库数量" :label-width="formLabelWidth">
            <el-input v-model="form2.count" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="接收人" :label-width="formLabelWidth">
            <el-input v-model="form2.reciveUser" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="生产项目编号" :label-width="formLabelWidth">
            <el-input v-model="form2.productionNo" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="form2.remark" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="putListHandle">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 出库结束 -->
      <section class="table-con">
        <el-table
          v-loading="loading"
          border
          :cell-style="{'border-right':'none'}"
          :row-class-name="clsHandle"
          :header-cell-style="{'border-right':'none',color:'#000','fontWeight':'800'}"
          :data="myList"
          style="width: 100%"
        >
          <el-table-column fixed="left" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="outList(scope.row)" type="text" size="small">出库</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="productName" label="产品名"></el-table-column>
          <el-table-column prop="productNo" label="产品编号"></el-table-column>
          <el-table-column prop="count" label="库存余量"></el-table-column>
          <el-table-column prop="areaNo" label="库位区域编号"></el-table-column>
          <el-table-column prop="limit_warn_count" label="预警值"></el-table-column>
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
  name: "Page2",
  data() {
    return {
      dialogFormVisible2: false,
      formLabelWidth: "120px",
      customerList: [],
      myform2: null,
      form2: {
        remark: "",
        productionNo: "",
        reciveUser: "",
        count: ""
      },
      loading: true,
      inputValue: "",
      list: [],
      productName: "",
      pageNum: 1,
      pageSize: 6,
      list: [],
      myList:[],
      totalPage: 0,
      locationList: []
    };
  },
  mounted() {
    this.getList();
    this.getCustomerListHander();
  },
  methods: {
    searchListHandle(){
      if(!this.inputValue.trim()){
        this.myList = this.list
        return;
      }
      this.myList = this.list.filter(item=>(item.productNo == this.inputValue))
    },  
    clsHandle(row) {
      if (row.row.count < 10) {
        return "mycountcls";
      }
    },
    getCustomerListHander() {
      let { pageSize, pageNum } = this;
      this.$axios({
        url: "http://lghcode.cn:8083/customer/queryListPage",
        method: "post",
        data: { pageSize, pageNum },
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
        this.customerList = result.data.data.rows;
      });
    },
    handleCurrentChange(index) {
      console.log(index);
      this.pageNum = index;
      this.getList();
    },
    outList(item) {
      this.dialogFormVisible2 = true;
      this.form2 = { remark: "", productionNo: "", reciveUser: "", count: "" };
      this.myform2 = item;
      // this.form2.productId = parseInt(item.id);

      // this.getLocation();
    },
    getLocation() {
      let { pageSize, pageNum } = this;
      this.$axios({
        url: "http://lghcode.cn:8083/iocation/queryListPage",
        method: "post",
        data: { pageSize, pageNum },
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
        this.locationList = result.data.data.rows;
      });
    },
    putListHandle() {
      this.outListHandle();
    },
    outListHandle() {
      this.dialogFormVisible2 = false;
      let { iocationId, productId } = this.myform2;
      let { count, productionNo, reciveUser, remark } = this.form2;
      let outUser = parseInt(JSON.parse(localStorage.getItem("loginUser")).id);

      this.$axios({
        url: "http://lghcode.cn:8083/product/outStorage",
        method: "post",
        data: {
          locationId: iocationId,
          productId,
          outUser,
          count,
          productionNo,
          reciveUser,
          remark
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
          let msg = result.data.msg;
          this.$message({
            showClose: true,
            message: msg,
            type: "success"
          });
          this.getList();
        } else {
          let msg = result.data.msg;
          this.$message({
            showClose: true,
            message: msg,
            type: "error"
          });
        }
      });
    },
    getList() {
      let { productName, pageNum, pageSize } = this;
      this.loading = true;
      this.$axios({
        url: "http://lghcode.cn:8083/inventory/queryListPage",
        method: "post",
        data: {
          productName,
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
          this.myList = this.list
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
<style lang="scss">
.page2 {
  .el-table__body-wrapper::-webkit-scrollbar {
    display: none !important;
  }
  .el-button{
    margin-left: 10px;
  }
  .mycountcls {
    color: red !important;
  }
  .el-dialog {
    margin-top: 7vh !important;
  }
  padding: 10px;
  .el-form {
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      .el-input__inner {
        width: 340px !important;
      }
    }
  }
  .top-title {
    padding: 10px 0px;
    text-align: center;
    font-size: 26px !important;
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
    .table-con {
      min-height: 500px;
    }
    .pagination {
      position: fixed;
      bottom: 20px;
      .el-pagination {
        text-align: right;
      }
    }
  }
}
</style>
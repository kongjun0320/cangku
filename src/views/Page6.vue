<template>
  <div class="page6">
    <section class="top-title">库位管理</section>
    <section class="search-box">
      <!-- <h1>条件搜索</h1>
      <section class="inner-box">
        采购单号
        <el-input v-model="inputNum" placeholder="请输入内容"></el-input>
        <el-button type="primary">查询</el-button>
      </section>-->
    </section>
    <section class="list-box">
      <section class="hh">
        <el-button type="primary" @click="addHandle">新增</el-button>
        <!-- 新增框开始 -->
        <el-dialog title="添加" :visible.sync="dialogFormVisible" width="80%">
          <el-form :model="form">
            <el-form-item label="区域编号" :label-width="formLabelWidth">
              <el-input v-model="form.areaNo" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="区域描述" :label-width="formLabelWidth">
              <el-input v-model="form.areaExplain" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="排号编号" :label-width="formLabelWidth">
              <el-input v-model="form.rowNo" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="排号描述" :label-width="formLabelWidth">
              <el-input v-model="form.rowExplain" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="座号编号" :label-width="formLabelWidth">
              <el-input v-model="form.seatNo" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="座号描述" :label-width="formLabelWidth">
              <el-input v-model="form.seatExplain" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addList">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 新增框结束 -->
        <!-- 修改框开始 -->
        <el-dialog title="修改" :visible.sync="dialogFormVisible2" width="80%">
          <el-form :model="form2">
            <el-form-item label="区域编号" :label-width="formLabelWidth">
              <el-input v-model="form2.areaNo" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="区域描述" :label-width="formLabelWidth">
              <el-input v-model="form2.areaExplain" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="排号编号" :label-width="formLabelWidth">
              <el-input v-model="form2.rowNo" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="排号描述" :label-width="formLabelWidth">
              <el-input v-model="form2.rowExplain" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="座号编号" :label-width="formLabelWidth">
              <el-input v-model="form2.seatNo" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="座号描述" :label-width="formLabelWidth">
              <el-input v-model="form2.seatExplain" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="editList">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 修改框结束 -->
      </section>
      <section class="table-con">
        <el-table
          v-loading="loading"
          border
          :cell-style="{'border-right':'none'}"
          :header-cell-style="{'border-right':'none',color:'#000','fontWeight':'800'}"
          :data="list"
          style="width: 100%"
        >
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="areaNo" label="区域编号"></el-table-column>
          <el-table-column prop="areaExplain" label="区域描述"></el-table-column>
          <el-table-column prop="rowNo" label="排号编号"></el-table-column>
          <el-table-column prop="rowExplain" label="排号描述"></el-table-column>
          <el-table-column prop="seatNo" label="座号编号"></el-table-column>
          <el-table-column prop="seatExplain" label="座号描述"></el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <el-button type="success" size="small" v-if="scope.row.status==1">正常</el-button>
              <el-button type="danger" v-else>异常</el-button>
            </template>
            
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click="delListItemById(scope.row)" type="text" size="small">删除</el-button>
              <el-button @click="getListItemById(scope.row)" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
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
  name: "page6",
  data() {
    return {
      dialogFormVisible: false,
      dialogFormVisible2: false,
      form: {
        areaNo: "",
        areaExplain: "",
        rowNo: "",
        rowExplain: "",
        seatNo: "",
        seatExplain: ""
      },
      options: [],
      options2: [],
      form2: {
        areaNo: "",
        areaExplain: "",
        rowNo: "",
        rowExplain: "",
        seatNo: "",
        seatExplain: ""
      },
      categoryId: [],
      formLabelWidth: "120px",
      loading: true,
      inputNum: "",
      list: [],
      name: "",
      categoryId: "",
      customerId: "",
      productNo: "B",
      pageNum: 1,
      pageSize: 6,
      totalPage: 0,
      listItem: null,
      locationList: []
    };
  },
  mounted() {
    this.getList();
    this.form2.putUser = JSON.parse(localStorage.getItem("loginUser")).id;
  },
  methods: {
    editList() {
      this.dialogFormVisible2 = false;
      let { form2 } = this;
      this.loading = true;
      this.$axios({
        url: `http://lghcode.cn:8083/iocation/update`,
        method: "post",
        data: form2,
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
    handleCurrentChange(index) {
      console.log(index + "ss");
      this.pageNum = index;
      this.getList();
    },
    getLocation() {
      let { pageSize, pageNum } = this;
      this.$axios({
        url: "http://lghcode.cn:8083/iocation/queryListPage",
        method: "post",
        data: { pageSize, pageNum: 1 },
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
    putList(item) {
      // this.form2 = { productId: "",
      //   locationId: "",
      //   count: ""}
      this.form2.productId = "";
      this.form2.locationId = "";
      this.form2.count = "";
      this.form2.productId = parseInt(item.id);
      this.dialogFormVisible2 = true;
      this.getLocation();
    },
    putListHandle() {
      this.dialogFormVisible2 = false;
      let { form2 } = this;
      this.$axios({
        url: "http://lghcode.cn:8083/product/putStorage",
        method: "post",
        data: form2,
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
    delListItemById(item) {
      this.$confirm("确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let id = item.id;
          this.$axios({
            url: "http://lghcode.cn:8083/iocation/delete",
            method: "post",
            data: { id },
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
              this.getList();
              this.$message({
                showClose: true,
                message: "删除成功",
                type: "success"
              });
            } else {
              let msg = result.msg;
              this.$message({
                showClose: true,
                message: msg,
                type: "error"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getListItemById(item) {
      let id = item.id;
      this.$axios({
        url: "http://lghcode.cn:8083/iocation/getIocation",
        method: "post",
        data: { id },
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
          this.form2 = result.data.data;
          this.dialogFormVisible2 = true;
        } else {
          let msg = result.msg;
          this.$message({
            showClose: true,
            message: msg,
            type: "error"
          });
        }
      });
    },
    editHandleClick() {},
    addList() {
      this.dialogFormVisible = false;
      let { form } = this;
      this.loading = true;
      this.$axios({
        url: `http://lghcode.cn:8083/iocation/save`,
        method: "post",
        data: form,
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
    addHandle() {
      this.dialogFormVisible = true;
      this.form = {
        areaNo: "",
        areaExplain: "",
        rowNo: "",
        rowExplain: "",
        seatNo: "",
        seatExplain: ""
      };
    },
    getList() {
      this.loading = true;
      let { pageNum, pageSize } = this;
      this.$axios({
        url: "http://lghcode.cn:8083/iocation/queryListPage",
        method: "post",
        data: {
          pageNum,
          pageSize,
          areaNo: ""
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
.page6 {
  padding: 10px;
  .el-form {
    display: flex;
    .el-form-item {
      width: 340px;
      &:nth-of-type(2n) {
        margin-left: 160px;
      }
      .el-form-item__content {
        width: 100%;
        .el-input {
          width: 100%;
        }
      }
    }
  }
  .top-title {
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
      .el-form {
        width: 90%;
        display: flex;
        flex-wrap: wrap;

        .el-form-item {
          .el-input__inner {
            width: 400px !important;
          }
        }
      }

      .iconfont {
        margin-left: 10px;
        padding-right: 5px;
      }
      span {
        cursor: pointer;
      }
    }
    .table-con {
      min-height: 420px;
    }
    .pagination {
      position: absolute;
      right: 100px;
      bottom: 14px;
      .el-pagination {
        text-align: right;
      }
    }
  }
}
</style>
<template>
  <div class="page8">
    <section class="top-title">分类管理</section>
    
    <section class="list-box">
      <section class="hh">
        <el-button type="primary" @click="addHandle">新增分类</el-button>
        <!-- 新增框开始 -->
        <el-dialog title="添加" :visible.sync="dialogFormVisible" width="80%">
          <el-form :model="form">
            <!-- <el-form-item label="分类编号" :label-width="formLabelWidth">
              <el-input v-model="form.productNo" autocomplete="off"></el-input>
            </el-form-item> -->
            <el-form-item label="分类全称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addList">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 新增框结束 -->
        <!-- 入库开始 -->
        <el-dialog title="入库" :visible.sync="dialogFormVisible2" width="80%">
          <el-form :model="form2">
            <el-form-item label="处理人Id" :label-width="formLabelWidth">
              <el-input v-model="form2.putUser" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="产品id" :label-width="formLabelWidth">
              <el-input v-model="form2.productId" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label="活动区域" :label-width="formLabelWidth">
              <el-select v-model="form2.locationId" placeholder="请选择活动区域">
                <el-option
                  :label="item.areaNo"
                  :value="item.id"
                  v-for="(item, index) in locationList"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="入库数量" :label-width="formLabelWidth">
              <el-input v-model="form2.count" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="putListHandle">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 入库结束 -->
      </section>
      <section class="table-con">
        <el-table
          v-loading="loading"
          border
          height="440"
          :cell-style="{'border-right':'none'}"
          :header-cell-style="{'border-right':'none',color:'#000','fontWeight':'800'}"
          :data="list"
          style="width: 100%"
        >
          <el-table-column prop="id" label="分类编号"></el-table-column>
          <el-table-column prop="name" label="分类全称"></el-table-column>
          
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click="delListItemById(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
      <!-- <section class="pagination w">
        <el-pagination
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :page-count="totalPage"
        ></el-pagination>
      </section> -->
    </section>
  </div>
</template>
<script>
export default {
  name: "Page8",
  data() {
    return {
      dialogFormVisible: false,
      dialogFormVisible2: false,
      form: {
        name: "",
      },
      form2: {
        productId: "",
        locationId: "",
        count: ""
      },
      formLabelWidth: "120px",
      loading: true,
      inputNum: "",
      list: [],
      name: "",
      categoryId: "",
      customerId: "",
      productNo: "B",
      pageNum: 1,
      pageSize: 10,
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
      handleCurrentChange(index) {
      console.log(index);
      this.pageNum = index;
      this.getList();
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
    putList(item) {
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
            url: "http://lghcode.cn:8083/category/delete",
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
        url: "http://lghcode.cn:8083/product/getProduct",
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
          this.form = result.data.data;
          this.dialogFormVisible = true;
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
        url: `http://lghcode.cn:8083/category/save`,
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
          console.log(result)
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
      this.form = {name:''}
    },
    getList() {
      this.loading = true;
      this.$axios({
        url: "http://lghcode.cn:8083/category/list",
        method: "post",
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
          this.list = result.data.data;
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
.page8 {
  padding: 10px;
   .el-table__body-wrapper::-webkit-scrollbar {
    display: none !important;
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
    .table-con{
      min-height: 420px;
    }
    .pagination {
      position: absolute;
      bottom: 20px;
      right: 140px;
      .el-pagination {
        text-align: right;
      }
    }
  }
}
</style>
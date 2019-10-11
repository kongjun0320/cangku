<template>
  <div class="page7">
    <section class="top-title">产品管理</section>
    <section class="search-box">
      <h1>条件搜索（产地）</h1>
      <section class="inner-box">
        <el-button type="primary" @click="addHandle">新增</el-button>
        <el-input v-model="inputValue" placeholder="请输入内容"></el-input>
        <el-button type="primary" @click="searchListHandle">查询</el-button>
      </section>
    </section>
    <section class="list-box">
      <section class="hh">
        <!-- 新增框开始 -->
        <el-dialog title="添加" :visible.sync="dialogFormVisible" width="80%">
          <el-form :model="form">
            <el-form-item label="产品编号" :label-width="formLabelWidth">
              <el-input
                v-model="form.productNo"
                autocomplete="off"
                @change="changeHandle(form.productNo)"
              ></el-input>
            </el-form-item>
            <el-form-item label="产品全称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="分类id" :label-width="formLabelWidth">
              <!-- <el-input v-model="form.categoryId" autocomplete="off"></el-input> -->
              <el-select v-model="form.categoryId" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="供应商id" :label-width="formLabelWidth">
              <!-- <el-input v-model="form.customerId" autocomplete="off"></el-input> -->
              <el-select v-model="form.customerId" placeholder="请选择">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="产地" :label-width="formLabelWidth">
              <el-input v-model="form.address" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="计量单位" :label-width="formLabelWidth">
              <el-input v-model="form.measuringUnit" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="有效期" :label-width="formLabelWidth">
              <el-input v-model="form.usefulLife" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="型号" :label-width="formLabelWidth">
              <el-input v-model="form.modelNo" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
              <el-input v-model="form.remark" autocomplete="off"></el-input>
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
                  :label="item.areaNo+'-'+item.rowNo+'-'+item.seatNo"
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
        <!-- <span class="iconfont">&#xe636;</span>
        <span>导处Excel表格</span>-->
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
          <el-table-column prop="product_no" label="产品编号"></el-table-column>
          <el-table-column prop="name" label="产品全称"></el-table-column>
          <el-table-column prop="category_id" label="分类"></el-table-column>
          <el-table-column prop="customer_id" label="供应商id"></el-table-column>
          <el-table-column prop="categoryName" label="分类名称"></el-table-column>
          <el-table-column prop="address" label="产地"></el-table-column>
          <el-table-column prop="measuring_unit" label="计量单位"></el-table-column>
          <el-table-column prop="useful_life" label="有效期"></el-table-column>
          <el-table-column prop="model_no" label="型号"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button @click="putList(scope.row)" type="text" size="small">入库</el-button>
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
  name: "Page7",
  data() {
    return {
      dialogFormVisible: false,
      dialogFormVisible2: false,
      form: {
        id: "",
        productNo: "",
        name: "",
        categoryId: "",
        customerId: "",
        address: "",
        measuringUnit: "",
        usefulLife: "",
        modelNo: "",
        remark: ""
      },
      options: [],
      options2: [],
      form2: {
        productId: "",
        locationId: "",
        count: ""
      },
      categoryId: [],
      formLabelWidth: "120px",
      loading: true,
      inputValue: "",
      list: [],
      myList: [],
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
    this.getCete();
    this.getCus();
    this.form2.putUser = JSON.parse(localStorage.getItem("loginUser")).id;
  },
  methods: {
    changeHandle(item) {
      if (!/^[a-z||A-Z][0-9]{5}$/i.test(item)) {
        this.$message({
           showClose: true,
          message: "请输入正确的产品编号格式",
          type: "warning"
        });
      }
    },
    searchListHandle() {
      if (!this.inputValue.trim()) {
        this.myList = this.list;
        return;
      }
      this.myList = this.list.filter(item => item.address == this.inputValue);
    },
    getCus() {
      this.$axios({
        url: "http://lghcode.cn:8083/customer/queryListPage",
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
        this.options2 = result.data.data.rows;
      });
    },
    getCete() {
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
        this.options = result.data.data;
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
            url: "http://lghcode.cn:8083/product/delete",
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
      let url = "product/save";
      if (form.id) {
        url = "product/update";
      }
      this.loading = true;
      this.$axios({
        url: `http://lghcode.cn:8083/${url}`,
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
    },
    getList() {
      let { productNo, pageNum, pageSize, categoryId, customerId, name } = this;
      this.loading = true;
      this.$axios({
        url: "http://lghcode.cn:8083/product/queryListPage",
        method: "post",
        data: {
          productNo,
          categoryId,
          customerId,
          pageSize,
          pageNum,
          name
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
<style lang="scss">
.page7 {
  .el-button {
    margin: 0 10px;
  }
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
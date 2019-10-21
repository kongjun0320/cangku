<template>
  <div class="page9">
    <section class="top-title">客户管理</section>

    <section class="list-box">
      <section class="hh">
        <el-button type="primary" @click="addHandle">新增客户</el-button>
        <!-- 新增框开始 -->
        <el-dialog title="添加" :visible.sync="dialogFormVisible" width="80%">
          <el-form :model="form">
            <el-form-item label="供应商编号 " :label-width="formLabelWidth">
              <el-input v-model="form.supplierNo" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="供应商名字" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="负责人" :label-width="formLabelWidth">
              <el-input v-model="form.headMan" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="地址" :label-width="formLabelWidth">
              <el-input v-model="form.address" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号" :label-width="formLabelWidth">
              <el-input v-model="form.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
              <!-- <el-input v-model="form.email" autocomplete="off" @change="changeHandle(form.email)"></el-input> -->
              <el-autocomplete
                class="inline-input"
                v-model="form.email"
                @input="inputHandle(form.email)"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                :trigger-on-focus="false"
                @select="handleSelect"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item label="网址" :label-width="formLabelWidth">
              <el-input
                v-model="form.homeUrl"
                autocomplete="off"
                @change="changeHandle2(form.homeUrl)"
              ></el-input>
            </el-form-item>
            <el-form-item label="传真" :label-width="formLabelWidth">
              <el-input v-model="form.fax" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addList">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 新增框结束 -->
        <!-- 入库开始 -->
        <el-dialog title="修改" :visible.sync="dialogFormVisible2" width="80%">
          <el-form :model="form2">
            <el-form-item label="供应商编号 " :label-width="formLabelWidth">
              <el-input v-model="form2.supplierNo" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="供应商名字" :label-width="formLabelWidth">
              <el-input v-model="form2.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="负责人" :label-width="formLabelWidth">
              <el-input v-model="form2.headMan" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="地址" :label-width="formLabelWidth">
              <el-input v-model="form2.address" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机号" :label-width="formLabelWidth">
              <el-input v-model="form2.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
              <el-input v-model="form2.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="网址" :label-width="formLabelWidth">
              <el-input v-model="form2.homeUrl" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="传真" :label-width="formLabelWidth">
              <el-input v-model="form2.fax" autocomplete="off"></el-input>
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
          height="440"
          border
          :cell-style="{'border-right':'none'}"
          :header-cell-style="{'border-right':'none',color:'#000','fontWeight':'800'}"
          :data="list"
          style="width: 100%"
        >
          <el-table-column prop="id" label="客户ID"></el-table-column>
          <el-table-column prop="supplierNo" label="供应商编号"></el-table-column>
          <el-table-column prop="name" label="供应商名字"></el-table-column>
          <el-table-column prop="headMan" label="负责人"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
          <el-table-column prop="name" label="分类全称"></el-table-column>
          <el-table-column prop="phone" label="手机号"></el-table-column>
          <el-table-column prop="fax" label="传真"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="homeUrl" label="网址"></el-table-column>

          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click="delListItemById(scope.row)" type="text" size="small">删除</el-button>
              <el-button @click="getListItemById(scope.row)" type="text" size="small">编辑</el-button>
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
      </section>-->
    </section>
  </div>
</template>
<script>
export default {
  name: "Page9",
  data() {
    return {
      restaurants: [
        {
          value: "@qq.com"
        },
        {
          value: "@163.com"
        }
      ],
      state2: "",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      form: {
        supplierNo: "",
        name: "",
        headMan: "",
        address: "",
        phone: "",
        email: "",
        homeUrl: "",
        fax: ""
      },
      form2: {
        supplierNo: "",
        name: "",
        headMan: "",
        address: "",
        phone: "",
        email: "",
        homeUrl: "",
        fax: ""
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
    inputHandle(ii) {
      this.restaurants = [
        {
          value: "@qq.com"
        },
        {
          value: "@163.com"
        }
      ]
      this.restaurants.forEach(item => {
        item.value = ii + item.value;
      });
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    },
    changeHandle(item) {
      if (!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(item)) {
        this.$message({
          showClose: true,
          message: "请输入正确的邮箱格式",
          type: "warning"
        });
      }
    },
    changeHandle2(item) {
      if (
        !/^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i.test(
          item
        )
      ) {
        this.$message({
          showClose: true,
          message: "请输入正确的网址格式",
          type: "warning"
        });
      }
    },
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
      let myFrm = {};
      for (let item in form2) {
        if (form2[item]) {
          myFrm[item] = form2[item];
        }
      }
      // console.log(myFrm)
      this.$axios({
        url: "http://lghcode.cn:8083/customer/update",
        method: "post",
        data: myFrm,
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
            url: "http://lghcode.cn:8083/customer/delete",
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
        url: "http://lghcode.cn:8083/customer/getCustomer",
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
        url: `http://lghcode.cn:8083/customer/save`,
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
          this.getList();
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
      (this.form = {
        supplierNo: "",
        name: "",
        headMan: "",
        address: "",
        phone: "",
        email: "",
        homeUrl: "",
        fax: ""
      }),
        (this.dialogFormVisible = true);
    },
    getList() {
      this.loading = true;
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
        this.loading = false;
        if (result.data.status == 200) {
          this.list = result.data.data.rows;
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
.page9 {
  .el-table__body-wrapper::-webkit-scrollbar {
    display: none !important;
  }
  .el-dialog {
    margin-top: 7vh !important;
  }

  padding: 10px;
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
            width: 340px !important;
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
      bottom: 20px;
      right: 140px;
      .el-pagination {
        text-align: right;
      }
    }
  }
}
</style>
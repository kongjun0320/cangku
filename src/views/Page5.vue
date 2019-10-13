<template>
  <div class="page5">
    <section class="top-title">系统（用户）管理</section>
    <section class="search-box">
      <el-button type="primary" size="medium">欢迎{{ realName }}</el-button>
      <el-button type="primary" @click="addHandle" class="btn-add" :disabled="userType==1">新增</el-button>
      <!-- 新增框开始 -->
      <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="80%">
        <el-form :model="form">
          <el-form-item label="用户类型" :label-width="formLabelWidth">
            <!-- <el-input v-model="form.userType" autocomplete="off"></el-input> -->
            <el-select v-model="form.userType" placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.userNo" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="头像" :label-width="formLabelWidth">
            <el-upload
              class="avatar-uploader"
              name="imageFile"
              action="http://lghcode.cn:8083/user/uploadImg"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="form.headImg" :src="form.headImg" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" :label-width="formLabelWidth">
            <el-input v-model="form.realName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="年龄" :label-width="formLabelWidth">
            <el-input v-model="form.age" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-input v-model="form.sex" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="身份证号码" :label-width="formLabelWidth">
            <el-input v-model="form.idCard" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="	学历" :label-width="formLabelWidth">
            <el-input v-model="form.education" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="form.adress" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" :label-width="formLabelWidth">
            <el-input v-model="form.phone" autocomplete="off" @change="changeHandle(form.phone)"></el-input>
          </el-form-item>
          <el-form-item label="部门" :label-width="formLabelWidth">
            <el-input v-model="form.department" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="职位" :label-width="formLabelWidth">
            <el-input v-model="form.position" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否允许登录" :label-width="formLabelWidth">
            <!-- <el-input v-model="form.isLogin" autocomplete="off"></el-input> -->
            <el-select v-model="form.isLogin" placeholder="请选择">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生日" :label-width="formLabelWidth">
            <el-date-picker v-model="form.birthday" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUserHandle">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 新增框结束 -->
      <!-- 编辑框开始 -->
      <el-dialog title="添加用户" :visible.sync="dialogFormVisible2" width="80%">
        <el-form :model="form2">
          <el-form-item label="用户类型" :label-width="formLabelWidth">
            <!-- <el-input v-model="form2.userType" autocomplete="off"></el-input> -->
            <el-select v-model="form.userType" placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form2.userNo" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form2.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" :label-width="formLabelWidth">
            <el-input v-model="form2.realName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="年龄" :label-width="formLabelWidth">
            <el-input v-model="form2.age" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-input v-model="form2.sex" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="身份证号码" :label-width="formLabelWidth">
            <el-input v-model="form2.idCard" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="	学历" :label-width="formLabelWidth">
            <el-input v-model="form2.education" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="form2.adress" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" :label-width="formLabelWidth">
            <el-input v-model="form2.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="部门" :label-width="formLabelWidth">
            <el-input v-model="form2.department" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="职位" :label-width="formLabelWidth">
            <el-input v-model="form2.position" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否允许登录" :label-width="formLabelWidth">
            <!-- <el-input v-model="form2.isLogin" autocomplete="off"></el-input> -->
            <el-select v-model="form.isLogin" placeholder="请选择">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生日" :label-width="formLabelWidth">
            <el-date-picker v-model="form2.birthday" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="addUserHandle2">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 编辑框结束 -->
    </section>
    <section class="table-box">
      <section class="table-con">
        <el-table
          v-loading="loading"
          border
          :cell-style="{'border-right':'none'}"
          :header-cell-style="{'border-right':'none',color:'#000','fontWeight':'800'}"
          :data="usertTableData"
          style="width: 100%"
        >
          <el-table-column prop="id" label="id"></el-table-column>
          <el-table-column prop="realName" label="姓名"></el-table-column>
          <el-table-column prop="headImg" label="头像">
            <template slot-scope="scope">
              <img :src="scope.row.headImg" alt class="myAvatarImg" />
            </template>
          </el-table-column>
          <el-table-column prop="sex" label="性别"></el-table-column>
          <el-table-column prop="userNo" label="用户名"></el-table-column>
          <el-table-column prop="age" label="年龄"></el-table-column>
          <el-table-column prop="userType" label="用户类型"></el-table-column>
          <el-table-column prop="idCard" label="身份证号码"></el-table-column>
          <el-table-column prop="birthday" label="生日"></el-table-column>
          <el-table-column prop="department" label="部门"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                @click="editClick(scope.row)"
                type="text"
                size="small"
                :disabled="isAdmin"
              >编辑</el-button>
              <el-button
                @click="delClick(scope.row)"
                type="text"
                size="small"
                :disabled="isAdmin"
              >删除</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="isLogin" label="授权">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.userType!=0"
                @click="isSQHandle(scope.row)"
                type="danger"
                :disabled="isAdmin"
              >{{ scope.row.isLogin==0?'授权':'取消授权' }}</el-button>
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
  name: "Page5",
  data() {
    return {
      options1: [
        {
          label: "管理员",
          value: 0
        },
        {
          label: "员工",
          value: 1
        }
      ],
      options2: [
        {
          label: "允许",
          value: 1
        },
        {
          label: "不允许",
          value: 0
        }
      ],
      userType: "",
      loading: true,
      birthday: "Sun Sep 22 00:42:46 CST 2019",
      inputValue: "",
      dialogFormVisible: false,
      dialogFormVisible2: false,
      pageNum: 1,
      pageSize: 5,
      totalPage: 0,
      form: {
        userType: 1,
        userNo: "",
        password: "",
        realName: "",
        headImg: "",
        age: 0,
        sex: "",
        idCard: "",
        birthday: "",
        education: "",
        adress: "",
        phone: "",
        department: "",
        position: "",
        isLogin: 1
      },
      form2: {
        userType: 1,
        userNo: "",
        password: "",
        realName: "",
        age: 0,
        sex: "",
        idCard: "",
        birthday: "",
        education: "",
        adress: "",
        phone: "",
        department: "",
        position: "",
        isLogin: 1
      },
      formLabelWidth: "120px",
      usertTableData: [],
      userNo: "",
      realName: "",
      findUser: null,
      realName: "",
      isSQ: "",
      isAdmin: false,
      currentEditUser: null
    };
  },
  mounted() {
    this.getUser();
    let user = JSON.parse(localStorage.getItem("loginUser"));
    this.isAdmin = user.userType == 1;
    this.userType = user.userType;
    this.realName = user.realName;
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.form.headImg = file.response.data
    },

    changeHandle(item) {
      if (
        !/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
          item
        )
      ) {
        this.$message({
          showClose: true,
          message: "请输入正确的手机号码格式",
          type: "warning"
        });
      }
    },
    delClick(item) {
      let { id } = item;
      this.$confirm("确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            url: "http://lghcode.cn:8083/user/delete",
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
              let msg = result.data.msg;
              this.getUser();
              this.$message({
                showClose: true,
                message: msg,
                type: "success"
              });
            } else {
              let msg = result.data.msg;
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
    isSQHandle(item) {
      let { id } = item;
      let myIsLogin = 0
      //没有授权
      if (item.isLogin == 0) {
        myIsLogin = 1
      } else {
        myIsLogin = 0
      }
      this.$axios({
          url: "http://lghcode.cn:8083/user/setLoginPermissions",
          method: "post",
          data: { id, isLogin: myIsLogin },   //开启授权
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
            this.getUser();
            this.$message({
              showClose: true,
              message: msg,
              type: "success"
            });
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
    getUser() {
      this.loading = true;
      let { userNo, realName, userType, pageNum, pageSize } = this;
      this.$axios({
        url: "http://lghcode.cn:8083/user/queryListPage ",
        method: "post",
        data: { userNo: "", realName: "", userType: "", pageNum, pageSize },
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
          this.loading = false;
          let msg = result.data.msg;
          this.usertTableData = result.data.data.rows;
          this.totalPage = result.data.data.totalPage;
          this.$message({
            showClose: true,
            message: msg,
            type: "success"
          });
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
      console.log(index);
      this.pageNum = index;
      this.getUser();
    },
    addHandle() {
      this.dialogFormVisible = true;
    },
    addUserHandle2() {
      this.dialogFormVisible2 = true;
      let url = "user/update";
      let { form2 } = this;
      form2.birthday = Date(form2.birthday);
      form2.userType = parseInt(form2.userType);
      form2.age = parseInt(form2.age);
      form2.isLogin = parseInt(form2.isLogin);
      form2.id = this.findUser.id;
      this.$axios({
        url: `http://lghcode.cn:8083/${url}`,
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
          this.loading = false;
          this.dialogFormVisible2 = false;
          let msg = result.data.msg;
          this.getUser();
          this.$message({
            showClose: true,
            message: msg,
            type: "success"
          });
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
    addUserHandle() {
      let url = "user/save";
      let { form } = this;
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
        if (result.data.status == 200) {
          this.loading = false;
          this.dialogFormVisible = false;
          let msg = result.data.msg;
          this.getUser();
          this.$message({
            showClose: true,
            message: msg,
            type: "success"
          });
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
    handleClick(row) {
      console.log(row);
    },
    editClick(item) {
      let id = item.id;
      this.$axios({
        url: "http://lghcode.cn:8083/user/getUser",
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
          this.loading = false;
          let msg = result.data.msg;
          this.findUser = result.data.data;
          for (let key in this.form2) {
            this.form2[key] = result.data.data[key];
          }
          this.dialogFormVisible2 = true;
          this.$message({
            showClose: true,
            message: msg,
            type: "success"
          });
        } else {
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
<style lang="scss">
.page5 {
  padding: 20px;
  .el-form-item {
    width: 420px;
  }
  .myAvatarImg {
    width: 30px;
    height: 30px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
  .avatar {
    width: 30px;
    height: 30px;
    display: block;
  }
  .el-dialog__wrapper {
    margin-top: -90px !important;
  }
  .el-form {
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      .el-input__inner {
        width: 300px !important;
      }
    }
  }
  .top-title {
    padding: 10px 0px;
    margin-bottom: 20px;
    text-align: center;
    font-size: 20px;
    font-weight: 800;
    border-bottom: 1px solid #e5e5e5;
  }
  .search-box {
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #e5e5e5;
    position: relative;
    .btn-add {
      position: absolute;
      top: 0;
      right: 20px;
    }
    .my-el-input {
      width: 200px;
      margin-right: 20px;
    }
  }
  .table-box {
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
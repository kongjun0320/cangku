<template>
  <div class="page1">
    <section class="item1">
      <h1>仓库基础信息</h1>
      <ul>
        <li>
          <span class="iconfont">&#xe690;</span>
          <section class="item-inner">
            <p>仓库商家数量(家)</p>
            <span>15</span>
          </section>
        </li>
        <li>
          <span class="iconfont">&#xe600;</span>
          <section class="item-inner">
            <p>仓库面积(m)</p>
            <span>2000</span>
          </section>
        </li>
        <li>
          <span class="iconfont">&#xe7fb;</span>
          <section class="item-inner">
            <p>仓库类型</p>
            <span>立体仓库</span>
          </section>
        </li>
        <li>
          <span class="iconfont">&#xe671;</span>
          <section class="item-inner">
            <p>安保系统</p>
            <span>智能安保</span>
          </section>
        </li>
      </ul>
    </section>
    <section class="item2">
      <h1>量子数据</h1>
      <section class="con-box">
        <section class="inner-box">
          <section class="con-inner">
            <section class="num">
              <span>今日订单数</span>
              <p>888</p>
            </section>
            <section class="week">
              <span class="active">周显示</span>
              <span>月显示</span>
              <span>季度显示</span>
            </section>
          </section>
          <p class="time">
            <span class="iconfont">&#xe613;</span>
            2019/09/09
          </p>
          <section class="echarts-box">
            <div id="ec1" style="width: 400px;height:300px;"></div>
          </section>
        </section>
        <section class="inner-box">
          <section class="con-inner">
            <section class="num">
              <span>当日出库商品数</span>
              <p>888</p>
            </section>
            <section class="num my-num">
              <span>商品总量</span>
              <p>1234</p>
            </section>
            <section class="num my-num">
              <span>待出库商品</span>
              <p>88</p>
            </section>
          </section>
          <section class="echarts-box">
            <div id="ec2" style="width: 400px;height:300px;"></div>
          </section>
        </section>
        <section class="inner-box">
          <h1>消息通知</h1>
          <ul>
            <li>
              <span>消息发布</span>
              <span>227</span>
            </li>
            <li>
              <span>消息发布</span>
              <span>1</span>
            </li>
            <li>
              <span>消息发布</span>
              <span>111</span>
            </li>
            <li>
              <span>消息发布</span>
              <span>227</span>
            </li>
            <li>
              <span>消息发布</span>
              <span>1</span>
            </li>
            <li>
              <span>消息发布</span>
              <span>111</span>
            </li>
            <li>
              <span>消息发布</span>
              <span>227</span>
            </li>
          </ul>
        </section>
      </section>
    </section>
  </div>
</template>
<script>
export default {
  name: "Page1",
  mounted() {
    this.initEc1();
    this.initEc2();
  },
  methods: {
    initEc1() {
      let myChart = this.$echarts.init(document.getElementById("ec1"));
      let option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        tooltip: {
          show: true,
          trigger: "item",
          backgroundColor: "#56B1F7",
          textStyle: {
            color: "#fff"
          }
        },

        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
            color: "#56B1F7"
          }
        ]
      };
      myChart.setOption(option);
    },
    initEc2() {
      let myChart = this.$echarts.init(document.getElementById("ec2"));
      let option = {
        legend: {
          orient: "horizontal",
          x: "center",
          y: "bottom"
        },
        series: [
          {
            name: "背景",
            type: "pie",
            radius: ["50%", "70%"],
            silent: true,
            hoverAnimation: false,
            color: "#F2F2F2",
            label: {
              normal: {
                show: true,
                position: "center",
                formatter: a => {
                  return a.value;
                },
                 textStyle: {
                  fontSize: 20,
                  fontFamily: "Microsoft YaHei",
                  color: ["#000"]
                }
                
              }
            },
            data: [{ value: 111 }]
          },
          {
            name: "日出库商品数",
            type: "pie",
            silent: true,
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            color: ["#f0f", "#0f0", "rgba(0,0,0,0)"],
            label: {
              normal: {
                show: false,
                position: "center"
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 0.2, name: "出库商品" },
              { value: 0.4, name: "待出库商品" },
              { value: 0.4, name: "全部商品" }
            ]
          }
        ]
      };

      myChart.setOption(option);
    }
  }
};
</script>
<style lang="scss" scoped>
.page1 {
  padding: 10px;
  .item1 {
    h1 {
      padding: 16px 0px 16px 16px;
    }
    ul {
      display: flex;
      justify-content: space-around;
      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 20px;
        width: 24%;
        background: #63bcff;
        border-radius: 6px;
        .iconfont {
          font-size: 40px;
          color: #fff;
        }
        .item-inner {
          p {
            font-weight: 800;
            color: #b1ddf4;
          }
          span {
            color: #fff;
            float: right;
            font-size: 20px;
            margin-top: 10px;
          }
        }
      }
    }
  }
  .item2 {
    padding: 0 6px;
    h1 {
      padding: 16px 0px 16px 16px;
    }
    .con-box {
      display: flex;
      justify-content: space-between;
      .inner-box {
        padding: 20px;
        flex: 1;
        height: 400px;
        border: 1px solid #e5e5e5;
        &:nth-of-type(2) {
          margin: 0 10px;
        }
        &:nth-of-type(3) {
          h1 {
            padding: 0;
            color: #707070;
            font-weight: 700;
            font-size: 20px;
          }
          ul {
            margin-top: 20px;
            li {
              padding: 10px 0px;
              overflow: hidden;
              border-bottom: 1px solid #e5e5e5;
              span {
              font-size:14px;
                &:nth-of-type(1) {
                  float: left;
                  color: #8d8d8d;
                }
                &:nth-of-type(2) {
                  float: right;
                  color: #fff;
                  border-radius: 8px;
                  background: #68cf79;
                  padding: 4px 7px;
                }
              }
            }
          }
        }
        .con-inner {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          .num {
            span {
              color: #707070;
              font-weight: 700;
            }
            p {
              color: #63bcff;
              font-size: 30px;
              padding: 10px 0;
            }
          }
          .my-num {
            font-size: 12px;
            span {
              color: #b4b4b4;
            }
            p {
              font-size: 12px;
              color: #7d7d7d;
            }
          }
          .week {
            span {
              border: 1px solid #e5e5e5;
              padding: 4px 6px;
              color: #d4d4d4;
              font-weight: 800;
              font-size: 11px;
              &:nth-of-type(1) {
                border-right: none;
                border-top-left-radius: 13px;
                border-bottom-left-radius: 13px;
              }
              &:nth-of-type(2) {
                border-right: none;
              }
              &:nth-of-type(3) {
                border-top-right-radius: 13px;
                border-bottom-right-radius: 13px;
              }
              &.active {
                background: #898fba;
                color: #fff;
              }
            }
          }
        }
        .time {
          color: #bbbbbb;
          font-size: 10px;
          .iconfont {
            font-size: 10px;
          }
        }
      }
    }
    .echarts-box {
    }
  }
}
</style>
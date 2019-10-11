import Vue from 'vue'
import App from './App.vue'
import router from './router'
import echarts from 'echarts'
import axios from 'axios'
import qs from 'qs'
import {Autocomplete,DatePicker,Button,Input, Table, TableColumn, Loading,Dialog,Form,FormItem,MessageBox,Message,Select,Option,Pagination} from 'element-ui'

Vue.use(Autocomplete)
Vue.use(DatePicker)
Vue.use(Pagination)
Vue.use(Select)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Input)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Loading)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts

// axios.interceptors.request.use(config => {
//   if(config.type == 'formData' || config.method != 'post'){
//     return config
//   }
//   config.data = qs.stringify(config.data)
//   return config
// }, (err) =>{
//   return Promise.reject(err);
// })


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

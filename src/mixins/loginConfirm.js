export default {
  //  此处编写 Vue 组件实例的配置项，通过一定语法，可以直接混入到组件内容
  //  data methods computed 生命周期函数...
  //  注意点：如果此处和组件内提供了同名的 data 或 methods，则组件内优先级更高

  methods: {
    //  根据登录状态确认是否需要弹出登录确认框
    loginConfirm () {
      //  判断 token 是否存在
      if (!this.$store.getters.token) {
        //  弹确认框
        this.$dialog.confirm({
          title: '温馨提示',
          message: '此时需要先登录才能继续操作哦',
          confirmButtonText: '去登陆',
          cancelButtonText: '再逛逛'
        }).then(() => {
          //  确认按钮操作
          //  跳转登录 => 登陆后会跳需要跳转时携带参数
          //  this.$route.fullPath => 带参数
          this.$router.replace({
            path: '/login',
            query: {
              backUrl: this.$route.fullPath
            }
          })
        }).catch(() => {
          //  取消按钮操作
        })
        return true
      }
      return false
    }
  }
}

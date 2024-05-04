export default {
  namespaced: true,
  state () {
    return {
      //  个人权证相关
      userInfo: {
        token: '',
        userId: ''
      }
    }
  },
  getters: {
  },
  mutations: {
    setUserInfo (state, obj) {
      state.userInfo = obj
    }
  },
  actions: {
  }
}

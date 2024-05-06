import { getCartList, changeCount } from '@/api/cart'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    //  设置 cartList
    setCartList (state, newList) {
      state.cartList = newList
    },
    //  对应商品的选中状态取反
    toggleCheck (state, goodsId) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.isChecked = !goods.isChecked
    },
    //  取消全选
    toggleAllCheck (state, flag) {
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
    },

    changeCount (state, { goodsId, goodsNum }) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.goods_num = goodsNum
    }
  },
  actions: {
    async getCartAction (context) {
      const { data } = await getCartList()

      //  后台数据不包含复选框选中状态，需要自设添加
      data.list.forEach(item => {
        item.isChecked = false
      })
      context.commit('setCartList', data.list)
    },

    async changeCountAction (context, { goodsId, goodsNum, goodsSkuId }) {
      //  本地修改
      context.commit('changeCount', { goodsId, goodsNum })

      //  同步后台
      await changeCount(goodsId, goodsNum, goodsSkuId)
    }
  },
  getters: {
    //  所有商品总数
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },

    //  选中的商品项
    selCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },

    //  选中的商品总数
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },

    //  选中的商品总价
    selPrice (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num * item.goods.goods_price_min, 0).toFixed(2)
    },

    //  是否全选
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked === true)
    }
  }
}

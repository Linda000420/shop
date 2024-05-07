import request from '@/util/request'

//  订单结算确认
//  mode: cart   => obj => { cartIds }
//  mode: buyNow => obj => { goodsId, goodsNum, goodsSkuId }
export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode, //  模式，cart->购物车下单，buyNow->详情页立即购买下单
      delivery: 10, //  10->快递配送，20->门店自提
      shopId: 0, //  自提门店ID
      couponId: 0, //  优惠价ID，0->不使用
      isUsePoints: 0, //  积分，0->不使用
      ...obj //  将传递过来的参数对象进行展开
    }
  })
}

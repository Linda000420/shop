import request from '@/util/request'

//  获取搜索商品列表的数据
export const getGoodsList = (obj) => {
  const { categoryId, goodsName, page } = obj
  return request.get('/goods/list', {
    params: {
      categoryId,
      goodsName,
      page
    }
  })
}

//  获取商品详情页数据
export const getGoodsDetailList = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}

//  获取商品评价列表
export const getGoodsComments = (goodsId, limit) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit
    }
  })
}

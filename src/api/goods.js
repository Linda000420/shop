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

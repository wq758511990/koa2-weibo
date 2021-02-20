/**
 * @description 广场页 controller
 * @author wzx
 */

const { getSquareCacheList } = require('../cache/blog')
const { PAGE_SIZE } = require('../config/constant')
const { SuccessModel } = require('../model/ResModel')

/**
 * 
 * @param {number} pageIndex 页码
 */
async function getSquareBlogList (pageIndex = 0) {
  // 访问cache 
  const result = await getSquareCacheList(pageIndex, PAGE_SIZE)

  const blogList = result.blogList
  // 拼接返回数据
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: result.count
  })

}

module.exports = {
  getSquareBlogList
}
/**
 * @description 首页 controller
 * @author wzx
 */
const xss = require('xss')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { createBlog, getFollowersBlogList } = require('../services/blog')
const { PAGE_SIZE } = require('../config/constant')

/**
 * @param {string} userId 
 * @param {string} content 
 * @param {string} image 
 */
async function create ({ userId, content, image }) {
  // service
  try {
    const blog = await createBlog({ userId, content: xss(content), image })
    return new SuccessModel(blog)
  } catch (error) {
    return new ErrorModel(createBlogFailInfo)
  }
}

/**
 * 获取首页微博列表
 * @param {number} userId 
 * @param {number} pageIndex 
 */
async function getHomeBlogList (userId, pageIndex = 0) {
  const result = await getFollowersBlogList({ userId, pageIndex, pageSize: PAGE_SIZE })
  const { count, blogList } = result
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    pageSize: PAGE_SIZE,
    pageIndex,
    count,
    blogList
  })
}


module.exports = {
  create,
  getHomeBlogList
}
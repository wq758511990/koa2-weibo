/**
 * @description 首页 controller
 * @author wzx
 */

const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { createBlog } = require('../services/blog')

/**
 * @param {string} userId 
 * @param {string} content 
 * @param {string} image 
 */
async function create ({ userId, content, image }) {
  // service
  try {
    const blog = await createBlog({ userId, content, image })
    return new SuccessModel(blog)
  } catch (error) {
    return new ErrorModel(createBlogFailInfo)
  }
}


module.exports = {
  create
}
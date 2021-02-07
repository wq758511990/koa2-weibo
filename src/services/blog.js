/**
 * @description 微博 service
 * @author wzx
 */

const { Blog } = require('../db/model/index')

/**
 * 创建微博数据
 * @param {string} userId 
 * @param {string} content 
 * @param {string} image 
 */
async function createBlog ({ userId, content, image }) {
  const result = await Blog.create({
    userId,
    content,
    image
  })
  return result.dataValues
}

module.exports = {
  createBlog
}
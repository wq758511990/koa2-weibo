/**
 * @description 微博数据相关工具方法
 * @author wzx
 */

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

// 获取Blog-list.ejs 内容
const BLOG_LIST_TPL = fs.readFileSync(path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs')).toString()

/**
 * 根据blogList 渲染出html字符串
 * @param {array} blogList 微博列表
 * @param {boolean} canReply 是否可以回福
 */
function getBlogListStr (blogList = [], canReply = false) {
  return ejs.render(BLOG_LIST_TPL, {
    blogList,
    canReply
  })
}

module.exports = {
  getBlogListStr
}
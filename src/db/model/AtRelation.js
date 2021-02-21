/**
 * @description 微博at用户关系表
 * @author wzx
 */

const seq = require('../seq')
const { INTEGER, BOOLEAN } = require('../types')

const AtRelation = seq.define('atRelation', {
  userId: {
    type: INTEGER,
    allowNull: false
  },
  blogId: {
    type: INTEGER,
    allowNull: false
  },
  isRead: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false, // 默认未读
    comment: '是否已读'
  }
})

module.exports = AtRelation
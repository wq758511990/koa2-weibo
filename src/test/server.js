/**
 * @description jest server
 * @author wzx
 */

const request = require('supertest')
const server = require('../app').callback()

module.exports = request(server)

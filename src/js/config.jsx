/**
 * 站点通用配置
 * @type {Object}
 */
let __debug__ = !(/hocodo.com/gi.test(location.hostname));

const Config = {
  staticRoot: ( __debug__ ? 'http://localhost:8080/' : 'http://admin.hocodo.com/' ),
  apiRoot: ( __debug__ ? 'http://localhost:8006/' : 'http://admin.hocodo.com/services/public/'),
}

module.exports = Config;
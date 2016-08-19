/**
 * 站点通用配置
 * @type {Object}
 */
let __debug__ = !(/tangsj.com/gi.test(location.hostname));

const Config = {
  staticRoot: ( __debug__ ? 'http://localhost:8080/' : '' ),
  apiRoot: ( __debug__ ? 'http://192.168.1.113:8006/' : ''),
}

module.exports = Config;
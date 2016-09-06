import { apiRoot } from 'config';
import { notification } from 'antd';

// 创建一个全局的数据中心
window.store = {
  login: false,
  user: null,
  token: localStorage.getItem('hocodo_token')
}

// 登录验证
const enterAuth = (nextState, replace, callback) => {

  /**
   * 验证成功，设置请求头
   * @return {[type]} [description]
   */
  function authSuccess(){
    $.ajaxSetup({
      data: {
        _token: window.store.token
      },
      success: (res) => {
        if(res.code == 403){
          replace('/login');
          callback();
        }
      }
    });
    callback();
  }
  if(window.store.login){
    authSuccess();
  }else{
    if(window.store.token){
      // 如果用户是直接刷新的页面需要到服务器验证一次登录
      $.ajax({
        url: apiRoot +'login/refresh',
        type: 'post',
        dataType: 'json',
        data: {
          token: window.store.token
        }
      }).done((res) => {
        if(res.code == 1){
          window.store.login = true;
          window.store.user = res.data;
          authSuccess();
        }else{
          notification.error({
            message: '服务器异常！！',
            duration: 2
          });
        }
      }).fail(() => {
        notification.error({
          message: '服务器异常！！',
          duration: 2
        });
      });
    }else{
      replace('/login');
      callback();
    }
  }
}


module.exports = {
  enterAuth: enterAuth
}
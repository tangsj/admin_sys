/**
 * 登录页面
 * @author tangsj
 */
import { Link } from 'react-router';
import { apiRoot } from 'config';

const Login = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  getInitialState(){
    return {
      sending: false
    }
  },
  submitHandler(){

    if(this.state.sending){
      return false;
    }

    let username = this.refs.username.value.trim();
    let password = this.refs.password.value.trim();

    // check
    if(username.length == 0){
      alert('请输入用户名');
      return false;
    }

    if(password.length == 0){
      alert('请输入密码');
      return false;
    }

    this.setState({ sending: true });

    return false;
  },
  keyEnter(e){
    if(e.keyCode == 13){
      this.submitHandler();
    }
  },
  // shouldComponentUpdate(nextProps, nextState){
  //   if(nextProps.user.login){ // 用户已登录
  //     this.context.router.push('/index');
  //     return false;
  //   }
  //   return true;
  // },
  render(){

    return (
      <div className="login-page">
        
      </div>
    )
  }
});

export default Login;
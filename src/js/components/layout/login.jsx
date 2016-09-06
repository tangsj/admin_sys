/**
 * 登录页面
 * @author tangsj
 */
import { Link } from 'react-router';
import { apiRoot } from 'config';
import md5 from 'md5';
import { Form, Input, Icon, Checkbox, Button, Modal, message, notification } from 'antd';

const FormItem = Form.Item;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Login';
    this._isMounted = false;
    this.state = {
      sending: false
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidMount() {
    this._isMounted = true;
  }
  submitHandler(){
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        return;
      }
      $.ajax({
        url: apiRoot + 'login',
        type: 'post',
        dataType: 'json',
        data: {
          username: values.username,
          password: md5(values.password)
        }
      }).done((res) => {
        if(res.code == 1){
          var store = window.store || {};
          store.user = res.data.user;
          store.token = res.data.token;
          store.login = true;
          // 存储 token
          localStorage.setItem('hocodo_token', res.data.token);
          this.context.router.push('/');
        }else{
          notification.error({
            message: '登录失败！！',
            duration: 2
          });
        }
      }).fail(() => {
        notification.error({
          message: '服务器异常',
          duration: 2
        });
      });
    });
  }
  keyEnter(e){
    if(e.keyCode == 13){
      this.submitHandler();
    }
  }
  render(){
    const { getFieldProps } = this.props.form;

    const username = getFieldProps('username', {
      initialValue: 'admin',
      rules: [
        { required: true, message: "请输入账户名" },
      ]
    });

    const password = getFieldProps('password', {
      initialValue: '123456',
      rules: [
        { required: true, message: "请输入密码" },
      ]
    });

    return (
      <div className="login-page">

        <Form className="login-form" inline onSubmit={this.handleSubmit}>
          <p className="login-title">Hocodo Login</p>
          <FormItem
            label="账户"
          >
            <Input placeholder="请输入账户名"
              onKeyUp={ this.keyEnter.bind(this) }
              {...username}
            />
          </FormItem>
          <FormItem
            label="密码"
          >
            <Input type="password" placeholder="请输入密码"
              onKeyUp={ this.keyEnter.bind(this) }
              {...password}
            />
          </FormItem>
          <Button loading={ this.state.sending } type="primary" onClick={ this.submitHandler.bind(this) }>登录</Button>
        </Form>
      </div>
    )
  }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Form.create()(Login);
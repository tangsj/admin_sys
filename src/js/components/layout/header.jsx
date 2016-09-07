import { Dropdown, Icon, Menu } from 'antd';
import { Link } from 'react-router';

class Header extends React.Component {
    constructor(props) {
      super(props);
      this.displayName = 'Header';
      this._isMounted = false;
    }
    componentWillUnmount() {
      this._isMounted = false;
    }
    componentDidMount() {
      this._isMounted = true;
    }
    logout(){
      localStorage.removeItem('hocodo_token');
      this.context.router.push('/login');
    }
    render() {
      const store = window.store || {};
      const menu = (
        <Menu>
          <Menu.Item key="0">
            <a href="#">个人信息</a>
          </Menu.Item>
          <Menu.Item key="1">
            <a href="#">修改密码</a>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="3">
            <a href="javascript:;" onClick={ this.logout.bind(this) }>退出</a>
          </Menu.Item>
        </Menu>
      );
      return (
        <header className="header">
          <Link to="/" className="logo">Hocodo</Link>

          <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link u-option" href="#">
              用户：{ store.user.name } <Icon type="down" />
            </a>
          </Dropdown>
        </header>
      )
    }
}

Header.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Header;

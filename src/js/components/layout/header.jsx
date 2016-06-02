import { Dropdown, Icon, Menu } from 'antd';
import { Link } from 'react-router';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Header';
    }
    render() {
        const menu = (
          <Menu>
            <Menu.Item key="0">
              <a href="#">个人信息</a>
            </Menu.Item>
            <Menu.Item key="1">
              <a href="#">修改密码</a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3">退出</Menu.Item>
          </Menu>
        );
        return (
          <header className="header">
            <Link to="/" className="logo">CodeCook</Link>

            <Dropdown overlay={menu} trigger={['click']}>
              <a className="ant-dropdown-link u-option" href="#">
                用户：Admin <Icon type="down" />
              </a>
            </Dropdown>
          </header>
        )
    }
}

export default Header;

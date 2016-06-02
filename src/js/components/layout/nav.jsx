import { Menu, Icon } from 'antd';
import Footer from 'components/layout/footer';

const SubMenu = Menu.SubMenu;

class Nav extends React.Component {
    constructor(props) {
      super(props);
      this.displayName = 'Nav';

      this.state = {

      }
    }
    static contextTypes = {
      router: React.PropTypes.object
    }

    handleClick(e){
      this.context.router.push(e.key);
    }

    render() {
      const selKey = location.pathname;
      const openKeyArr = selKey.split('/');
      openKeyArr.length = 2;
      const openKey = openKeyArr.join('/')

      const openKeys = {}

      if(['/'].indexOf(openKey) == -1){
        openKeys.openKeys = [openKey];
      }
      return (
        <nav className="nav">
          <div className="container">
            <Menu mode="inline" selectedKeys={[selKey]} style={{ width: 220 }} onClick={ this.handleClick.bind(this) }>
              <Menu.Item key="/"> <Icon type="home" /> 首页</Menu.Item>
              <SubMenu key="/user" title={ <span><Icon type="team" />用户管理</span> }>
                <Menu.Item key="/user/list"><Icon type="bars" />用户列表</Menu.Item>
                <Menu.Item key="/user/black/list"><Icon type="frown-circle" />黑名单</Menu.Item>
              </SubMenu>
            </Menu>
          </div>
          <Footer />
        </nav>
      );
    }
}

export default Nav;
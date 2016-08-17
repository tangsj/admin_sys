import { Menu, Icon } from 'antd';
import Footer from 'components/layout/footer';

const SubMenu = Menu.SubMenu;

class Nav extends React.Component {
    constructor(props) {
      super(props);
      this.displayName = 'Nav';

      this.state = {
        current: '',
        openKeys: []
      }
    }
    static contextTypes = {
      router: React.PropTypes.object
    }

    handleClick = (e) => {
      this.setState({
        current: e.key,
        openKeys: e.keyPath.slice(1)
      });
      this.context.router.push(e.key);
    }

    onToggle = (info) => {
      this.setState({
         openKeys: info.open ? info.keyPath : info.keyPath.slice(1)
      });
    }

    componentWillMount() {
      const selKey = location.pathname;
      const openKeyArr = selKey.split('/');
      openKeyArr.length = 2;
      const openKey = openKeyArr.join('/')

      const openKeys = []
      if(['/'].indexOf(openKey) == -1){
        openKeys.push(openKey);
      }

      this.setState({
        current: selKey,
        openKeys: openKeys
      });
    }

    render() {
      return (
        <nav className="nav">
          <div className="container">
            <Menu mode="inline"
              openKeys={this.state.openKeys}
              selectedKeys={[this.state.current]}
              onOpen={ this.onToggle }
              onClose={ this.onToggle }
              style={{ width: 220 }}
              onClick={ this.handleClick }>
              <Menu.Item key="/"> <Icon type="home" /> 首页</Menu.Item>
              <SubMenu key="/user" title={ <span><Icon type="team" />用户管理</span> }>
                <Menu.Item key="/user/list"><Icon type="bars" />用户列表</Menu.Item>
                <Menu.Item key="/user/black/list"><Icon type="frown-circle" />黑名单</Menu.Item>
              </SubMenu>

              <SubMenu key="/project" title={ <span><Icon type="tags" />项目管理</span> }>
                <Menu.Item key="/project/list"><Icon type="bars" />项目列表</Menu.Item>
                <Menu.Item key="/project/line/list"><Icon type="bars" />项目流水</Menu.Item>
                <Menu.Item key="/project/service/list"><Icon type="bars" />服务机构</Menu.Item>
                <Menu.Item key="/project/ae/list"><Icon type="bars" />AE团队</Menu.Item>
              </SubMenu>
            </Menu>
          </div>
          <Footer />
        </nav>
      );
    }
}

export default Nav;
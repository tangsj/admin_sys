import { Card, Breadcrumb, Icon, Badge } from 'antd';

class Dashboard extends React.Component {
    constructor(props) {
      super(props);
      this.displayName = 'Dashboard';
      this._isMounted = false;
      this.state = {
        loading: true
      }
    }
    componentWillUnmount() {
      this._isMounted = false;
    }
    componentDidMount() {
      this._isMounted = true;
    }
    render() {
      return (
        <div className="page-index">
          <Breadcrumb>
            <Breadcrumb.Item><Icon type="home"/>首页</Breadcrumb.Item>
          </Breadcrumb>

          <Card className="card-item" title="代办事项" extra={<Badge count={11}/>} style={{ width: 300 }}>
            <p>1. AE/服务机构 添加状态管理，实现软删除</p>

            <p>2. 添加项目流水时，AE选项根据所属项目进行动态加载</p>

            <p>3. 流水开始和结束时间显示时分秒</p>

            <p>4. 项目列表添加项目状态管理</p>

            <p>5. 登录用户添加修改密码</p>

            <p>6. 对登录后token有效时间进行限制</p>

            <p>7. 将项目所有流水金额汇总到项目列表中</p>

            <p>8. 添加系统用户及权限管理</p>

            <p>9. 项目流水时间过滤</p>

            <p>10. 项目流水导出Excel</p>

            <p>11. 流水添加修改功能</p>
          </Card>

        </div>
      );
    }
}

export default Dashboard;

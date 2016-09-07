import { Card, Breadcrumb, Icon } from 'antd';

class Dashboard extends React.Component {
    constructor(props) {
      super(props);
      this.displayName = 'Dashboard';
      this._isMounted = false;
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

          <Card className="card-item" title="系统公告" extra={<a href="#">更多</a>} style={{ width: 300 }}>
            <p>系统公告系统公告系统公告系统公告系统公告系统公告系统公告系统公告系统公告系统公告系统公告系统公告系统公告系统公告系统公告系统公告系统公告系统公告系统公告系统公告系统公告系统公告系统公告系统公告系统公告系统公告</p>
          </Card>

          <Card className="card-item" title="代办事项" extra={<a href="#">更多</a>} style={{ width: 300 }}>
            <p>1. 代办事项1</p>
            <p>2. 代办事项2</p>
            <p>3. 代办事项3</p>
          </Card>

          <Card className="card-item" title="今日订单" extra={<a href="#">更多</a>} style={{ width: 300 }}>
            <p>今日订单</p>
            <p>今日订单</p>
            <p>今日订单</p>
          </Card>
        </div>
      );
    }
}

export default Dashboard;

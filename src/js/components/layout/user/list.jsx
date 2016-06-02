import { Link } from 'react-router';
import { Breadcrumb, Icon, Table, Button, Modal, message, notification } from 'antd';

class UserList extends React.Component {
    constructor(props) {
      super(props);
      this.displayName = 'UserList';

      this.state = {
        delkeys : []
      }
    }
    removeItem(item) {
      return function(){
        Modal.confirm({
          title: '删除确认！',
          content: `您确认需要删除${item.name}`,
          onOk(){
            message.success('您选择了确定');
          },
          onCancel(){
            message.error('您选择了取消');
          }
        });
      }
    }
    removeSelectedItem = () => {
      if(this.state.delkeys.length == 0){
        Modal.info({
          title: '提示',
          content: '请选择需要删除的行！'
        });
        return false;
      }
      notification.info({
        message: '删除提示',
        description: `您即将删除${ JSON.stringify(this.state.delkeys) }`,
        duration: 2
      });
    }
    setRemoveItemState(selectedRows){
      let keys = selectedRows.map((item, index) => {
        return item.key
      });
      this.setState({
        delkeys: keys
      });
    }
    render() {
      console.log('render')
      const columns = [{
        title: '姓名',
        dataIndex: 'name',
        render(text) {
          return <a href="javascript:;">{text}</a>;
        },
      }, {
        title: '年龄',
        dataIndex: 'age',
      }, {
        title: '住址',
        dataIndex: 'address',
      }, {
        title: '操作',
        key: 'operation',
        render: (text, data) => {
          return <span>
            <Link to={ `/user/update/${ data.key }` }>修改</Link>
            <span className="ant-divider"></span>
            <a href="javascript:;" onClick={ this.removeItem(data) }>删除</a>
          </span>
        }
      }];

      const data = [{
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
      }, {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
      }, {
        key: '3',
        name: '李大嘴',
        age: 32,
        address: '西湖区湖底公园1号',
      }];

      // 通过 rowSelection 对象表明需要行选择
      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
        },
        onSelect: (record, selected, selectedRows) => {
          this.setRemoveItemState(selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
          this.setRemoveItemState(selectedRows);
        },
      }

      return (
        <div>
          <Breadcrumb>
            <Breadcrumb.Item><Icon type="home"/>首页</Breadcrumb.Item>
            <Breadcrumb.Item>用户管理</Breadcrumb.Item>
            <Breadcrumb.Item>用户列表</Breadcrumb.Item>
          </Breadcrumb>

          <div className="option-btns">
            <Link to="/user/add">
              <Button type="primary">添加用户</Button>
            </Link>
            <Button type="dashed" onClick={ this.removeSelectedItem }><Icon type="delete"/></Button>
          </div>

          <Table pagination={ false } rowSelection={ rowSelection } columns={ columns } dataSource={ data }/>
        </div>
      );
    }
}

export default UserList;

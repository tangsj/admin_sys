import { Breadcrumb, Icon, Table, Button } from 'antd';

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'UserList';
    }
    render() {

      const columns = [{
        title: '姓名',
        dataIndex: 'name',
        render(text) {
          return <a href="#">{text}</a>;
        },
      }, {
        title: '年龄',
        dataIndex: 'age',
      }, {
        title: '住址',
        dataIndex: 'address',
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
        onChange(selectedRowKeys, selectedRows) {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect(record, selected, selectedRows) {
          console.log(record, selected, selectedRows);
        },
        onSelectAll(selected, selectedRows, changeRows) {
          console.log(selected, selectedRows, changeRows);
        },
      }; 

      return (
        <div>
          <Breadcrumb>
            <Breadcrumb.Item><Icon type="home"/>首页</Breadcrumb.Item>
            <Breadcrumb.Item>用户管理</Breadcrumb.Item>
            <Breadcrumb.Item>用户列表</Breadcrumb.Item>
          </Breadcrumb>

          <div className="option-btns">
            <Button type="primary">添加用户</Button>
            <Button type="dashed"><Icon type="delete"/></Button>
          </div>

          <Table pagination={ false } rowSelection={ rowSelection } columns={ columns } dataSource={ data }/>
        </div>
      );
    }
}

export default UserList;

/**
 * AE列表
 */
import { Link } from 'react-router';
import { Breadcrumb, Icon, Table, Button, Modal, message, notification } from 'antd';

class ProjectAEList extends React.Component {
    constructor(props) {
      super(props);
      this.displayName = 'ProjectAEList';

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
      const columns = [{
        title: '姓名',
        dataIndex: 'name',
      }, {
        title: '英文名',
        dataIndex: 'enname',
      }, {
        title: '电话',
        dataIndex: 'phone',
      }, {
        title: '所属机构',
        dataIndex: 'group',
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
        name: 'Total',
        enname: 'Total',
        phone: '18888888888',
        group: '东风日产'
      }, {
        key: '2',
        name: 'Total',
        enname: 'Total',
        phone: '18888888888',
        group: '东风日产'
      }, {
        key: '3',
        name: 'Total',
        enname: 'Total',
        phone: '18888888888',
        group: '东风日产'
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
            <Breadcrumb.Item>项目管理</Breadcrumb.Item>
            <Breadcrumb.Item>AE团队</Breadcrumb.Item>
          </Breadcrumb>

          <div className="option-btns">
            <Link to="/project/ae/add">
              <Button type="primary">添加AE</Button>
            </Link>
            <Button type="dashed" onClick={ this.removeSelectedItem }><Icon type="delete"/></Button>
          </div>

          <Table pagination={ false } rowSelection={ rowSelection } columns={ columns } dataSource={ data }/>
        </div>
      );
    }
}

export default ProjectAEList;

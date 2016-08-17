/**
 * 项目列表【主要是名称】
 */
import { Link } from 'react-router';
import { Breadcrumb, Icon, Table, Button, Modal, message, notification } from 'antd';

class ProjectList extends React.Component {
    constructor(props) {
      super(props);
      this.displayName = 'ProjectList';

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
        title: '项目名称',
        dataIndex: 'name',
      }, {
        title: '服务机构',
        dataIndex: 'service',
      }, {
        title: '描述',
        dataIndex: 'desc',
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
        name: '天籁车型',
        desc: '这是一个天籁车型'
      }, {
        key: '2',
        name: '天籁车型',
        desc: '这是一个天籁车型'
      }, {
        key: '3',
        name: '天籁车型',
        desc: '这是一个天籁车型'
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
            <Breadcrumb.Item>项目列表</Breadcrumb.Item>
          </Breadcrumb>

          <div className="option-btns">
            <Link to="/project/add">
              <Button type="primary">添加项目</Button>
            </Link>
            <Button type="dashed" onClick={ this.removeSelectedItem }><Icon type="delete"/></Button>
          </div>

          <Table pagination={ true } rowSelection={ rowSelection } columns={ columns } dataSource={ data }/>
        </div>
      );
    }
}

export default ProjectList;

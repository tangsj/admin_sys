/**
 * 项目流水列表
 * @author tangsj
 */
import { Link } from 'react-router';
import { Breadcrumb, Icon, Table, Button, Modal, message, notification } from 'antd';

class ProjectLineList extends React.Component {
    constructor(props) {
      super(props);
      this.displayName = 'ProjectLineList';

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
        dataIndex: 'name'
      }, {
        title: '项目所属',
        dataIndex: 'group'
      },{
        title: '描述',
        dataIndex: 'remark',
      }, {
        title: 'AE',
        dataIndex: 'ae',
      }, {
        title: '日期',
        dataIndex: 'date',
      }, {
        title: '负责人',
        dataIndex: 'head',
      }, {
        title: '操作',
        width: 150,
        key: 'operation',
        render: (text, data) => {
          return <span>
            <Link to={ `/user/update/${ data.key }` }>修改</Link>
            <span className="ant-divider"></span>
            <a href="javascript:;" onClick={ this.removeItem(data) }>删除</a>
            <span className="ant-divider"></span>
            <a href="javascript:;" onClick={ this.removeItem(data) }>估价</a>
          </span>
        }
      }];

      const data = [{
        key: '1',
        name: '天籁',
        group: '东风日产',
        remark: 32,
        ae: 'Total',
        date: '2016-09-09',
        head: 'tangsj'
      }, {
        key: '2',
        name: '天籁',
        group: '东风日产',
        remark: 42,
        ae: 'Total',
        date: '2016-09-09',
        head: 'tangsj'
      }, {
        key: '3',
        name: '天籁',
        group: '东风日产',
        remark: 32,
        ae: 'Total',
        date: '2016-09-09',
        head: 'tangsj'
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
            <Breadcrumb.Item>项目流水列表</Breadcrumb.Item>
          </Breadcrumb>

          <div className="option-btns">
            <Link to="/project/line/add">
              <Button type="primary">添加流水</Button>
            </Link>
            <Button type="dashed" onClick={ this.removeSelectedItem }><Icon type="delete"/></Button>
          </div>

          <Table pagination={ false } rowSelection={ rowSelection } columns={ columns } dataSource={ data }/>
        </div>
      );
    }
}

export default ProjectLineList;

/**
 * 项目列表【主要是名称】
 */
import { apiRoot } from 'config';
import { Link } from 'react-router';
import { Breadcrumb, Icon, Table, Button, Modal, message, notification } from 'antd';

class ProjectList extends React.Component {
    constructor(props) {
      super(props);
      this.displayName = 'ProjectList';

      this.state = {
        loading: true,
        delkeys : [],
        list: [],
        pagination: {
          current: 1,
          pageSize: 10
        }
      }
    }
    removeItem(item) {
      const self = this;

      return function(){
        Modal.confirm({
          title: '删除确认！',
          content: `您确认需要删除${item.name}`,
          onOk(){
            self.delItemsByIds([item.key]);
          }
        });
      }
    }
    removeSelectedItem = () => {
      const self = this;
      if(this.state.delkeys.length == 0){
        Modal.info({
          title: '提示',
          content: '请选择需要删除的行！'
        });
        return false;
      }

      Modal.confirm({
        title: '删除确认！',
        content: `您确认需要删除选中的行？`,
        onOk(){
          self.delItemsByIds(self.state.delkeys);
        }
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
    delItemsByIds(ids = []){
      this.setState({ loading: true });
      $.ajax({
        url: apiRoot + 'api/project/del',
        type: 'post',
        dataType: 'json',
        data: { ids: ids },
      }).done((res) => {
        this.setState({ loading: false });
        if(res.code == 1){
          message.success('删除成功');
          this.getList({
            page: this.state.pagination.current,
            pageSize: this.state.pagination.pageSize
          });
        }else{
          message.error('删除失败！');
        }
      }).fail(() => {
        this.setState({ loading: false });
        notification.error({
          message: '服务器异常',
          duration: 2
        });
      });
    }
    getList(params = {}){
      this.setState({ loading: true });

      $.ajax({
        url: apiRoot + 'api/project/list',
        type: 'get',
        dataType: 'json',
        data: params,
      }).done((res) => {
        const data = res.data;
        const pagination = this.state.pagination;

        pagination.total = data.count;

        this.setState({
          loading: false,
          list: data.list,
          pagination
        });
      }).fail(() => {
        this.setState({ loading: false });
        notification.error({
          message: '服务器异常',
          duration: 2
        });
      });
    }
    handleTableChange(pagination, filters, sorter){
      const pager = this.state.pagination;
      pager.current = pagination.current;
      this.setState({
        pagination: pager,
      });

      this.getList({
        page: pagination.current,
        pageSize: pagination.pageSize
      });
    }
    componentDidMount() {
      this.getList({
        page: this.state.pagination.current
      });
    }
    render() {
      const columns = [{
        title: '项目名称',
        dataIndex: 'name',
      }, {
        title: '服务机构',
        dataIndex: 'servicename',
      }, {
        title: '描述',
        dataIndex: 'description',
      }, {
        title: '操作',
        width: 120,
        key: 'operation',
        render: (text, data) => {
          return <span>
            <Link to={ `/project/edit/${ data.key }` }>修改</Link>
            <span className="ant-divider"></span>
            <a href="javascript:;" onClick={ this.removeItem(data) }>删除</a>
          </span>
        }
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

          <Table loading={ this.state.loading }
                pagination={ this.state.pagination }
                rowSelection={ rowSelection }
                columns={ columns }
                dataSource={ this.state.list }
                onChange={ this.handleTableChange.bind(this) }
          />
        </div>
      );
    }
}

export default ProjectList;

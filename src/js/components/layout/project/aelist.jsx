/**
 * AE列表
 */
import { Link } from 'react-router';
import { apiRoot } from 'config';
import { Breadcrumb, Icon, Table, Button, Modal, message, notification } from 'antd';

class ProjectAEList extends React.Component {
    constructor(props) {
      super(props);
      this.displayName = 'ProjectAEList';
      this._isMounted = false;

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
    getList(params = {}){
      this.setState({ loading: true });

      $.ajax({
        url: apiRoot + 'api/ae/list',
        type: 'get',
        dataType: 'json',
        data: params,
      }).done((res) => {
        if(!this._isMounted) return false;
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
    delItemsByIds(ids = []){
      this.setState({ loading: true });
      $.ajax({
        url: apiRoot + 'api/ae/del',
        type: 'post',
        dataType: 'json',
        data: { ids: ids },
      }).done((res) => {
        if(!this._isMounted) return false;
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
    componentWillUnmount() {
      this._isMounted = false;
    }
    componentDidMount() {
      this._isMounted = true;
      this.getList({
        page: this.state.pagination.current
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
        dataIndex: 'servicename',
      }, {
        title: '操作',
        width: 120,
        key: 'operation',
        render: (text, data) => {
          return <span>
            <Link to={ `/project/ae/edit/${ data.key }` }>修改</Link>
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
            <Breadcrumb.Item>AE团队</Breadcrumb.Item>
          </Breadcrumb>

          <div className="option-btns">
            <Link to="/project/ae/add">
              <Button type="primary">添加AE</Button>
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

export default ProjectAEList;

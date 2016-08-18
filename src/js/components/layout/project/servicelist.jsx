/**
 * 服务机构列表
 */
import { Link } from 'react-router';
import { apiRoot } from 'config';
import { Breadcrumb, Icon, Table, Button, Modal, message, notification } from 'antd';

class ProjectServiceList extends React.Component {
    constructor(props) {
      super(props);
      this.displayName = 'ProjectServiceList';

      this.state = {
        loading: true,
        delkeys : [],
        list: [],
        pagination: {}
      }
    }
    static defaultProps = {
      list : []
    }
    removeItem(item) {
      const self = this;
      return function(){
        Modal.confirm({
          title: '删除确认！',
          content: `您确认需要删除${item.name}`,
          onOk(){
            // message.success('您选择了确定');
            self.delItemsByIds([item.key]);
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
    getList(params = {}){
      this.setState({ loading: true });

      $.ajax({
        url: apiRoot + 'api/service/list',
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
        notification.error({
          message: '服务器异常',
          duration: 2
        });
      });
    }
    delItemsByIds(ids = []){
      this.setState({ loading: true });

      // request.post(apiRoot + 'api/service/del')
      //       .type('form')
      //       .send({ ids: [12, 13] })
      //       .end((err, res) => {
      //         if (err || !res.ok) {
      //           alert(err);
      //         }else{
      //           alert('删除成功');
      //         }
      //       });
    }
    handleTableChange(pagination, filters, sorter){
      const pager = this.state.pagination;
      pager.current = pagination.current;

      this.setState({
        pagination: pager
      });

      this.getList({
        page: pagination.current,
        pageSize: pagination.pageSize
      });
    }
    componentDidMount() {
      this.getList({
        page: 1
      });
    }
    render() {
      const columns = [{
        title: '机构名称',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '描述',
        dataIndex: 'desc',
        key: 'desc'
      }, {
        title: '操作',
        width: 120,
        key: 'operation',
        render: (text, data) => {
          return <span>
            <Link to={ `/user/update/${ data.key }` }>修改</Link>
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
            <Breadcrumb.Item>服务机构列表</Breadcrumb.Item>
          </Breadcrumb>

          <div className="option-btns">
            <Link to="/project/service/add">
              <Button type="primary">添加服务机构</Button>
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

export default ProjectServiceList;

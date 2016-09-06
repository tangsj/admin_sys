/**
 * 项目流水列表
 * @author tangsj
 */
import { apiRoot } from 'config';
import { Link } from 'react-router';
import { Breadcrumb, Icon, Table, Input, Button, Modal, message, notification } from 'antd';

class ProjectLineList extends React.Component {
    constructor(props) {
      super(props);
      this.displayName = 'ProjectLineList';
      this._isMounted = false;

      this.state = {
        loading: true,
        setPrice: false,
        delkeys : [],
        list: [],
        descModalData: {},
        descModalVisible: false,
        descLoadingText: '数据加载中...',
        descListData: [],
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
          content: `您确认需要删除【${item.title}】`,
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
        url: apiRoot + 'api/pline/del',
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
    getList(params = {}){
      this.setState({ loading: true });

      $.ajax({
        url: apiRoot + 'api/pline/list',
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
    componentWillUnmount() {
      this._isMounted = false;
    }
    componentDidMount() {
      this._isMounted = true;
      this.getList({
        page: this.state.pagination.current
      });
    }
    setDescList(id){
      // 加载描述详细
      $.ajax({
        url: apiRoot + 'api/pline/desc/' + id,
        type: 'get',
        dataType: 'json'
      }).done((res) => {
        if(!this._isMounted) return false;

        if(res.code == 1){
          this.setState({
            descListData: res.data
          });
        }else{
          this.setState({
            descLoadingText: '数据加载失败'
          });
        }
      }).fail(() => {
        this.setState({
          descLoadingText: '数据加载失败'
        });
      });
    }
    showDesc(item){
      return () => {
        this.setState({
          descModalVisible: true,
          setPrice: false,
          descModalData: item,
        });
        this.setDescList(item.key);
      }
    }
    setPrice(item){
      return () => {
        this.setState({
          descModalVisible: true,
          setPrice: true,
          descModalData: item,
        });
        this.setDescList(item.key);
      }
    }
    onDescModalHandleOk(){
      if(this.state.setPrice){
        let priceArr = [];
        this.state.descListData.forEach((item, i) => {
          let inputNode = ReactDOM.findDOMNode(this.refs['price_' + i]).getElementsByTagName('input')[0];
          let price = parseFloat(inputNode.value);
          let id = inputNode.getAttribute('data-id');
          priceArr.push(`${id}|${price}`);
        });

        $.ajax({
          url: apiRoot + 'api/pline/setprice',
          type: 'post',
          dataType: 'json',
          data: {prices: priceArr.join(',')},
        }).done((res) => {
          if(res.code == 1){
            message.success('价格更新成功！！');
            this.setState({
              descModalVisible: false
            });
          }
        }).fail(() => {
          notification.error({
            message: '服务器异常',
            duration: 2
          });
        });
      }else{
        this.setState({
          descModalVisible: false
        });
      }
    }
    onDescModalHandleCancel(){
      this.setState({
        descModalVisible: false
      });
    }
    render() {
      const columns = [{
        title: '流水标题',
        dataIndex: 'title'
      }, {
        title: '项目所属',
        dataIndex: 'pname'
      }, {
        title: 'AE',
        dataIndex: 'aename',
      }, {
        title: '开始日期',
        dataIndex: 'startTime',
      }, {
        title: '结束日期',
        dataIndex: 'endTime',
      }, {
        title: '耗时(小时)',
        dataIndex: 'useHour',
      }, {
        title: '负责人',
        dataIndex: 'charge',
      }, {
        title: '操作',
        width: 150,
        key: 'operation',
        render: (text, data) => {
          return <span>
            <a href="javascript:;" onClick={ this.showDesc(data) }>描述</a>
            <span className="ant-divider"></span>
            <a href="javascript:;" onClick={ this.removeItem(data) }>删除</a>
            <span className="ant-divider"></span>
            <a href="javascript:;" onClick={ this.setPrice(data) }>估价</a>
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
        }
      }

      const { descModalData, descListData} = this.state;
      let descEl;
      const descLineStyle = this.state.setPrice ? { paddingRight: '70px' } : {};
      if(descListData.length > 0){
        descEl = descListData.map( (data, i) => {
          const descPriceInput = this.state.setPrice ? (<Input ref={ `price_${ i }` } data-id={ data.id } defaultValue={ data.money } className="pline_desc_price_input" size="small" placeholder="价格" />) : '';
          return (
            <p className="pline_desc_list" style={ descLineStyle }  key={ `dlist_${data.id}_${i}` } data-index={ `${i+1}:` }>
              { data.text }
              { descPriceInput }
            </p>
          )
        } );
      }else{
        descEl = (
          <div>
            <Icon type="loading" style={{ fontSize: '14px', marginRight: '20px' }}/>
            { this.state.descLoadingText }
          </div>
        );
      }
      return (
        <div className="pline_list">
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

          <Table loading={ this.state.loading }
                pagination={ this.state.pagination }
                rowSelection={ rowSelection }
                columns={ columns }
                dataSource={ this.state.list }
                onChange={ this.handleTableChange.bind(this) }
          />

          <Modal className="pline_desc_modal" title={ `【${descModalData.title}】的详细描述` } visible={this.state.descModalVisible}
            onOk={this.onDescModalHandleOk.bind(this)} onCancel={this.onDescModalHandleCancel.bind(this)}
          >
            { descEl }
          </Modal>
        </div>
      );
    }
}

export default ProjectLineList;

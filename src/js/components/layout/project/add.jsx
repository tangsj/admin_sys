/**
 * 添加项目
 * @author tangsj
 */
import { apiRoot } from 'config';
import { Breadcrumb, Form, Input, Select, Icon, Button, Modal, message, notification } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class AddForm extends React.Component {
    constructor(props) {
      super(props);
      this.displayName = 'AddForm';

      this.state = {
        serviceOptions : []
      }
    }
    handleSubmit(e){
      e.preventDefault();
      let id = this.props.id;

      this.props.form.validateFields((errors, values) => {
        if (!!errors) {
          return;
        }

        let url = apiRoot + 'api/project/add';
        if(id){
          url = apiRoot + 'api/project/edit/' + id;
        }

        // 新增 OR 修改
        $.ajax({
          url: url,
          type: 'post',
          dataType: 'json',
          data: values,
        }).done((res) => {
          let mt = '', mc = '', type = 'info';

          if(res.code == 1){
            type = 'success';
            mt = id ? '修改成功' : '添加成功';
            mc = id ? `您已修改项目：${ values.name }` : `您已新增项目：${ values.name }`;
            this.props.form.resetFields();
          }else{
            type = 'error';
            mt = id ? '修改失败' : '添加失败';
            mc = `消息：${ res.message }`;
          }

          notification[type]({
            message: mt,
            description: mc,
            duration: 2,
            onClose: () => {
              this.props.call();
            }
          });
        }).fail(() => {
          notification.error({
            message: '服务器异常',
            duration: 2
          });
        });
      });
    }
    setFormData(){
      let id = this.props.id;
      const { setFieldsValue } = this.props.form;
      if(!!id){
        $.ajax({
          url: apiRoot + 'api/project/get/' + id,
          type: 'get',
          dataType: 'json'
        }).done((res) => {
          if(res.code == 1){
            setFieldsValue({
              name: res.data[0].name,
              serviceid: res.data[0].serviceid,
              description: res.data[0].description
            });
          }
        }).fail(() => {
          notification.error({
            message: '服务器异常',
            duration: 2
          });
        });
      }
    }
    componentDidMount() {
      $.ajax({
        url: apiRoot + 'api/service/all',
        type: 'get',
        dataType: 'json'
      }).done((res) => {
        if(res.code == 1){
          let options = res.data.map(function(item, index){
            return <Option key={ `s_${item.key}` } value={ item.key }>{ item.name }</Option>
          });

          this.setState({
            serviceOptions: options
          });

          this.setFormData();
        }
      }).fail(() => {
        notification.error({
          message: '服务器异常',
          description: '服务机构加载失败！',
          duration: 2
        });
      });
    }
    render() {
      const { getFieldProps } = this.props.form;
      const formItemLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 7 }
      };

      const nameProps = getFieldProps('name', {
        validate: [{
          rules: [
            { required: true, message: "请输入项目名称" },
          ],
          trigger: 'onBlur'
        }]
      });

      const serviceIDProps = getFieldProps('serviceid', {
        validate: [{
          rules: [
            { required: true, message: "请选择服务机构", type: "integer"},
          ],
          trigger: 'onBlur'
        }]
      });

      const descProps = getFieldProps('description', {});

      return (
        <Form horizontal form={this.props.form}>
          <FormItem
            {...formItemLayout}
            label="项目名称"
            required
            hasFeedback
          >
            <Input {...nameProps} placeholder="输入项目名称"/>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="所属服务机构"
            required
            hasFeedback
          >
            <Select {...serviceIDProps} placeholder="选择所属服务机构">
              { this.state.serviceOptions }
            </Select>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="项目描述"
          >
            <Input {...descProps} type="textarea" placeholder="请输入项目描述,30字以上" rows={10}/>
          </FormItem>

          <FormItem wrapperCol={{ offset: 2 }} style={{ marginTop: 24 }}>
            <Button type="primary" htmlType="submit" onClick={ this.handleSubmit.bind(this) }>确定</Button>
          </FormItem>
        </Form>
      );
    }
}
const Add = Form.create()(AddForm);

class ProjectAdd extends React.Component {
    constructor(props) {
      super(props);
      this.displayName = 'ProjectAdd';
    }
    callHandler(){
      this.context.router.push('/project/list');
    }
    render() {
      return (
        <div>
          <Breadcrumb>
            <Breadcrumb.Item><Icon type="home"/>首页</Breadcrumb.Item>
            <Breadcrumb.Item>项目管理</Breadcrumb.Item>
            <Breadcrumb.Item>添加项目</Breadcrumb.Item>
          </Breadcrumb>

          <Add call={ this.callHandler.bind(this) } id={ this.props.params.id }/>
        </div>
      );
    }
}

ProjectAdd.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default ProjectAdd;

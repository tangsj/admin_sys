/**
 * 添加服务机构
 * @author tangsj
 */
import { apiRoot } from 'config';
import { Breadcrumb, Form, Input, Icon, Button, Modal, message, notification } from 'antd';
const FormItem = Form.Item;

class AddForm extends React.Component {
    constructor(props) {
      super(props);
      this.displayName = 'AddForm';

      this.state = {
        sending: false
      }
    }
    submitHandler(e){
      e.preventDefault();
      const id = this.props.id;


      this.props.form.validateFields((errors, values) => {
        if (!!errors) {
          return;
        }

        this.setState({
          sending: true
        });

        let url = apiRoot + 'api/service/add';
        if(id){
          url = apiRoot + 'api/service/edit/' + id;
        }

        // 新增 OR 修改
        $.ajax({
          url: url,
          type: 'post',
          dataType: 'json',
          data: values,
        }).done((res) => {
          this.setState({
            sending: false
          });

          let mt = '', mc = '', type = 'info';

          if(res.code == 1){
            type = 'success';
            mt = id ? '修改成功' : '添加成功';
            mc = id ? `您已修改服务机构：${ values.name }` : `您已新增服务机构：${ values.name }`;
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

      return false;
    }
    setFormData(){
      let id = this.props.id;
      const { setFieldsValue } = this.props.form;
      if(!!id){
        $.ajax({
          url: apiRoot + 'api/service/get/' + id,
          type: 'get',
          dataType: 'json'
        }).done((res) => {
          if(res.code == 1){
            setFieldsValue({
              name: res.data[0].name,
              desc: res.data[0].desc
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
      this.setFormData();
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
            { required: true, message: "请输入机构名称" },
          ],
          trigger: 'onBlur'
        }]
      });
      const descProps = getFieldProps('desc');

      return (
        <Form horizontal>
          <FormItem
            {...formItemLayout}
            label="机构名称"
            required
          >
            <Input {...nameProps} placeholder="输入机构名称"/>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="机构描述"
          >
            <Input {...descProps} type="textarea" placeholder="请输入机构描述" rows={5}/>
          </FormItem>

          <FormItem wrapperCol={{ offset: 2 }} style={{ marginTop: 24 }}>
            <Button loading={ this.state.sending } type="primary" onClick={ this.submitHandler.bind(this) } htmlType="submit">确定</Button>
          </FormItem>
        </Form>
      );
    }
}

const ServiceFrom = Form.create()(AddForm);

class ProjectServiceAdd extends React.Component {
    constructor(props) {
      super(props);
      this.displayName = 'ProjectServiceAdd';
    }
    callHandler(){
      this.context.router.push('/project/service/list');
    }
    render() {
      return (
        <div>
          <Breadcrumb>
            <Breadcrumb.Item><Icon type="home"/>首页</Breadcrumb.Item>
            <Breadcrumb.Item>项目管理</Breadcrumb.Item>
            <Breadcrumb.Item>{ this.props.params.id ? '修改' : '添加' }服务机构</Breadcrumb.Item>
          </Breadcrumb>

          <ServiceFrom call={ this.callHandler.bind(this) } id={ this.props.params.id }/>
        </div>
      );
    }
}

ProjectServiceAdd.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default ProjectServiceAdd;

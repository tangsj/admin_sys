/**
 * 添加AE
 * @author tangsj
 */
import { apiRoot } from 'config';
import { Reg } from 'util';
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
    checkPhone(rule, value, callback){
      if(!value){
        callback();
        return false;
      }

      if(Reg.mobile.test(value)){
        callback();
      }else{
        callback(new Error('手机号码格式有误！'));
      }
    }
    submitHandler(e){
      e.preventDefault();
      const id = this.props.id;

      this.props.form.validateFields((errors, values) => {
        if (!!errors) {
          return;
        }

        let url = apiRoot + 'api/ae/add';
        if(id){
          url = apiRoot + 'api/ae/edit/' + id;
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
            mc = id ? `您已修改AE：${ values.name }` : `您已新增AE：${ values.name }`;
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
          url: apiRoot + 'api/ae/get/' + id,
          type: 'get',
          dataType: 'json'
        }).done((res) => {
          if(res.code == 1){
            setFieldsValue({
              name: res.data[0].name,
              enname: res.data[0].enname,
              phone: res.data[0].phone,
              serviceid: res.data[0].serviceid
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
            return <Option key={ `s_${item.key}` } value={ `${ item.key }` }>{ item.name }</Option>
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
        wrapperCol: { span: 5 }
      };

      const nameProps = getFieldProps('name', {
        validate: [{
          rules: [
            { required: true, message: "请输入AE名称" },
          ],
          trigger: 'onBlur'
        }]
      });
      const enNameProps = getFieldProps('enname');
      const phoneProps = getFieldProps('phone', {
        validate: [{
          rules: [
            { required: true, message: "请输入电话号码" },
            { validator: this.checkPhone }
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

      return (
        <Form horizontal>
          <FormItem
            {...formItemLayout}
            label="姓名"
            required
          >
            <Input {...nameProps} placeholder="输入AE姓名"/>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="英文名"
          >
            <Input {...enNameProps} placeholder="输入AE英文名"/>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="电话"
            required
          >
            <Input {...phoneProps} placeholder="输入电话号码"/>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="所属服务机构"
            required
          >
            <Select {...serviceIDProps} placeholder="请选择所属服务机构">
              { this.state.serviceOptions }
            </Select>
          </FormItem>

          <FormItem wrapperCol={{ offset: 2 }} style={{ marginTop: 24 }}>
            <Button type="primary" onClick={ this.submitHandler.bind(this) } htmlType="submit">确定</Button>
          </FormItem>
        </Form>
      );
    }
}

const AEForm = Form.create()(AddForm);

class ProjectAEAdd extends React.Component {
    constructor(props) {
      super(props);
      this.displayName = 'ProjectAEAdd';
    }
    callHandler(){
      this.context.router.push('/project/ae/list');
    }
    render() {
      return (
        <div>
          <Breadcrumb>
            <Breadcrumb.Item><Icon type="home"/>首页</Breadcrumb.Item>
            <Breadcrumb.Item>项目管理</Breadcrumb.Item>
            <Breadcrumb.Item>添加AE</Breadcrumb.Item>
          </Breadcrumb>

          <AEForm call={ this.callHandler.bind(this) } id={ this.props.params.id }/>
        </div>
      );
    }
}

ProjectAEAdd.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default ProjectAEAdd;

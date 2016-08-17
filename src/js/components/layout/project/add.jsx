/**
 * 添加项目
 * @author tangsj
 */
import { Breadcrumb, Form, Input, Select, Icon, Button, Modal, message, notification } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class AddForm extends React.Component {
    constructor(props) {
      super(props);
      this.displayName = 'AddForm';
    }
    handleSubmit(e){
      e.preventDefault();
      this.props.form.validateFields((errors, values) => {
        if (!!errors) {
          return;
        }
        console.log('Submit!!!');
        console.log(values);
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

      const descProps = getFieldProps('desc', {});

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
            <Select defaultValue="">
              <Option value="">--请选择--</Option>
              <Option value="1">东风日产</Option>
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
    render() {
      return (
        <div>
          <Breadcrumb>
            <Breadcrumb.Item><Icon type="home"/>首页</Breadcrumb.Item>
            <Breadcrumb.Item>项目管理</Breadcrumb.Item>
            <Breadcrumb.Item>添加项目</Breadcrumb.Item>
          </Breadcrumb>

          <Add />
        </div>
      );
    }
}

export default ProjectAdd;

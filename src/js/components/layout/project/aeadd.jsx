/**
 * 添加AE
 * @author tangsj
 */
import { Breadcrumb, Form, Input, Select, Icon, Button, Modal, message, notification } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class ProjectAEAdd extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ProjectAEAdd';
    }
    render() {
      const formItemLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 5 }
      };

      return (
        <div>
          <Breadcrumb>
            <Breadcrumb.Item><Icon type="home"/>首页</Breadcrumb.Item>
            <Breadcrumb.Item>项目管理</Breadcrumb.Item>
            <Breadcrumb.Item>添加AE</Breadcrumb.Item>
          </Breadcrumb>

          <Form horizontal>
            <FormItem
              {...formItemLayout}
              label="姓名"
            >
              <Input placeholder="输入AE姓名"/>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="英文名"
            >
              <Input placeholder="输入AE英文名"/>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="电话"
            >
              <Input placeholder="输入电话号码"/>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="所属服务机构"
            >
              <Select defaultValue="1">
                <Option value="1">东风日产</Option>
              </Select>
            </FormItem>

            <FormItem wrapperCol={{ offset: 2 }} style={{ marginTop: 24 }}>
              <Button type="primary" htmlType="submit">确定</Button>
            </FormItem>
          </Form>
        </div>
      );
    }
}

export default ProjectAEAdd;

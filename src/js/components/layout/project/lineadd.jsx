/**
 * 添加项目流水
 * @author tangsj
 */
import { Breadcrumb, Form, Input, Select, DatePicker, Icon, Button, Modal, message, notification } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

class ProjectLineAdd extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ProjectLineAdd';
    }
    render() {
      const formItemLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 7 }
      };

      return (
        <div>
          <Breadcrumb>
            <Breadcrumb.Item><Icon type="home"/>首页</Breadcrumb.Item>
            <Breadcrumb.Item>项目管理</Breadcrumb.Item>
            <Breadcrumb.Item>添加项目流水</Breadcrumb.Item>
          </Breadcrumb>

          <Form horizontal>
            <FormItem
              {...formItemLayout}
              label="服务机构"
            >
              <Select defaultValue="1">
                <Option value="1">东风日产</Option>
              </Select>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="项目名称"
            >
              <Select defaultValue="1">
                <Option value="1">天籁</Option>
              </Select>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="项目描述"
            >
              <Input type="textarea" placeholder="请输入项目描述,30字以上" rows={10}/>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="AE"
            >
              <Select defaultValue="1">
                <Option value="1">Total</Option>
              </Select>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="时间周期"
            >
              <RangePicker style={{ width: 200 }} />
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="负责人"
            >
              <Select defaultValue="1">
                <Option value="1">tangsj</Option>
              </Select>
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="报价"
            >
              <Input placeholder="输入价格"/>
            </FormItem>

            <FormItem wrapperCol={{ offset: 2 }} style={{ marginTop: 24 }}>
              <Button type="primary" htmlType="submit">确定</Button>
            </FormItem>
          </Form>
        </div>
      );
    }
}

export default ProjectLineAdd;

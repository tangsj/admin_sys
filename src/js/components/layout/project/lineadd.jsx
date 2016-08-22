/**
 * 添加项目流水
 * "react": "^0.14.6",
    "react-dom": "^0.14.6"
 * @author tangsj
 */
import { apiRoot } from 'config';
import moment from 'moment';
import { Breadcrumb, Form, Input, Select, DatePicker, Icon, Button, Modal, message, notification } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

class AddForm extends React.Component {
    constructor(props) {
      super(props);
      this.displayName = 'AddForm';

      this.state = {
        projectOptions: [],
        aeOptions: []
      }
    }
    handleSubmit(e){
      e.preventDefault();
      let id = this.props.id;

      this.props.form.validateFields((errors, values) => {
        if (!!errors) {
          return;
        }

        // 格式化开始和结束时间
        values.startTime = moment(values.startTime).format('YYYY-MM-DD HH:mm:ss');
        values.endTime = moment(values.endTime).format('YYYY-MM-DD HH:mm:ss');

        let url = apiRoot + 'api/pline/add';
        if(id){
          url = apiRoot + 'api/pline/edit/' + id;
        }

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
            mc = id ? `您已修改项目流水：${ values.title }` : `您已新增项目流水：${ values.title }`;
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
              // this.props.call();
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
    componentDidMount() {
      // 组件挂载后 加载服务机构和AE列表
      let projectPro = new Promise((resolve, reject) => {
        $.ajax({
          url: apiRoot + 'api/project/all',
          type: 'get',
          dataType: 'json'
        }).done((res) => {
          if(res.code == 1){
            let options = res.data.map(function(item, index){
              return <Option key={ `s_${item.key}` } value={ `${item.key}` }>{ item.name }</Option>
            });

            this.setState({
              projectOptions: options
            });

            resolve();
          }
        }).fail(() => {
          notification.error({
            message: '服务器异常',
            description: '服务机构加载失败！',
            duration: 2
          });
        });
      });

      let aePro = new Promise((resolve, reject) => {
        $.ajax({
          url: apiRoot + 'api/ae/all',
          type: 'get',
          dataType: 'json'
        }).done((res) => {
          if(res.code == 1){
            let options = res.data.map(function(item, index){
              return <Option key={ `s_${item.key}` } value={ `${item.key}` }>{ item.name }</Option>
            });

            this.setState({
              aeOptions: options
            });

            resolve();
          }
        }).fail(() => {
          notification.error({
            message: '服务器异常',
            description: 'AE数据加载失败！',
            duration: 2
          });
        });
      });

      Promise.all([projectPro, aePro]).then(() => {
        console.log('data load over')
      });
    }
    render() {
      const { getFieldProps } = this.props.form;
      const formItemLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 7 }
      };

      const titleProps = getFieldProps('title', {
        validate: [{
          rules: [
            { required: true, message: "流水标题不能为空"},
          ],
          trigger: 'onBlur'
        }]
      });

      const descriptionProps = getFieldProps('description', {
        validate: [{
          rules: [
            { required: true, message: "项目描述不能为空"},
          ],
          trigger: 'onBlur'
        }]
      });

      const proProps = getFieldProps('pid', {
        validate: [{
          rules: [
            { required: true, message: "所属项目不能为空", type: "integer"},
          ],
          trigger: 'onBlur'
        }]
      });

      const aeProps = getFieldProps('aeid', {
        validate: [{
          rules: [
            { required: true, message: "AE不能为空", type: "integer"},
          ],
          trigger: 'onBlur'
        }]
      });

      const startTimeProps = getFieldProps('startTime', {
        rules: [
          { required: true, message: "项目开始时间不能为空", type: "date"}
        ]
      });

      const endTimeProps = getFieldProps('endTime', {
        rules: [
          { required: true, message: "项目结束时间不能为空", type: "date"}
        ]
      });

      const useHourProps = getFieldProps('useHour', {
        validate: [{
          rules: [
            { required: true, message: "项目实际耗时不能为空"},
          ],
          trigger: 'onBlur'
        }]
      });

      const chargeProps = getFieldProps('charge', {
        validate: [{
          rules: [
            { required: true, message: "项目负责人不能为空"},
          ],
          trigger: 'onBlur'
        }]
      });

      const statusProps = getFieldProps('status', {
        validate: [{
          rules: [
            { required: true, message: "项目状态不能为空"},
          ],
          trigger: 'onBlur'
        }]
      });

      return (
        <Form horizontal>
          <FormItem
            {...formItemLayout}
            label="流水标题"
            required
          >
            <Input {...titleProps} placeholder="请输入流水标题"/>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="流水描述"
            required
          >
            <Input {...descriptionProps} type="textarea" placeholder="请输入项目描述,30字以上" rows={10}/>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="所属项目"
            required
          >
            <Select {...proProps} placeholder="请选择所属项目">
              {this.state.projectOptions}
            </Select>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="AE"
            required
          >
            <Select {...aeProps} placeholder="请选择项目AE">
              {this.state.aeOptions}
            </Select>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="开始时间"
            required
          >
            <DatePicker showTime format="yyyy-MM-dd" {...startTimeProps} style={{ width: '100%' }} placeholder="请选择项目开始时间"/>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="结束时间"
            required
          >
            <DatePicker showTime format="yyyy-MM-dd" {...endTimeProps} style={{ width: '100%' }} placeholder="请选择项目结束时间"/>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="实际耗时"
            required
          >
            <Input {...useHourProps} placeholder="请输入项目实际耗时(小时)" addonAfter="小时"/>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="负责人"
            required
          >
            <Input {...chargeProps} placeholder="请输入项目负责人姓名"/>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="进行状态"
            required
          >
            <Select {...statusProps} placeholder="请选择项目当前状态">
              <Option value="1">未开始</Option>
              <Option value="2">进行中</Option>
              <Option value="3">已结束</Option>
            </Select>
          </FormItem>

          <FormItem wrapperCol={{ offset: 2 }} style={{ marginTop: 24 }}>
            <Button type="primary" onClick={ this.handleSubmit.bind(this) } htmlType="submit">确定</Button>
          </FormItem>
        </Form>
      );
    }
}

const ProjectLineForm = Form.create()(AddForm);

class ProjectLineAdd extends React.Component {
    constructor(props) {
      super(props);
      this.displayName = 'ProjectLineAdd';
    }
    render() {
      return (
        <div>
          <Breadcrumb>
            <Breadcrumb.Item><Icon type="home"/>首页</Breadcrumb.Item>
            <Breadcrumb.Item>项目管理</Breadcrumb.Item>
            <Breadcrumb.Item>添加项目流水</Breadcrumb.Item>
          </Breadcrumb>

          <ProjectLineForm />
        </div>
      );
    }
}

export default ProjectLineAdd;

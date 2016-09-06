/**
 * 添加项目流水
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
      this._isMounted = false;

      this.state = {
        projectOptions: [],
        aeOptions: [],
        descArr: [],
        descValidationStatus: 'success',
        descValidationHelp: ''
      }
    }
    handleSubmit(e){
      e.preventDefault();
      let id = this.props.id;

      this.props.form.validateFields((errors, values) => {
        if (!!errors) {
          return;
        }
        // 验证是添加流水描述
        if(this.state.descArr.length == 0){
          this.setState({
            descValidationStatus: 'error',
            descValidationHelp: '请输入项目描述，15字以上'
          });
          return false;
        }
        values.description = this.state.descArr;

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
          if(!this._isMounted) return false;
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
    componentWillUnmount() {
      this._isMounted = false;
    }
    componentDidMount() {
      this._isMounted = true;
      // 组件挂载后 加载服务机构和AE列表
      let projectPro = new Promise((resolve, reject) => {
        $.ajax({
          url: apiRoot + 'api/project/all',
          type: 'get',
          dataType: 'json'
        }).done((res) => {
          if(!this._isMounted) return false;
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
          if(!this._isMounted) return false;
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
    removeDesc(index){
      let arr = this.state.descArr;
      // 删除
      arr.splice(index, 1);

      this.setState({
        descArr: arr
      })
    }
    addDesc(e){
      const { getFieldValue, setFieldsValue } = this.props.form;

      if(e.type == 'click' || (e.type == 'keyup' && e.keyCode == 13)){
        let desc = (getFieldValue('description') || '').trim();
        let descInstace = this.props.form.getFieldInstance('description');

        if(desc.length < 15){
          this.setState({
            descValidationStatus: 'error',
            descValidationHelp: '请输入项目描述，15字以上'
          });

          descInstace.refs.input.focus();
        }else{
          setFieldsValue({
            'description': ''
          });
          this.setState({
            descArr: [desc].concat(this.state.descArr),
            descValidationStatus: 'success',
            descValidationHelp: ''
          });
        }
      }

      return false;
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

      const descriptionProps = getFieldProps('description');

      const proProps = getFieldProps('pid', {
        validate: [{
          rules: [
            { required: true, message: "所属项目不能为空"},
          ],
          trigger: 'onBlur'
        }]
      });

      const aeProps = getFieldProps('aeid', {
        validate: [{
          rules: [
            { required: true, message: "AE不能为空"},
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

      const descAfter = (
        <Icon type="plus" onClick={ this.addDesc.bind(this) } style={{ cursor: "pointer" }}/>
      );

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
            validateStatus={ this.state.descValidationStatus }
            help={ this.state.descValidationHelp }
          >
            <Input onKeyUp={ this.addDesc.bind(this) }
                   {...descriptionProps}
                   placeholder="请输入项目描述，15字以上"
                   addonAfter={ descAfter }
            />
          </FormItem>

          {
            this.state.descArr.map((text, index) => {
              return (
                <FormItem
                  label={ index+1 }
                  key={ `desc_${ index }` }
                  {...formItemLayout}
                >
                  <p className="ant-form-text" name="static">{ text }</p>
                  <p className="ant-form-text"><a onClick={ this.removeDesc.bind(this, index) } href="javascript:;">删除</a></p>
                </FormItem>
              )
            })
          }

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

          <FormItem wrapperCol={{ offset: 2 }} style={{ marginTop: 24 }}>
            <Button type="primary" onClick={ this.handleSubmit.bind(this) } >提 交</Button>
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

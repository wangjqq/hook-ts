import React from 'react'
import { Col, Row, Form, Input, Modal } from 'antd'

interface Values {
  title: string
  description: string
  modifier: string
}

interface CollectionCreateFormProps {
  open: boolean
  onCreate: (values: Values) => void
  onCancel: () => void
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
}

const AddInfoForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm()

  return (
    <Modal
      open={open}
      title="新建人员信息"
      okText="创建"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields()
            onCreate(values)
          })
          .catch((info) => {
            console.log('Validate Failed:', info)
          })
      }}>
      <Form
        form={form}
        // {...layout}
        layout="vertical"
        name="form_in_modal"
        // style={{ maxWidth: 30 }}
        initialValues={{ modifier: 'public' }}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="姓名"
              rules={[
                {
                  required: true,
                  message: '请输入姓名!',
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="age"
              label="年龄"
              rules={[
                {
                  required: true,
                  message: '请输入年龄!',
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="des"
              label="岗位"
              rules={[
                {
                  required: true,
                  message: '请输入岗位!',
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="number"
              label="工号"
              rules={[
                {
                  required: true,
                  message: '请输入工号!',
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default AddInfoForm

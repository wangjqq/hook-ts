import React from 'react'
import { Col, Row, Form, Input, Modal } from 'antd'

interface IValues {
  title: string
  description: string
  modifier: string
}
interface IInfo {
  key: number
  id: number
  name: string
  des: string
  age: string
  number: string
}
interface CollectionCreateFormProps {
  info: IInfo
  type: boolean
  open: boolean
  onCreate: (values: IValues) => void
  onCancel: () => void
}

const InfoForm: React.FC<CollectionCreateFormProps> = ({
  type,
  info,
  open,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm()
  setTimeout(() => {
    if (type && form) {
      // form.setFieldsValue(info)
      form.setFieldsValue({
        name: info.name,
        des: info.des,
        age: info.age,
        number: info.number,
      })
    }
  }, 100)

  const cancel = () => {
    form.setFieldsValue({
      name: '',
      des: '',
      age: '',
      number: '',
    })
    console.log(2)
    // Modal.destroyAll()
    onCancel()
  }

  return (
    <Modal
      forceRender
      open={open}
      title={(type ? '修改' : '新建') + '人员信息'}
      okText={type ? '修改' : '创建'}
      cancelText="取消"
      onCancel={cancel}
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
        // initialValues={type ? info : { modifier: 'public' }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="姓名"
              // initialValue={type ? info.name : info.name}
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

export default InfoForm

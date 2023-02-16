import React, { useEffect, useState } from 'react'
import { Table, Button, Space, Popconfirm, message } from 'antd'
import { getList, addList, delList } from 'interface/Home'
import AddInfoForm from 'components/AddInfoForm'

const { Column } = Table //解构出列

const Home: React.FC = () => {
  const [open, setOpen] = useState(false) //添加的弹窗是否显示

  const onCreate = (values: any) => {
    //确认添加处理函数
    values.key = Date.now()
    addList(values).then((res) => {
      getList().then((res) => {
        setlist(res.data)
      })
    })
    setOpen(false)
  }

  const [listData, setlist] = useState([]) //列表的状态

  useEffect(() => {
    getList().then((res) => {
      setlist(res.data)
    })
  }, [])

  const delConfirm = (record: any) => {
    //删除的处理函数
    delList(record.id).then((res) => {
      getList().then((res) => {
        setlist(res.data)
      })
    })
    message.info('删除成功!')
  }

  return (
    <div className="Home">
      <div className="handle">
        <Button
          type="primary"
          onClick={() => {
            setOpen(true)
          }}>
          新建
        </Button>
      </div>

      <Table dataSource={listData}>
        <Column title="id" dataIndex="id" />
        <Column title="姓名" dataIndex="name" />
        <Column title="描述" dataIndex="des" />
        <Column title="年龄" dataIndex="age" />
        <Column title="工号" dataIndex="number" />
        <Column
          title="操作"
          key="action"
          render={(_: any, record: any) => (
            <Space size="middle">
              <a>编辑</a>
              <Popconfirm
                placement="topLeft"
                title={'确认删除'}
                description={'删除后无法恢复!'}
                // onConfirm={confirm}
                onConfirm={delConfirm.bind(this, record)}
                okText="Yes"
                cancelText="No">
                <a>删除{record.id}</a>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>

      <AddInfoForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </div>
  )
}

export default Home

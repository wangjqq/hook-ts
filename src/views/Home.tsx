import React, { useEffect, useState } from 'react'
import { Table, Button, Space, Popconfirm, message, Input } from 'antd'
import { getList, addList, delList, editList, searchList } from 'interface/Home'
import InfoForm from 'components/InfoForm'

import 'styles/Home.css'

const { Column } = Table //解构出列
const { Search } = Input //解构出搜索框

const Home: React.FC = () => {
  const [open, setOpen] = useState(false) //弹窗是否显示
  const [type, setType] = useState(false) //判断是编辑还是新增 false为新增 true为编辑
  const [info, setinfo] = useState({
    key: 1,
    id: 1,
    name: '王景奇',
    des: '前端实习生',
    age: '21',
    number: '109222',
  }) //保存编辑对象信息

  const onCreate = (values: any) => {
    if (type === false) {
      //确认添加处理函数
      values.key = Date.now()
      addList(values).then((res) => {
        getList().then((res) => {
          setlist(res.data)
        })
      })
      setType(false)
    } else {
      // 确认修改处理函数
      values.key = info.key
      editList(values, info.id).then((res) => {
        getList().then((res) => {
          setlist(res.data)
        })
      })
      setType(false)
    }

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

  const onSearch = (e: string) => {
    //搜索的处理函数
    console.log(e)
    searchList(e).then((res) => {
      setlist(res.data)
    })
    message.info('搜索成功!')
  }

  return (
    <div className="Home">
      <div className="handle">
        <Space>
          <Button
            type="primary"
            onClick={() => {
              setOpen(true)
              setType(false)
            }}>
            新增
          </Button>
          <Search
            style={{ width: 304 }}
            placeholder="搜索"
            onSearch={onSearch}
            enterButton
          />
        </Space>
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
              <p
                className="btn"
                onClick={() => {
                  setOpen(true)
                  setType(true)
                  setinfo(record)
                }}>
                编辑
              </p>
              <Popconfirm
                placement="topLeft"
                title={'确认删除'}
                description={'删除后无法恢复!'}
                // onConfirm={confirm}
                onConfirm={delConfirm.bind(this, record)}
                okText="Yes"
                cancelText="No">
                <p className="btn">删除</p>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>

      <InfoForm
        type={type} //判断是编辑还是新增
        open={open}
        info={info}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false)
          setType(false)
        }}
      />
    </div>
  )
}

export default Home

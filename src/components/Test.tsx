import React, { useState } from 'react'

function Test() {
  // 声明一个叫 "count" 的 state 变量
  const [count, setCount] = useState(0)
  // setCount(count + 1)
  let count1 = 1
  return (
    <div>
      <p>You clicked {count} times</p>
      <p>You clicked {count1} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={() => (count1 = count1 + 1)}>Click me</button>
    </div>
  )
}

export default Test

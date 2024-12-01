import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { ConfigProvider, Button, message } from 'antd'

import zhCN from 'antd/locale/zh_CN'

import Login from 'pages/login/login'

const App: React.FC = () => {
  function btnClick() {
    // props.addItem()
    // @ts-ignore
    message.info('NODE_ENV: ' + ENV)
  }

  return (
    <ConfigProvider locale={zhCN}>
      <div className="App">
        <BrowserRouter basename="/">
          <ul>
            <li>
              <Link to="/login">login</Link>
            </li>
            <li>
              <Button type="primary" onClick={btnClick}>
                Click
              </Button>
            </li>
            <input type="color" />
            {/* {
              props.list.map((v, i) => <li key={i}>{v}</li>)
            } */}
          </ul>
          <Routes>
            <Route path="/" />
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ConfigProvider>
  )
}

export default App

import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Button, message } from 'antd'

import Login from './login/login'

const App = () => {
  function btnClick() {
    // props.addItem()
    message.info('NODE_ENV: ' + ENV)
  }

  return (
    <div className="App">
      <BrowserRouter basename="/">
        <ul>
          <li>
            <Button type="primary" onClick={btnClick}>
              Click Btn
            </Button>
          </li>
          <input type="color" />
          <p>
            <Link to="/login">Login</Link>
          </p>
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
  )
}

export default App

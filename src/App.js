import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { Button, message } from 'antd'
import Comp1 from './comp1'
import Comp2 from './comp2'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ul>
          <li><Link to="/comp1">comp1</Link></li>
          <li><Link to="/comp2">comp2</Link></li>
          <li>
            <Button type="primary" onClick={() => message.info('primary button...')}>button</Button>
          </li>
        </ul>
        <Route path="/comp1" component={Comp1}></Route>
        <Route path="/comp2" component={Comp2}></Route>
      </BrowserRouter>
    </div>
  )
}

export default App

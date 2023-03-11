import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'antd-mobile'
import './home.scss'

 const Home = () => {

  return (
    <div className="home__page">
      <div className="home__header">
        {/* <h1>我的体检报告</h1> */}
      </div>
      <div className="home__box">
        <ul>
          <li>
            <div className="box__content">
              <div className="box__content_left">张三</div>
              <div className="box__content_right">
                <p>2022-09-21 13:15:14</p>
                <p>安徽xx医院</p>
              </div>
            </div>
            <div className="box__footer">
              <NavLink to="overview?q=2022">
                <Button color="primary" block>查看</Button>
              </NavLink>
            </div>
          </li>
          <li>
            <div className="box__content">
              <div className="box__content_left">张三</div>
              <div className="box__content_right">
                <p>2021-09-01 12:13:14</p>
                <p>安徽xx医院</p>
              </div>
            </div>
            <div className="box__footer">
              <NavLink to="overview?q=2021">
                <Button color="primary" block>查看</Button>
              </NavLink>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Home

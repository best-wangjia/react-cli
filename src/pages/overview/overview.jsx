import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { List, Button } from 'antd-mobile'
import './overview.scss'

 const Overview = () => {

  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  // const q = searchParams.get('q')
  // console.log(q)

  const linkTo = (item, type) => {
    navigate(`/overview/detail/${item}?t=${encodeURIComponent(type)}`)
  }

  return (
    <div className="overview__page">
      <div className="overview__header">
        <div className="overview__header_content">
          <p>身高：178.2cm</p>
          <p>体重：73.5kg</p>
        </div>
      </div>
      <div className="overview__box">
        <List>
          <List.Item onClick={() => linkTo('base', '基本信息')}>
            基本信息
          </List.Item>
          <List.Item onClick={() => linkTo('base', '体检建议')}>
            体检建议
          </List.Item>
          <List.Item onClick={() => linkTo('base', '体检综述')}>
            体检综述
          </List.Item>
        </List>
        <br />
        <List header='全部检查项'>
          <List.Item onClick={() => linkTo('case', '检验科')} extra={<><span style={{"color": "red"}}>1</span> 项重点关注</>}>
            检验科
          </List.Item>
          <List.Item onClick={() => linkTo('case', '一般检查')}>
            一般检查
          </List.Item>
          <List.Item onClick={() => linkTo('case', '内科')}>
            内科
          </List.Item>
          <List.Item onClick={() => linkTo('case', '外科')}>
            外科
          </List.Item>
          <List.Item onClick={() => linkTo('case', '彩超科')}>
            彩超科
          </List.Item>
          <List.Item onClick={() => linkTo('case', '放射科')}>
            放射科
          </List.Item>
        </List>
      </div>
    </div>
  )
}

export default Overview

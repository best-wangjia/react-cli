import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams, useParams } from 'react-router-dom'
import { List, Button } from 'antd-mobile'
import './detail.scss'

 const Detail = () => {

  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { item } = useParams()
  const [type, setType] = useState('')

  const renderBase = () => {
    return (
      <div className="detail__content">
        <p>这里是您的{type}详情</p>
        <p>这里是您的{type}详情</p>
        <p>这里是您的{type}详情</p>
        <p>这里是您的{type}详情</p>
        <p>这里是您的{type}详情</p>
        <p>这里是您的{type}详情</p>
        <p>这里是您的{type}详情</p>
        <p>这里是您的{type}详情</p>
        <p>这里是您的{type}详情</p>
      </div>
    )
  }

  const renderCase = () => {
    return (
      <List mode="card">
        <List.Item extra="未见异常">
          该科科目项1
        </List.Item>
        <List.Item extra="未见异常">
          该科科目项2
        </List.Item>
        <List.Item extra="未见异常">
          该科科目项3
        </List.Item>
        <List.Item extra="未见异常">
          该科科目项4
        </List.Item>
        <List.Item extra="未见异常">
          该科科目项5
        </List.Item>
        <List.Item extra="未见异常">
          该科科目项6
        </List.Item>
      </List>
    )
  }

  useEffect(() => {
    console.log(item)
    const t = searchParams.get('t')
    console.log(t)
    setType(t)
  }, [])

  return (
    <div className="detail__page">
      <div className="detail__header">
        <p>{type}</p>
        <p>检查医师：李四</p>
      </div>
      <div className="detail__box">
        {
          item === 'base' ? renderBase() : renderCase()
        }
      </div>
    </div>
  )
}

export default Detail

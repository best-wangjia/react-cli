import { Button } from 'antd'
import React, { Component } from 'react'
import './comp2.module.less'

export default class Comp2 extends Component {
  render() {
    return (
      <div className="box">
        <h2>this is component2</h2>
        <Button type="default">default</Button>
      </div>
    )
  }
}

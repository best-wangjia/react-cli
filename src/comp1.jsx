import React, { Component } from 'react'
import { Button } from 'antd'
import styles from './comp1.module.less'
import { get } from 'utils/http'

export default class Comp1 extends Component {
  componentDidMount() {
    get('v4/latest/CNY').then(res => {
      console.log(res)
    })
  }
  render() {
    return (
      <div className={styles.box}>
        <h2>this is component1</h2>
        <Button type="default">primary</Button>
      </div>
    )
  }
}

import { Button } from 'antd'
import React, { Component } from 'react'
import styles from './comp1.module.less'

export default class Comp1 extends Component {
  render() {
    return (
      <div className={styles.box}>
        <h2>this is component1</h2>
        <Button type="primary">primary</Button>
      </div>
    )
  }
}

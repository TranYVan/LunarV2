import React from 'react'
import { Spin } from 'antd'
const LoadingComponent = ({children, isLoading, delay = 200}) => {
  return (
    <Spin tip="Loading" size="small" delay={delay} spinning={isLoading}>
        {children}
      </Spin>
  )
}

export default LoadingComponent
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { ConfigProvider } from 'zarm'
import App from 'pages/App'
import zhCN from 'zarm/lib/config-provider/locale/zh_CN'
import 'zarm/dist/zarm.css'
import 'common/style/base'

const Root = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConfigProvider locale={{zhCN}} primaryColor="#039be5">
            <App />
          </ConfigProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'))

if (module && module.hot) {
  module.hot.accept('pages/App', () => {
    console.log('[Webpack HMR]: Success 🎉')
    ReactDOM.render(<Root />, document.getElementById('root'))
  })
}

import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { ConfigProvider } from 'antd-mobile'
import App from 'pages/App'
import zhCN from 'antd-mobile/es/locales/zh-CN'
import 'antd-mobile/es/global'
import 'common/style/base'

const Main = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConfigProvider locale={zhCN}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ConfigProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  )
}

const root = createRoot(document.getElementById('root'))

root.render(<Main />)

if (module && module.hot) {
  module.hot.accept('pages/App', () => {
    console.log('[Webpack HMR]: Success 🎉')
    root.render(<Main />)
  })
}

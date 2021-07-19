import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import App from 'pages/App'
import 'common/style/base.less'

const Root = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
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

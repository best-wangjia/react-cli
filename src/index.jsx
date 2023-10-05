import React from 'react'
import ReactDOM from 'react-dom/client'

import App from 'pages/App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

if (module && module.hot) {
  module.hot.accept('pages/App', () => {
    console.log('[Webpack HMR]: Success 🎉')
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
  })
}

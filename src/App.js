import { Button, message } from 'antd'
import './App.css'

function App() {
  function showMsg() {
    message.info('This is normal message')
  }
  return (
    <div className="App">
      <Button type="primary" onClick={showMsg}>tomato</Button>
    </div>
  )
}

export default App

import React, { Suspense, useEffect } from 'react'
import { useRoutes, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import elements from 'router/router'

const RouterGuard = () => {
  const location = useLocation()
  const { pathname } = location

  const getRouteName = (path) => {
    let result = elements.find(v => path.includes(v.path))
    return result.name || ''
  }

  useEffect(() => {
    // console.log(location)
    document.title = getRouteName(pathname)
  }, [pathname])

  const routes = useRoutes(elements)
  return routes
}

const App = (props) => {
  // function btnClick() {
  //   console.log('NODE_ENV: ' + ENV)
  // }
  return (
    <div className="App">
      <Suspense fallback={<>Loading。。。</>}>
        {RouterGuard()}
      </Suspense>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    list: state.list
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addItem() {
      dispatch({type: 'addItem', value: 'react-redux insert.'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

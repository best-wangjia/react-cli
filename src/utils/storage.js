var MyStorage = (function mystorage() {
  const ms = 'MY_STORAGE'
  let storage = window.localStorage

  let test = function () {
    if (!window.localStorage) {
      return false
    } else {
      return true
    }
  }

  let setItem = function (key, value) {
    let mydata = storage.getItem(ms)
    if (!mydata) {
      this.init()
      mydata = storage.getItem(ms)
    }
    mydata = JSON.parse(mydata)
    mydata.data[key] = value
    storage.setItem(ms, JSON.stringify(mydata))
    return mydata.data

  };

  let getItem = function (key) {
    let mydata = storage.getItem(ms)
    if (!mydata) {
      return false
    }
    mydata = JSON.parse(mydata)

    return mydata.data[key]
  };

  let removeItem = function (key) {
    let mydata = storage.getItem(ms)
    if (!mydata) {
      return false
    }

    mydata = JSON.parse(mydata)
    delete mydata.data[key]
    storage.setItem(ms, JSON.stringify(mydata))
    return mydata.data
  };

  let clear = function () {
    storage.removeItem(ms)
  }

  let init = function () {
    storage.setItem(ms, '{"data":{}}')
  }

  return { test, setItem, getItem, removeItem, init, clear }
})()

export default MyStorage

import actionType from './actionType'

function init() {
  try {
    let data = {}
    data = JSON.parse(sessionStorage['store_persist'])
    return data
  } catch {
    return {
      favoriteTrack: 'wechat',
      activeTab: '/home',
      acronym: '',
      baseURL: '',
      copywritingMergeToken: 2036,
      file: '',
      seedUser: {},
      isWaitReceiveMaps: {
        'topic': false,
        'creativity': false,
        'copywriting': false,
        'script': false,
        'pre_sale': false,
        'default': false
      },
      cookies: [],
      openTabs: null // 打开的标签页
    }
  }
}

function reducer(state, action) {
  switch (action.type) {
    case actionType.SET_USER_FAVORITE_TRACK:
      return {...state, favoriteTrack: action.payload};
    case actionType.SET_ACTIVE_TAB:
      return {...state, activeTab: action.payload};
    case actionType.SET_USER_NICKNAME:
      return {...state, nickname: action.payload};
    case actionType.SET_USER_ACCOUNT:
      return {...state, account: action.payload};
    case actionType.SET_USER_ACRONYM:
      return {...state, acronym: action.payload};
    case actionType.SET_REQUEST_BASEURL:
      return {...state, baseURL: action.payload};
    case actionType.SET_WAIT_RECEIVE_STATE:
      return {...state, isWaitReceive: action.payload}
    case actionType.SET_COPYWRITING_MERGE_TOKEN:
      return {...state, copywritingMergeToken: action.payload}
    case actionType.SET_MODIFY_FILE_CONTENT:
      return {...state, file: action.payload};
    case actionType.SET_SEED_USER:
      return {...state, seedUser: action.payload};
    case actionType.SET_WAIT_RECEIVE_MAPS:
      const maps = {...state.isWaitReceiveMaps, ...action.payload}
      return {...state, isWaitReceiveMaps: maps}
    case actionType.SET_OPEN_TABS:
      return {...state, openTabs: action.payload};
      case actionType.SET_COOKIES:
        return {...state, cookies: action.payload};
    // case actionType.RESET:
    //   return init(action.payload);
    default:
      throw new Error();
  }
}

export { init, reducer }

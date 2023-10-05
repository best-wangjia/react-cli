import actionType from './actionType'

const setUserFavoriteTrack = (track) => ({
  type: actionType.SET_USER_FAVORITE_TRACK,
  payload: track
})

const setTabsActiveTab = (tab) => ({
  type: actionType.SET_ACTIVE_TAB,
  payload: tab
})

const setUserAcronym = (acronym) => ({
  type: actionType.SET_USER_ACRONYM,
  payload: acronym
})

const setRequestBaseUrl = (url) => ({
  type: actionType.SET_REQUEST_BASEURL,
  payload: url
})

const setCopywritingMergeToken = (state) => ({
  type: actionType.SET_COPYWRITING_MERGE_TOKEN,
  payload: state
})

const setModifyFileContent = (file) => ({
  type: actionType.SET_MODIFY_FILE_CONTENT,
  payload: file
})

const setSeedUser = (seedUser) => ({
  type: actionType.SET_SEED_USER,
  payload: seedUser
})

const setWaitReceiveMaps = (maps) => ({
  type: actionType.SET_WAIT_RECEIVE_MAPS,
  payload: maps
})

const setOpenTabs = (openTabs) => ({
  type: actionType.SET_OPEN_TABS,
  payload: openTabs
})

const setCookies = (openTabs) => ({
  type: actionType.SET_COOKIES,
  payload: openTabs
})

export {
  setUserFavoriteTrack,
  setTabsActiveTab,
	setUserAcronym,
  setRequestBaseUrl,
  setCopywritingMergeToken,
  setModifyFileContent,
  setSeedUser,
  setWaitReceiveMaps,
  setOpenTabs,
  setCookies
}

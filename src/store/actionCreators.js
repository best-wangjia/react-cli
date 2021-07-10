import { ADD_ITEM, DEL_ITEM, GET_INFO } from './actionTypes'

export const addItemAction = (value) => ({
  type: ADD_ITEM,
  value
})

export const delItemAction = (value) => ({
  type: DEL_ITEM,
  value
})

export const getInfoAction = (data) => ({
  type: GET_INFO,
  data
})

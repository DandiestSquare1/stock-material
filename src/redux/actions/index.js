
import {
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAILURE,
} from '../constants'

export const PING = 'PING'
export const ping = () => ({ type: PING })

export const PONG = 'PONG'
export const pong = () => ({ type: PONG })


export const deleteItem = {
  request: id => ({ type: DELETE_ITEM_REQUEST, id }),
  success: id => ({ type: DELETE_ITEM_SUCCESS, id }),
  failure: error => ({ type: DELETE_ITEM_FAILURE, error }),
}

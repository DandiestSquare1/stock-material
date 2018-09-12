import { combineEpics } from 'redux-observable'
import { filter, map, switchMap } from 'rxjs/operators'
import { of } from 'rxjs'
import uuid from 'uuid/v4'

import actions from '../actions'

function ofType (type) {
  return filter(action => action.type === type.toString())
}

const deleteItemEpic = action$ => action$.pipe(
  ofType(actions.items.delete.request),
  // map(action => actions.items.delete.success(action.payload))
  switchMap(action => of(
    actions.items.delete.success(action.payload),
    actions.table.unselectAll()
  ))
)

const deleteMultipleEpic = action$ => action$.pipe(
  ofType(actions.items.deleteMultiple.request),
  switchMap(({ payload }) => of(
    actions.items.deleteMultiple.success(payload),
    actions.table.unselectAll()
  ))
)

const addItemEpic = action$ => action$.pipe(
  ofType(actions.items.add.request),
  map(action => actions.items.add.success({ id: uuid(), ...action.payload }))
)

const selectAllEpic = (action$, state) => action$.pipe(
  ofType(actions.table.selectAll.request),
  map(action => actions.table.selectAll.success(Object.keys(state.value.items.entities)))
)

export default combineEpics(
  deleteItemEpic,
  deleteMultipleEpic,
  addItemEpic,
  selectAllEpic
)

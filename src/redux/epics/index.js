import { combineEpics } from 'redux-observable'
import { filter, map } from 'rxjs/operators'

import actions from '../actions'

const deleteItemEpic = action$ => action$.pipe(
  filter(action => action.type === 'ITEMS/DELETE/REQUEST'),
  map(action => actions.items.delete.success(action.payload))
)

export default combineEpics(deleteItemEpic)


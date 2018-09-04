import { combineEpics } from 'redux-observable'
import { filter, mapTo } from 'rxjs/operators'

import { PING, pong } from '../actions'

const pingEpic = action$ => action$.pipe(
  filter(action => action.type === PING),
  mapTo(pong())
)

export default combineEpics(pingEpic)


import { combineReducers } from 'redux'
import user from './user'
import conversations from './conversations'

const rootReducer = combineReducers({
  user,
  conversations,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer

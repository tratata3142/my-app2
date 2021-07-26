import { Action, applyMiddleware, combineReducers,compose,createStore } from 'redux'
import thunk, { ThunkAction } from 'redux-thunk'
import cartReducer from './cart'
import sneakersReducer from './sneakers'
import userReducer from './user';

const rootReducer = combineReducers({
    sneakersReducer,
    cartReducer,
    userReducer,
})

export type RootState=ReturnType<typeof rootReducer>

export type InferActionsTypes<T> = T extends {[key:string]:(...args:any[])=>infer U}?U:never
export type BaseThunkType<A extends Action,R=Promise<void>>=ThunkAction<R,RootState,unknown,A>


//@ts-ignore
const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store=createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))

export default store
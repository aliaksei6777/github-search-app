import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";
import {profileReducer} from "./profile-reducer";

const rootReducer = combineReducers({
    profile: profileReducer,
    app: appReducer,
})
export const store = createStore(rootReducer,applyMiddleware(thunk))

export type RootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store
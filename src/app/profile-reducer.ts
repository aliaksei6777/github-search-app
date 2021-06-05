import { ThunkDispatch } from "redux-thunk";
import {RootStateType} from "./store";
import {AppActionsType, setAppError, setAppStatus} from "./app-reducer";
import {api} from "../api/api";


const initialState = {
    user: {} as UserType,
    repos: [] as RepoType[],
    currentPage: 1
}

export const profileReducer = (state: InitialProfileStateType = initialState, action: ActionsType): InitialProfileStateType => {
    switch (action.type) {
        case "PROFILE/SET_USER_DATA":
            return {...state, user: action.payload.userData}
        case "PROFILE/SET_REPO_DATA":
            return {...state, repos: action.payload.repoData}
        case "PROFILE/SET_CURRENT_PAGE":
            return {...state, currentPage: action.value}
        default:
            return state
    }
}

export const setUserData = (userData: UserType) =>
    ({type: 'PROFILE/SET_USER_DATA', payload: {userData}}) as const

export const setRepoData = (repoData: RepoType[]) =>
    ({type: 'PROFILE/SET_REPO_DATA', payload: {repoData}}) as const
export const setCurrentPage = (value: number) => ({type:'PROFILE/SET_CURRENT_PAGE',value} as const)


export const getUserDataTC = (userName: string, ) => async (dispatch: ThunkDispatch<RootStateType, unknown, ThunkAction>) => {
    dispatch(setAppStatus('loading'))
    dispatch(setAppError(null))
    try {
        const res = await api.getUser(userName)
        if (res.status === 200) {
            dispatch(setUserData(res.data))
            dispatch(setAppStatus('succeeded'))
        } else {
            dispatch(setAppStatus('failed'))
            dispatch(setAppError('Some error ocurred'))
        }
    } catch (e) {
        dispatch(setAppStatus('failed'))
    }
}

export const getRepoDataTC = (userName: string, pageNumber: number) => async (dispatch: ThunkDispatch<RootStateType, unknown, ThunkAction>) => {
    dispatch(setAppStatus('loading'))
    dispatch(setAppError(null))
    dispatch(setCurrentPage(pageNumber))
    try {
        const res = await api.getRepo(userName,pageNumber)
        if (res.status === 200) {
            dispatch(setRepoData(res.data))
            dispatch(setAppStatus('succeeded'))
        } else {
            dispatch(setAppStatus('failed'))
            dispatch(setAppError('Some error ocurred'))
        }
    } catch (e) {
        dispatch(setAppStatus('failed'))
        // throw new Error(e)
    }
}


//type
export type InitialProfileStateType = typeof initialState
type ThunkAction = ActionsType | AppActionsType
type ActionsType = ReturnType<typeof setUserData> | ReturnType<typeof setRepoData> | ReturnType<typeof setCurrentPage>
export type UserType = {
    avatar_url: string
    html_url: string
    login: string
    name: string
    followers:  number
    following:  number
    public_repos: number
}
export type RepoType = {
    name: string
    description: string | null
    html_url: string
}
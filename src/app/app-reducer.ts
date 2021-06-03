
const initialState = {
    status: 'idle',
    error: null as string | null,
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppError = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)

//type
export type InitialStateType = typeof initialState
type SetAppStatusActionType = ReturnType<typeof setAppStatus>
type SetAppErrorActionType = ReturnType<typeof setAppError>
export type AppActionsType = SetAppStatusActionType | SetAppErrorActionType
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

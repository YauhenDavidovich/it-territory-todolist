import {Dispatch} from 'redux'
import {authAPI, LoginParamsType} from "../dal/todolist-api";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
            }
        })
        .catch((error) => {
            console.log(error)
        })

}


// types
type ActionsType = ReturnType<typeof setIsLoggedInAC>



import React from 'react';
import {useSelector} from 'react-redux'
import {AppRootStateType} from "../bll/store";

export const Todolist = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state =>
        state.auth.isLoggedIn)
return (
    <div>
Todolists
    </div>
)

}

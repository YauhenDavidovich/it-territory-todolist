import React from 'react';
import {useSelector} from 'react-redux'
import {AppRootStateType} from "../bll/store";
import {Navigate} from 'react-router-dom';

export const Todolist = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state =>
        state.auth.isLoggedIn)
    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div>
            Todolists
        </div>
    )

}

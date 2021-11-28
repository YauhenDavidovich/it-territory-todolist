import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../bll/store";
import {Navigate} from 'react-router-dom';
import {addTodolistTC, fetchTodolistsTC, TodolistDomainType} from "../bll/todolist-reducer";
import {TasksContainer} from "./TasksContainer";
import {TodolistType} from "../dal/todolist-api";
import {TasksStateType} from "../bll/tasks-reducer";

export const Todolist = () => {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])


    const isLoggedIn = useSelector<AppRootStateType, boolean>(state =>
        state.auth.isLoggedIn)
    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    const addTodolistHandler = () => {
        dispatch(addTodolistTC("new todo2"))
    }

    return (
        <div>

            {todolists && todolists ?
                <div className='main'>
                    <div className='mainBlock'>
                        <div><h2>{todolists[0].title}</h2></div>
                    <TasksContainer todolistId={todolists[0].id}/>
                </div>
                </div>


                : <button onClick={addTodolistHandler}>Add todo</button>}

        </div>)
}

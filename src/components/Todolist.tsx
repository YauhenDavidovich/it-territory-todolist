import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../bll/store";
import {Navigate} from 'react-router-dom';
import {addTodolistTC, changeTodolistTitleTC, fetchTodolistsTC, TodolistDomainType} from "../bll/todolist-reducer";
import {TasksContainer} from "./TasksContainer";
import {EditableSpan} from "./EditableSpan";
import {updateTaskTC} from "../bll/tasks-reducer";

export const Todolist = () => {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [todolists])


    const isLoggedIn = useSelector<AppRootStateType, boolean>(state =>
        state.auth.isLoggedIn)
    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    const addTodolistHandler = () => {
        dispatch(addTodolistTC("new todo2"))
    }

    const updateTodoTitle = (id: string, title: string) => {
        dispatch(changeTodolistTitleTC(id, title))
    }

    return (
        <div>

            {todolists && todolists ?
                <div className='main'>
                    <div className='mainBlock'>
                        <div><h2><EditableSpan value={todolists[0].title}
                                               onChange={(e) => updateTodoTitle(todolists[0].id, e)}/></h2>
                        <p>double click to change name</p>
                        </div>
                        <TasksContainer todolistId={todolists[0].id}/>
                    </div>
                </div>


                : <button onClick={addTodolistHandler}>Add todo</button>}

        </div>)
}

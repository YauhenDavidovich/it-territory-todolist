import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../bll/store";
import {Navigate} from 'react-router-dom';
import {addTodolistTC, fetchTodolistsTC} from "../bll/todolist-reducer";
import {TodolistType} from "../dal/todolist-api";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';

export const Todolist = () => {
    const dispatch = useDispatch()

    const todolist = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [todolist])

    const [td, updateTodo] = useState(todolist);

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state =>
        state.auth.isLoggedIn)
    debugger
    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    const addTodolist = () => {
        dispatch(addTodolistTC("new todo2"))
    }

    function handleOnDragEnd(result: any) {
        if (!result.destination) return;
        const items = Array.from(td);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateTodo(items);
    }

    return (
        <div>

            {todolist && todolist ?
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="todos">
                        {(provided) => (
                            <ul className="todos" {...provided.droppableProps} ref={provided.innerRef}>
                                {td.map(({id, title, addedDate}, index) => {
                                    return (
                                        <Draggable key={id} draggableId={id} index={index}>
                                            {(provided) => (
                                                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <div className="date">
                                                        {addedDate}
                                                    </div>
                                                    <p>
                                                        { title }
                                                    </p>
                                                </li>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
                : <button onClick={addTodolist}>Add todo</button>}

        </div>)
}

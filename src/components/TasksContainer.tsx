import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addTaskTC, fetchTasksTC, TasksStateType} from "../bll/tasks-reducer";
import {addTodolistTC, TodolistDomainType} from "../bll/todolist-reducer";
import {AppRootStateType} from "../bll/store";
import {TaskType} from "../dal/todolist-api";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";

type TasksPropsType = {
    todolistId: string
}


export const TasksContainer = (props: TasksPropsType) => {
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    let allTodolistTasks = tasks[props.todolistId]
    const [draggableTasks, updateTask] = useState(allTodolistTasks);
    debugger
    useEffect(() => {
        dispatch(fetchTasksTC(props.todolistId))
    }, [])
    useEffect(() => {
        updateTask(allTodolistTasks)
    }, [allTodolistTasks])

    const addTaskHandler = () => {
        dispatch(addTaskTC("new task", props.todolistId))
    }

    function handleOnDragEnd(result: any) {
        if (!result.destination) return;
        const items = Array.from(draggableTasks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateTask(items);
        console.log(items)
    }

    return (
        <div>

            <button onClick={addTaskHandler}>Add task</button>
            {draggableTasks && draggableTasks ?
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="draggableTasks">
                        {(provided) => (
                            <ul className="draggableTasks" {...provided.droppableProps} ref={provided.innerRef}>
                                {draggableTasks.map(({id, description, title}, index) => {
                                    return (
                                        <Draggable key={id} draggableId={id} index={index}>
                                            {(provided) => (
                                                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <div className="description">
                                                        {description}
                                                    </div>
                                                    <p>
                                                        {title}
                                                    </p>
                                                </li>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </ul>)}
                    </Droppable>
                </DragDropContext>
                : null
            }


        </div>)
}
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    addTaskTC,
    fetchTasksTC,
    removeTaskTC,
    TasksStateType,
    updateTaskOrderTC,
    updateTaskTC
} from "../bll/tasks-reducer";
import {addTodolistTC, TodolistDomainType} from "../bll/todolist-reducer";
import {AppRootStateType} from "../bll/store";
import {TaskStatuses, TaskType} from "../dal/todolist-api";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {EditableSpan} from "./EditableSpan";

type TasksPropsType = {
    todolistId: string
}


export const TasksContainer = (props: TasksPropsType) => {
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    let allTodolistTasks = tasks[props.todolistId]
    const [draggableTasks, updateTask] = useState(allTodolistTasks);
    const [taskName, updateTaskName] = useState("New task");

    useEffect(() => {
        dispatch(fetchTasksTC(props.todolistId))
    }, [])
    useEffect(() => {
        updateTask(allTodolistTasks)
    }, [allTodolistTasks])

    const handleAddedTaskName = (name: string) => {
        updateTaskName(name)
    }
    const addTaskHandler = () => {
        dispatch(addTaskTC(taskName, props.todolistId))
    }

    const deleteTaskHandler = (id: string) => {
        dispatch(removeTaskTC(id, props.todolistId))
    }

    const updateTaskTitle = (id:string, title: string) => {
        dispatch(updateTaskTC(id, {title:title},props.todolistId))
    }

    const handleChangeStatus = (id:string, e:boolean) => {
        let newIsDoneValue = e
        debugger
        let status = 0;
        if (newIsDoneValue) status = TaskStatuses.Completed
        dispatch(updateTaskTC(id, {status:status},props.todolistId))
    }

    function handleOnDragEnd(result: any) {
        if (!result.destination) return;
        const items = Array.from(draggableTasks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);


        items.map((task, index, array)=>{

            if(index) {
                // dispatch(updateTaskOrderTC(props.todolistId, task.id,{putAfterItemId: array[index-1].id} ))
            } else {
                dispatch(updateTaskOrderTC(props.todolistId, task.id,{putAfterItemId: ""} ))
            }
            })

        updateTask(items);

    }


    return (
        <div>
            <input
                type="text"
                value={taskName}
                onChange={(e)=>handleAddedTaskName( e.currentTarget.value)}
            />

            <button onClick={addTaskHandler}>Add task</button>
            {draggableTasks && draggableTasks ?
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="draggableTasks">
                        {(provided) => (
                            <ul className="draggableTasks" {...provided.droppableProps} ref={provided.innerRef}>
                                {draggableTasks.map(({id, description, title, status}, index) => {
                                    return (
                                        <Draggable key={id} draggableId={id} index={index}>
                                            {(provided) => (
                                                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={status === TaskStatuses.Completed ? 'task is-done' : 'task new'}>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            checked={status === TaskStatuses.Completed}
                                                            onChange={(e)=>handleChangeStatus(id, e.currentTarget.checked)}
                                                        />
                                                    </label>
                                                    <div className="description">
                                                        {description}
                                                    </div>
                                                    <EditableSpan value={title} onChange={(e)=>updateTaskTitle(id, e)}/>
                                                    <button onClick={()=>deleteTaskHandler(id)}>Delete</button>
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

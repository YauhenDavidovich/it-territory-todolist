import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../bll/store";
import {Navigate} from 'react-router-dom';
import {addTodolistTC, fetchTodolistsTC} from "../bll/todolist-reducer";
import {TaskType, TodolistType} from "../dal/todolist-api";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';

export const Task = () => {
//     const dispatch = useDispatch()
//     const [tasks, updateTodo] = useState();
//
//
//     function handleOnDragEnd(result: any) {
//         if (!result.destination) return;
//         const items = Array.from(td);
//         const [reorderedItem] = items.splice(result.source.index, 1);
//         items.splice(result.destination.index, 0, reorderedItem);
//
//         updateTodo(items);
//     }
//
//     return (
//         <div>
//
//             {todolist && todolist ?
//             <DragDropContext onDragEnd={handleOnDragEnd}>
//             <Droppable droppableId="todos">
//                 {(provided) => (
//         <ul className="todos" {...provided.droppableProps} ref={provided.innerRef}>
//         {td.map(({id, title, addedDate}, index) => {
//                 return (
//                     <Draggable key={id} draggableId={id} index={index}>
//                     {(provided) => (
//                     <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
//                 <div className="date">
//                     {addedDate}
//                     </div>
//                     <p>
//                     { title }
//                     </p>
//                     </li>
//             )}
//                 </Draggable>
//             );
//             })}
//     {provided.placeholder}
//     </ul>
// )}
//     </Droppable>
//     </DragDropContext>
// : <button onClick={addTodolist}>Add todo</button>}
//
//     </div>)
}

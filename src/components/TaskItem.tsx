import React from "react";
import type { Todo as TodoItem } from "../types/index";
import Edit from "../assets/Edit.png";
import Trash from "../assets/Trash.png";
import '../styles.css';
import classNames from "classnames";

const TaskItem: React.FC<{ todo: TodoItem; onEdit: () => void; onDelete: (id: number) => void; isUpdated?: boolean; isRemoving?: boolean }> = ({ todo, onEdit, onDelete, isUpdated, isRemoving }) => {

  const formatTodoDate = (id: number) => {
    const date = new Date(id);
    if (Number.isNaN(date.getTime())) {
      return "Invalid date";
    }
    return date.toLocaleDateString(undefined, {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <> 
    <div className={classNames("todo-item", { completed: todo?.status === "completed", updated: isUpdated, removing: isRemoving })}>
        <div className="icon">
          {todo && todo.title && todo.title[0] || "-"}
          </div>
        <div className="content">
          <div className="todo-item-header">
            <div className="todo-item-title">{todo.title}</div>
            <div className={`status ${todo.status}`}>
              <div className={`status-bar ${todo.status}`}></div>
              {todo.status}
              </div>
          </div>
          <div className="todo-item-description">{todo.description}</div>
          <div className="todo-item-footer">
            <div className="todo-item-timestamp">{formatTodoDate(todo.id)}</div>
            <div className="todo-item-actions">
              <span className={classNames("editIcon")} onClick={onEdit}>
                <img src={Edit} alt="Edit"/>
              </span>
              <span className={classNames("deleteIcon")} onClick={() => onDelete(todo.id)}>
                <img src={Trash} alt="Delete" />
              </span>
            </div>
          </div>
        
        
        </div>

      
    </div>
    <div className="border-below"></div>
    </>
  );
};

export default TaskItem;
import React, { useState } from "react";
import type { Todo } from "../types";
import TaskItem from "./TaskItem";
import dropdownIcon from "../assets/Vector.png";
import '../styles.css';
import AppTitle from './AppTitle'

interface Props {
  todoList: Todo[];
  onAddClick: () => void;
  onEditTodo: (todo: Todo) => void;
  onDeleteTodo: (id: number) => void;
}

type FilterMode = "all" | "completed" | "incomplete";

const TaskList: React.FC<Props> = ({ todoList, onAddClick, onEditTodo, onDeleteTodo }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterMode>("all");

  const filteredBySearch = todoList.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const filtered = filteredBySearch.filter((t) => {
    if (filter === "all") return true;
    if (filter === "completed") return t.status === "completed";
    return t.status !== "completed"; // pending + in-progress
  });

  return (
    <div className="panel">
      <AppTitle 
        title={"TO-DO APP"} 
        backButton={false} 
        onBackClick={()=>{

          console.log("clicked");
        }} 
        />
      <div>
      <div className="filter-row">
        <button className={filter === "all" ? "filter-btn active" : "filter-btn"} onClick={() => setFilter("all")}>All</button>
        <button className={filter === "completed" ? "filter-btn active" : "filter-btn"} onClick={() => setFilter("completed")}>Completed</button>
        <button className={filter === "incomplete" ? "filter-btn active" : "filter-btn"} onClick={() => setFilter("incomplete")}>Incomplete</button>
      </div>

      <input
        placeholder="Search To-Do"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {
        <>
         {(filter === "all" || filter === "incomplete") && 
          <Section title="In Progress" 
            defaultOpen={true}
            items={filtered.filter((value) => value.status === "in-progress")}
            onEditTodo={onEditTodo}
            onDeleteTodo={onDeleteTodo}
          />}
          {(filter === "all" || filter === "incomplete") && <Section title="Pending" 
            defaultOpen={false}
            items={filtered.filter((value) => value.status === "pending")}
            onEditTodo={onEditTodo}
            onDeleteTodo={onDeleteTodo}
          />}
          {(filter === "all" || filter === "completed") && <Section title="Completed" 
            defaultOpen={false}
            items={filtered.filter((value) => value.status === "completed")}
            onEditTodo={onEditTodo}
            onDeleteTodo={onDeleteTodo}
          />}
        </>
      }

      <button className="addNew" onClick={onAddClick} title="Create new task">
        +
      </button>
      </div>
    </div>
  );
};

const Section: React.FC<{ 
  title: string; 
  items: Todo[]; 
  onEditTodo: (todo: Todo) => void ;
  onDeleteTodo: (id: number) => void;
  defaultOpen?: boolean;
}> = ({
  title,
  items,
  onEditTodo,
  onDeleteTodo,
  defaultOpen = false
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="section">
      <div className="section-header" onClick={() => setOpen(!open)}>
        <div>
          {title}  {"("}<span className="bold-section">{items.length}</span>{")"}
        </div>
        <div className={`dropdown-icon ${open ? (items?.length > 0) ? "open" : "" : ""}`}>
          <div className="dropdown-icon"><img src={dropdownIcon} /></div>
          </div>
      </div>

      {open &&
        (items.length > 0 ? (
          items.map((todo) => (
            <TaskItem 
              key={todo.id} 
              todo={todo} 
              onEdit={() => onEditTodo(todo)} 
              onDelete={() => onDeleteTodo(todo.id)}
            />
          ))
        ) : (
          <div className="no-tasks-message">No tasks in this category yet</div>
        ))}
    </div>
  );
};

export default TaskList;
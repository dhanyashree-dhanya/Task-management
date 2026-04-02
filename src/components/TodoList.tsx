import React, { useState } from "react";
import type { Todo } from "../types";
import SingleTodoItem from "./SingleTodoItem";
import dropdownIcon from "../assets/Vector.png";
import '../styles.css';
import AppTitle from './AppTitle'

interface Props {
  todoList: Todo[];
  onAddClick: () => void;
  onEditTodo: (todo: Todo) => void;
  onDeleteTodo: (id: number) => void;
}

const TodoList: React.FC<Props> = ({ todoList, onAddClick, onEditTodo, onDeleteTodo }) => {
  const [search, setSearch] = useState("");

  const filtered = todoList.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

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
      <input
        placeholder="Search To-Do"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Section title="In Progress" 
      items={filtered.filter((value) => value.status === "in-progress")}
        onEditTodo={onEditTodo}
        onDeleteTodo={onDeleteTodo}
      />
      <Section title="Pending" 
      items={filtered.filter((value) => value.status === "pending")}
      onEditTodo={onEditTodo}
      onDeleteTodo={onDeleteTodo}
      />
      <Section title="Completed" 
      items={filtered.filter((value) => value.status === "completed")}
      onEditTodo={onEditTodo}
      onDeleteTodo={onDeleteTodo}
      />

      <button className="addNew" onClick={onAddClick}>
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
  onDeleteTodo: (id: number) => void 
}> = ({
  title,
  items,
  onEditTodo,
  onDeleteTodo
}) => {
  const [open, setOpen] = useState(true);

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
        items.map((todo) => (
          <SingleTodoItem 
            key={todo.id} 
            todo={todo} 
            onEdit={() => onEditTodo(todo)} 
            onDelete={() => onDeleteTodo(todo.id)}
            />
        ))}
    </div>
  );
};

export default TodoList;
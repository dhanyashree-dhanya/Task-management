import { useState, useEffect } from "react";
import type { Todo } from "./types/index";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";
import "./styles.css";

function App() {
  const [view, setView] = useState<"listView" | "addView">("listView");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      try {
        return JSON.parse(storedTodos);
      } catch (error) {
        console.error("Error parsing todos from localStorage:", error);
        return [];
      }
    }
    return [];
  });

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    console.log("todos",todos)
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo: Omit<Todo, "id">) => {
    //adding date as id for uniquness and identification also to represent on the UI
    setTodos((prev) => [
      ...prev,
      { ...todo, 
        id: Date.now() },
    ]);
    setEditingTodo(null);
    setView("listView");
  };

  const updateTodo = (todo: Todo) => {
    setTodos((prev) => prev.map((value) => (value.id === todo.id ? todo : value)));
    setEditingTodo(null);
    setView("listView");
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((value) => value.id !== id));
  };


  const onEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setView("addView");
  };

  return (
    <div className="container">
      {view === "listView" ? (
        <TaskList
          todoList={todos}
          onAddClick={() => {
            setEditingTodo(null);
            setView("addView");
          }}
          onEditTodo={onEditTodo}
          onDeleteTodo={deleteTodo}
        />
      ) : (
        <AddTaskForm
          onCancel={() => {
            setEditingTodo(null);
            setView("listView");
          }}
          onAdd={addTodo}
          onSave={updateTodo}
          editingTodo={editingTodo}
        />
      )}
    </div>
  );
}

export default App




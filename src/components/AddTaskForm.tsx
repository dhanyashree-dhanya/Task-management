import { useState, useEffect } from "react";
import type { Status, Todo } from "../types/index";
import '../styles.css';
import AppTitle from './AppTitle'
import Dropdown from "./Dropdown";

interface Props {
  onCancel: () => void;
  onAdd: (todo: {
    title: string;
    description: string;
    status: Status;
  }) => void;
  onSave: (todo: {
    id: number;
    title: string;
    description: string;
    status: Status;
  }) => void;
  editingTodo: Todo | null;
}



const AddTaskForm: React.FC<Props> = ({ onCancel, onAdd, onSave, editingTodo }) => {
  const [title, setTitle] = useState(editingTodo?.title ?? "");
  const [description, setDescription] = useState(editingTodo?.description ?? "");
  const [status, setStatus] = useState<Status>(editingTodo?.status ?? "pending");


  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description);
      setStatus(editingTodo.status);
    } else {
      setTitle("");
      setDescription("");
      setStatus("pending");
    }
  }, [editingTodo]);

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      return;
    }

    if (editingTodo) {
      onSave({
        id: editingTodo.id,
        title: title.trim(),
        description: description.trim(),
        status,
      });
    } else {
      onAdd({
        title: title.trim(),
        description: description.trim(),
        status,
      });
    }
  };

  return (
    <div className="panel">
      <AppTitle 
        title={editingTodo ? "Edit Task" : "Add Task"} 
        backButton={true} 
        onBackClick={() => {
          onCancel();
        }} 
      />

      <input
        placeholder="Enter the title"
        value={title}
        className="inputAddNew"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Enter the description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
     {editingTodo && <Dropdown status={status} onStatusChange={setStatus} />}

      <div className="buttonWrap">
        <button 
          className="secondaryBtn"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          className="primaryBtn"
          onClick={handleSubmit}
        >
          {editingTodo ? "Update" : "Add"}
        </button>
      </div>
    </div>
  );
};

export default AddTaskForm;
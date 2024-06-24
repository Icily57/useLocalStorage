import React, { useState } from 'react';
import './TodoItem.scss';

interface TodoItemProps {
  todo: { id: number; text: string; completed: boolean; date: string };
  index: number;
  toggleComplete: (index: number) => void;
  removeTodo: (index: number) => void;
  updateTodo: (index: number, newText: string) => void;
  rescheduleTodo: (index: number, newDate: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, index, toggleComplete, removeTodo, updateTodo, rescheduleTodo }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(todo.text);
  const [editDate, setEditDate] = useState<string>(todo.date);

  const handleUpdate = () => {
    updateTodo(index, editText);
    rescheduleTodo(index, editDate);
    setIsEditing(false);
  };

  return (
    <div className='app'>
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div className='input'>
          <input className='A' value={editText} onChange={(e) => setEditText(e.target.value)} />
          <input className='B' type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)} />
          <button onClick={handleUpdate}>Update</button>
        </div>
      ) : (
        <div className='edit'>
          <span onClick={() => toggleComplete(index)}>{todo.text} (Due: {todo.date})</span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => removeTodo(index)}>Remove</button>
        </div>
      )}
    </div>
    </div>
  );
};

export default TodoItem;

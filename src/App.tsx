import React, { useState } from 'react';
import useLocalStorage from './Hooks/useLocalStorage';
import TodoItem from './Components/TodoItem';
import './App.scss';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  date: string;
}

const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [newTodo, setNewTodo] = useState<string>('');
  const [newDate, setNewDate] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');

  const addTodo = () => {
    if (newTodo.trim() !== '' && newDate.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false, date: newDate }]);
      setNewTodo('');
      setNewDate('');
    }
  };

  const removeTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const toggleComplete = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const updateTodo = (index: number, newText: string) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    setTodos(newTodos);
  };

  const rescheduleTodo = (index: number, newDate: string) => {
    const newTodos = [...todos];
    newTodos[index].date = newDate;
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });

  return (
    <div className="app">
      <h1>To-Do App</h1>
      <div className="todo-input">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new to-do"
        />
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <div className="filters">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('active')}>Active</button>
      </div>
      <div className="todo-list">
        {filteredTodos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            index={index}
            todo={todo}
            toggleComplete={toggleComplete}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
            rescheduleTodo={rescheduleTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

import { TodoForm } from './components/TodoForm.js'
import {TodoItem} from './components/TodoItem.js'
import './App.css'

export function App() {
  
  return (
    <div>
      <div className = "main">
        <h1 className="title">TodoList</h1>
        <TodoForm />
        <TodoItem />
        <TodoItem />
        <TodoItem />
      </div>
      
    </div>
  )
}


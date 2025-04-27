import axios from 'axios'
import { useEffect, useState } from 'react'
import Auth from './Auth'

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [error, setError] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
      fetchTodos()
    }
  }, [])

  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:8000/todos/', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTodos(response.data)
      setError(null)
    } catch (error) {
      console.error('Error fetching todos:', error)
      setError('Failed to fetch todos. Please try again.')
    }
  }

  const addTodo = async (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return

    try {
      const token = localStorage.getItem('token')
      const response = await axios.post('http://localhost:8000/todos/', null, {
        params: { title: newTodo },
        headers: { Authorization: `Bearer ${token}` }
      })
      setTodos([...todos, response.data])
      setNewTodo('')
      setError(null)
    } catch (error) {
      console.error('Error adding todo:', error)
      setError('Failed to add todo. Please try again.')
    }
  }

  const toggleTodo = async (id, completed) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.put(`http://localhost:8000/todos/${id}`, null, {
        params: { completed: !completed },
        headers: { Authorization: `Bearer ${token}` }
      })
      setTodos(todos.map(todo => 
        todo.id === id ? response.data : todo
      ))
      setError(null)
    } catch (error) {
      console.error('Error updating todo:', error)
      setError('Failed to update todo. Please try again.')
    }
  }

  const deleteTodo = async (id) => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`http://localhost:8000/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTodos(todos.filter(todo => todo.id !== id))
      setError(null)
    } catch (error) {
      console.error('Error deleting todo:', error)
      setError('Failed to delete todo. Please try again.')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    setTodos([])
  }

  if (!isAuthenticated) {
    return <Auth onLogin={() => setIsAuthenticated(true)} />
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Todo App</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
      {error && (
        <div style={{ 
          color: 'red', 
          padding: '10px', 
          marginBottom: '20px', 
          border: '1px solid red',
          borderRadius: '4px'
        }}>
          {error}
        </div>
      )}
      <form onSubmit={addTodo} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <button type="submit">Add</button>
      </form>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '10px',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id, todo.completed)}
              style={{ marginRight: '10px' }}
            />
            <span style={{ 
              textDecoration: todo.completed ? 'line-through' : 'none',
              flex: 1
            }}>
              {todo.title}
            </span>
            <button 
              onClick={() => deleteTodo(todo.id)}
              style={{ 
                background: '#ff4444',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App 
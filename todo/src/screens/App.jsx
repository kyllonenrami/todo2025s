import { useState, useEffect } from 'react'
import { useUser } from '../context/useUser.js'
import '../../App.css'
import axios from 'axios'
import Row from '../components/Row.jsx'

const API = import.meta.env.VITE_API_URL

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const { user } = useUser()

 useEffect(() => {
 axios.get(API)
 .then(response => {
 setTasks(response.data)
 })
 .catch(error => {
 alert(error.response.data ? error.response.data.message : error)
 })
 }, [])


 
  const addTask = () => {
    if (!task.trim()) return
    const headers = { headers: { 'Content-Type': 'application/json', Authorization: user.token } }
    const newTask = { description: task.trim() }

    axios.post(`${API}/create`, { task: newTask }, headers)
      .then(res => {
        setTasks(prev => [...prev, res.data])
        setTask('')
      })
      .catch(err => {
        const msg = err?.response?.data?.error || err?.message || 'Error creating task'
        alert(msg)
      })
  }

  const deleteTask = (deletedId) => {
    const headers = { headers: { Authorization: user.token } }
    axios.delete(`${API}/delete/${deletedId}`, headers)
      .then(() => {
        setTasks(prev => prev.filter(item => item.id !== deletedId))
      })
      .catch(err => {
        const msg = err?.response?.data?.error || err?.message || 'Error deleting task'
        alert(msg)
      })
  }

  return (
    <div id="container">
      <h3>Todos</h3>
      <form>
        <input 
        placeholder='Add new task'
        value={task}
        onChange={e => setTask(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.preventDefault()
            addTask()
          }
        }}
      />
      </form>
      <ul>
        {
          tasks.map(item => (
          <Row item={item} key={item.id} deleteTask={deleteTask} />
          ))
        }
      </ul>
    </div>
  )
}

export default App
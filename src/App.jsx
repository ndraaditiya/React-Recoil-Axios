import { useRef, useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { getTodos, postTodo, updateTodo, deleteTodo } from './config/api'
import { todoState } from './recoil/atom'
import { todoCounter } from './recoil/selector'
import './App.css'

const center = { textAlign: 'center' }

function App() {
  const ref = useRef()
  const todos = useRecoilValue(todoState)
  const setTodo = useSetRecoilState(todoState)
  const totalTodo = useRecoilValue(todoCounter)

  useEffect(() => {
    getTodos().then((res) => setTodo(res))
  }, [])

  const AddTodo = () => {
    const data = {
      todoName: ref.current.value,
      isComlpete: false
    }

    postTodo(data).then((res) => {
      const { code, data: newData } = res
      if (code === 200) {
        setTodo((prev) => {
          return [
            ...prev,
            newData
          ]
        })
        ref.current.value = ''
      } else {
        console.log(res?.message)
      }
    })
  }

  const handleChecked = (id, valueComplete) => {
    const data = { isComplete: !valueComplete }
    updateTodo({ id, data }).then((res) => {
      const { code, data: newData } = res
      if (code === 200) {
        setTodo((prev) => {
          return prev.map((i) => i?._id === newData?._id ? newData : i)
        })
      } else {
        console.log(res?.message)
      }
    })
  }

  const handleDelete = (id) => {
    deleteTodo(id).then((res) => {
      const { code } = res
      if (code === 200) {
        setTodo((prev) => {
          return prev.filter((i) => i?._id !== id)
        })
      } else {
        console.log(res?.message)
      }
    })
  }

  return (
    <div className="App">
      <h2>TODO APP</h2>
      <input ref={ref} type='text' />
      <button onClick={AddTodo}>Add Todo</button>
      {todos.length === 0 ? (
        <p style={{ ...center }}>Loading...</p>
      ) : (
        <>
          <p style={{ ...center }}>Total Todo Lists: <strong>{totalTodo}</strong></p>
          <div className='content-container'>
            {todos.map(({ todoName, isComplete, _id }, i) => (
              <div key={i}>
                <p className='contents'>
                  <span style={{ textDecoration: isComplete ? 'line-through' : 'none' }}>{todoName}</span>
                  <span>
                    <input type='checkbox' checked={isComplete ?? false} onChange={() => handleChecked(_id, isComplete)} />
                    <i className="fa-solid fa-trash" onClick={() => handleDelete(_id)}></i>
                  </span>
                </p>
                <hr />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default App

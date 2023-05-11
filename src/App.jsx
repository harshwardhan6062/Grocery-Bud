import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { nanoid } from 'nanoid'
import { SingleItem } from './SingleItem'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getLocalStorage = (key) => {
  const items = localStorage.getItem(key)
  if(items) return JSON.parse(items)
  else return []
}

const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

function App() {
  const [items, setItems] = useState(getLocalStorage(`list`))

  const addItem = (e) => {
    e.preventDefault()
    if(!e.target.item.value) {
      toast.error(`Cannot add empty value!`)
      return
    }
    const newItems = [...items, { id: nanoid(), checked: false, name:e.target.item.value }]
    setItems(newItems)
    setLocalStorage(`list`, newItems)
    toast.success(`Item Added Successfully!`)
    e.target.item.value = ''
  }

  const removeItem = ({ id }) => {
    const newItems = items.filter((item) => item.id !== id)
    setItems(newItems)
    toast.success(`Item Deleted Successfully!`)
  }

  const checkboxClicked = ({ id }) => {
    const newItems = items.map((item) => {
      if(item.id === id) {
        return {
          ...item, checked: !item.checked
        }
      }
      return item
    })
    setItems(newItems)
  } 

  return (
    <section className='section-center'>
        <form onSubmit={addItem}>
          <h4>Grocery Bud</h4>
          <div className='form-control'>
            <input className='form-input' type='text' name='item'/>
            <button type='submit' className='btn'>add item</button>
          </div>
        </form>
        <div className='items'>
          {items.map((item) => {
            return (
              <SingleItem key={item.id} item={item} removeItem={removeItem} checkboxClicked={checkboxClicked}/>
            )
          })}
        </div>
        <ToastContainer position='top-center'/>
    </section>
  )
}

export default App

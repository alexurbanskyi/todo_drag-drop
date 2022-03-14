import React, { useEffect, useState } from "react";
import './app.css';
import {v4} from 'uuid';
import {randomColor} from 'randomcolor'
import Draggable from "react-draggable";
import { MdDeleteForever} from "react-icons/md";
import {MdRadioButtonUnchecked} from "react-icons/md";
import {MdOutlineCheckCircleOutline} from "react-icons/md";





function App() {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState (
    JSON.parse(localStorage.getItem('todoList')) || []
  )
  useEffect(()=>{
    localStorage.setItem('todoList', JSON.stringify(todoList));
    console.log('from useeff')
  },[todoList]);
  
  
  
  function addTodo () {
    if (todo.trim() !== '') {
      const newTodo = {
        id: v4(),
        title: todo,
        color: randomColor({
          luminosity: 'light',
        }),
        defaultXY:{
          x: 300,
          y: -600
        },
        status: false
      }
       setTodoList([...todoList, newTodo]);
       setTodo('')
    }
  }
  
  function DeleteTodo(id){
    setTodoList(todoList.filter((el) => el.id !== id))
  }

  function UpdateXY(data, index){
    let newArr = [...todoList]
    newArr[index].defaultXY = { x: data.x, y: data.y}
   setTodoList(newArr)

  }
  return (
    <div className="App">
      <div className="wrapper">
        <input 
          value={todo}
          className="input" 
          placeholder="Створити нове завдання ..." 
          onChange={(e) => setTodo(e.target.value)}
          onKeyPress = { (e) => {
            
            if (e.charCode === 13) addTodo()
          }}
          
        />
        <button className="button" onClick={addTodo}>Створити</button>
      </div>

      {
        
        todoList.map((el, index) => {
          
          return (
            <Draggable
              key={index}
              defaultPosition={el.defaultXY}
              onStop = {(_, data) => {
                UpdateXY(data,index)
              }}
            >
              <div className="todo" style={{backgroundColor: el.color}}>
               
                <div className="title">
                  {el.title}
                </div>
                <button className="del" onClick={() => DeleteTodo(el.id)} ><MdDeleteForever style={{fontSize: 25}}/></button>
                
              </div>
              
            </Draggable>
          )
        })
      }

    </div>
  );
}

export default App;

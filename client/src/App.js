import './App.css';
import { io } from "socket.io-client" 
import {useState} from 'react'
import Chat from './components/Chat';

const socket = io('http://localhost:3001')


function App() {
  const [room, setRoom] = useState("")
  const [name, setName] = useState("")
  const [chat, setChat] = useState(false)

  const joinRoom=function(){
    if(!name&&!room) return alert('you must insert a room and a nickname')
    socket.emit('join_room', room)
    setChat(true)
  }

  return (
    <div className="App">
      <div className="wrapper">
        {!chat?
          <div id="room">
            <h3>Join a Room</h3>
            <p><label htmlFor="room">Room: <input type="text" id="room" onChange={(e)=>{setRoom(e.target.value)}} /></label></p>
            <p><label htmlFor="name">Name: <input type="text" id="name" onChange={(e)=>{setName(e.target.value)}} /></label></p>
            <p><button onClick={joinRoom}>OK</button></p>
          </div>
          :<Chat socket={socket} username={name} room={room} />
        }
      </div>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./App.css";
import Chat from "./Chat";

const socket = io.connect("https://chat-real-time-wg8o.onrender.com/");
/* const socket = io.connect() */

function App() {
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  /* const [chat, setChat] = useState(false); */
  const [chatStorage, setChatStorage] = useState(JSON.parse(localStorage.getItem("chat")))


  const userInfo = JSON.parse(localStorage.getItem("info-user-room"))
  useEffect(()=>{

    if(chatStorage && userInfo ){
      socket.on("connect")
    }
    return ()=>{
      JSON.parse(localStorage.getItem("chat"))
    }
  },[ chatStorage])


  const joinRoom = () => {
    if (user !== "" && room !== "") {

      let infoUser = {
        user,
        room
      }
      socket.emit("join_room", room);
      localStorage.setItem("info-user-room", JSON.stringify(infoUser))
      localStorage.setItem("chat", JSON.stringify(true))
      setChatStorage(JSON.parse(localStorage.getItem("chat"))) 
    }
  };

  const leaveChat = ()=>{
    localStorage.clear()
    localStorage.setItem("chat", JSON.stringify(false))
    setChatStorage(JSON.parse(localStorage.getItem("chat")))
  }

  return (
    <>
      {chatStorage === false ? (
        <div className="container">
         <h1>Unirse al chat!</h1>
         <div className="form-join">
          <input
            type="text"
            className="input-join"
            name="user"
            placeholder="nombre de usuario"
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            type="text"
            className="input-join"
            name="roomId"
            placeholder="ID del Chat"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button className="btn-join" onClick={joinRoom}>
            Entrar al chat
          </button>
         </div>
        </div>
      ) : (
          <div className="container">
            <Chat socket={socket} info={userInfo} user={user} room={room} />
            <button className="btn-exit" onClick={leaveChat} >Salir del chat</button>
        </div>
      )}
    </>
  );
}

export default App;

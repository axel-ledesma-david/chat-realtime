import { useState } from "react";
import { io } from "socket.io-client";
import "./App.css";
import Chat from "./Chat";

const socket = io.connect("https://chat-real-time-wg8o.onrender.com/");
/* const socket = io.connect() */

function App() {
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  const [chat, setChat] = useState(false);

  const joinRoom = () => {
    if (user !== "" && room !== "") {
      socket.emit("join_room", room);
      setChat(!chat);
    }
  };

  return (
    <>
      {chat === false ? (
        <div className="container">
          <h3>Unirse al chat!</h3>
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
      ) : (
          <div className="container">
            <Chat socket={socket} room={room} user={user} />
        </div>
      )}
    </>
  );
}

export default App;

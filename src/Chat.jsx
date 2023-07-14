import { useState, useEffect } from 'react'
import '../src/Chat.css'
import ScrollToBottom from 'react-scroll-to-bottom'

const Chat = ({ socket, user, room }) => {

  const [currentMessage, setCurrentMessage] = useState("")
  const [messageList, setMessageList] = useState([])

  const send_message = async () => {
    if (currentMessage !== "") {
      let dataMsg = {
        user: user,
        message: currentMessage,
        room: room,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
      }

      await socket.emit("send_message", dataMsg)
      setMessageList(list => [...list, dataMsg])
      setCurrentMessage("")
      document.querySelector(".chat-messages").scrollIntoView({
        block: "end"
      })

    }
  }

  useEffect(() => {
    socket.on("receive_message", data => {
      console.log(data)
      setMessageList(list => [...list, data])
    })
    return () => socket.removeListener("receive_message")
  }, [socket])

  return (
    <>
      <div className="chat">
        <div className="header-chat">
          <div className="circle"></div>
          <p>Chat</p>
        </div>
        <ScrollToBottom className="chat-messages">
          {
            messageList.map((msg, index) => (
              <div key={index} className={msg.user === user ? "message-container me" : "message-container other"} >
                <div  className={ msg.user === user ? "message-content end" : "message-content start" } >
                  <b>{ msg.user === user ? "yo" : msg.user  }</b>
                  <p className='message' >{msg.message}</p>
                  <p className='timestamp' >{msg.time}</p>
                </div>
              </div>
            ))
          }
        </ScrollToBottom>
      <div className="footer-chat">
        <textarea name="" id="" onKeyDown={(e)=>{ e.key === 'Enter' &&  send_message()}} onChange={(e) => setCurrentMessage(e.target.value)} value={currentMessage} ></textarea>
        <button className='send-btn' onClick={send_message} >&#9658;</button>
      </div>
      </div>
    </>
  )
}

export default Chat
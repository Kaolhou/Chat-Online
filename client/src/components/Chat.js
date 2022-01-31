import {useState, useEffect} from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

function Chat({socket, username, room}){
    const [currentmsg, setCurrentmsg] = useState("")
    const [allmsg, setAllmsg] = useState([])


    useEffect(()=>{
        socket.on('receive_message',(data)=>{
            console.log(data)
            setAllmsg((list)=>[...list,data])
            
        })
    },[socket])

    const sendMessage = async ()=>{
        if(!currentmsg) return alert("message couldn't be empty")
        let x =new Date()
        let a = x.getHours()
        let b = x.getMinutes()
        if(a<10){
            a = "0"+a
        }
        if(b<10){
            b = "0"+b
        }
        const datamsg = {
            room: room,
            author: username,
            message: currentmsg,
            time: a+":"+b
        }
        await socket.emit('send_message',datamsg)
        setAllmsg((list)=>[...list,datamsg])
    }

    return(
        <div id="chat">
            <div className="chat-header"><h2>{room}</h2></div>
            <div className="chat-body">
                <ScrollToBottom className="message-container"/* add className 56:28*/>
                    {allmsg.map((item, key)=>{
                        return(
                            <div className="message" id={username === item.author?"you":"other"} key={key}>
                                <div>
                                    <div className='message-content'>
                                        <p>{item.message}</p>
                                    </div>
                                    <div className='message-meta'>
                                        <p>{item.author}</p>
                                        <p>{item.time}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input 
                type='text' 
                placeholder="Send Hi" 
                onChange={e=>{setCurrentmsg(e.target.value)}}
                onKeyPress={e=>{e.key==="Enter"&&sendMessage()}}
                /> 
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}
export default Chat
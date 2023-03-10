import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import Convos from '../../components/convos/Convos'
import Message from '../../components/message/Message'
import Navbar from '../../components/navbar/Navbar'
import { AuthContext } from '../../context/AuthContext'
import "./messenger.css"
import { useRef } from 'react'
import {io} from 'socket.io-client'
import { SocketContext } from '../../context/SocketContext';
import { axiosInstance } from '../../config'

const Messenger = ( ) => {

  const {user} = useContext(AuthContext)
  const sockets = useContext(SocketContext);
  const [convo, setConvo] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [convosFound, setConvosFound] = useState([])
  const [search, setSearch] = useState("")
  const [usersArr, setUsersArr] = useState("")

  // const socket=useContext(SocketContext)

  const scrollRef = useRef();
  // const socket = useRef()
  

//useEffect for connecting the socket
//and getting getting a message if the other users sends one
  useEffect(()=>{

    // socket.current = io("ws://localhost:8900")

    sockets?.on("getMessage", (data) =>{
        setArrivalMessage({
            sender:data.senderId ,
            text: data.text,
            createdAt: Date.now(),
        })
    })


  },[])


  //prevents the new message from being displayed on the screen while we are in a different conversation
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

//useEffect for adding and removing people from the socket

  useEffect(()=>{
    sockets?.emit("addUser")

    sockets?.on("getUsers", (users)=>{
        setOnlineUsers(user.followings.filter(f=>users.some(u=>u.userId === f)))
    })

  }, [user])

  
  //useEffect for getting all convos this user is in

  useEffect(()=>{

    const getConvo = async () =>{

        try {
            const res = await axiosInstance.get("/convo/"+user._id)
            setConvo(res.data)
        } catch (error) {

            console.log(error)

        }
    }

    getConvo();
  }, [user._id])


  //useEffect for getting and setting all the messages in a convo
  useEffect (()=>{

    const getMessage = async () =>{

        try {
            const res =  await axiosInstance.get("/message/"+currentChat?._id)
            setMessages(res.data)
        } catch (error) {

            console.log(error)

        }
    }
    getMessage();
  }, [currentChat])



  //submitting and sending a message to a user
  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = {
        convoId: currentChat._id,
        sender: user._id,
        text:newMessage,
    }

    const recieverId = currentChat.members.find
    ((member)=> member !== user._id);
    
    sockets?.emit("sendMessage",{
        senderId: user._id,
        recieverId : recieverId,
        text: newMessage
    })

    sockets.emit("sendNotificationMessenger", {
      senderName: user.username,
      recieverId: recieverId,
      type:1,
      pfp: user.profilePicture,
      senderId: user._id
    } )

    try {
        const res =  await axiosInstance.post("/message", message);
        setMessages([...messages, res.data])
        setNewMessage('');
        
    } catch (error) {
        console.log(error)
    }
  }



  //useEffect for making scroll to bottom on new message and making it smooth

  useEffect (()=>{
    scrollRef.current?.scrollIntoView({behavior: "smooth"});
  },[messages])


//     useEffect for search

  // useEffect(() =>{
  //   let results = convo.filter(x => x.username.toLowerCase().includes(search.toLowerCase()))
  //   console.log(results)
  // },[search])

  return (
<>
    <Navbar /> 

    <div className="messenger">
        <div className="chatMenu">

         <div className="chatMenuWrapper">
            <input 
            placeholder='Search for convos' 
            className='chatMenuInput'
            onChange={(e)=> setSearch(e.target.value)}
            />
            
            {convo.map((c)=>(
                <div onClick={()=> setCurrentChat(c)}>
                <Convos convo={c} currentUser={user}/>
                </div>
            ))}
            
            

         </div>

        </div>

        <div className="chatBox">

            <div className="chatBoxWrapper">
                {
                    currentChat ?
                <>
                <div className="chatBoxTop">
                {messages.map ((m)=>(
                    <div ref={scrollRef}>
                    <Message message={m} own={m.sender=== user._id}/>
                    </div>
                ))}

                </div>

                <div className="chatBoxBottom">
                    <textarea 
                    placeholder="write a message..." 
                    className="messageBoxInput"
                    onChange={(e)=>setNewMessage(e.target.value)}
                    value={newMessage}
                    >    
                    </textarea>
                    <button className='messageSendButton'
                    onClick={handleSubmit}
                    >Send</button>
                </div>
                </>
                :<span className='noConvoText'>Press a convo to start messaging</span>
                }
            </div>
        </div>

        <div className="chatOnline">

            <div className="chatOnlineWrapper">
                <ChatOnline 
                onlineUsers={onlineUsers} 
                currentId={user._id} 
                setCurrentChat={setCurrentChat} />
                

            </div>
        </div>

    </div>
</>
  )
}
export default Messenger;
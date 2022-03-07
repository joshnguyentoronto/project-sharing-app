import './MessageBox.css';
import React, {useState} from 'react';
import MessageList from "../../components/MessageList/MessageList"
import MessageListItem from "../../components/MessageListItem/MessageListItem"
import CloseIcon from '@mui/icons-material/Close';

export default function MessageBox(props) {
    const [messageData, setMessageData] = useState(false)
    const [messageinfo, setmessageInfo] = useState('')

    function onClick(data){
        let value = !messageData
        setmessageInfo(data)
        setMessageData(value)
    }

    if (messageData){
        console.log('specific person view')
        return (
            <div className='message-container'>
                <MessageListItem
                    closeChat={props.openChatList}
                    onClick={onClick}
                    messageData={messageinfo}
                    currentUser={props.currentUser}
                />
            </div>            
        )
    } else {
        console.log('list view')
        console.log(props.messageList)
        return (
            <div className='message-container'>
                {/* remember to change this css tag from the message list.css to this one */}
                <div className='mlHeader'>
                    <p>Messages</p>
                    <CloseIcon onClick={props.openChatList} />
                </div>
                <form>
                    <input></input>
                </form>
                {props.messageList.map(m =>
                    <MessageList
                        messageData={m}
                        closeChat={props.openChatList} 
                        onClick={onClick}
                        lastMessage={m.messages[m.messages.length -1].text}
                        currentUser={props.currentUser}
                        users={m.users}
                    />
                )}
            </div>
        )
    }
    // return (
    //     <div className='message-container'>
    //         {messageData ? 
    //             messageListItem(props) : 
    //             messageList(props)
    //         }
    //     </div>
    // )

    // if (messageData) {
    //     console.log('if stat')
    //     return (
    //         <div className='message-container'>
    //             {props.messageList.map(m =>
    //                 <MessageList
    //                     closeChat={props.openChatList}
    //                     onClick={onClick}
    //                     lastMessage={m.lastMessage}    
    //                 />
    //             )}      
    //         </div>
    //     )
    // } else {
    //     return (
    //         false 
    //     )
    // }
}
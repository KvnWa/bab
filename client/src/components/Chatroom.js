import React, { useEffect, useReducer } from 'react'
import { useParams, Routes, Route } from 'react-router-dom'
import ChatroomHeader from './ChatroomHeader'
import Messages from './Messages'
import Members from './Members'
import Messenger from './Messenger'
import ChatroomWithdrawal from './ChatroomWithdrawal'
import Cable from 'actioncable'

function reducer(state, action) {
  switch(action.type) {
    case 'fetchSuccess': {
      return { ...state, chatroom: action.payload, errors: []}
    }
    case 'fetchFailure': {
      return { ...state, errors: action.payload }
    }
    case 'messageNew': {
      const updatedChatroom = { ...state.chatroom }
      updatedChatroom.messages = [ ...state.chatroom.messages, action.payload ]
      return { ...state, chatroom: updatedChatroom }
    }
    case 'messageEdit': {
      const updatedChatroom = { ...state.chatroom }
      updatedChatroom.messages = updatedChatroom.messages.map(message => {
        if (message.id === action.payload.id) {
          return action.payload;
        }
        return message;
      })
      return { ...state, chatroom: updatedChatroom }
    }
    case 'messageDelete': {
      const updatedChatroom = { ...state.chatroom }
      updatedChatroom.messages = updatedChatroom.messages.filter(message => message.id !== action.payload.id)
      return { ...state, chatroom: updatedChatroom }
    }
    case 'chatConnection': {
      return { ...state, chatConnection: action.payload}
    }
    default: {
      return state
    }
  }
}

function Chatroom({ user, handleChatroomMembershipWithdrawal }) {
  const [state, dispatch] = useReducer(reducer, {
    chatroom: {},
    errors: [],
    chatConnection: {}
  })

  const { chatroom, errors, chatConnection } = state
  
  const {chatroomId} = useParams()
  
  useEffect(() => {
    function createSocket() {
      if (chatConnection.consumer) {
        chatConnection.unsubscribe();
      }
      const consumer = Cable.createConsumer()
      const subscription = consumer.subscriptions.create(
        { 
          channel: 'ChatChannel',
          room: chatroom.name
        }, 
        {
          received: (message) => {
            dispatch({ type: 'messageNew', payload: message })
          }
        }
      )
      dispatch({ type: 'chatConnection', payload: subscription })
    }
    if (chatroom.name) {
      createSocket()
    }
},[chatroom.name, chatroom.id])

  useEffect(() => {
    fetch(`/api/chatrooms/${chatroomId}`)
    .then(r => {
      if (r.ok) {
        r.json().then(data => {
          dispatch({ type: 'fetchSuccess', payload: data })
        })
      } else {
        r.json().then(e => {
          dispatch({ type: 'fetchFailure', payload: e.errors })
        })
      }
    })
  }, [chatroomId])

  function handleMessageNew(message) {
    chatConnection.send({ message: { content: message, chatroom_id: chatroom.id } })
  }

  function handleMessageEdit(messageEdit) {
    dispatch({ type: 'messageEdit', payload: messageEdit })
  }

  function handleMessageDelete(deletedMessage) {
    dispatch({ type: 'messageDelete', payload: deletedMessage })
  }

  function handleErrors() {
    if (errors.length === 0) {
      return <div></div>
    } else {
      return <div className='errors'>{errors.map(e => <p key={e}>{e}</p>)}</div>
    }
  }

  return (
    chatroom.name ? (
      <div className='chatroom'>
        <ChatroomHeader name={chatroom.name}/>
        <Messages messages={chatroom.messages} currentMember={chatroom.current_member} handleMessageDelete={handleMessageDelete}/>
        <Members members={chatroom.members}/>
        <ChatroomWithdrawal currentMember={chatroom.current_member} handleChatroomMembershipWithdrawal={handleChatroomMembershipWithdrawal}/>
        <Routes>
          <Route index element={<Messenger chatroom={chatroom.id} handleChatroomMessage={handleMessageNew} />}/>
          <Route path='messages/:messageId/edit' element={<Messenger chatroom={chatroom.id} handleChatroomMessage={handleMessageEdit} />}/>
        </Routes>
      </div>
    ) : (
      handleErrors()
    )
  )
}

export default Chatroom
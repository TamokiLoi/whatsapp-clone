import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined, AttachFile, MoreVert, InsertEmoticon, Mic } from '@material-ui/icons';
import { useParams } from 'react-router';
import db from '../../firebase';
import firebase from 'firebase';
import { useStateValue } from '../../redux/StateProvider';

import './Chat.css';

function Chat() {

    const [input, setInput] = useState('');
    const [seed, setSeed] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    useEffect(() => {
        if (roomId) {
            db.collection('rooms')
                .doc(roomId)
                .onSnapshot(snapshot => (
                    setRoomName(snapshot.data().name)
                ));
            db.collection('rooms')
                .doc(roomId)
                .collection('messages')
                .orderBy('timestamp', 'asc')
                .onSnapshot(snapshot => (
                    setMessages(snapshot.docs.map(doc => doc.data()))
                ));
        }
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId)
            .collection('messages').add({
                message: input,
                name: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
        setInput('');
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        Last seen {' '}
                        {
                            messages.length > 0 &&
                            (
                                new Date(
                                    messages[messages.length - 1]?.
                                        timestamp?.toDate()
                                ).toUTCString()
                            )
                        }
                    </p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {
                    messages.length > 0 &&
                    messages.map((message, index) =>
                        <p
                            className={`chat__message ${message.name === user.displayName && 'chat_reciever'}`}
                            key={index}>
                            <span className="chat__name">{message.name}</span>
                            {message.message}
                            <span className="chat__timestamp">
                                {new Date(message.timestamp?.toDate()).toUTCString()}
                            </span>
                        </p>
                    )
                }
            </div>

            <div className="chat__footer">
                <InsertEmoticon />
                <form>
                    <input
                        type="text"
                        placeholder="Type a message"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button type="submit" onClick={sendMessage}>Send a message</button>
                </form>
                <Mic />
            </div>
        </div>
    )
}

export default Chat

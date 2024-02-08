import React, {useEffect, useState} from 'react';
import Chatting from 'components/Chatting';
import {
	List,
	ListItem,
	ListItemText,
	Collapse,
	Box,
	Typography, Button, Divider,
} from '@mui/material';
import {useNavigate} from "react-router-dom";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import {useVoiceSocket} from 'context/VoiceSocketContext';
import axios from "axios";

const getChatRooms = () => {
	const chatRooms = sessionStorage.getItem('roomList');
	return chatRooms ? JSON.parse(chatRooms) : [];
};

const Chattings = () => {
	const [rooms, setRooms] = useState([]);
	const navigate = useNavigate();
	const {disconnectSession} = useVoiceSocket();

	useEffect(() => {
		const chatRooms = getChatRooms();
		console.log(chatRooms);
		setRooms(chatRooms);
	}, []);

	const chatRoomsObj = getChatRooms();
	const chatRooms = [
		{id: 1, participants: ['Alice', 'Bob']},
		{id: 2, participants: ['Charlie', 'Dave']},
		{id: 3, participants: ['Eve', 'Frank']},
		{id: 4, participants: ['Grace', 'Hank']},
		// 추가 채팅방 데이터...
	];

	const [expandedRoomId, setExpandedRoomId] = useState(null);
	const toggleExpand = (roomId) => {
		// 이미 확장된 채팅방을 다시 클릭하면 닫힙니다.
		if (expandedRoomId === roomId) {
			setExpandedRoomId(null);
		} else {
			// 다른 채팅방을 클릭하면 해당 채팅방이 확장되고 이전에 확장된 채팅방은 닫힙니다.
			setExpandedRoomId(roomId);
		}
	};

	const voiceCall = (roomId, users) => {
		disconnectSession();
		navigate(`/voiceChat/${roomId}`, { state: { users } });
	}

	const disconnectCall = () => {
		disconnectSession();
	}

	return (
			<List component="nav">
				{rooms.map((room) => (
						<React.Fragment key={room.id}>
							<ListItem button onClick={() => toggleExpand(room.id)}>
								{room.lastMessage !== null ?
									<ListItemText
										primary={room.users.map(user => user.nickname).join(', ')}
										secondary={expandedRoomId !== room.id ? `${room.lastMessage.nickname}: ${room.lastMessage.content}` : ''}
									/>
									:
									<ListItemText
										primary={room.users.map(user => user.nickname).join(', ')}
										// secondary={expandedRoomId !== room.id ? `${room.lastMessage.nickname}: ${room.lastMessage.content}` : ''}
									/>
								}
								{/*<ListItemText*/}
								{/*	primary={room.users.map(user => user.nickname).join(', ')}*/}
								{/*	secondary={expandedRoomId !== room.id ? `${room.lastMessage.nickname}: ${room.lastMessage.content}` : ''}*/}
								{/*/>*/}
								{expandedRoomId === room.id ? <ExpandLess /> : <ExpandMore />}
							</ListItem>
							<div>
								<Button onClick={() => voiceCall(room.id, room.users)}>asdasd</Button>
								<Button onClick={() => disconnectCall()}>disconnect</Button>
							</div>
							{expandedRoomId === room.id && <Chatting roomNumber={room.id}/>}
							{/*<Collapse in={expandedRoomId === room.id} timeout="auto" unmountOnExit>*/}
							{/*	<Box sx={{bgcolor: 'background.paper'}}>*/}
							{/*		<Chatting roomNumber={room.id}/>*/}
							{/*	</Box>*/}
							{/*</Collapse>*/}
							<Divider />
						</React.Fragment>
				))}
			</List>
	);
};

export default Chattings;

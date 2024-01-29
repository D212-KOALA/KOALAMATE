import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import WriteBoard from './pages/WriteBoard';
import Nav from './components/Nav';
import Footer from './components/Footer';
<<<<<<< HEAD
import CommentList from './components/CommentList';
=======
import Chatting from './pages/Chatting';
>>>>>>> issue-front-chatting
// 다른 페이지 컴포넌트들을 임포트

function App() {
	return (
			<Router>
				<div className="App">
					<Nav />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/about" element={<About />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="/writeBoard" element={<WriteBoard />} />
						<Route path="/:boardId/comments" element={<CommentList />} />
						<Route path="/chatting" element={<Chatting />} />
						{/* 다른 라우트들 */}
					</Routes>
					<Footer />
				</div>
			</Router>
	);
}

export default App;
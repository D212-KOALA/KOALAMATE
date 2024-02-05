import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {Container, List, Typography, Button, Grid} from '@mui/material';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem'; // Import the new component

const CommentList = () => {
	const {boardId} = useParams();
	const [comments, setComments] = useState([]);
	const [editCommentId, setEditCommentId] = useState(null);
	const [editedCommentContent, setEditedCommentContent] = useState('');

	const getComments = async () => {
		try {
			const response = await axios.get(
					`${process.env.REACT_APP_API_URL}/board/view?id=${boardId}`);
			setComments(response.data.comments || []);
		} catch (error) {
			console.log('댓글 목록을 가져오는 중 에러 발생: ', error);
		}
	};

	useEffect(() => {
		getComments();
	}, [boardId]);

	const handleDeleteComment = async (commentId) => {
		try {
			await axios.delete(`${process.env.REACT_APP_API_URL}/comment/${commentId}/delete`);
			setComments((prevComments) => prevComments.filter(
					(comment) => comment.id !== commentId));
		} catch (error) {
			console.log('댓글 삭제 실패: ', error);
		}
	};

	const handleEditComment = async (commentId, editedContent) => {
		try {
			await axios.put(`${process.env.REACT_APP_API_URL}/comment/${commentId}/modify`, {
				commentId: commentId,
				content: editedContent,
			});
			setComments((prevComments) =>
					prevComments.map((item) =>
							item.id === commentId ? { ...item, content: editedContent } : item
					)
			);

			setEditCommentId(null); // 수정 완료 후 상태 초기화
			setEditedCommentContent(''); // 수정 완료 후 상태 초기화
		} catch (error) {
			console.log('댓글 수정 실패: ', error);
		}
	};

	return (
			<>
				<Container component="main" maxWidth="sm">
					<Typography variant="h6">댓글 {comments.length || 0}</Typography>

					<CommentForm boardId={boardId} updateComments={getComments}/>
					<List>
						{comments.map((comment) => (
								<CommentItem
										key={comment.id} // Assuming comment has an 'id' property
										comment={comment}
										onDeleteComment={handleDeleteComment}
										onEditComment={handleEditComment}
								/>
						))}
					</List>
				</Container>
			</>
	);
};

export default React.memo(CommentList);

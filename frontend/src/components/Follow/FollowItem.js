import React from 'react'
import {Avatar, Box, Chip, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const standardImgPath = '/assets/profile.jpg';
const FollowItem = ({id, nickname, birthRange, gender, img, intro}) => {
    // 이미지 URL을 절대 경로로 변환
    const profileImage = img ? `http://localhost:3000/${img}` : '/assets/profile.jpg';
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/user/${id}`);
    }

    return (
        <>
            <Box onClick={handleClick} m={3} p={1} sx={{
                display: 'flex', alignItems: 'center', gap: 2, width: 1000,
                border: 1, borderColor: 'lightGray', borderRadius: '10px'
            }}>
                <Avatar sx={{width: 100, height: 100}} src={profileImage} alt="프로필 이미지"/>
                <Typography variant="h5" sx={{fontWeight: "bold"}}>{nickname}</Typography>
                <Box sx={{display: 'flex', flexDirection: 'column', gap:1}}>
                    <Box sx={{display: 'flex', gap:1}}>
                        <Chip label={`${birthRange}대`} variant="Filled"
                              sx={{backgroundColor: '#CDFAD5', fontWeight: "bold"}}/>
                        <Chip label={`${gender}`} variant="Filled"
                              sx={{backgroundColor: '#FF9B9B', fontWeight: "bold"}}/>
                    </Box>
                    <Typography sx={{color:'gray'}}>{intro}</Typography>
                </Box>
            </Box>
        </>

    )
}
export default FollowItem
import React, {useState} from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

const SearchResultBtn = () => {
    const [clickedButton, setClickedButton] = useState('admin')

    // 버튼 클릭 이벤트 핸들러 함수들
    const handleAdminRecipesClick = () => {

        setClickedButton('admin')
    };

    const handleUserRecipesClick = () => {

        setClickedButton('user')
    };

    const handleIngredientClick = () => {

        setClickedButton('ingredient')
    };

    const handleDrinkClick = () => {

        setClickedButton('drink')
    };

    const getButtonStyle = (buttonName) => ({
        backgroundColor: clickedButton === buttonName ? '#FF9B9B' : '',
        color: clickedButton === buttonName ? 'white' : '#FF9B9B',
        borderRadius: '10px',
        fontWeight: 'bold',
        borderColor: '#FF9B9B', // 버튼 그룹에 있는 버튼들을 위해 추가
    });

    return (<>
            <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                {/* 독립적인 '전체 조회' 버튼 */}
                <Button
                    variant="outlined"
                    style={getButtonStyle('admin')}
                    onClick={handleAdminRecipesClick}
                >
                    레시피 백과
                </Button>

                {/* '레시피 백과'와 '유저 레시피'를 포함한 버튼 그룹 */}
                <ButtonGroup
                    variant="outlined"
                    aria-label="outlined secondary button group"
                    style={{gap: '10px'}}
                >
                    <Button
                        onClick={handleUserRecipesClick}
                        style={getButtonStyle('user')}
                    >
                        유저 레시피
                    </Button>
                    <Button
                        onClick={handleIngredientClick}
                        style={getButtonStyle('ingredient')}
                    >
                        재료
                    </Button>

                    <Button
                        onClick={handleDrinkClick}
                        style={getButtonStyle('drink')}
                    >
                        검색어가 들어간 레시피
                    </Button>
                </ButtonGroup>
            </div>
        </>
    )
}
export default SearchResultBtn;

// import React, {useState} from "react";
// import Button from "@mui/material/Button";
// import ButtonGroup from "@mui/material/ButtonGroup";
//
// const SearchResultBtn = ({ setSearchOptionNum }) => {
//     const [clickedButton, setClickedButton] = useState('admin')
//     const handleOptionChange = (option) => {
//         setSearchOptionNum(option);
//     };
//
//     // 버튼 스타일을 동적으로 변경하기 위한 함수
//     const getButtonStyle = (buttonName) => ({
//         backgroundColor: clickedButton === buttonName ? '#FF9B9B' : '',
//         color: clickedButton === buttonName ? 'white' : '#FF9B9B',
//         borderRadius: '10px',
//         fontWeight: 'bold',
//         borderColor: '#FF9B9B', // 버튼 그룹에 있는 버튼들을 위해 추가
//     });
//
//     return (
//         <div>
//             <ButtonGroup variant="contained">
//                 <Button onClick={() => handleOptionChange(1)}>레시피 백과</Button>
//                 <Button onClick={() => handleOptionChange(2)}>유저 레시피</Button>
//                 <Button onClick={() => handleOptionChange(3)}>재료 검색</Button>
//                 <Button onClick={() => handleOptionChange(4)}>검색어가 들어간 레시피</Button>
//             </ButtonGroup>
//         </div>
//     );
// };

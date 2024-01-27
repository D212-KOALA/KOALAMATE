package com.ssafy.koala.dto.Board;

import com.ssafy.koala.dto.Cocktail.CocktailWithDrinkDto;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class CreateBoardRequestDto {
    private long id;
    private String title;
    private String content;
    private Date date;
    private int views;
    private String nickname;
    private String image;
    private List<CocktailWithDrinkDto> cocktails;
}

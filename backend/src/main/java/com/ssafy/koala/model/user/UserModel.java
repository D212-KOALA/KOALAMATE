package com.ssafy.koala.model.user;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafy.koala.model.LikeModel;
import com.ssafy.koala.model.RefrigeratorModel;
import com.ssafy.koala.model.chat.ChatModel;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="user_id", nullable = false)
	private Long id;

	@Column(nullable = false)
	private String email;
	@Column(nullable = false)
	private String password;
	@Column(nullable = false)
	private String nickname;
	private double latitude;
	private double longitude;
	@Column(name="birth_range")
	private int birthRange;
	private String gender;
	private String profile;
	private boolean isAdmin;
	private String refreshToken;

	@OneToMany(mappedBy = "user")
	private List<ChatModel> chats;

	// 준수시치가 건든 부분
	@OneToOne(cascade = CascadeType.ALL, mappedBy = "user")
	private RefrigeratorModel refrigerator = new RefrigeratorModel();

	private String introduction;
<<<<<<< HEAD
	private double alcoholLimit = 0; // 주량
	private double alcoholLimitBottle = 0; // 주량
	private double alcoholLimitGlass = 0; // 주량
=======
	private double alcoholLimit = 0; // 가라데이터
	private double alcoholLimitBottle = 0; // 주량_병
	private double alcoholLimitGlass = 0; // 주량_잔
>>>>>>> master
	private double mannersScore = 36.5;  // 매너점수
	private List<String> tags; // 태그들

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
	private List<LikeModel> likes;
}

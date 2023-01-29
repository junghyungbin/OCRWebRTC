package com.hypeboy.codemeets.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GroupListDto {
	private int cnt;
	private String gname;
	private String nickname;
	private int count;
	private String callStartTime;
}
package com.hypeboy.codemeets.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hypeboy.codemeets.model.dao.QnaDao;
import com.hypeboy.codemeets.model.dto.QnaDto;

@Service
public class QnaServiceImpl implements QnaService{

	private QnaDao qnaDao;
	
	@Autowired
	public QnaServiceImpl(QnaDao qnaDao) {
		super();
		this.qnaDao = qnaDao;
	}
	
	@Override
	public int writeQna(QnaDto qnaDto) throws Exception{
		return qnaDao.writeQna(qnaDto);
	}
	
	@Override
	public List<QnaDto> getList(int groupPk) throws Exception {
		return qnaDao.getList(groupPk);
	}

	@Override
	public QnaDto getQna(int groupQuestionPk) throws Exception {
		return qnaDao.getQna(groupQuestionPk);
	}

	@Override
	public int modifyQna(QnaDto qnaDto) throws Exception {
		return qnaDao.modifyQna(qnaDto);
	}

	@Override
	public int deleteQna(int groupQuestionPk) throws Exception {
		return qnaDao.deleteQna(groupQuestionPk);
	}
	
	
}

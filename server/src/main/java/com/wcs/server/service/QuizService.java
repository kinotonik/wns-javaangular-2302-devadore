package com.wcs.server.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wcs.server.dto.QuizDTO;
import com.wcs.server.entity.Quiz;
import com.wcs.server.repository.QuizRepository;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private ModelMapper modelMapper;

    public List<QuizDTO> getAll() {
        List<Quiz> quizs = quizRepository.findAll();
        return quizs.stream()
                .map(this::convertQuizToDTO)
                .collect(Collectors.toList());
    }

    private QuizDTO convertQuizToDTO(Quiz quiz) {
        return modelMapper.map(quiz, QuizDTO.class);
    }
}

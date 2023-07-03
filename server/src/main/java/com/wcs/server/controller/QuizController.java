package com.wcs.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wcs.server.dto.QuizDTO;
import com.wcs.server.service.QuizService;

@RestController
@RequestMapping("/api")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @GetMapping("/quizs")
    public ResponseEntity<List<QuizDTO>> getAll() {
        List<QuizDTO> quizs = quizService.getAll();
        return ResponseEntity.ok(quizs);
    }
}

package com.wcs.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wcs.server.dto.AnswerDTO;
import com.wcs.server.service.AnswerService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api")
@Tag(name = "Answer")
public class AnswerController {

    @Autowired
    private AnswerService answerService;

    @Operation(summary = "Retourne la liste des réponses d'une question")
    @GetMapping("/answer/question/{id}")
    public ResponseEntity<List<AnswerDTO>> getAllByQuiz(Long id) {
        List<AnswerDTO> answers = answerService.getAllByQuestionId(id);
        return ResponseEntity.ok(answers);
    }
}

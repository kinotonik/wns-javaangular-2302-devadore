package com.wcs.server.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "answer")
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    private Boolean isCorrect;

    private LocalDate createdAt;
    private LocalDate updatedAt;

    // Getters, setters, and other methods
}


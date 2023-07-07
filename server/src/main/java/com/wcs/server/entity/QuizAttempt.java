package com.wcs.server.entity;

import java.sql.Date;

import jakarta.persistence.*;

@Entity
@Table(name = "quiz_attempt")
public class QuizAttempt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private int score_points;

    private int correct_answers;

    private int incorrect_answers;

    private Date start_time;

    private Date end_time;

    private int total_time_spent;
}

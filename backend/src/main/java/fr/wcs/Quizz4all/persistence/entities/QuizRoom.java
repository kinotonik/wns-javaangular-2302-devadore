package fr.wcs.Quizz4all.persistence.entities;

import fr.wcs.Quizz4all.persistence.enums.Status;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "quiz_room")
public class QuizRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "pin")
    private Integer pin;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @Column(name = "user_create_quiz_play")
    private Boolean userCreateQuizPlay;

    @Column(name = "startAt")
    private LocalDateTime startAt;

    @Column(name = "endAt")
    private LocalDateTime endAt;

    public QuizRoom() {
    }

    // getters and setters


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPin() {
        return pin;
    }

    public void setPin(Integer pin) {
        this.pin = pin;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Boolean getUserCreateQuizPlay() {
        return userCreateQuizPlay;
    }

    public void setUserCreateQuizPlay(Boolean userCreateQuizPlay) {
        this.userCreateQuizPlay = userCreateQuizPlay;
    }

    public LocalDateTime getStartAt() {
        return startAt;
    }

    public void setStartAt(LocalDateTime startAt) {
        this.startAt = startAt;
    }

    public LocalDateTime getEndAt() {
        return endAt;
    }

    public void setEndAt(LocalDateTime endAt) {
        this.endAt = endAt;
    }

    @Override
    public String toString() {
        return "QuizRoom{" +
                "id=" + id +
                ", pin=" + pin +
                ", status=" + status +
                ", userCreateQuizPlay=" + userCreateQuizPlay +
                ", startAt=" + startAt +
                ", endAt=" + endAt +
                '}';
    }
}

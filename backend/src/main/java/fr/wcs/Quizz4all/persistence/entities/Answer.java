package fr.wcs.Quizz4all.persistence.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "answer")
public class Answer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "content_answer", columnDefinition = "TEXT")
    private String contentAnswer;

    @Column(name = "correct")
    private Boolean correct;

    public Answer() {
    }

    // getters and setters


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContentAnswer() {
        return contentAnswer;
    }

    public void setContentAnswer(String contentAnswer) {
        this.contentAnswer = contentAnswer;
    }

    public Boolean getCorrect() {
        return correct;
    }

    public void setCorrect(Boolean correct) {
        this.correct = correct;
    }

    @Override
    public String toString() {
        return "Answer{" +
                "id=" + id +
                ", contentAnswer='" + contentAnswer + '\'' +
                ", correct=" + correct +
                '}';
    }
}


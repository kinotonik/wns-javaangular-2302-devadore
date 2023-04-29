package fr.wcs.Quizz4all.persistence.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "question")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type")
    private String type;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @Column(name = "image")
    private String image;

    @ManyToOne
    @JoinColumn(name = "answer_id")
    private Answer answer;

    @Column(name = "timer")
    private Integer timer;

    public Question() {
    }

    // getters and setters


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Answer getAnswer() {
        return answer;
    }

    public void setAnswer(Answer answer) {
        this.answer = answer;
    }

    public Integer getTimer() {
        return timer;
    }

    public void setTimer(Integer timer) {
        this.timer = timer;
    }

    @Override
    public String toString() {
        return "Question{" +
                "id=" + id +
                ", type='" + type + '\'' +
                ", content='" + content + '\'' +
                ", image='" + image + '\'' +
                ", answer=" + answer +
                ", timer=" + timer +
                '}';
    }
}


package fr.wcs.Quizz4all.persistence.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "categorie_has_quiz")
public class CategorieQuiz {

    @Id
    @ManyToOne
    @JoinColumn(name = "categorie_id")
    private Categorie categorie;

    @Id
    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    public CategorieQuiz() {
    }
// getters and setters


    public Categorie getCategorie() {
        return categorie;
    }

    public void setCategorie(Categorie categorie) {
        this.categorie = categorie;
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }

    @Override
    public String toString() {
        return "CategorieQuiz{" +
                "categorie=" + categorie +
                ", quiz=" + quiz +
                '}';
    }
}

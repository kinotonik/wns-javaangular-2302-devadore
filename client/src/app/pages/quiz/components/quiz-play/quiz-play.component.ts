import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnswerModel } from 'src/app/models/answer.model';
import { QuestionModel } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/services/question.service';
import { QuizMusicService } from 'src/app/services/quiz-music.service';
import { Subject, Subscription, takeUntil, takeWhile, timer } from 'rxjs';
import { User } from '../../../../models/user.model';
import { UserProfileService } from '../../../../services/user-profile-service';
import { QuizService } from '../../../../services/quiz.service';
import { MatIconModule } from '@angular/material/icon';
import { QuizAttemptService } from 'src/app/services/quiz-attempt.service';
import { QuizAttempt } from 'src/app/models/quiz-attempt';
import { QuizModel } from 'src/app/models/quiz.model';

@Component({
  selector: 'app-quiz-play',
  templateUrl: './quiz-play.component.html',
  styleUrls: ['./quiz-play.component.scss'],
})
export class QuizPlayComponent implements OnInit, OnDestroy {
  quizId: number;
  question?: QuestionModel;
  excludeIds: number[] = [];
  answers: AnswerModel[];
  selectedAnswer?: AnswerModel;
  isAnswered = false;
  score: number = 0;
  timeLeft: number = 10; // délai maximum pour répondre à une question
  maxTime: number = 10;
  timerSubscription?: Subscription;
  maxScorePerQuestion: number = 100; // score maximum par question
  private stopTimer$ = new Subject<void>();
  username: string | null = null;
  userImage: any;
  user: User | null;
  totalQuestions: number;
  sound: Boolean = true;
  startDateQuiz: Date = new Date();
  isQuizSubmitted: boolean = false;
  totalIncorrectAnswer: number = 0;
  totalCorrectAnswer: number = 0;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private quizService: QuizService,
    private cdr: ChangeDetectorRef,
    private userProfileService: UserProfileService,
    private quizMusicService: QuizMusicService,
    private quizAttemptService: QuizAttemptService
  ) {}

  ngOnInit(): void {
    this.quizId = +this.route.snapshot.paramMap.get('id')!;
    this.userProfileService.getUserImage().subscribe((image) => {
      this.userImage = image;
    });
    this.userProfileService.getUser().subscribe((user) => {
      this.user = user;
      this.username = user?.username ?? null;
    });
    this.quizService
      .getTotalQuestionsForQuiz(this.quizId)
      .subscribe((total) => {
        this.totalQuestions = total;
      });
    this.getPageInfos();
    this.quizMusicService.playMusic();
  }
  playSound() {
    this.sound = !this.sound;
    if (this.sound == true) {
      this.quizMusicService.playMusic();
    } else {
      this.quizMusicService.stopMusic();
    }
  }

  /**
   * La méthode startTimer() initialise et démarre un timer qui décompte
   * le temps restant pour répondre à la question du quiz en cours.
   */
  startTimer(): void {
    // Initialise la variable timeLeft avec la valeur de maxTime.
    this.timeLeft = this.maxTime;

    // Permet d'afficher la valeur maximale du temps au début du décompte.
    setTimeout(() => {
      // Crée un nouveau timer qui émet une valeur chaque seconde (1000 millisecondes).
      this.timerSubscription = timer(0, 1000)
        .pipe(
          // Utilise takeUntil pour compléter (ou désabonner) le timer Observable
          // lorsqu'un signal est émis par stopTimer$.
          takeUntil(this.stopTimer$),

          // Arrête le décompte quand le temps est écoulé.
          takeWhile(() => this.timeLeft > 0)
        )
        // Souscrit au timer Observable.
        .subscribe(() => {
          // Décompte pour le timer.
          this.timeLeft--;
        });
    }, 1000); // Délai de setTimeout.
  }

  /**
   * La méthode getPageInfos() est utilisée pour initialiser les informations de la page
   * et récupérer une nouvelle question pour le quiz en cours.
   */
  getPageInfos(): void {
    // Récupère l'identifiant du quiz à partir de l'URL.
    this.quizId = +this.route.snapshot.paramMap.get('id')!;

    // Mettre à jour les liaisons de données dans le template du composant.
    this.cdr.detectChanges();

    // Envoie une requête pour obtenir une question aléatoire liée au quiz en cours.
    // L'utilisateur ne reçoit pas la même question plus d'une fois.
    this.questionService
      .getRandomQuestionByQuizId(this.quizId, this.excludeIds)
      .subscribe((res) => {
        if (res) {
          this.question = res;
          this.excludeIds.push(res.id);

          // Initialise le tableau answers avec les réponses de la question en cours.
          this.answers = this.question.answers;

          // Calcule le nombre de réponses correctes de la question en cours
          // Met à jour la propriété isMultipleChoice de la question en conséquence.
          const correctAnswersCount = this.answers.filter(
            (answer) => answer.isCorrect
          ).length;
          this.question.isMultipleChoice = correctAnswersCount > 1;

          // Émet un signal pour arrêter tout timer existant avant d'en démarrer un nouveau.
          this.stopTimer$.next();

          // Démarre un nouveau timer pour la question en cours.
          this.startTimer();
        }
      });
  }

  /**
   * Méthode pour calculer et mettre à jour le score de l'utilisateur basé sur les réponses données et le temps restant.
   *
   * @param allCorrect - Booléen indiquant si toutes les réponses sélectionnées par l'utilisateur sont correctes.
   * @param timeLeft - Nombre de secondes restantes lorsque l'utilisateur a soumis ses réponses.
   * @param correctSelectedCount - (Optionnel) Nombre de réponses correctes sélectionnées par l'utilisateur.
   * @param totalCorrectCount - (Optionnel) Nombre total de réponses correctes pour la question actuelle.
   * @param isMultipleChoice - (Optionnel) Booléen indiquant si la question actuelle est à choix multiples.
   */
  calculateScore(
    allCorrect: boolean,
    timeLeft: number,
    correctSelectedCount?: number,
    totalCorrectCount?: number,
    isMultipleChoice?: boolean
  ): void {
    // Calcul du score de base. Cela dépend du temps restant, avec une pénalité pour chaque seconde écoulée.
    let baseScore = Math.max(
      0,
      this.maxScorePerQuestion - 10 * (this.maxTime - timeLeft - 2)
    );

    // Compte du nombre total de réponses sélectionnées par l'utilisateur.
    const totalSelectedCount = this.answers.filter((a) => a.isSelected).length;

    // Si toutes les réponses sélectionnées sont correctes.
    if (allCorrect) {
      // Si l'utilisateur a répondu rapidement.
      if (this.maxTime - timeLeft < 2) {
        this.score += this.maxScorePerQuestion;
      } else {
        // Sinon, le score de base (avec pénalités de temps).
        this.score += baseScore;
      }
    } else {
      
      // Logique pour le calcul du score si toutes les réponses sélectionnées ne sont pas correctes.
      if (correctSelectedCount && totalCorrectCount && totalCorrectCount >= 1) {
        let scorePercentage = 0;
        // Calcul du "gap" entre les réponses totales et correctes sélectionnées.
        const gap = totalSelectedCount - correctSelectedCount;

        // Calcul du nombre de réponses incorrectes sélectionnées.
        const incorrectSelectedCount = this.answers.filter(
          (a) => a.isSelected && !a.isCorrect
        ).length;
        // Conditions pour définir le pourcentage du score à attribuer, basé sur le "gap" et le compte de réponses incorrectes sélectionnées.
        if (incorrectSelectedCount > correctSelectedCount) {
          scorePercentage = 0;
        } else if (incorrectSelectedCount < correctSelectedCount) {
          scorePercentage = 0.5;
        } else if (gap === 2 && totalSelectedCount > correctSelectedCount) {
          scorePercentage = 0;
        } else if (gap === 1 && totalSelectedCount < correctSelectedCount) {
          scorePercentage = 0.5;
        } else if (totalSelectedCount === totalCorrectCount) {
          scorePercentage = timeLeft / this.maxTime;
        }

        // Mise à jour du score total en ajoutant le score calculé pour cette question.
        this.score += baseScore * scorePercentage;

        // Arrondissement du score total.
        this.score = Math.round(this.score / 5) * 5;
      }
    }
  }

  /**
   * Bascule l'état de sélection d'une réponse donnée.
   * Si la question n'est pas à choix multiple, arrête également le chronomètre et marque la question comme répondue.
   *
   * @param answer - La réponse dont l'état de sélection doit être basculé.
   */

  private toggleAnswerSelection(answer: AnswerModel): void {
    answer.isSelected = !answer.isSelected;
    if (this.question && !this.question.isMultipleChoice) {
      this.stopTimer$.next();
      this.onSubmitAnswers();
    }
  }

  private showScoreBriefly(): void {
    // Affiche le score pendant 3 secondes
    if (this.excludeIds.length < this.totalQuestions) {
      setTimeout(() => {
        this.getNextQuestion();
      }, 2000);
    }
  }

  /**
   * Extrait et renvoie les réponses qui ont été sélectionnées et celles qui sont correctes.
   *
   * @returns {Object} Un objet contenant deux tableaux :
   * - `selected` qui comprend toutes les réponses qui ont été sélectionnées par l'utilisateur.
   * - `correct` qui comprend toutes les réponses correctes pour la question en cours.
   */
  private getSelectedAndCorrectAnswers(): {
    selected: AnswerModel[];
    correct: AnswerModel[];
  } {
    // Filtrer le tableau des réponses sélectionnées par l'utilisateur.
    const selectedAnswers = this.answers.filter((a) => a.isSelected);

    // Filtrer le tableau des réponses marquées comme correctes.
    const correctAnswers = this.answers.filter((a) => a.isCorrect);

    // Renvoie les réponses sélectionnées et correctes.
    return {
      selected: selectedAnswers,
      correct: correctAnswers,
    };
  }

  /**
   * Vérifie si toutes les réponses sélectionnées sont correctes et si toutes les réponses correctes ont été sélectionnées.
   *
   * @param selectedAnswers - Un tableau des réponses sélectionnées par l'utilisateur.
   * @param correctAnswers - Un tableau de toutes les réponses correctes pour la question en cours.
   *
   * @returns {boolean} - Renvoie true si toutes les réponses sélectionnées sont correctes et si toutes les réponses correctes sont sélectionnées, sinon false.
   */
  private checkAnswers(
    selectedAnswers: AnswerModel[],
    correctAnswers: AnswerModel[]
  ): boolean {
    // Pour s'assurer que chaque élément du tableau selectedAnswers est correct.(true / false)
    const allSelectedAreCorrect = selectedAnswers.every((a) => a.isCorrect);

    // Vérifier si l'utilisateur a sélectionné toutes les réponses correctes.(true / false)
    const allCorrectAreSelected = correctAnswers.every((a) =>
      selectedAnswers.includes(a)
    );

    // Si les deux conditions ci-dessus sont satisfaites, la méthode retourne true, sinon elle retourne false.
    return allSelectedAreCorrect && allCorrectAreSelected;
  }

  /**
   * Méthode appelée lorsqu'une réponse est sélectionnée par l'utilisateur.
   *
   * @param answer - Objet AnswerModel représentant la réponse sélectionnée par l'utilisateur.
   */
  onAnswerSelected(answer: AnswerModel): void {
    // Vérifie que la question n'a pas déjà été répondue et que this.question existe.
    if (!this.isAnswered && this.question) {
      // Vérifie si la question est à choix multiples ou si elle n'a pas encore été répondue.
      if (this.question?.isMultipleChoice || !this.question?.isAnswered) {
        // Appelle la méthode toggleAnswerSelection avec la réponse sélectionnée comme argument.
        this.toggleAnswerSelection(answer);
      }
    }
  }

  /**
   * Méthode appelée lorsque l'utilisateur souhaite soumettre ses réponses.
   * Cette méthode évalue les réponses sélectionnées, calcule le score,
   * arrête le timer et marque la question comme ayant été répondue.
   */

  onSubmitAnswers(): void {
    if (!this.isAnswered && this.question) {
      const { selected, correct } = this.getSelectedAndCorrectAnswers();
      if (this.checkAnswers(selected, correct)) {

        this.totalCorrectAnswer = this.totalCorrectAnswer +1;
        this.calculateScore(true, this.timeLeft);

      } else {

        this.totalIncorrectAnswer = this.totalIncorrectAnswer +1;
        this.calculateScore(
          false,
          this.timeLeft,
          selected.filter((a) => a.isCorrect).length,
          correct.length,
          this.question?.isMultipleChoice
        );
      }
      this.stopTimer$.next();
      if (!this.isAnswered && this.question) {
        this.isAnswered = true;

        // Ajoutez l'ID de la question à excludeIds si ce n'est pas déjà fait.
        if (this.question.id && !this.excludeIds.includes(this.question.id)) {
          this.excludeIds.push(this.question.id);
        }
        this.isAnswered = true;
        if (this.excludeIds.length < this.totalQuestions) {
          this.showScoreBriefly();
        }
      }
    }
  }

  /**
   * Méthode appelée pour charger la prochaine question à présenter à l'utilisateur.
   * Elle réinitialise l'état lié à la question actuellement affichée, puis demande la récupération
   * des informations de la prochaine question.
   */
  getNextQuestion(): void {
    this.timeLeft = this.maxTime;

    // Réinitialisation de la variable isAnswered à false.
    this.isAnswered = false;
    // Réinitialisation de la variable selectedAnswer à undefined.
    this.selectedAnswer = undefined;

    // Appel de la méthode getPageInfos() qui est responsable de la récupération et de l'affichage
    // des informations de la nouvelle question.
    this.getPageInfos();
  }

  resetQuiz(): void {
    this.stopTimer$.next();
    this.score = 0;
    this.isAnswered = false;
    this.excludeIds = [];
    this.isQuizSubmitted = false;
    this.totalCorrectAnswer = 0;
    this.totalIncorrectAnswer = 0;
    this.startDateQuiz = new Date();
    this.getPageInfos();
  }

  /**
   * Méthode ngOnDestroy() de la classe QuizPlayComponent.
   * Cette méthode est appelée automatiquement lorsque le composant Angular est détruit.
   * Elle sert à effectuer le nettoyage nécessaire pour éviter les fuites de mémoire et autres problèmes
   * qui pourraient survenir lorsque le composant n'est plus nécessaire.
   */
  ngOnDestroy(): void {
    // Appel à la méthode next() sur l'objet stopTimer$ (qui est un Subject).
    // Cela envoie un signal à tous les observateurs de stopTimer$ que le timer doit être arrêté.
    this.stopTimer$.next();
    this.quizMusicService.stopMusic();

    // Appel à la méthode complete() sur l'objet stopTimer$.
    // Cela signifie que le Subject ne produira plus de valeurs à l'avenir, et informe
    // tous ses observateurs qu'ils peuvent se désabonner, car il n'y aura plus de valeurs émises.
    this.stopTimer$.complete();
  }

  submitQuizAttempt(): void {

    const endDateQuiz = new Date();

    const quizAttempt: QuizAttempt = {
      quiz: { id: this.quizId } as QuizModel,
      userId: this.user?.id,
      scorePoints: this.score,
      correctAnswers: this.totalCorrectAnswer,
      incorrectAnswers: this.totalIncorrectAnswer,
      startTime: this.startDateQuiz,
      endTime: endDateQuiz,
      totalTimeSpent: (endDateQuiz.getTime() - this.startDateQuiz.getTime()) / 1000
    };
    
    this.quizAttemptService.createQuizAttempt(quizAttempt).subscribe();
  }

  onFinishQuiz(): void {
    if (this.excludeIds.length === this.totalQuestions && !this.isQuizSubmitted && this.user) {
      this.submitQuizAttempt();
      this.isQuizSubmitted = true;
    }
  }
  
}
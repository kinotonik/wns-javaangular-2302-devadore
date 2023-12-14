export interface QuizAttempt {
    id?: number;
    userId?: number;
    quizId: number;
    scorePoints: number;
    correctAnswers: number;
    incorrectAnswers: number;
    startTime: Date;
    endTime?: Date;
    totalTimeSpent?: number;
}

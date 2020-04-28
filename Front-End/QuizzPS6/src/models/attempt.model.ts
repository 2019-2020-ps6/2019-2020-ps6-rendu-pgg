export class Attempt {
    score: number;
    quizId?: number;
    id?: number;

    constructor(score: number, quizId: string) {
        this.quizId = Number(quizId);
        this.score = score;
    }
}

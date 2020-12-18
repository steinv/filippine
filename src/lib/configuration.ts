export interface Configuration {
    questions: Question[]
}

export interface Question {
    question: string;
    answer: string;
    answerLength: number;
    answerPosition: number;
}
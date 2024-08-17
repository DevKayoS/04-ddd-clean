import { QuestionRepository } from '../repositories/question-repository'
import { Question } from '../../enterprise/entities/question'
import { AnswersRepository } from '../repositories/answers-repository'

interface ChoseQuestionBestAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

interface ChoseQuestionBestAnswerUseCaseResponse {
  question: Question
}

export class ChoseQuestionBestAnswerUseCase {
  constructor(
    private questionRepository: QuestionRepository,
    private answerRepository: AnswersRepository
  ) {}

  async execute({
    authorId,
    answerId
  }: ChoseQuestionBestAnswerUseCaseRequest): Promise<ChoseQuestionBestAnswerUseCaseResponse> {
    const answer = await  this.answerRepository.findById(answerId)

    if(!answer) {
      throw new Error('Answer not found')
    }

    const question = await  this.questionRepository.findById(answer.questionId.toString())

    if(!question) {
      throw new Error('Question not found')
    }

    if(authorId !== question.authorId.toString()){
      throw new Error('Not allowed')
    }

    question.bestAnswerId = answer.id

    await this.questionRepository.save(question)

    return {
      question
    }

  }
}

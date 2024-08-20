import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentRepository } from '../repositories/question-comments-repository'

interface FetchQuestionsCommentUseCaseRequest {
 page: number
 questionId: string
}

interface FetchQuestionsCommentUseCaseResponse {
  questionComments: QuestionComment[]
}

export class FetchQuestionsCommentUseCase {
  constructor(private questionCommentRepository: QuestionCommentRepository) {}

  async execute({
    page,
    questionId
  }: FetchQuestionsCommentUseCaseRequest): Promise<FetchQuestionsCommentUseCaseResponse> {

   const questionComments =  await this.questionCommentRepository.findManyByQuestionId( questionId, { page })

   return {
    questionComments
   }
  }
}

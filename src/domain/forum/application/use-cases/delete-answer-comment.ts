import { Either, left, right } from "@/core/either"
import { AnswerCommentRepository } from "../repositories/answers-comment-repository"

interface DeleteCommentOnAnswerUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteCommentOnAnswerUseCaseResponse = Either<string, {}>

export class DeleteCommentOnAnswerUseCase {
  constructor(
    private answerCommentRepository: AnswerCommentRepository
  ) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteCommentOnAnswerUseCaseRequest): Promise<DeleteCommentOnAnswerUseCaseResponse> {
    const answerComment  = await this.answerCommentRepository.findById(answerCommentId)

    if(!answerComment) {
     return left('Answer comment not found')
    }

    if(answerComment.authorId.toString() !== authorId){
     return left('Not allowed')
    }

    await this.answerCommentRepository.delete(answerComment)

   return right({})
  }
}

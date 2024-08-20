import { InMemoryAnswerCommentRepository } from "test/repositories/in-memory-answer-comment-repository"
import { DeleteCommentOnAnswerUseCase } from "./delete-answer-comment"
import { makeAnswerComment } from "test/factories/make-answer-comment"

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: DeleteCommentOnAnswerUseCase

describe('DeleteComment on answer', ()=> {
  beforeEach(()=> {
    inMemoryAnswerCommentRepository = new  InMemoryAnswerCommentRepository()
    sut = new DeleteCommentOnAnswerUseCase( inMemoryAnswerCommentRepository)
  })

  it('should be able to delete comment on answer', async () => {
    const answerComment = makeAnswerComment()

    await inMemoryAnswerCommentRepository.create(answerComment)

    await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: answerComment.authorId.toString()
    })
    
    expect(inMemoryAnswerCommentRepository.items).toHaveLength(0)
  })
  it('should not be able to delete another user comment on answer', async () => {
    const answerComment = makeAnswerComment()

    await inMemoryAnswerCommentRepository.create(answerComment)

   await expect(()=> {
    return sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: 'author-2'
    })
   }).rejects.toBeInstanceOf(Error)
  })
})


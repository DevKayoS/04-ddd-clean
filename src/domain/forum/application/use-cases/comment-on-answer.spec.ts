import { InMemoryAnswerRepository } from "test/repositories/in-memory-answer-repository"
import { CommentOnAnswerUseCase } from "./comment-on-answer"
import { InMemoryAnswerCommentRepository } from "test/repositories/in-memory-answer-comment-repository"
import { makeAnswer } from "test/factories/make-answer"

let inMemoryAnswerRepository: InMemoryAnswerRepository
let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: CommentOnAnswerUseCase

describe('Comment on answer', ()=> {
  beforeEach(()=> {
    inMemoryAnswerRepository = new  InMemoryAnswerRepository()
    inMemoryAnswerCommentRepository = new  InMemoryAnswerCommentRepository()
    sut = new CommentOnAnswerUseCase(inMemoryAnswerRepository, inMemoryAnswerCommentRepository)
  })

  it('should be able to comment on answer', async () => {
    const answer = makeAnswer()

    await inMemoryAnswerRepository.create(answer)

    const {answerComment} = await sut.execute({
       answerId: answer.id.toString(),
       authorId: answer.authorId.toString(),
       content: 'new answer comment'
    })
    
    expect(answerComment).toEqual(expect.objectContaining({content: 'new answer comment'}))
    expect(inMemoryAnswerCommentRepository.items[0].content).toEqual('new answer comment')
  })
})


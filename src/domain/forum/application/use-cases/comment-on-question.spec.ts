import { InMemoryQuestionRepository } from "test/repositories/in-memory-question-repository"
import { CommentOnQuestionUseCase } from "./comment-on-question"
import { InMemoryQuestionCommentRepository } from "test/repositories/in-memory-question-comment-repository"
import { makeQuestion } from "test/factories/make-question"

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: CommentOnQuestionUseCase

describe('Comment on question', ()=> {
  beforeEach(()=> {
    inMemoryQuestionRepository = new  InMemoryQuestionRepository()
    inMemoryQuestionCommentRepository = new  InMemoryQuestionCommentRepository()
    sut = new CommentOnQuestionUseCase(inMemoryQuestionRepository, inMemoryQuestionCommentRepository)
  })

  it('should be able to comment on question', async () => {
    const question = makeQuestion()

    await inMemoryQuestionRepository.create(question)

    const {questionComment} = await sut.execute({
       questionId: question.id.toString(),
       authorId: question.authorId.toString(),
       content: 'new question comment'
    })
    
    expect(questionComment).toEqual(expect.objectContaining({content: 'new question comment'}))
    expect(inMemoryQuestionCommentRepository.items[0].content).toEqual('new question comment')
  })
})


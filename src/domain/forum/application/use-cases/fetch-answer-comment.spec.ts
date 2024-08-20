import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { FetchAnswerCommentUseCase } from './fetch-answer-comment'
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comment-repository'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: FetchAnswerCommentUseCase

describe('Fetch answer comments', ()=> {
  beforeEach(()=> {
    inMemoryAnswerCommentRepository = new  InMemoryAnswerCommentRepository()
    sut = new FetchAnswerCommentUseCase(inMemoryAnswerCommentRepository)
  })


  it('should be able to fetch a answer comments', async () => {
    await inMemoryAnswerCommentRepository.create(makeAnswerComment({
      answerId: new UniqueEntityId('answer-1')
    }))
    await inMemoryAnswerCommentRepository.create(makeAnswerComment({
      answerId: new UniqueEntityId('answer-1')
    }))
    await inMemoryAnswerCommentRepository.create(makeAnswerComment({
      answerId: new UniqueEntityId('answer-1')
    }))
 

    const { answerComments } = await sut.execute({
      answerId: 'answer-1',
      page: 1
    })

    expect(answerComments).toHaveLength(3)
  })

  it('should be able to fetch paginated answer comments', async () => {
    for(let i = 1; i <= 22; i++){
      await inMemoryAnswerCommentRepository.create(makeAnswerComment({
        answerId: new UniqueEntityId('answer-1')
      }))
    }

    const { answerComments } = await sut.execute({
      answerId: 'answer-1',
      page: 2
    })

    expect(answerComments).toHaveLength(2)
  })
})


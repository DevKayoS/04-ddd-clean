import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { EditAnswerUseCase } from './edit-answer'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: EditAnswerUseCase

describe('Edit an answer', ()=> {
  beforeEach(()=> {
    inMemoryAnswerRepository = new  InMemoryAnswerRepository()
    sut = new EditAnswerUseCase(inMemoryAnswerRepository)
  })


  it('should be able to edit a answer', async () => {
    const answer = makeAnswer({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('answer-1'))

    await inMemoryAnswerRepository.create(answer)
    await sut.execute({ 
      authorId: 'author-1',
      answerId: 'answer-1',
      content: 'new content',
    })
    
    expect(inMemoryAnswerRepository.items[0]).toEqual(expect.objectContaining({content: 'new content'}))
  })

  it('should not be able to delete a answer from another user', async () => {
    const answer = makeAnswer({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('answer-1'))

    await inMemoryAnswerRepository.create(answer)
    
    await expect(()=> {
      return sut.execute({ 
        authorId: 'author-2',
        answerId: 'answer-1',
        content: 'new content',
      })
    }).rejects.toBeInstanceOf(Error)
    
  })
})


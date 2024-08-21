import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { EditQuestionUseCase } from './edit-question'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: EditQuestionUseCase

describe('Edit an question', ()=> {
  beforeEach(()=> {
    inMemoryQuestionRepository = new  InMemoryQuestionRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionRepository)
  })


  it('should be able to edit a question', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('question-1'))

    await inMemoryQuestionRepository.create(question)
    await sut.execute({ 
      authorId: 'author-1',
      questionId: 'question-1',
      title: 'new title',
      content: 'new content',
    })
    
    expect(inMemoryQuestionRepository.items[0]).toEqual(expect.objectContaining({title: 'new title'}))
  })

  it('should not be able to delete a question from another user', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('question-1'))

    await inMemoryQuestionRepository.create(question)
    
    const result = await sut.execute({ 
      authorId: 'author-2',
      questionId: 'question-1',
      title: 'new title',
      content: 'new content',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
    
  })
})


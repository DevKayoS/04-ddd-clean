import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { DeleteQuestionUseCase } from './delete-question'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: DeleteQuestionUseCase

describe('Delete an question', ()=> {
  beforeEach(()=> {
    inMemoryQuestionRepository = new  InMemoryQuestionRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionRepository)
  })


  it('should be able to delete a question', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('question-1'))

    await inMemoryQuestionRepository.create(question)
    await sut.execute({ 
      questionId: question.id.toString(),
      authorId: question.authorId.toString()
    })
    
    expect(inMemoryQuestionRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question from another user', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('question-1'))

    await inMemoryQuestionRepository.create(question)
    
    await expect(()=> {
      return sut.execute({ 
        questionId: question.id.toString(),
        authorId: 'author-2'
      })
    }).rejects.toBeInstanceOf(Error)
    
  })
})


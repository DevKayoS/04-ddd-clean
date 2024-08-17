import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { ChoseQuestionBestAnswerUseCase } from './chose-question-best-answer'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { makeQuestion } from 'test/factories/make-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: ChoseQuestionBestAnswerUseCase

describe('Chose best answer for a question', ()=> {
  beforeEach(()=> {
    inMemoryQuestionRepository = new  InMemoryQuestionRepository()
    inMemoryAnswerRepository = new  InMemoryAnswerRepository()
    sut = new ChoseQuestionBestAnswerUseCase(inMemoryQuestionRepository, inMemoryAnswerRepository)
  })

  it('should be able to choose  the best answer question', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('question-1'))

    await inMemoryQuestionRepository.create(question)
    
    const answer = makeAnswer({
      questionId: question.id
    }, new UniqueEntityId('answer-1'))

    await inMemoryAnswerRepository.create(answer)

    await sut.execute({ 
      answerId: 'answer-1',
      authorId: 'author-1'
    })
    
    expect(inMemoryQuestionRepository.items[0].bestAnswerId).toEqual(answer.id)
    expect(question.bestAnswerId).toBeTruthy()
  })
  it('should not be able to choose the best answer with another user', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('question-1'))

    await inMemoryQuestionRepository.create(question)
    
    const answer = makeAnswer({
      questionId: question.id
    }, new UniqueEntityId('answer-1'))

    await inMemoryAnswerRepository.create(answer)
    
    await expect(()=>
      sut.execute({ 
        answerId: 'answer-1',
        authorId: 'author-2'
      })
    ).rejects.toBeInstanceOf(Error)
  })
})


import { FetchQuestionsAnswersUseCase } from './fetch-question-answers'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: FetchQuestionsAnswersUseCase

describe('Fetch questions answers', ()=> {
  beforeEach(()=> {
    inMemoryAnswerRepository = new  InMemoryAnswerRepository()
    sut = new FetchQuestionsAnswersUseCase(inMemoryAnswerRepository)
  })


  it('should be able to fetch a answers questions', async () => {
    await inMemoryAnswerRepository.create(makeAnswer({
      questionId: new UniqueEntityId('question-1')
    }))
    await inMemoryAnswerRepository.create(makeAnswer({
      questionId: new UniqueEntityId('question-1')
    }))
    await inMemoryAnswerRepository.create(makeAnswer({
      questionId: new UniqueEntityId('question-1')
    }))

    const { answers } = await sut.execute({
      questionId: 'question-1',
      page: 1
    })

    expect(answers).toHaveLength(3)
  })

  it('should be able to fetch paginated answers questions', async () => {
    for(let i = 1; i <= 22; i++){
      await inMemoryAnswerRepository.create(makeAnswer({
        questionId: new UniqueEntityId('question-1')
      }))
    }

    const { answers } = await sut.execute({
      questionId: 'question-1',
      page: 2
    })

    expect(answers).toHaveLength(2)
  })
})


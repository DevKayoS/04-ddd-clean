import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects.ts/slug'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch recent questions', ()=> {
  beforeEach(()=> {
    inMemoryQuestionRepository = new  InMemoryQuestionRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionRepository)
  })


  it('should be able to fetch a recent questions', async () => {
    await inMemoryQuestionRepository.create(makeQuestion({createdAt: new Date(2022, 0,20)}))
    await inMemoryQuestionRepository.create(makeQuestion({createdAt: new Date(2022, 0,18)}))
    await inMemoryQuestionRepository.create(makeQuestion({createdAt: new Date(2022, 0,23)}))

    const { questions } = await sut.execute({
      page: 1
    })

    expect(questions).toEqual([
      expect.objectContaining({createdAt: new Date(2022, 0, 23)}),
      expect.objectContaining({createdAt: new Date(2022, 0,20)}),
      expect.objectContaining({createdAt: new Date(2022, 0,18)})
    ])
  })

  it('should be able to fetch paginated recent questions', async () => {
    for(let i = 1; i <= 22; i++){
      await inMemoryQuestionRepository.create(makeQuestion())
    }

    const { questions } = await sut.execute({
      page: 2
    })

    expect(questions).toHaveLength(2)
  })
})


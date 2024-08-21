import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'


let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: AnswerQuestionUseCase

describe('Answer an question',()=> {
  beforeEach(()=>{
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })


  it('should be able to create an answer', async () => {
  
  
    const result = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Nova resposta',
    })
  
    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswerRepository.items[0]).toEqual(result.value?.answer)
  })
})



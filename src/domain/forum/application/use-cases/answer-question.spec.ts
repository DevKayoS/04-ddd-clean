import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'


let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: AnswerQuestionUseCase

describe('Answer an question',()=> {
  beforeEach(()=>{
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })


  it('should be able tocreate an answer', async () => {
  
  
    const { answer } = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Nova resposta',
    })
  
    expect(answer.content).toEqual('Nova resposta')
    expect(inMemoryAnswerRepository.items[0].id).toEqual(answer.id)
  })
})



import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: CreateQuestionUseCase

describe('Create an question', ()=> {
  beforeEach(()=> {
    inMemoryQuestionRepository = new  InMemoryQuestionRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository)
  })


  it('should be able to create a question', async () => {
  
    const { question } = await sut.execute({
      authorId: '1',
      title: 'nova pergunta',
      content: 'conteudo da nova pergunta',
    })
  
    expect(question).toEqual(expect.objectContaining({content: 'conteudo da nova pergunta'}))
    expect(inMemoryQuestionRepository.items[0].id).toEqual(question.id)
    expect(question.id).toBeTruthy()
  })
})


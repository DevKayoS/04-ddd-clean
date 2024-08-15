import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: GetQuestionBySlugUseCase

describe('Get question by slug', ()=> {
  beforeEach(()=> {
    inMemoryQuestionRepository = new  InMemoryQuestionRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)
  })


  it('should be able to get a question by slug', async () => {

    const question = inMemoryQuestionRepository.create({  
      authorId: new UniqueEntityId(),
      title: 'nova pergunta',
      content: 'conteudo da nova pergunta',
    })
  
    const { question } = await sut.execute({
      authorId: '1',
      title: 'nova pergunta',
      content: 'conteudo da nova pergunta',
    })
  
   
  })
})


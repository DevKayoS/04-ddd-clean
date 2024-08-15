import { AnswerQuestionUseCase } from './answer-question'
import { QuestionRepository } from '../repositories/question-repository'
import { Question } from '../../enterprise/entities/question'
import { CreateQuestionUseCase } from './create-question'

const fakeQuestionRepository: QuestionRepository = {
  create: async (question: Question) => {},
}

test('create an question', async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionRepository)

  const { question } = await createQuestion.execute({
    authorId: '1',
    title: 'nova pergunta',
    content: 'conteudo da nova pergunta',
  })

  expect(question).toEqual(expect.objectContaining({content: 'conteudo da nova pergunta'}))
  expect(question.id).toBeTruthy()
})

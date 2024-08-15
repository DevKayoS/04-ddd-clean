import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { QuestionRepository } from '../repositories/question-repository'
import { Question } from '../../enterprise/entities/question'

interface GetQuestionBySlugRequest {
 slug: string
}

interface GetQuestionBySlugResponse {
  question: Question
}

export class GetQuestionBySlugUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    slug
  }: GetQuestionBySlugRequest): Promise<GetQuestionBySlugResponse> {
   const question =  await this.questionRepository.findBySlug(slug)

   if(!question) {
    throw new Error('Question not found')
   }
   return {
    question
   }
  }
}
